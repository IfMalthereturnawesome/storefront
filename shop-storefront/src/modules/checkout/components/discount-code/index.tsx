import {medusaClient} from "@lib/config"
import {Cart} from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Trash from "@modules/common/icons/trash"
import {formatAmount, useCart, useUpdateCart} from "medusa-react"
import React, {useState, useMemo} from 'react';
import {useForm} from "react-hook-form"
import {useMutation} from "@tanstack/react-query"
import SecondaryButton from "@modules/common/components/button/SecondaryButton";
import {getLocaleForRegion} from "@/utils/hooks/localeUtils";

type DiscountFormValues = {
    discount_code: string
}

type DiscountCodeProps = {
    cart: Omit<Cart, "refundable_amount" | "refunded_total">
    extraStylesOnInput?: boolean
}

const DiscountCode: React.FC<DiscountCodeProps> = ({cart, extraStylesOnInput = false}) => {
    const {id, discounts, region} = cart
    const {mutate, isLoading} = useUpdateCart(id)
    const {setCart} = useCart()
    const locale = getLocaleForRegion(region.name) || "en-US";
    const {isLoading: mutationLoading, mutate: removeDiscount} = useMutation(
        (payload: { cartId: string; code: string }) => {
            return medusaClient.carts.deleteDiscount(payload.cartId, payload.code)
        }
    )
    const [showInput, setShowInput] = useState<boolean>(false);
    const toggleInputVisibility = () => setShowInput(!showInput);
    const appliedDiscount = useMemo(() => {
        if (!discounts || !discounts.length) {
            return undefined
        }

        switch (discounts[0].rule.type) {
            case "percentage":
                return `${discounts[0].rule.value}%`
            case "fixed":
                return `- ${formatAmount({
                    amount: discounts[0].rule.value,
                    region: region,
                    locale: locale
                })}`

            default:
                return "Free shipping"
        }
    }, [discounts, region])

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
    } = useForm<DiscountFormValues>({
        mode: "onSubmit",
    })

    const onApply = (data: DiscountFormValues) => {
        mutate(
            {
                discounts: [{code: data.discount_code}],
            },
            {
                onSuccess: ({cart}) => setCart(cart),
                onError: (error: any) => {
                    // Check if the error response has a 404 status code
                    if (error.response.status === 404) {
                        console.log("Discount code is not valid")
                        setError(
                            "discount_code",
                            {
                                message: "Discount code is not valid",
                            },
                            {
                                shouldFocus: true,
                            }
                        );
                    } else {
                        // Handle other error types or add more specific error messages if necessary
                        setError(
                            "discount_code",
                            {
                                message: "An error occurred. Please try again.",
                            },
                            {
                                shouldFocus: true,
                            }
                        );
                    }
                },
            }
        )
    }

    const onRemove = () => {
        removeDiscount(
            {cartId: id, code: discounts[0].code},
            {
                onSuccess: ({cart}) => {
                    setCart(cart)
                },
            }
        )
    }
    const containerClasses = extraStylesOnInput && showInput
        ? "p-6 bg-cyan-2 border border-slate-5 dark:border-amberA-12"
        : "p-6";


    return (
        <div className={containerClasses}>
            <div className="w-full  flex flex-col">
                <div className="mb-4">
                    <h3 className="text-base-regular text-slate-12">Discount code</h3>
                </div>
                <div className="text-small-regular">
                    {appliedDiscount ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <span className={"text-slate-12 "}>Code: </span>
                                <span className="font-semibold text-slate-12 ">{appliedDiscount}</span>
                            </div>
                            <div>
                                <button
                                    className="flex items-center gap-x-2 text-slate-11 "
                                    onClick={onRemove}
                                    disabled={isLoading}
                                >
                                    <Trash size={16}/>
                                    <span className="sr-only">Remove discount code from order</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {!showInput && !appliedDiscount ? (
                                <button
                                    onClick={toggleInputVisibility}
                                    className="text-gray-12 dark:text-slate-11 underline underline-offset-2 relative leading-5
                   hover:text-blue-600 dark:hover:text-cgreen transition-colors duration-200"
                                >
                                    Do you have a discount code?
                                </button>
                            ) : (
                                <form onSubmit={handleSubmit(onApply)} className="w-full">
                                    <div className="grid grid-cols-[1fr_80px] gap-x-2 text-slate-11">
                                        <Input
                                            label="Code"
                                            {...register("discount_code", {
                                                required: "Code is required",
                                            })}
                                            errors={errors}
                                        />

                                        <div>

                                            <SecondaryButton
                                                className="!min-h-[0] h-[46px] w-[80px] custom-button-neo__dark-black rounded-none"
                                                disabled={isLoading}
                                                isLoading={isLoading}
                                                variant={"secondary"}
                                            >
                                                Apply
                                            </SecondaryButton>

                                        </div>
                                        {errors.discount_code &&
                                            <span className="text-red-500 pt-2">{errors.discount_code.message}</span>}
                                    </div>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DiscountCode
