import {ProductProvider} from "@lib/context/product-context"
import React from "react"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"
import ProductInfoSection from "@/components/productPageTemplates/ProductInfoSection";
import VideoAnimation from "@/components/sleepMask/VideoAnimation";
import ProductChoice from "@/components/sleepMask/ProductChoice";
import {SleepMaskCustomData, SleepMaskOneData} from "@/utils/productData";
import FaceStory from "@/components/sleepMask/FaceStory";
import DoubleImageSection, {MobileDoubleImageSection} from "@/components/sleepMask/imageSections/DoubleImageSection";
import ZoomImageSection from "@/components/sleepMask/imageSections/ZoomImageSection";
import WrappedComponent from "@/components/sleepMask/helper/WrappedComponent";
import MaximumComfortMeetsTotalBlackout from "@/components/sleepMask/MaximumComfortMeetsTotalBlackout";
import MobileFaceStory from "@/components/sleepMask/mobile/FaceStoryMobile";
import MobileZoomImageSection from "@/components/sleepMask/mobile/ZoomImageSectionMobile";
import HeaderOverlayOnImage from "@/components/sleepMask/imageSections/HeaderOverlayOnImage";


type ProductsTemplate = {
    product: PricedProduct

}

const productFAQ = [
    {
        question: "How do I measure my head circumference?",
        answer: "To measure your head circumference, start from your forehead and go all the way around. If you have a preferred position for the strap at the back of your head, measure the circumference from your forehead to that position."
    },
    {
        question: "Does the sleep mask become warm during summer/warm nights?",
        answer: "No, it's very thin and breathable, ensuring cool and comfortable wear."
    },
    {
        question: "What if the mask doesn’t fit?",
        answer: "If the strap of the mask is either too tight or too loose, you can return it, and we will gladly provide a refitting."
    },
    {
        question: "Can I wash the sleep mask? If so, how do I wash it?",
        answer: "Yes, you can absolutely wash it! To clean the mask, use warm water, but don't exceed 55 degrees Celsius, and a gentle soap of your choice. Afterwards, hang the mask by its strap to dry."
    },
    {
        question: "What materials is the sleep mask made of?",
        answer: "The sleep mask is crafted from high-quality, breathable fabric to ensure maximum comfort during sleep. The mask is made from Nylon(69%), Elastane(20%), and HR-foam(11%). The product is exclusively made from materials that meet Oeko-Tex certification standards."
    },
    {
        question: "Is the sleep mask suitable for travel?",
        answer: "Absolutely! The sleep mask is compact and lightweight, making it a perfect travel companion for restful sleep on the go."
    },
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
        question: "Do you ship internationally?",
        answer: "Yes, we provide international shipping to a variety of countries. Free standard shipping is also available for all international orders. Additional taxes and duties may apply."
    },
    {
        question: "What if my country isn't listed for shipping?",
        answer: "If your country is not among those listed for shipping, please don't hesitate to email us. We'll do our best to find a way to accommodate your order."
    },
    {
        question: "What is your return policy?",
        answer: "You may return your purchase for a full refund or exchange within 30 days, provided the item is in new and unused condition. All original tags and labels must be attached. We will cover the return shipping charges."
    },
    {
        question: "How can I track my order?",
        answer: "After your order has been dispatched, you will receive a confirmation email that includes a tracking number, allowing you to monitor your shipment's progress."
    },
];


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

            {/*DESKTOP START */}

            <div className={"hidden md:block"}>
                <DoubleImageSection
                    headerLine1={"Greet each day with "}
                    headerLine2={"undivided focus."}
                    descriptionText={"Whether it’s your first run in a while, a 10K, or a triathlon, it takes a certain mentality to seek out challenges that test you physically. Sleep Mask One is the ultimate training partner, and it’s packed with new features to help you reach your goals."}
                    image1Src={"/images/greeteveryday.jpg"}
                    image2Src={"/images/swimming.jpg"}
                />

                <FaceStory
                    headline="Crafted from thousands of unique faces"
                    description="The skin around your eyes is the thinnest on your face, and the first to show signs of aging. We created the Sleep Mask to help you wake up looking and feeling refreshed."
                />

                <ZoomImageSection imageSrc={"/images/increase-melatonin-production.jpg"}
                                  headerLine1={"Increase melatonin production"}
                                  descriptionText={"Whether it’s your first run in a while, a 10K, or a triathlon, it takes a certain mentality to seek out challenges that test you physically. Sleep Mask One is the ultimate training partner, and it’s packed with new features to help you reach your goals."}/>


                {/*<WrappedComponent/>*/}
            </div>

            {/*DESKTOP END*/}

            {/*MOBILE START */}

            <div className={"md:hidden block"}>

                <MobileDoubleImageSection
                    headerLine1={"Greet each day with "}
                    headerLine2={"undivided focus."}
                    descriptionText={"Whether it’s your first run in a while, a 10K, or a triathlon, it takes a certain mentality to seek out challenges that test you physically. Sleep Mask One is the ultimate training partner, and it’s packed with new features to help you reach your goals."}
                    image1Src={"/images/greeteveryday-mobile.jpg"}
                    image2Src={"/images/swimming-mobile.jpg"}
                />

                <MobileFaceStory
                    headline="Crafted from thousands of unique faces"
                    description="The skin around your eyes is the thinnest on your face, and the first to show signs of aging. We created the Sleep Mask to help you wake up looking and feeling refreshed."
                    imageSrc="/images/facestory-1-mobile.png"
                    imageSrcTwo="/images/facestory-2-mobile.png"
                />

                <MobileZoomImageSection imageSrc={"/images/increase-melatonin-production-mobile.jpg"}
                                        headerLine1={"Increase melatonin production"}
                                        descriptionText={"Whether it’s your first run in a while, a 10K, or a triathlon, it takes a certain mentality to seek out challenges that test you physically. Sleep Mask One is the ultimate training partner, and it’s packed with new features to help you reach your goals."}
                />


            </div>

            {/*MOBILE END */}


            <MaximumComfortMeetsTotalBlackout/>


            <HeaderOverlayOnImage
                imageUrl="/images/test-images-for-feature2.jpg"
                line1="Made for "
                line2="side sleepers"
                line3="by side sleepers"
                textPosition={"left"}
            />
            <HeaderOverlayOnImage
                imageUrl="/images/swimming.jpg"
                line1="Experience"
                line2="weightless comfort"
                line3="in total darkness"
                textPosition={"right"}
            />

            <ProductInfoSection product={product} productFAQ={productFAQ} shippingFAQ={shippingFAQ}/>
            <ProductChoice product1={SleepMaskOneData} product2={SleepMaskCustomData}
                           currentProductTitle="Sleep Mask One"/>

        </ProductProvider>
    )
}

export default ProductSleepMaskOneTemplate
