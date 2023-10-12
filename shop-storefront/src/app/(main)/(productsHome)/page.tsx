import { Metadata } from "next"
import VideoAnimation from "@/components/sleepMask/VideoAnimation";
import MinimalWeight from "@/components/sleepMask/MinimalWeight";
import ThinFeature from "@/components/sleepMask/ThinFeature";
import WrappedComponent from "@/components/sleepMask/helper/WrappedComponent";
import React from "react";
import DoubleImageSection from "@/components/sleepMask/imageSections/DoubleImageSection";



export const metadata: Metadata = {
  title: "Home",
  description:
    "Eight Athletics is a performance sleep-tech brand that creates products to help you sleep better, recover faster, and perform at your peak.",
}

export default function Home() {

    return (
        <>

            <div  className="bg-mask-black">
                <VideoAnimation
                    product={"Sleep Mask"}
                    description1={"Enter a new sleep era where total blackout meets unmatched comfort. "}
                    description2={"Custom-fit for your unique face. "}
                    description3={"Elevate your peak performance, no matter where you are and how you sleep."}
                />

                    <DoubleImageSection
                        headerLine1={"Greet each day with "}
                        headerLine2={"undivided focus."}
                        descriptionText={"The Eight Sleep Mask is designed to help you sleep better, recover faster, and perform at your peak. It’s the first sleep mask to combine total blackout with a custom fit for your unique face. The result? A sleep experience that’s truly elevated."}
                        image1Src={"/images/test-images-for-feature2.jpg"}
                        image2Src={"/images/test-images-for-feature1.jpg"}
                    />


                {/*<ThinFeature/>*/}

            </div>
        </>
    )
}
