'use client';

import React from 'react';
import gsap  from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

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


const DoubleImageSection: React.FC<DoubleImageSectionProps> = ({
                                                                   headerLine1,
                                                                   headerLine2,
                                                                   descriptionText,
                                                                   image1Src,
                                                                   image2Src,
                                                               }) => {
    const image1Ref = React.useRef(null);
    const image2Ref = React.useRef(null);
    const headerRef = React.useRef(null);

    React.useEffect(() => {
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
            { scale: 1.25 , filter: 'grayscale(100%)' },
            { scale: 1 , filter: 'grayscale(0%)'}
        );

        // make the header change y position as the image scrolls


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
            { scale: 1.1 },
            { scale: 1 }
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
            { y: 0 },
            { y: 100 }
        );

    }, []);

    return (
        <div className="relative bg-[#130612] z-[1]" >

            {/* Image section */}
            <div className="relative z-0">
                {/* Adjustments for mobile */}
                <Image src={image1Src} ref={image1Ref} className="w-full mx-auto h-full object-contain md:object-cover" alt="Athlethe waking up and is ready to greet the day" width={1920} height={1080} quality={100} />
                {/* Header position adjustments for mobile */}
                <h3 ref={headerRef} className="absolute top-1/3 left-1/4 transform -translate-y-1/2 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white break-words">
                    {headerLine1}<br />{headerLine2}
                </h3>
            </div>

            {/* Next Image section */}
            <div className="relative z-10 mt-[-5%] md:mt-[-5%]">
                <div className="relative w-full h-[50vh] md:w-[95%] lg:w-[80%] md:h-[65vh] lg:h-screen mx-auto overflow-hidden">
                    <Image src={image2Src} ref={image2Ref} className="object-cover w-full h-full" alt="Fast Athlethe swimming" width={1920} height={1080} quality={100}  />
                </div>

                {/* Description for larger than mobile */}
                <div data-aos="fade-up" className="absolute top-1/3 right-4 lg:right-[20rem] p-4 lg:text-xl max-w-xs lg:max-w-md xl:max-w-lg hidden md:block">
                    <p className={"font-sans font-semibold leading-7 tracking-tight text-left text-custom-white"}>
                        {descriptionText}
                    </p>
                </div>

                {/* Description for mobile */}
                <div className="text-left py-8 px-4 max-w-xs sm:max-w-sm md:hidden mt-4">
                    <p className={"font-semibold tracking-tighter text-lg md:text-xl text-slate-1"}>
                        {descriptionText}
                    </p>
                </div>
            </div>
        </div>

    );
};

export default DoubleImageSection;


export const MobileDoubleImageSection: React.FC<DoubleImageSectionProps> = ({
                                                                         headerLine1,
                                                                         headerLine2,
                                                                         descriptionText,
                                                                         image1Src,
                                                                         image2Src,
                                                                     }) => {

    const image1Ref = React.useRef(null);
    const image2Ref = React.useRef(null);
    const headerRef = React.useRef(null);

    React.useEffect(() => {
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
            { scale: 1.05, filter: 'grayscale(50%)' },
            { scale: 1, filter: 'grayscale(0%)' }
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
            { scale: 1.05 },
            { scale: 1 }
        );

        // Consider if you really need the header to move on mobile
        // If you do, maybe reduce the amount of movement for subtlety.
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
            { y: 0 },
            { y: 50 }
        );

    }, []);

    return (
        <div className="relative bg-[#130612] z-[1] block 3xs:block 2xs:block xs:block sm:block md:hidden" >

            {/* Mobile-specific layout here */}
            <div className="relative z-0">
                <Image src={image1Src} ref={image1Ref} className="w-full mx-auto h-full object-contain" alt="Athlethe waking up and is ready to greet the day" width={1920} height={1080} quality={100} />
                <h3 ref={headerRef} className="absolute top-1/3 left-1/4 transform -translate-y-1/2 text-6xl font-bold text-white break-words">
                    {headerLine1}<br />{headerLine2}
                </h3>
            </div>

            <div className="relative z-10 mt-[-5%]">
                <div className="relative w-full h-[50vh] mx-auto overflow-hidden">
                    <Image src={image2Src} ref={image2Ref} className="object-cover w-full h-full" alt="Fast Athlethe swimming" width={1920} height={1080} quality={100}  />
                </div>

                {/* Description for mobile */}
                <div className="text-left py-8 px-4 flex justify-center items-center max-w-xs sm:max-w-sm  mx-auto min-h-[300px] h-[40vh]">
                    <p className={"font-semibold tracking-tighter text-lg text-slate-12"}>
                        {descriptionText}
                    </p>
                </div>
            </div>
        </div>
    );
};



