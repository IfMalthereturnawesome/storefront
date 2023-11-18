import React from 'react';
import Image from 'next/image';

interface FaceStoryProps {
    headline: string;
    description: string;
    imageSrc?: string;
    imageSrcTwo?: string;
}

const MobileFaceStory: React.FC<FaceStoryProps> = ({headline, description, imageSrc = "", imageSrcTwo  =""}) => {
    return (
        <div id={"crafted-from-thousands-of-unique-faces"} className="flex flex-col h-auto  bg-[#130612] z-[1] relative pb-12 pt-6">
            {/* Images */}
            <div className="flex w-full  items-center justify-center pb-6 space-y-4">
                <div className="w-2/3 md:w-full animation-grow-shrink">
                    <Image src={imageSrc} alt={headline} width={500} height={600} quality={100}/>
                </div>
                <div className="w-2/3 md:w-full animation-shrink-grow">
                    <Image src={imageSrcTwo} alt={headline} width={500} height={600} quality={100}/>
                </div>
            </div>
            {/* Text */}
            <div className="w-full  flex flex-col justify-center text-left space-y-4 mt-5 py-8 px-8 2xs:px-4 items-center max-w-xs xs:max-w-sm sm:max-w-lg mx-auto min-h-[300px] h-[40vh]">
                <h2 className="text-9xl 2xs:text-10xl font-bold text-custom-white tracking-wide !leading-[2.6rem] sm:!leading-[3.5rem]">{headline}</h2>
                <p className="font-semibold tracking-tighter text-lg font-sans text-slate-8 dark:text-white/70">{description}</p>
            </div>
        </div>
    );
};

export default MobileFaceStory;
