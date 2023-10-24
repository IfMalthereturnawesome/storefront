import React from 'react';
import Image from 'next/image';

interface FaceStoryProps {
    headline: string;
    description: string;
    imageSrc?: string;  // You can use a static image for mobile
    imageSrcTwo?: string; // You can use a static image for mobile
}

const MobileFaceStory: React.FC<FaceStoryProps> = ({headline, description, imageSrc = "", imageSrcTwo  =""}) => {
    return (
        <div className="flex flex-col h-screen md:flex-row bg-[#130612] z-[1] relative">
            {/* Images */}
            <div className="flex w-full md:w-[49vw] items-center justify-center md:justify-start  space-y-4">
                <div className="w-2/3  animation-grow-shrink">
                    <Image src={imageSrc} alt={headline} width={300} height={500} quality={100}/>
                </div>
                <div className="w-2/3 animation-shrink-grow">
                    <Image src={imageSrcTwo} alt={headline} width={300} height={500} quality={100}/>
                </div>
            </div>
            {/* Text */}
            <div className="w-full md:w-[49vw] flex flex-col justify-center text-left space-y-4 mt-5 py-8 px-4 items-center max-w-xs xs:max-w-sm sm:max-w-lg mx-auto min-h-[300px] h-[40vh]">
                <h2 className="text-9xl 2xs:text-10xl font-bold text-custom-white tracking-wide !leading-[2.6rem] sm:!leading-[3.5rem]">{headline}</h2>
                <p className="font-semibold tracking-tighter text-lg text-slate-12">{description}</p>
            </div>
        </div>
    );
};

export default MobileFaceStory;
