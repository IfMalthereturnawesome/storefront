import {RadioGroup} from "@headlessui/react"
import {ErrorMessage} from "@hookform/error-message"
import {useCheckout} from "@lib/context/checkout-context"
import {Address, Cart} from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import {formatAmount, useCart, useCartShippingOptions} from "medusa-react"
import React, {useEffect, useLayoutEffect, useMemo} from "react"
import {Controller, useForm} from "react-hook-form"
import StepContainer from "../step-container"
import {medusaClient} from "@lib/config";
import {Listbox} from '@headlessui/react';
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import Image from "next/image";
import {getLocaleForRegion} from "@/utils/hooks/localeUtils";
import Button from "@modules/common/components/button";


type ShippingOption = {
    value?: string;
    label?: string;
    price: string;
    metadata?: {
        carrier?: string;
        [key: string]: any; // This allows for other metadata keys if needed.
    };
}


type ShippingProps = {
    cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

type ShippingFormProps = {
    soId: string
}

const Shipping: React.FC<ShippingProps> = ({cart}) => {
    const [servicePoints, setServicePoints] = React.useState([]);
    const [selectedServicePoint, setSelectedServicePoint] = React.useState<{
        name: string,
        address: string,
        distance: string
    } | null>(null);
    const [loadingServicePoints, setLoadingServicePoints] = React.useState(false); // New state for loading service points
    const [initialFetchDone, setInitialFetchDone] = React.useState(false); // New state for initial fetch
    const [isEditMode, setIsEditMode] = React.useState(true);

    const {addShippingMethod, setCart} = useCart()
    const {
        control,
        setError,
        formState: {errors},
    } = useForm<ShippingFormProps>({
        defaultValues: {
            soId: cart.shipping_methods?.[1]?.shipping_option_id,
        },
    })
    const locale = getLocaleForRegion(cart?.region?.name) || "en-US";
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
        let adjustedCarrier = carrier;

        // Check if the carrier value is 'daoShop'
        if (carrier === 'daoShop') {
            adjustedCarrier = 'dao';  // Adjust the carrier value
        }

        const endpoint = `https://api.homerunner.com/v3/servicepoints/${adjustedCarrier}?country_code=${address.country_code}&street=${address.address_1}&zip_code=${address.postal_code}&city=${address.city}&limit=10`;
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

    const fetchServicePointsIfNecessary = async (selectedOptionValue: string, shippingOptions: typeof shipping_options) => {
        if (!shippingOptions) return;
        const selectedOption = shipping_options.find(option => option.id === selectedOptionValue);

        if (selectedOption?.metadata?.servicePoint === 'true') {
            setLoadingServicePoints(true);
            try {
                const fetchedServicePoints = await fetchServicePoints(cart.shipping_address, selectedOption.metadata.carrier as string);
                setServicePoints(fetchedServicePoints);

                if (fetchedServicePoints.length > 0) {
                    setSelectedServicePoint({
                        name: fetchedServicePoints[0].name,
                        address: fetchedServicePoints[0].address,
                        distance: fetchedServicePoints[0].distance
                    });
                }
            } catch (error) {
                console.error("Failed to fetch service points:", error);

            } finally {
                setLoadingServicePoints(false);
                setInitialFetchDone(true);
            }
        } else {
            setServicePoints([]);
            setSelectedServicePoint(null);
            setInitialFetchDone(true);
        }
    };

    const handleChange = async (value: string, fn: (value: string) => void) => {
        submitShippingOption(value);
        fn(value);
        await fetchServicePointsIfNecessary(value, shipping_options); // Pass shipping_options as an argument
    };

    useEffect(() => {


        const defaultOption = cart.shipping_methods?.[0]?.shipping_option_id;


        if (defaultOption && shipping_options) {
            fetchServicePointsIfNecessary(defaultOption, shipping_options);
        }
    }, [cart, shipping_options]);


    useEffect(() => {
        if (selectedServicePoint) {
            confirmSelection();
        }
    }, [selectedServicePoint]);


    const confirmSelection = () => {
        medusaClient.carts.update(cart.id, {
            shipping_address: {
                metadata: {
                    ...cart.shipping_address.metadata,
                    selectedServicePoint: selectedServicePoint
                }
            },
        }).then(r => console.log("Updated cart with selected service point", r));
    };

    // Memoized shipping method options
    const shippingMethods: ShippingOption[] = useMemo(() => {
        if (shipping_options && cart?.region) {
            return shipping_options?.map((option) => ({
                value: option.id,
                label: option.name,
                metadata: option.metadata,

                price: formatAmount({
                    amount: option.amount || 0,
                    region: cart.region,
                    locale: locale
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

    function getCarrierImage(carrier) {
        switch (carrier) {
            case 'dao':
                return '/images/shippingProviders/dao.svg';
            case 'daoShop':
                return '/images/shippingProviders/dao-shop.svg';
            case 'instabox':
                return '/images/shippingProviders/instabox.svg';
            case 'bring':
                return '/images/shippingProviders/bring.svg';
            case 'colis':
                return '/images/shippingProviders/colis-prive.svg';
            case 'dhl':
                return '/images/shippingProviders/dhl.svg';
            case 'mondialrelay':
                return '/images/shippingProviders/mondialrelay.svg';
            case 'posti':
                return '/images/shippingProviders/posti-logo.svg';
            case 'hermes':
                return '/images/shippingProviders/hermes.svg';
            case 'postnl':
                return '/images/shippingProviders/postnl.svg';

            default:
                return '/images/shippingProviders/delivery-truck.svg';
        }
    }


    return (
        <StepContainer
            index={sameBilling ? 2 : 3}
            title="Delivery"
            closedState={
                <div className="px-4 sm:px-8 pb-4 sm:pb-8 text-xs sm:text-small-regular text-slate-11">
                    <p>Enter your address to see available delivery options.</p>
                </div>
            }
        >   {isEditMode ? (
            <div className={"px-3 xs:px-6 sm:px-8 pb-8"}>
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
                                                        "flex items-center justify-between text-small-regular cursor-pointer py-3 px-3 2xs:py-2 2xs:px-4 xs:py-4 xs:px-8",
                                                        {
                                                            "border-b border-t border-x border-slate-12 dark:border-cyan-10": option.value === value, // Solid border for checked
                                                            "border-b border-t border-x border-slate-3 dark:border-slate-3 ": option.value !== value, // Subtle border for unchecked
                                                            "bg-cyan-1": option.value === value,
                                                        }
                                                    )}
                                                >
                                                    <div className="flex  items-center gap-x-2 sm:gap-x-4">
                                                        <Radio checked={value === option.value}/>
                                                        <Image src={getCarrierImage(option.metadata?.carrier)}
                                                               alt={option.metadata?.carrier || 'default'} width={128}
                                                               height={128}
                                                               className="w-6 h-6 3xs:w-8 3xs:h-8 2xs:w-12 2xs:h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 2xl:w-20 2xl:h-20 mr-2 object-contain object-center "/>
                                                        <span className={clsx("text-small-regular sm:text-base-regular", {
                                                            "text-slate-12 font-semibold": option.value === value, // Text color for checked
                                                            "text-slate-11": option.value !== value, // Text color for unchecked
                                                        })}>
            {option.label}
        </span>
                                                    </div>
                                                    <span className={clsx("justify-self-end", {
                                                        "text-slate-12 font-semibold": option.value === value, // Text color for checked
                                                        "text-slate-11": option.value !== value, // Text color for unchecked
                                                    })}>
        {option.price}
    </span>
                                                </RadioGroup.Option>
                                            )
                                        })
                                    ) : (
                                        <div
                                            className="flex flex-col items-center justify-center px-4 py-8 text-slate-12">
                                            <Spinner/>
                                        </div>
                                    )}
                                </RadioGroup>
                                {
                                    loadingServicePoints ? (
                                        <div className="flex flex-col items-center justify-center px-4 py-8 text-slate-12">
                                            <Spinner/>
                                        </div>
                                    ) : (
                                        servicePoints && servicePoints.length > 0 && (
                                            <div className="mt-4 px-0  py-4">
                                                <Listbox value={selectedServicePoint} onChange={setSelectedServicePoint}>
                                                    {({ open }) => (
                                                        <>
                                                            <Listbox.Label
                                                                className="block text-xs sm:text-sm font-medium text-slate-12">
                                                                Select a Service Point
                                                            </Listbox.Label>
                                                            <div
                                                                className="mt-2 relative group">
                <span className="block relative">
                  <Listbox.Button
                      className={`block w-full pl-3 pr-10 py-3 text-left custom-button-neo-dark bg-white text-slate-12 text-xs sm:text-sm group-hover:bg-custom-white group-hover:text-slate-12`}>
                    {selectedServicePoint ? `${selectedServicePoint.name} - ${formatDistance(selectedServicePoint.distance)}` : 'Select a service point'}
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="w-5 h-5 text-slate-10"/>
                    </span>
                  </Listbox.Button>
                </span>
                                                                <Listbox.Options
                                                                    className={`z-10 mt-2 w-full py-1 bg-custom-white dark:bg-cyan-2 border border-slate-5 rounded-md shadow-lg ${open ? 'block' : 'hidden'}`}>
                                                                    {servicePoints.map((servicePoint) => (
                                                                        <Listbox.Option
                                                                            key={servicePoint.id}
                                                                            value={servicePoint}
                                                                            className={({ active, selected }) => `cursor-pointer select-none relative px-3 sm:px-4 py-2 border-b border-slate-5 text-xs sm:text-sm ${active ? ' text-slate-12' : 'text-slate-11'} ${selected ? 'font-semibold' : 'font-normal'}`}
                                                                        >
                                                                            {servicePoint.name} - {formatDistance(servicePoint.distance)}
                                                                            <div className="text-2xs sm:text-xs">
                                                                                {`${servicePoint.address.street} ${servicePoint.address.zip_code} ${servicePoint.address.city}`}
                                                                            </div>
                                                                            <div className="text-2xs sm:text-xs mt-1">
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
                                        )
                                    )
                                }

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
                <Button
                    className="max-w-[200px] mt-6"
                    onClick={() => setIsEditMode(false)}
                >Continue to Payment
                </Button>

            </div>
        ) : (
            <div className="p-3 sm:p-8">
                <div className="flex flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-start gap-x-6 sm:gap-x-8">
                        <div className="bg-teal-9 rounded-full min-w-[24px] h-6 flex items-center justify-center text-slate-1 text-small-regular">
                            ✓
                        </div>

                        <div>
                            <Image
                                src={getCarrierImage(cart?.shipping_methods?.[0]?.shipping_option.metadata?.carrier)}
                                alt={cart?.shipping_methods?.[0]?.shipping_option.metadata?.carrier as string || 'default'}
                                width={64}
                                height={64}
                                className="w-6 h-6 3xs:w-8 3xs:h-8 2xs:w-12 2xs:h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 2xl:w-20 2xl:h-20 object-contain"/>
                            <span
                                className="text-slate-12  text-xs sm:text-xs md:text-md font-semibold block sm:block"> {cart?.shipping_methods?.[0]?.shipping_option.name}</span>
                            <p className="text-slate-12 text-xs sm:text-xs block">{
                                // @ts-ignore
                                shippingMethods.find(method => method.value === cart?.shipping_methods?.[0]?.shipping_option_id)?.price
                            }</p>

                            {selectedServicePoint && (
                                <div className="mt-2 text-xs text-slate-12">
                                    <p className={"font-semibold"}>{selectedServicePoint.name}</p>
                                    {/* @ts-ignore */}
                                    <p>{selectedServicePoint.address.street}, {selectedServicePoint.address.city}, {selectedServicePoint.address.zip_code}, {selectedServicePoint.address.country_code}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditMode(true)}
                        className="text-xs text-slate-11 self-start sm:self-center"
                    >
                        Edit
                    </button>
                </div>
            </div>

        )}
        </StepContainer>
    )
}

export default Shipping
