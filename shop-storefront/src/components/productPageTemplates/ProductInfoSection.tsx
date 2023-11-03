"use client"

import {useIntersection} from "@lib/hooks/use-in-view"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, {useEffect, useRef} from "react"
import MobileActions from "../../modules/products/components/mobile-actions"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"
import ZoomableImageGallery from "@modules/products/components/image-gallary/ZoomableImageGallery";
import ProductFaqs from "@modules/products/components/product-faqs";
import ProductFAQ from "@modules/products/components/product-faqs";

type ProductTemplateProps = {
    product: PricedProduct
    productFAQ: { question: string; answer: string }[]
    shippingFAQ: { question: string; answer: string }[]
    returnFAQ: { question: string; answer: string }[]

}

const ProductTemplate: React.FC<ProductTemplateProps> = ({product, productFAQ, shippingFAQ, returnFAQ}) => {
    const info = useRef<HTMLDivElement>(null)

    const inView = useIntersection(info, "0px")
    const productHandle = product?.handle || "sleep-mask-one";

    const productImageDirectory = `/images/products/${productHandle}/`;
    const productImagePaths = Array(8).fill(null).map((_, idx) => `${productImageDirectory}image${idx + 1}.jpg`);

    // Combined product FAQ and shipping FAQ


    return (

        <>
            <div className={"relative z-0 lg:z-[1]"}>
                <div
                    className={"bg-gradient-to-r from-cyan-2 to-cyan-1 dark:from-cyan-3 dark:to-cyan-1  h-full pb-8 md:pb-10 2xl:pb-12 lg:pb-4"}
                    ref={info}>
                    <div id={"buy-now"}
                         className="content-container__big  flex flex-col xl:flex-row xl:items-start xl:pt-6 pb-0 lg:pb-12 relative ">
                        <div className="flex flex-col gap-y-8 w-full">
                            <ZoomableImageGallery images={productImagePaths}/>

                        </div>

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

            <MobileActions product={product} show={inView}/>

            </>

    )
}

export default ProductTemplate
