import {ProductProvider} from "@lib/context/product-context"
import React from "react"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"
import ProductInfoSection from "@/components/productPageTemplates/ProductInfoSection";
import VideoAnimation from "@/components/sleepMask/VideoAnimation";
import ProductChoice from "@/components/sleepMask/ProductChoice";
import {SleepMaskCustomData, SleepMaskOneData} from "@/utils/productData";
import FaceStory from "@/components/sleepMask/FaceStory";


type ProductsTemplate = {
    product: PricedProduct

}

const ProductSleepMaskOneTemplate: React.FC<ProductsTemplate> = ({product}) => {


    return (
        <ProductProvider product={product}>

            <div className="bg-mask-black">
                <VideoAnimation
                    product={"Sleep Mask One"}
                    description1={"Enter a new sleep era where total blackout meets unmatched comfort. "}
                    // description2={"Custom-fit for your unique face. "}
                    description2={"Tailored for all face shapes and sizes. "}
                    description3={"Elevate your peak performance, no matter where you are and how you sleep."}
                />

            </div>

            <ProductChoice product1={SleepMaskOneData} product2={SleepMaskCustomData}
                           currentProductTitle="Sleep Mask One"/>
            <ProductInfoSection product={product}/>


        </ProductProvider>
    )
}

export default ProductSleepMaskOneTemplate
