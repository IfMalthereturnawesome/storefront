import {ProductProvider} from "@lib/context/product-context"
import React from "react"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"
import ProductInfoSection from "@/components/productPageTemplates/ProductInfoSection";


type ProductsTemplate = {
    product: PricedProduct

}

const ProductSleepMaskOneTemplate: React.FC<ProductsTemplate> = ({product}) => {


    return (
        <ProductProvider product={product}>

            {/*<div className="bg-mask-black">*/}
            {/*    /!*<VideoAnimation/>*!/*/}

            {/*    /!*<div className="spacer"></div>*!/*/}

            {/*    /!*<ThinFeature/>*!/*/}

            {/*</div>*/}
            <ProductInfoSection product={product}/>
        </ProductProvider>
    )
}

export default ProductSleepMaskOneTemplate
