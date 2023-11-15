'use client';

import React, {useLayoutEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Image from 'next/image';

import useBetterMediaQuery from "@/utils/useBetterMediaQuery";


if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface DoubleImageSectionProps {
    headerLine1: string;
    headerLine2: string;
    descriptionText: string;
    image1Src: string;
    image2Src: string;
}

 const MobileDoubleImageSection: React.FC<DoubleImageSectionProps> = ({
                                                                                headerLine1,
                                                                                headerLine2,
                                                                                descriptionText,
                                                                                image1Src,
                                                                                image2Src,
                                                                            }) => {

    const image1Ref = React.useRef(null);
    const image2Ref = React.useRef(null);
    const headerRef = React.useRef(null);

    const isSmallerThanDesktop = useBetterMediaQuery('(max-width: 1023px)');

    useLayoutEffect(() => {
        if (!isSmallerThanDesktop) return;
        const ctx = gsap.context(() => {
            const tl1 = gsap.timeline({
                scrollTrigger: {
                    trigger: image1Ref.current,
                    start: 'top bottom',
                    end: 'bottom center',
                    scrub: true,
                },
            });

            tl1.fromTo(
                image1Ref.current,
                //  Make the image zoommed in without using scale.

                {scale: 1.05, filter: 'grayscale(100%)'},

                {scale: 1, filter: 'grayscale(0%)'}
            );

            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: image2Ref.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                },
            });

            tl2.fromTo(
                image2Ref.current,
                {scale: 1.05},
                {scale: 1}
            );


            const tl3 = gsap.timeline({
                scrollTrigger: {
                    trigger: image1Ref.current,
                    start: 'top top',
                    end: '100% center',
                    scrub: true,
                }
            });

            tl3.fromTo(
                headerRef.current,
                {y: 0},
                {y: 50}
            );
        });

        return () => {
            ctx.revert();
        };

    }, [isSmallerThanDesktop]);

    return (
        <>
            {isSmallerThanDesktop && (
                <div className="relative bg-[#130612] z-[1] block  ">


                    <div className="relative flex flex-col justify-start items-center z-0 h-[100vh]">
                        <Image src={image1Src} ref={image1Ref} className="absolute inset-0 w-full h-full object-cover"
                               alt="Athlethe waking up and is ready to greet the day" width={400} height={800}
                               quality={90}/>
                        <div className="pt-28 flex justify-center w-full xs:max-w-lg sm:max-w-xl">
                            <h3 ref={headerRef}
                                className="pr-4 pl-8 sm:px-10  text-11xl tracking-wide !leading-[2.8rem] sm:!leading-[3.77rem] font-bold text-custom-white break-words">
                                {headerLine1} {headerLine2}
                            </h3>
                        </div>
                    </div>


                    <div className="relative z-10 mt-[-15%] mx-auto w-[90%]">
                        <div className="relative h-[55vh] overflow-hidden">
                            <Image src={image2Src} ref={image2Ref} className="object-cover w-full h-full"
                                   alt="Fast Athlethe swimming" width={400} height={500} quality={90}/>
                        </div>

                        {/* Description for mobile */}
                        <div
                            className="text-left mt-6 py-8 px-4 flex justify-center items-center max-w-xs xs:max-w-sm sm:max-w-lg mx-auto min-h-[300px] h-[40vh]">
                            <p className="font-semibold font-sans tracking-tighter text-lg text-slate-1 dark:text-custom-white">
                                {descriptionText}
                            </p>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};
export default MobileDoubleImageSection;