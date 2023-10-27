"use client"

import {ProductProvider} from "@lib/context/product-context"
import {useIntersection} from "@lib/hooks/use-in-view"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, {useRef} from "react"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"
import VideoAnimation from "@/components/sleepMask/VideoAnimation";
import usePageSettings from "@/utils/hooks/usePageSettings";
import ZoomableImageGallery from "@modules/products/components/image-gallary/ZoomableImageGallery";
import Image from 'next/image';


type ProductTemplateProps = {
    product: PricedProduct

}

const ProductTemplate: React.FC<ProductTemplateProps> = ({product}) => {
    const info = useRef<HTMLDivElement>(null)

    const inView = useIntersection(info, "0px")
    const productHandle = product?.handle || "sleep-mask-one";

    const productImageDirectory = `/images/products/${productHandle}/`;
    const productImagePaths = Array(8).fill(null).map((_, idx) => `${productImageDirectory}image${idx + 1}.jpg`);


    return (
        <ProductProvider product={product}>

            {/*<div className="bg-mask-black">*/}
            {/*    /!*<VideoAnimation/>*!/*/}

            {/*    /!*<div className="spacer"></div>*!/*/}

            {/*    /!*<ThinFeature/>*!/*/}

            {/*</div>*/}
            <div className={"bg-custom-white dark:bg-cyan-1 h-full"}>
                <div className="content-container__big flex flex-col small:flex-row small:items-start py-6 relative">
                    <div className="flex flex-col gap-y-8 w-full">
                        <ZoomableImageGallery images={productImagePaths}/>
                    </div>
                    <div className="flex-shrink-0 w-full small:max-w-[344px] medium:max-w-[490px] relative">
                        {/* Ensuring that sticky container has a larger height or equal to the scrolling container */}
                        <div style={{ minHeight: 'calc(100vh - 64px)' }}>
                            <div
                                className="sticky top-0 bg-custom-white dark:bg-cyan-1 py-8 px-4 md:py-6 md:px-14 flex flex-col gap-y-12"
                                ref={info}
                            >
                                <ProductInfo product={product} />
                                <ProductTabs product={product}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-container bg-custom-white dark:bg-cyan-1 px-6 small:px-8">
                    <RelatedProducts product={product}/>
                </div>
                <MobileActions product={product} show={!inView}/>
            </div>
        </ProductProvider>
    )
}

export default ProductTemplate