'use client';

import React, {useLayoutEffect, useRef} from 'react';
import Image from 'next/image';
import gsap from "gsap";


interface MobileZoomImageSectionProps {
    imageSrc: string;
    headerLine1: string;
    bigDescriptionText: string;
    descriptionText: string;
}


const MobileZoomImageSection: React.FC<MobileZoomImageSectionProps> = ({imageSrc, headerLine1, bigDescriptionText, descriptionText}) => {
    const imageRef = useRef(null);
    const headerRef = useRef(null);
    const tl = useRef(null);
    const tl2 = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (imageRef.current) {
                tl.current = gsap.timeline({
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: true,
                    },
                });

                tl.current.fromTo(
                    imageRef.current,
                    {objectPosition: '75% 0%'},
                    {objectPosition: '45% 0%', duration: 3}
                );

                tl2.current = gsap.timeline({
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top top',
                        end: '100% center',
                        scrub: true,
                    }
                });

                tl2.current.fromTo(
                    headerRef.current,
                    {y: 0},
                    {y: 50}
                );

            }
        });
        return () => {

            ctx.revert();


        };
    }, []);

    return (
        <div className="relative  z-[1] block ">


            <div className="relative flex flex-col justify-start items-center z-0 h-[100vh]">
                <Image src={imageSrc} ref={imageRef} className="absolute inset-0 w-full h-full object-cover"
                       alt="Athlethe waking up and is ready to greet the day" width={400} height={800} quality={100}/>
                <div
                    className="pt-28 flex justify-center md:w-[49vw] flex-col  text-left space-y-4 mt-5 py-8 px-4 items-center max-w-xs xs:max-w-sm sm:max-w-lg mx-auto min-h-[300px] h-[40vh]">
                    <h3 ref={headerRef}
                        className="px-4 sm:px-10 z-[1] text-9xl 2xs:text-10xl tracking-wide !leading-[2.8rem] sm:!leading-[3.77rem] font-bold text-custom-white break-words">
                        {headerLine1}
                    </h3>
                </div>
            </div>


            <div className="relative z-10 mx-auto w-[90%]">

                <div
                    className="text-left mt-8 py-8 px-4 flex-row justify-center items-center max-w-xs xs:max-w-sm sm:max-w-lg mx-auto min-h-[250px] h-[30vh]">
                    <p className="font-semibold tracking-tighter pb-4 text-2xl font-sans text-slate-12">
                        {bigDescriptionText}
                    </p>
                    <p className="font-semibold tracking-tighter text-lg font-sans text-slate-11">
                        {descriptionText}
                    </p>
                </div>
            </div>

        </div>);
};

export default MobileZoomImageSection;
