'use client';

import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ZoomImageSectionProps {
    imageSrc: string;
    headerLine1: string;
    descriptionText: string;

}

const ZoomImageSection: React.FC<ZoomImageSectionProps> = ({
                                                               imageSrc, headerLine1,
                                                               descriptionText,
                                                           }) => {
    const imageRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
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
            {scale: 1.22, y: -150},
            {scale: 1, duration: 3, y: 10}
        );

    }, []);

    return (
        <div className="relative z-[1]">
            <div className="grain">
                <div className="grain-texture">

                </div>
            </div>
            <div className="w-full h-screen relative">
                <Image src={imageSrc} ref={imageRef} className="w-full h-screen object-cover"
                       alt="Increase Melatonin Production with Eight Athletics Sleep Mask" width={1920} height={1080}/>
                <h3 ref={headerRef}
                    className="absolute top-1/3 right-1/4 lg:right-1/3 transform -translate-y-1/2 text-8xl lg:text-9xl font-bold text-white break-words">
                    {headerLine1}
                </h3>
            </div>
            <div
                className="absolute top-[40%] right-1/4 lg:right-[50%] p-4 lg:text-xl max-w-xs lg:max-w-lg xl:max-w-2xl hidden lg:block">
                <p className={"font-sans font-semibold leading-7 tracking-tight text-left text-slate-12"}>
                    {descriptionText}
                </p>
            </div>
            <div className="text-left py-8 px-4 max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:hidden mt-4">
                <p className={"font-semibold tracking-tighter text-xl text-slate-1"}>
                    {descriptionText}
                </p>
            </div>
        </div>
    );
};

export default ZoomImageSection;
