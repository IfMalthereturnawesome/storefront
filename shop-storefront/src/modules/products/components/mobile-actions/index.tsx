import {Dialog, Transition} from "@headlessui/react"
import {useProductActions} from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import useToggleState from "@lib/hooks/use-toggle-state"
import Button from "@modules/common/components/button"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"
import clsx from "clsx"
import React, {Fragment, useMemo} from "react"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"
import ColorOptionSelect from "@modules/products/components/option-select/ColorOptionSelect";
import SizeOptionSelect from "@modules/products/components/option-select/SizeOptionSelect";


type MobileActionsProps = {
    product: PricedProduct
    show: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({product, show}) => {
    const {variant, addToCart, options, inStock, updateOptions} =
        useProductActions()
    const {state, open, close} = useToggleState()

    const price = useProductPrice({id: product.id!, variantId: variant?.id})

    const selectedPrice = useMemo(() => {
        const {variantPrice, cheapestPrice} = price

        return variantPrice || cheapestPrice || null
    }, [price])


    return (
        <>
            <div
                id={"mobile-actions"}
                className={clsx("lg:hidden fixed z-[0] inset-x-0 bottom-0", {
                    "pointer-events-none": !show,
                })}
            >
                <Transition
                    as={Fragment}
                    show={show}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0 transform translate-y-1/2 delay-300"
                    enterTo="opacity-100 transform translate-y-0 delay-300"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100 transform translate-y-0 "
                    leaveTo="opacity-0 transform translate-y-1/2"
                >
                    <div
                        className="bg-white dark:bg-black flex flex-col gap-y-3 justify-center items-center text-large-regular p-4 h-full mx-auto w-[100vw] border-t border-gray-200">
                        <div className="flex items-center gap-x-2">
                            <span>{product.title}</span>
                            <span>—</span>
                            {selectedPrice ? (
                                <div className="flex items-end gap-x-2 text-slate-12">
                                    {selectedPrice.price_type === "default" && (
                                        <p>
                      <span className="line-through text-small-regular">
                        {selectedPrice.original_price}
                      </span>
                                        </p>
                                    )}
                                    <span
                                        className={clsx({
                                            "text-rose-600": selectedPrice.price_type === "default",
                                        })}
                                    >
                    {selectedPrice.calculated_price}
                  </span>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 w-full gap-x-4">
                            <Button onClick={open} myVariant="secondary">
                                <div
                                    className="flex items-center justify-between w-full capitalize text-xs text-slate-11">
                  <span>
                    {variant
                        ? Object.values(options).join(" / ")
                        : "Select Options"}
                  </span>
                                    <ChevronDown/>
                                </div>
                            </Button>
                            <Button onClick={addToCart}>
                                {!inStock ? "Out of stock" : "Add to cart"}
                            </Button>
                        </div>
                    </div>
                </Transition>
            </div>
            <Transition appear show={state} as={Fragment}>
                <Dialog as="div" className="relative z-[75]" onClose={close}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm"/>
                    </Transition.Child>

                    <div className="fixed bottom-0 inset-x-0">
                        <div className="flex min-h-full h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Panel
                                    className="w-full h-full transform overflow-hidden text-left flex flex-col gap-y-3">
                                    <div className="w-full flex justify-end pr-6">
                                        <button
                                            onClick={close}
                                            className="bg-cyan-1 w-12 h-12 rounded-full text-slate-12 flex justify-center items-center"
                                        >
                                            <X/>
                                        </button>
                                    </div>
                                    <div className="bg-cyan-1 px-4 py-6 relative">
                                        {product.variants.length > 1 && (
                                            <div
                                                className="lg:flex flex-col gap-y-6 max-h-[75vh] overflow-x-hidden overflow-y-auto relative scroll-shadows">
                                                {(product.options || []).map((option) => {
                                                    return (
                                                        <div key={option.id}>
                                                            {option.title.toLowerCase() === "color" && (
                                                                <ColorOptionSelect
                                                                    option={option}
                                                                    current={options[option.id]}
                                                                    updateOption={updateOptions}
                                                                    title={option.title}
                                                                />
                                                            )}

                                                            {option.title.toLowerCase() === "size" && (
                                                                <SizeOptionSelect
                                                                    option={option}
                                                                    current={options[option.id]}
                                                                    updateOption={updateOptions}
                                                                    title={option.title}
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default MobileActions
