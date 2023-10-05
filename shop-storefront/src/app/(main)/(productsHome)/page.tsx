
import { Metadata } from "next"
import VideoAnimation from "@/components/sleepMask/VideoAnimation";
import MinimalWeight from "@/components/sleepMask/MinimalWeight";
import ThinFeature from "@/components/sleepMask/ThinFeature";



export const metadata: Metadata = {
  title: "Home",
  description:
    "Shop all available models only at the ACME. Worldwide Shipping. Secure Payment.",
}

export default function Home() {

    return (
        <>
            <div  className="bg-mask-black">
                <VideoAnimation/>

                <div className="spacer"></div>

                {/*<ThinFeature/>*/}

            </div>
        </>
    )
}
