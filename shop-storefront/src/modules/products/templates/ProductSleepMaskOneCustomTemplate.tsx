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
const productFAQ = [

    {
        question: "Can I wash the sleep mask? If so, how do I wash it?",
        answer: "Yes, you can absolutely wash it! To clean the mask, use warm water, but don't exceed 55 degrees Celsius, and a gentle soap of your choice. Afterwards, hang the mask by its strap to dry."
    },
    {
        question: "What materials is the sleep mask made of?",
        answer: "The sleep mask is crafted from high-quality, breathable fabric to ensure maximum comfort during sleep. The mask is made from Nylon(69%), Elastane(20%), and HR-foam(11%). The product is exclusively made from materials that meet Oeko-Tex certification standards."
    },
    {
        question: "What if the mask doesn’t fit?",
        answer: "If the strap of the mask is either too tight or too loose, you can return it, and we will gladly provide a refitting."
    }

];
const shippingFAQ = [
    {
        question: "What shipping and delivery options do you offer?",
        answer: "We are pleased to offer free standard shipping on all orders, with no minimum purchase required. Depending on your location, we offer both home delivery and pickup from a local pickup point."
    },
    {
        question: "Do you offer free shipping?",
        answer: "Shipping is absolutely free for all orders, both domestic and international. Depending on your location, you can expect to receive your order within 3-5 business days."
    },

    {
        question: "What if my country isn't listed for shipping?",
        answer: "If your country is not among those listed for shipping, please don't hesitate to email us. We'll do our best to find a way to accommodate your order."
    },

];
const returnsFAQ = [
    {
        question: "What is your return policy?",
        answer: "You may return your purchase for a full refund or exchange within 30 days, provided the item is in new and unused condition. All original tags and labels must be attached. We will cover the return shipping charges."
    },
    {
        question: "Who covers the return shipping charges?",
        answer: "We will cover or reimburse the return shipping charges for all eligible returns."
    },
    {
        question: "How long will it take to process my return or exchange?",
        answer: "Please allow at least five business days from the receipt of your returned item for us to process your return or exchange. You will be notified via email once the process is complete."
    }
];

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
            {/*<ProductInfoSection product={product}/>*/}
            <ProductInfoSection product={product} productFAQ={productFAQ} shippingFAQ={shippingFAQ}
                                returnFAQ={returnsFAQ}/>
        </ProductProvider>
    )
}

export default ProductSleepMaskOneCustomTemplate
