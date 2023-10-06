// page.tsx

import React from "react";
import LightweightFeature from "@/components/sleepMask/LightweightFeature";

import MinimalWeight from "@/components/sleepMask/MinimalWeight";
import ThinFeature from "@/components/sleepMask/ThinFeature";
import DoubleImageSection from "@/components/sleepMask/imageSections/DoubleImageSection";
import InteractiveImageSection from "@/components/sleepMask/imageSections/InteractiveImageSection";
import ZoomImageSection from "@/components/sleepMask/imageSections/ZoomImageSection";
import FaceStory from "@/components/sleepMask/FaceStory";
import ThinFeatureDandelions from "@/components/sleepMask/ThinFeatureDandelions";


export const metadata = {
    title: 'About us - Open PRO',
    description: 'Page description',
}


export default function About() {
    return (
        <>
            {/*<div className="spacer"></div>*/}
            {/*    <DoubleImageSection*/}
            {/*        headerLine1={"Greet each day with "}*/}
            {/*        headerLine2={"undivided focus."}*/}
            {/*        descriptionText={"Whether it’s your first run in a while, a 10K, or a triathlon, it takes a certain mentality to seek out challenges that test you physically. Apple Watch Ultra 2 is the ultimate training partner, and it’s packed with new features to help you reach your goals."}*/}
            {/*        image1Src={"/images/test-images-for-feature2.jpg"}*/}
            {/*        image2Src={"/images/test-images-for-feature1.jpg"}*/}
            {/*    />*/}

            {/*<div className="spacer"></div>*/}
            {/*<InteractiveImageSection*/}
            {/*    leftImageSrc="/images/test-images-for-feature2.jpg"*/}
            {/*    rightImageSrc="/images/test-images-for-feature1.jpg"*/}
            {/*    leftDescription="This is the description for the left image."*/}
            {/*    rightDescription="This is the description for the right image."*/}
            {/*/>*/}
            {/*<div className="spacer"></div>*/}

            {/*<ZoomImageSection imageSrc={"/images/test-images-for-feature1.jpg"}*/}
            {/*                  headerLine1={"Increase melatonin production"}*/}
            {/*                  descriptionText={"Whether it’s your first run in a while, a 10K, or a triathlon, it takes a certain mentality to seek out challenges that test you physically. Apple Watch Ultra 2 is the ultimate training partner, and it’s packed with new features to help you reach your goals."}/>*/}

            {/*<div className="spacer"></div>*/}


            {/*<MinimalWeight/>*/}
            {/*<ThinFeature/>*/}
            <ThinFeatureDandelions/>
            {/*<FaceStory*/}
            {/*    headline="Every face tells a story."*/}
            {/*    description="The skin around your eyes is the thinnest on your face, and the first to show signs of aging. We created the Sleep Mask to help you wake up looking and feeling refreshed."*/}
            {/*/>*/}


        </>
    )
}