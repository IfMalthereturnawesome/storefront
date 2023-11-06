"use client"

import {useIntersection} from "@lib/hooks/use-in-view"
import ProductTabs from "@modules/products/components/product-tabs"

import ProductInfo from "@modules/products/templates/product-info"
import React, {useRef} from "react"
import MobileActions from "../../modules/products/components/mobile-actions"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"
import ZoomableImageGallery from "@modules/products/components/image-gallary/ZoomableImageGallery";

import ProductFAQ from "@modules/products/components/product-faqs";

import MobileImageGallery from "@modules/products/components/image-gallary/MobileImageGallery";
import MediaQuery from "react-responsive";
import useBetterMediaQuery from "@/utils/useBetterMediaQuery";

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
    const productImageDirectory = `/images/products/${productHandle}/`;
    const productImagePaths = Array(8).fill(null).map((_, idx) => `${productImageDirectory}image${idx + 1}.jpg`);


    return (
        <>
            <div className={"relative z-[0] lg:z-[1]"}>
                <div
                    className={"bg-gradient-to-r from-cyan-2 to-cyan-1 dark:from-cyan-3 dark:to-cyan-1  h-full pb-8 md:pb-10 2xl:pb-12 lg:pb-4"}
                    ref={info}>
                    <div id={"buy-now"}
                         className="content-container__big  flex flex-col xl:flex-row xl:items-start xl:pt-6 pb-0 lg:pb-12 relative ">
                        {isDesktop && (
                            <div className="hidden lg:flex flex-col gap-y-8 w-full">
                                <ZoomableImageGallery images={productImagePaths}/>
                            </div>
                        )}
                        {isTabletAndSmaller && (
                            <div className={"block lg:hidden"}>
                                <MobileImageGallery images={productImagePaths}/>
                            </div>
                        )}

                        <div className="flex-shrink-0 w-full xl:max-w-[344px] medium:max-w-[490px] relative">
                            <div style={{minHeight: 'calc(100vh - 64px)'}}>
                                <div
                                    className="sticky top-0  py-8 px-4 lg:py-6 lg:px-14 flex flex-col gap-y-12"
                                >
                                    <ProductInfo product={product}/>
                                    <ProductTabs product={product}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductFAQ productFAQ={productFAQ} shippingFAQ={shippingFAQ} returnFAQ={returnFAQ}/>
                </div>

            </div>
            {isDesktop && (
                <MobileActions product={product} show={inView}/>
            )}

        </>

    )
}

export default ProductTemplate
