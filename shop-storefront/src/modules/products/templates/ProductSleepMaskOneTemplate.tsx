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
import MobileThinFeature from "@/components/sleepMask/mobile/ThinFeatureMobile";
import MobileMinimalWeight from "@/components/sleepMask/mobile/MinimalWeightMobile";
import MobileMaximumComfort from "@/components/sleepMask/mobile/MaximumComfortMeetsTotalBlackoutMobile";
import MobileHeaderOverlayOnImage from "@/components/sleepMask/mobile/HeaderOverlayOnMobile";


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

            <div className={"hidden lg:block font-poppins"}>
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
                                  bigDescriptionText={"Can you see your hand in your bedroom?"}
                                  descriptionText={"Exposure to even dim light during sleep can suppress melatonin production and disrupt sleep quality."}/>


                <WrappedComponent/>

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
            </div>

            {/*DESKTOP END*/}

            {/*MOBILE START */}

            <div className={"lg:hidden block font-poppins"}>

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
                                        bigDescriptionText={"Can you see your hand in your bedroom?"}
                                        descriptionText={"Exposure to even dim light during sleep can suppress melatonin production and disrupt sleep quality."}
                />

                <MobileThinFeature/>

                <MobileMinimalWeight/>

                <MobileMaximumComfort/>

                <MobileHeaderOverlayOnImage imageUrl="/images/test-images-for-feature2.jpg"
                                            line1="Made for "
                                            line2="side sleepers"
                                            line3="by side sleepers"
                                            textPosition={"left"}
                />

                <MobileHeaderOverlayOnImage imageUrl="/images/swimming.jpg"
                                            line1="Experience"
                                            line2="weightless comfort"
                                            line3="in total darkness"
                                            textPosition={"right"}
                />


            </div>

            {/*MOBILE END */}


            <ProductInfoSection product={product} productFAQ={productFAQ} shippingFAQ={shippingFAQ}
                                returnFAQ={returnsFAQ}/>

            <ProductChoice product1={SleepMaskOneData} product2={SleepMaskCustomData}
                           currentProductTitle="Sleep Mask One"/>


        </ProductProvider>
    )
}

export default ProductSleepMaskOneTemplate
