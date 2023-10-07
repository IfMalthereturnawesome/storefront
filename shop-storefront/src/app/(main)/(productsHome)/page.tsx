
import { Metadata } from "next"
import VideoAnimation from "@/components/sleepMask/VideoAnimation";
import MinimalWeight from "@/components/sleepMask/MinimalWeight";
import ThinFeature from "@/components/sleepMask/ThinFeature";



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

                <div className="spacer"></div>

                {/*<ThinFeature/>*/}

            </div>
        </>
    )
}
