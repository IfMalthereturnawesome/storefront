import dynamic from "next/dynamic"
import {ProductProvider} from "@lib/context/product-context"
import React from "react"
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"

import VideoAnimation from "@/components/sleepMask/VideoAnimation";
const FaceStory = dynamic(() => import('@/components/sleepMask/FaceStory'));
const DoubleImageSection = dynamic(() => import('@/components/sleepMask/imageSections/DoubleImageSection'));
const MobileDoubleImageSection = dynamic(() => import('@/components/sleepMask/mobile/MobileDoubleImageSection'));
const ZoomImageSection = dynamic(() => import('@/components/sleepMask/imageSections/ZoomImageSection'));
const WrappedComponent = dynamic(() => import('@/components/sleepMask/helper/WrappedComponent'));
const MaximumComfortMeetsTotalBlackout = dynamic(() => import('@/components/sleepMask/MaximumComfortMeetsTotalBlackout'));
const MobileFaceStory = dynamic(() => import('@/components/sleepMask/mobile/FaceStoryMobile'));
const MobileZoomImageSection = dynamic(() => import('@/components/sleepMask/mobile/ZoomImageSectionMobile'));
const HeaderOverlayOnImage = dynamic(() => import('@/components/sleepMask/imageSections/HeaderOverlayOnImage'));
const MobileThinFeature = dynamic(() => import('@/components/sleepMask/mobile/ThinFeatureMobile'));
const MobileMinimalWeight = dynamic(() => import('@/components/sleepMask/mobile/MinimalWeightMobile'));
const MobileMaximumComfort = dynamic(() => import('@/components/sleepMask/mobile/MaximumComfortMeetsTotalBlackoutMobile'));
const MobileHeaderOverlayOnImage = dynamic(() => import('@/components/sleepMask/mobile/HeaderOverlayOnMobile'));
const MobileHeaderOverlayOnImageRight = dynamic(() => import('@/components/sleepMask/mobile/HeaderOverlayMobileRight'));
const ProductInfoSection = dynamic(() => import('@/components/productPageTemplates/ProductInfoSection'));
const ProductChoice = dynamic(() => import('@/components/sleepMask/ProductChoice'));
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


const ProductSleepMaskOneTemplate: React.FC<ProductsTemplate> = ({product}) => {


    return (
        <ProductProvider product={product}>

            <div className="bg-mask-black font-poppins">
                <VideoAnimation
                    product={"Sleep Mask One"}
                    description1={"Enter a new sleep era where total blackout meets unmatched comfort. "}
                    // description2={"Custom-fit for your unique face. "}
                    description2={"Tailored for all face shapes and sizes. "}
                    description3={"Elevate your peak performance, no matter where you are and how you sleep."}
                />
            </div>

            {/*DESKTOP START */}

            <div className={"hidden lg:block font-poppins bg-black"}>



                <DoubleImageSection
                    headerLine1={"Greet each day with "}
                    headerLine2={"undivided focus."}
                    descriptionText={"It’s all about waking up feeling on top of the world — awake, alert, and ready to take charge. Slip on the Sleep Mask One, and you’re choosing the champion's path to restful nights. Sleep through the night undisturbed and wake up to a brighter morning, every day."}
                    image1Src={"/images/greeteveryday.jpg"}
                    image2Src={"/images/swimming.jpg"}
                />

                <FaceStory
                    headline="Thousands of unique faces, one perfect fit."
                    // descriptionOne="Designed using 4,000 face scans, Sleep Mask One fits perfectly, assuring total darkness and all-night comfort for every sleeper."
                />


                <ZoomImageSection imageSrc={"/images/increase-melatonin-production.jpg"}
                                  headerLine1={"Increase melatonin production."}
                                  bigDescriptionText={"Can you see your hand in your bedroom?"}
                                  descriptionText={"Exposure to even dim light during sleep can suppress melatonin production and disrupt sleep quality. Experience the difference of a truly dark sleeping environment."}/>


                <WrappedComponent/>

                <MaximumComfortMeetsTotalBlackout/>

                {/*<HeaderOverlayOnImage*/}
                {/*    imageUrl="/images/test-images-for-feature2.jpg"*/}
                {/*    line1="Made for "*/}
                {/*    line2="side sleepers"*/}
                {/*    line3="by side sleepers"*/}
                {/*    textPosition={"left"}*/}
                {/*/>*/}
                {/*<HeaderOverlayOnImage*/}
                {/*    imageUrl="/images/swimming.jpg"*/}
                {/*    line1="Experience"*/}
                {/*    line2="weightless comfort"*/}
                {/*    line3="in total darkness"*/}
                {/*    textPosition={"right"}*/}
                {/*/>*/}

            </div>

            {/*DESKTOP END*/}

            {/*MOBILE START */}

            <div className={"lg:hidden block font-poppins"}>



                <MobileDoubleImageSection
                    headerLine1={"Greet each day with "}
                    headerLine2={"undivided focus."}
                    descriptionText={"It’s all about waking up feeling on top of the world — awake, alert, and ready to take charge. Slip on the Sleep Mask One, and you’re choosing the champion's path to restful nights. Sleep through the night undisturbed and wake up to a brighter morning, every day."}
                    image1Src={"/images/greeteveryday-mobile.jpg"}
                    image2Src={"/images/swimming-mobile.jpg"}
                />

                <MobileFaceStory
                    headline="Thousands of unique faces, one perfect fit."
                    description="Designed using 4,000 face scans, Sleep Mask One fits perfectly, assuring total darkness and all-night comfort for every sleeper."
                    imageSrc="/images/facestory-1-mobile.png"
                    imageSrcTwo="/images/facestory-2-mobile.png"
                />

                <MobileZoomImageSection imageSrc={"/images/increase-melatonin-production-mobile.jpg"}
                                        headerLine1={"Increase melatonin production."}
                                        bigDescriptionText={"Can you see your hand in your bedroom?"}
                                        descriptionText={"Exposure to even dim light during sleep can suppress melatonin production and disrupt sleep quality. Experience the difference of a truly dark sleeping environment."}
                />

                <MobileThinFeature/>

                <MobileMinimalWeight/>

                <MobileMaximumComfort/>

                {/*<MobileHeaderOverlayOnImage imageUrl="/images/test-images-for-feature2.jpg"*/}
                {/*                            line1="Made for "*/}
                {/*                            line2="side sleepers"*/}
                {/*                            line3="by side sleepers"*/}
                {/*                            textPosition={"left"}*/}
                {/*/>*/}

                {/*<MobileHeaderOverlayOnImageRight imageUrl="/images/swimming.jpg"*/}
                {/*                                 line1="Experience"*/}
                {/*                                 line2="weightless comfort"*/}
                {/*                                 line3="in total darkness" />*/}



            </div>

            {/*MOBILE END */}

            <div className={"h-[2rem] lg:hidden"}> </div>
            <ProductInfoSection product={product} productFAQ={productFAQ} shippingFAQ={shippingFAQ}
                                returnFAQ={returnsFAQ}/>
            {/*
            <ProductChoice product1={SleepMaskOneData} product2={SleepMaskCustomData}
                           currentProductTitle="Sleep Mask One"/>
*/}

        </ProductProvider>
    )
}

export default ProductSleepMaskOneTemplate
