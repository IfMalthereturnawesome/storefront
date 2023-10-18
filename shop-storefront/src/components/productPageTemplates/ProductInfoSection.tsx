"use client"

import {useIntersection} from "@lib/hooks/use-in-view"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, {useRef} from "react"
import MobileActions from "../../modules/products/components/mobile-actions"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"
import ZoomableImageGallery from "@modules/products/components/image-gallary/ZoomableImageGallery";


type ProductTemplateProps = {
    product: PricedProduct

}

const ProductTemplate: React.FC<ProductTemplateProps> = ({product}) => {
    const info = useRef<HTMLDivElement>(null)

    const inView = useIntersection(info, "0px")

    const productImageDirectory = `/images/products/${product.handle}/`;
    const productImagePaths = Array(8).fill(null).map((_, idx) => `${productImageDirectory}image${idx + 1}.jpg`);


    return (


            <div className={"bg-custom-white dark:bg-cyan-1 h-full pb-14 "}>
                <div id={"buy-now"} className="content-container__big  flex flex-col small:flex-row small:items-start py-6 relative ">
                    <div className="flex flex-col gap-y-8 w-full">
                        <ZoomableImageGallery images={productImagePaths}/>
                    </div>
                    <div className="flex-shrink-0 w-full small:max-w-[344px] medium:max-w-[490px] relative">
                        <div style={{ minHeight: 'calc(100vh - 64px)' }}>
                            <div
                                className="sticky top-0 bg-custom-white dark:bg-cyan-1 py-8 px-14 flex flex-col gap-y-12"
                                ref={info}
                            >
                                <ProductInfo product={product} />
                                <ProductTabs product={product}/>
                            </div>
                        </div>
                    </div>
                </div>

                <MobileActions product={product} show={!inView}/>
            </div>

    )
}

export default ProductTemplate
