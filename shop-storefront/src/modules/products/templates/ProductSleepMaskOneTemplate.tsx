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

            </div>

            {/*MOBILE PART */}

            <div className={"md:hidden block"}>

            <MobileDoubleImageSection
                headerLine1={"Greet each day with "}
                headerLine2={"undivided focus."}
                descriptionText={"Whether it’s your first run in a while, a 10K, or a triathlon, it takes a certain mentality to seek out challenges that test you physically. Sleep Mask One is the ultimate training partner, and it’s packed with new features to help you reach your goals."}
                image1Src={"/images/greeteveryday-mobile-.jpg"}
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



            <WrappedComponent />

            <MaximumComfortMeetsTotalBlackout />

            <ProductChoice product1={SleepMaskOneData} product2={SleepMaskCustomData}
                           currentProductTitle="Sleep Mask One"/>
            <ProductInfoSection product={product}/>


        </ProductProvider>
    )
}

export default ProductSleepMaskOneTemplate
