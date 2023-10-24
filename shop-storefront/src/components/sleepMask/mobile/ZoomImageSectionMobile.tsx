'use client';

import React, {useEffect, useRef} from 'react';
import Image from 'next/image';
import gsap from "gsap";


interface MobileZoomImageSectionProps {
    imageSrc: string;
    headerLine1: string;
    descriptionText: string;
}


const MobileZoomImageSection: React.FC<MobileZoomImageSectionProps> = ({imageSrc, headerLine1, descriptionText}) => {
    const imageRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        if (imageRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                },
            });

            tl.fromTo(
                imageRef.current,
                {objectPosition: '75% 0%'},
                {objectPosition: '45% 0%', duration: 3}
            );

            const tl3 = gsap.timeline({
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top top',
                    end: '100% center',
                    scrub: true,
                }
            });

            tl3.fromTo(
                headerRef.current,
                { y: 0 },
                { y: 50 }
            );

        }
    }, []);

    return (
        <div className="relative bg-cyan-1 z-[1] block  md:hidden">


            <div className="relative flex flex-col justify-start items-center z-0 h-[100vh]">
                <Image src={imageSrc} ref={imageRef} className="absolute inset-0 w-full h-full object-cover"
                       alt="Athlethe waking up and is ready to greet the day" width={400} height={800} quality={100}/>
                <div
                    className="pt-28 flex justify-center md:w-[49vw] flex-col  text-left space-y-4 mt-5 py-8 px-4 items-center max-w-xs xs:max-w-sm sm:max-w-lg mx-auto min-h-[300px] h-[40vh]">
                    <h3 ref={headerRef} className="px-4 sm:px-10 z-[1] text-9xl 2xs:text-10xl tracking-wide !leading-[2.8rem] sm:!leading-[3.77rem] font-bold text-custom-white break-words">
                        {headerLine1}
                    </h3>
                </div>
            </div>


            <div className="relative z-10 mx-auto w-[90%]">

                <div
                    className="text-left mt-8 py-8 px-4 flex justify-center items-center max-w-xs xs:max-w-sm sm:max-w-lg mx-auto min-h-[300px] h-[40vh]">
                    <p className="font-semibold tracking-tighter text-lg text-slate-12">
                        {descriptionText}
                    </p>
                </div>
            </div>

        </div>);
};

export default MobileZoomImageSection;
