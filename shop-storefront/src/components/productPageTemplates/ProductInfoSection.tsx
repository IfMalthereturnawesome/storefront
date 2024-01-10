"use client"

import {useIntersection} from "@lib/hooks/use-in-view"
import ProductTabs from "@modules/products/components/product-tabs"

import ProductInfo from "@modules/products/templates/product-info"
import React, {useRef, useEffect, useState} from "react"
import MobileActions from "../../modules/products/components/mobile-actions"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"
import ZoomableImageGallery from "@modules/products/components/image-gallary/ZoomableImageGallery";
import ProductFAQ from "@modules/products/components/product-faqs";
import MobileImageGallery from "@modules/products/components/image-gallary/MobileImageGallery";
import useBetterMediaQuery from "@/utils/useBetterMediaQuery";
import PaymentOptionsIcons from "@/components/ecommerceElements/PaymentOptionsIcons";
import MoneyBackGuarantee from "@/components/ecommerceElements/MoneyBackGuarantee";
import {TestimonialsBannerSmall} from "@/components/reviews/TestimonialsBanner";

type ProductTemplateProps = {
    product: PricedProduct
    productFAQ: { question: string; answer: string }[]
    shippingFAQ: { question: string; answer: string }[]
    returnFAQ: { question: string; answer: string }[]

}

const ProductTemplate: React.FC<ProductTemplateProps> = ({product, productFAQ, shippingFAQ, returnFAQ}) => {
    const info = useRef<HTMLDivElement>(null)


    const isDesktop = useBetterMediaQuery('(min-width: 1024px)');
    const isTabletAndSmaller = useBetterMediaQuery('(max-width: 1023px)');

    const inView = useIntersection(info, "0px")
    const productHandle = product?.handle || "sleep-mask-one";
    const [selectedColor, setSelectedColor] = useState("Warm Grey");
    const productImageDirectory = `/images/products/${productHandle}/`;
    const [imagePaths, setImagePaths] = useState([]);



    const handleColorChange = (color) => {
        setSelectedColor(color);

    };


    useEffect(() => {

        if (selectedColor) {
            const basePath = `${productImageDirectory}${selectedColor}/`;
            const updatedPaths = Array(8).fill(null).map((_, idx) => `${basePath}image${idx + 1}.jpg`);

            setImagePaths(updatedPaths);

        }
    }, [selectedColor, productImageDirectory]);


    return (
        <>
            <div className={"relative z-[0] lg:z-[1]"}>
                <div
                    className={"bg-gradient-to-r from-cyan-2 to-cyan-1 dark:from-cyan-3 dark:to-cyan-1  h-full pb-8 md:pb-10 2xl:pb-12 lg:pb-4"}
                    ref={info}>
                    <div id={"buy-now"}
                         className="content-container__big  flex flex-col xl:flex-row xl:items-start pb-0 lg:pb-12 relative ">
                        {isDesktop && (
                            <div className="hidden lg:flex flex-col gap-y-8 w-full">
                                <ZoomableImageGallery key={selectedColor} images={imagePaths}/>

                            </div>
                        )}
                        {isTabletAndSmaller && (
                            <div className={"block lg:hidden"}>
                                <MobileImageGallery images={imagePaths}/>
                            </div>
                        )}

                        <div className="flex-shrink-0 w-full xl:max-w-[344px] medium:max-w-[490px] relative">
                            {/* Adjust the minHeight to ensure it fits within the viewport */}
                            <div style={{minHeight: 'calc(100vh - 64px)'}} className="lg:sticky top-0">
                                <div
                                    className="py-0  sm:py-4 px-4 lg:py-6 lg:px-8 flex flex-col "
                                >
                                    <ProductInfo product={product} onColorChange={handleColorChange}/>
                                    <div className={"pt-2 pb-6"}>
                                    <PaymentOptionsIcons />
                                    </div>
                                    <MoneyBackGuarantee />
                                    <TestimonialsBannerSmall />

                                </div>
                            </div>
                        </div>

                    </div>
                    <ProductTabs product={product}/>
                    <ProductFAQ productFAQ={productFAQ} shippingFAQ={shippingFAQ} returnFAQ={returnFAQ}/>
                </div>

            </div>
            {isTabletAndSmaller && (
                <MobileActions product={product} show={inView} onColorChange={handleColorChange}/>
            )}

        </>

    )
}

export default ProductTemplate
