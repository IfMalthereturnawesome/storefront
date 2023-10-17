import {ProductProvider} from "@lib/context/product-context"
import React from "react"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"
import ProductInfoSection from "@/components/productPageTemplates/ProductInfoSection";
import ThinFeature from "@/components/sleepMask/ThinFeature";
import VideoAnimation from "@/components/sleepMask/VideoAnimation";
import ProductChoice from "@/components/sleepMask/ProductChoice";
import {SleepMaskCustomData, SleepMaskOneData} from "@/utils/productData";


type ProductsTemplate = {
    product: PricedProduct

}

const ProductSleepMaskOneCustomTemplate: React.FC<ProductsTemplate> = ({product}) => {


    return (
        <ProductProvider product={product}>

            {/*<div className="bg-mask-black">*/}
            {/*    <VideoAnimation*/}
            {/*        product={"Sleep Mask"}*/}
            {/*        description1={"Enter a new sleep era where total blackout meets unmatched comfort. "}*/}
            {/*        description2={"Custom-fit for your unique face. "}*/}
            {/*        description3={"Elevate your peak performance, no matter where you are and how you sleep."}*/}
            {/*    />*/}

            {/*    <div className="spacer"></div>*/}

            {/*</div>*/}
            <ProductChoice product1={SleepMaskCustomData} product2={SleepMaskOneData}
                           currentProductTitle="Sleep Mask One Custom"/>
            <ProductInfoSection product={product}/>
        </ProductProvider>
    )
}

export default ProductSleepMaskOneCustomTemplate
