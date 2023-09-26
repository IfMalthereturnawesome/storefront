import {RadioGroup} from "@headlessui/react"
import {ErrorMessage} from "@hookform/error-message"
import {useCheckout} from "@lib/context/checkout-context"
import {Address, Cart} from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import {formatAmount, useCart, useCartShippingOptions} from "medusa-react"
import React, {useEffect, useMemo} from "react"
import {Controller, useForm} from "react-hook-form"
import StepContainer from "../step-container"
import {medusaClient} from "@lib/config";
import {Listbox} from '@headlessui/react';
import {ChevronDownIcon} from "@heroicons/react/20/solid";


type ShippingOption = {
    value?: string
    label?: string
    price: string
}

type ShippingProps = {
    cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

type ShippingFormProps = {
    soId: string
}

const Shipping: React.FC<ShippingProps> = ({cart}) => {
    const [servicePoints, setServicePoints] = React.useState([]);
    const [selectedServicePoint, setSelectedServicePoint] = React.useState<{ name: string, address: string, distance: string } | null>(null);


    const {addShippingMethod, setCart} = useCart()
    const {
        control,
        setError,
        formState: {errors},
    } = useForm<ShippingFormProps>({
        defaultValues: {
            soId: cart.shipping_methods?.[0]?.shipping_option_id,
        },
    })

    // Fetch shipping options
    const {shipping_options, refetch} = useCartShippingOptions(cart.id, {
        enabled: !!cart.id,
    })

    // Any time the cart changes we need to ensure that we are displaying valid shipping options
    useEffect(() => {
        const refetchShipping = async () => {
            await refetch()
        }

        refetchShipping().then(r => console.log("Refetched shipping options", r));
    }, [cart, refetch])

    const submitShippingOption = (soId: string) => {
        addShippingMethod.mutate(
            {
                option_id: soId,


            },
            {
                onSuccess: ({cart}) => {
                    setCart(cart);
                },
                onError: () =>
                    setError(
                        "soId",
                        {
                            type: "validate",
                            message:
                                "An error occurred while adding shipping. Please try again.",
                        },
                        {shouldFocus: true}
                    ),
            }
        )
    };


    const fetchServicePoints = async (address: Address, carrier: unknown) => {
        const endpoint = `https://api.homerunner.com/v3/servicepoints/${carrier}?country_code=${address.country_code}&street=${address.address_1}&zip_code=${address.postal_code}&city=${address.city}&limit=20`;
        const base64Credentials = btoa('mholmk@hotmail.com:3iny7dmc5axsh9pf1b6zk4lwtv2gqjeu');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${base64Credentials}`
            }
        };
        const response = await fetch(endpoint, requestOptions);
        const data = await response.json();
        return data.servicepoints;
    }


    const handleChange = async (value: string, fn: (value: string) => void) => {
        submitShippingOption(value);
        fn(value);

        const selectedOption = shipping_options.find(option => option.id === value);

        if (selectedOption.metadata && selectedOption.metadata.servicePoint === 'true') {
            const fetchedServicePoints = await fetchServicePoints(cart.shipping_address, selectedOption.metadata.carrier as string);
            setServicePoints(fetchedServicePoints);

            // Set the first service point as default (assuming this is desired)
            if (fetchedServicePoints.length > 0) {
                setSelectedServicePoint({
                    name: fetchedServicePoints[0].name,
                    address: fetchedServicePoints[0].address,
                    distance: fetchedServicePoints[0].distance
                });

            }

        } else {
            setServicePoints([]);
            setSelectedServicePoint(null); // Reset selected service point if not a service point option
        }
    }

    useEffect(() => {
        if (selectedServicePoint) {
            // Update the cart's shipping_address metadata with the selected service point
            const updatedShippingAddress = {
                ...cart.shipping_address,
                metadata: {
                    ...cart.shipping_address.metadata,
                    selectedServicePoint: selectedServicePoint  // Storing the selected service point
                }
            };

            console.log("Updating cart with:", updatedShippingAddress);

            confirmSelection();

        }
    }, [selectedServicePoint]);

    const confirmSelection = () => {

        medusaClient.carts.update(cart.id, {
            shipping_address: {
                metadata: {
                    ...cart.shipping_address.metadata,
                    selectedServicePoint: selectedServicePoint  // Storing the selected service point
                }
            },
        }).then(r => console.log("Updated cart with service point", r));
    };

    // Memoized shipping method options
    const shippingMethods: ShippingOption[] = useMemo(() => {
        if (shipping_options && cart?.region) {
            return shipping_options?.map((option) => ({
                value: option.id,
                label: option.name,
                price: formatAmount({
                    amount: option.amount || 0,
                    region: cart.region,
                }),
            }))
        }

        return []
    }, [shipping_options, cart])

    const {
        sameAsBilling: {state: sameBilling},
    } = useCheckout()

    function formatDistance(meters) {
        if (meters >= 100) {
            return `${(meters / 1000).toFixed(1)} km`;
        } else if (meters < 100) {
            return `0.1 km`;


        }

    }

    function formatOpeningHours(openingHours) {
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

        let groupedHours = [];
        let currentGroup = [];
        let currentHours = null;

        days.forEach((day, index) => {
            if (!openingHours[day] || !openingHours[day].from || !openingHours[day].to) {
                if (currentGroup.length) {
                    groupedHours.push(currentGroup);
                }
                groupedHours.push([day]);
                currentGroup = [];
                currentHours = null;
            } else if (JSON.stringify(openingHours[day]) === JSON.stringify(currentHours)) {
                currentGroup.push(day);
            } else {
                if (currentGroup.length) {
                    groupedHours.push(currentGroup);
                }
                currentGroup = [day];
                currentHours = openingHours[day];
            }

            if (index === days.length - 1 && currentGroup.length) {
                groupedHours.push(currentGroup);
            }
        });

        return groupedHours.map(group => {
            if (group.length === 1) {
                if (!openingHours[group[0]] || !openingHours[group[0]].from || !openingHours[group[0]].to) {
                    return `${group[0].charAt(0).toUpperCase() + group[0].slice(1)}: Closed`;
                }
                return `${group[0].charAt(0).toUpperCase() + group[0].slice(1)}: ${openingHours[group[0]].from} - ${openingHours[group[0]].to}`;
            } else {
                return `${group[0].charAt(0).toUpperCase() + group[0].slice(1)} - ${group[group.length - 1].charAt(0).toUpperCase() + group[group.length - 1].slice(1)}: ${openingHours[group[0]].from} - ${openingHours[group[0]].to}`;
            }
        }).join(', ');
    }


    return (
        <StepContainer
            index={sameBilling ? 2 : 3}
            title="Delivery"
            closedState={
                <div className="px-8 pb-8 text-small-regular text-slate-2">
                    <p>Enter your address to see available delivery options.</p>
                </div>
            }
        >
            <Controller
                name="soId"
                control={control}
                render={({field: {value, onChange}}) => {
                    return (
                        <div>
                            <RadioGroup
                                value={value}
                                onChange={(value: string) => handleChange(value, onChange)}
                            >
                                {shippingMethods && shippingMethods.length ? (
                                    shippingMethods.map((option) => {
                                        return (
                                            <RadioGroup.Option
                                                key={option.value}
                                                value={option.value}
                                                className={clsx(
                                                    "flex items-center justify-between text-small-regular cursor-pointer py-4 border-b border-gray-200 last:border-b-0 px-8",
                                                    {
                                                        "bg-gray-50": option.value === value,
                                                    }
                                                )}
                                            >
                                                <div className="flex items-center gap-x-4">
                                                    <Radio checked={value === option.value}/>
                                                    <span className="text-base-regular text-slate-2">
                            {option.label}
                          </span>
                                                </div>
                                                <span className="justify-self-end text-slate-2">
                          {option.price}
                        </span>
                                            </RadioGroup.Option>
                                        )
                                    })
                                ) : (
                                    <div className="flex flex-col items-center justify-center px-4 py-8 text-gray-900">
                                        <Spinner/>
                                    </div>
                                )}
                            </RadioGroup>
                            {servicePoints.length > 0 && (
                                <div className="mt-4 px-8 py-4">
                                    <Listbox value={selectedServicePoint} onChange={setSelectedServicePoint}>
                                        {({open}) => (
                                            <>
                                                <Listbox.Label className="block text-sm font-medium text-slate-2">Choose
                                                    a Service Point</Listbox.Label>
                                                <div className="mt-2 relative">
              <span className="block relative">
                <Listbox.Button
                    className="block w-full pl-3 pr-10 py-2 text-left text-slate-1 bg-cbg rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selectedServicePoint ? `${selectedServicePoint.name} - ${formatDistance(selectedServicePoint.distance)}` : 'Select a service point'}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon className="w-5 h-5 text-slate-5"/>
                  </span>
                </Listbox.Button>
              </span>
                                                    <Listbox.Options className={`z-10 mt-2 relative w-full py-1 bg-white border border-gray-300 rounded-md shadow-lg ${open ? 'block' : 'hidden'}`}>
                                                        {servicePoints.map((servicePoint) => (
                                                            <Listbox.Option key={servicePoint.id} value={servicePoint} className={({ active, selected }) => `cursor-pointer select-none relative px-4 py-2 ${active ? 'bg-cbg text-slate-2' : 'text-slate-1'} ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                                {servicePoint.name} - {formatDistance(servicePoint.distance)}
                                                                <div className="text-xs text-slate-3">
                                                                    {`${servicePoint.address.street} ${servicePoint.address.zip_code} ${servicePoint.address.city}`}
                                                                </div>
                                                                <div className="text-xs text-slate-3 mt-1">
                                                                    {formatOpeningHours(servicePoint.opening_hours)}
                                                                </div>
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>

                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                            )}

                            <ErrorMessage
                                errors={errors}
                                name="soId"
                                render={({message}) => {
                                    return (
                                        <div className="pt-2 text-rose-500 text-small-regular">
                                            <span>{message}</span>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                    )
                }}
            />
        </StepContainer>
    )
}

export default Shipping
