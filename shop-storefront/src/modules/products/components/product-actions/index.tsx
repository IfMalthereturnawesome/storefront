import {useProductActions} from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"
import {useRegions} from "medusa-react";
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, {useMemo, useState} from "react"
import {useEffect} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import BuyNowButton from "@/components/elements/BuyNowButton";
import SizeGuideModal from "@modules/products/components/size-guide/SizeGuide";
import Image from "next/image";
import SplitType from 'split-type';
import NativeSelect from "@modules/common/components/native-select";
import {useStore} from "@lib/context/store-context";
import {LineItem} from "@medusajs/medusa";


type ProductActionsProps = {
    product: PricedProduct,

}

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}


const ProductActions: React.FC<ProductActionsProps> = ({product}) => {
    const {updateOptions, addToCart, options, inStock, variant, quantity,increaseQuantity, decreaseQuantity,disabled} =
        useProductActions()
    const { updateItem } = useStore()
    const price = useProductPrice({id: product.id!, variantId: variant?.id})
    const colorOptionId = product.options.find(opt => opt.title.toLowerCase() === "color")?.id;
    const sizeOptionId = product.options.find(opt => opt.title.toLowerCase() === "size")?.id;

    const {regions} = useRegions();

    //  Get currect country
    const countryCode = useMemo(() => {
        const countryName = regions?.[0]?.countries?.[0]?.name?.toLowerCase() || "eu";
        return countryName.charAt(0).toUpperCase() + countryName.slice(1);
    }, [regions]);


    const isColorSelected = !!options[colorOptionId];
    const isSizeSelected = !!options[sizeOptionId];
    const isBothSelected = isColorSelected && isSizeSelected;
    const [isModalOpen, setModalOpen] = useState(false);

    const selectedPrice = useMemo(() => {
        const {variantPrice, cheapestPrice} = price

        return variantPrice || cheapestPrice || null
    }, [price])




    useEffect(() => {
        let ctx = gsap.context(() => {
        if (countryCode == "Eu") {
            // Don't run the animation if countryCode isn't available yet
            return;
        }

        const split = new SplitType('.shipping-text', {types: 'lines, words, chars'});
        gsap.set(split.chars, {opacity: 0});  // Initially hide the second part of the text

        gsap.from(split.chars, {
            opacity: 0,
            x: -10,
            stagger: 0.03,
            ease: 'power2.inOut',

            scrollTrigger: {
                trigger: '.triggerMe',
                start: 'top 80%',
                end: 'top 50%',
                onEnter: () => {
                    gsap.to('.truck-icon', {
                        x: '145px',
                        ease: 'none',
                    });
                    gsap.to(split.chars, {opacity: 1, x: 0, stagger: 0.03});  // Reveal the second part of the text
                }
            },
        });
        });

        return () => ctx.revert(); // <-- CLEANUP!

    }, [countryCode]);


    const handleQuantityChange = (event) => {
        const selectedQuantity = parseInt(event.target.value, 10);
        if (selectedQuantity !== quantity) {
            // Using the logic in the context to handle quantity changes
            if (selectedQuantity > quantity) {
                for (let i = 0; i < (selectedQuantity - quantity); i++) {
                    increaseQuantity();
                }
            } else {
                for (let i = 0; i < (quantity - selectedQuantity); i++) {
                    decreaseQuantity();
                }
            }
        }
    };

    const maxDisplayQuantity = (variant && variant.inventory_quantity > 0)
        ? variant.inventory_quantity
        : 10;


    return (
        <div className="flex flex-col  gap-y-2 ">
            {product.collection && (
                <Link
                    href={`/collections/${product.collection.handle}`}
                    className="text-small-regular text-slate-11"
                >
                    {product.collection.title}
                </Link>
            )}
            <h3 className="text-3xl font-bold text-slate-12">{product.title}</h3>

            <p className="text-base-regular text-slate-12 ">{product.description}</p>

            {product.variants.length > 1 && (
                <div className="my-8 flex flex-col gap-y-6 text-slate-12  ">
                    {(product.options || []).map((option) => {
                        const additionalElem = option.title.toLowerCase() === "size" ? (
                            <button
                                className={"p-0 m-0 leading-5 text-center underline underline-offset-2 bg-transparent cursor-pointer transition duration-150 text-sm text-slate-12 hover:text-black dark:text-amberA-12 dark:hover:text-amber-11"}
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

            {selectedPrice && (
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-baseline gap-x-4 text-slate-12">
                        <span
                            className={clsx("font-bold text-base", {
                                "text-rose-600": selectedPrice.price_type === "sale",
                            })}
                        >
                            {selectedPrice.calculated_price}
                        </span>
                        {selectedPrice.price_type === "sale" && (
                            <>
                                <span className="line-through">
                                    {selectedPrice.original_price}
                                </span>
                                <span className="text-rose-600">
                                    -{selectedPrice.percentage_diff}%
                                </span>
                            </>
                        )}
                    </div>
                    {isBothSelected && (
                        <div className="flex items-center gap-x-2 text-base-semi">
                            <label htmlFor="quantity" className="mr-2">Quantity:</label>
                            <NativeSelect
                                value={quantity}
                                onChange={handleQuantityChange}
                                placeholder={"Select quantity"}
                                className="max-h-[45px] w-fit"
                                disabled={disabled || !inStock}
                            >
                                {Array.from({ length: maxDisplayQuantity }).map((_, i) => {
                                    const value = i + 1;
                                    return (
                                        <option value={value} key={i}>
                                            {value}
                                        </option>
                                    );
                                })}
                            </NativeSelect>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-3 mb-1 flex triggerMe items-center text-slate-12 text-sm">
    <span className="free-shipping-text inline-block">
        Free
    </span>
                <div className="truck-icon ml-2">
                    <Image src={"/images/free-shipping-icon.svg"} alt={"Free shipping icon"} width={22} height={22}
                           className={"dark:invert"}/>
                </div>
                <span className="shipping-text inline-block -ml-6">
        shipping to {countryCode}
    </span>
            </div>




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
