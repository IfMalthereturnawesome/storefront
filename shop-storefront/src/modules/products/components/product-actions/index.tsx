import {useProductActions} from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"

import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, {useMemo, useState} from "react"

import BuyNowButton from "@/components/elements/BuyNowButton";
import SizeGuideModal from "@modules/products/components/size-guide/SizeGuide";

type ProductActionsProps = {
    product: PricedProduct
}

const ProductActions: React.FC<ProductActionsProps> = ({product}) => {
    const {updateOptions, addToCart, options, inStock, variant} =
        useProductActions()

    const price = useProductPrice({id: product.id!, variantId: variant?.id})
    const colorOptionId = product.options.find(opt => opt.title.toLowerCase() === "color")?.id;
    const sizeOptionId = product.options.find(opt => opt.title.toLowerCase() === "size")?.id;

    const isColorSelected = !!options[colorOptionId];
    const isSizeSelected = !!options[sizeOptionId];
    const isBothSelected = isColorSelected && isSizeSelected;
    const [isModalOpen, setModalOpen] = useState(false);

    const selectedPrice = useMemo(() => {
        const {variantPrice, cheapestPrice} = price

        return variantPrice || cheapestPrice || null
    }, [price])

    return (
        <div className="flex flex-col gap-y-2">
            {product.collection && (
                <Link
                    href={`/collections/${product.collection.handle}`}
                    className="text-small-regular text-slate-2"
                >
                    {product.collection.title}
                </Link>
            )}
            <h3 className="text-3xl font-bold text-slate-1">{product.title}</h3>

            <p className="text-base-regular text-slate-1 ">{product.description}</p>

            {product.variants.length > 1 && (
                <div className="my-8 flex flex-col gap-y-6 text-slate-1  ">
                    {(product.options || []).map((option) => {
                        const additionalElem = option.title.toLowerCase() === "size" ? (
                            <button
                                className={"p-0 m-0 leading-5 text-center underline bg-transparent cursor-pointer text-sm text-neutral-800"}
                                onClick={() => setModalOpen(true)}
                            >
                                Size Guide
                            </button>
                        ) : null;

                        return (
                            <div key={option.id}>
                                <OptionSelect
                                    option={option}
                                    current={options[option.id]}
                                    updateOption={updateOptions}
                                    title={option.title}
                                    additionalElement={additionalElem}
                                />
                                {option.title.toLowerCase() === "size" &&
                                    <SizeGuideModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>}
                            </div>
                        );
                    })}
                </div>
            )}


            <SizeGuideModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>
            <div className="mb-4">
                {selectedPrice ? (
                    <div className="flex flex-col text-slate-1">
            <span
                className={clsx("text-slate-1 font-bold text-base", {
                    "text-rose-600": selectedPrice.price_type === "sale",
                })}
            >
              {selectedPrice.calculated_price}
            </span>

                        {selectedPrice.price_type === "sale" && (
                            <>
                                <p>
                                    <span className="text-slate-1">Original: </span>
                                    <span className="line-through">
                    {selectedPrice.original_price}
                  </span>
                                </p>
                                <span className="text-rose-600">
                  -{selectedPrice.percentage_diff}%
                </span>
                            </>
                        )}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>


            {/*<Button onClick={addToCart} className={"text-md justify-start"}>*/}
            {/*  {!inStock ? "Out of stock" : "Add to cart"}*/}
            {/*    <ArrowLongRightIcon className={"w-6 h-6 ml-2 "}/>*/}
            {/*</Button>*/}
            <BuyNowButton
                title={isBothSelected ? "Add to cart" : "Choose color and size"}
                onClick={addToCart}
                message={"Add to cart"}
                disabled={!isBothSelected}
            />


        </div>
    )
}

export default ProductActions
