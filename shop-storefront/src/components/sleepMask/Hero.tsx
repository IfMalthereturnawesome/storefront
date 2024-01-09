'use client';

import dynamic from "next/dynamic";
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useBetterMediaQuery from "@/utils/useBetterMediaQuery";
import SplitType from 'split-type';
import Image from "next/image";
const MaskSequence = dynamic(() => import('@/components/sleepMask/MaskSequence'));
import TestimonialsBanner from "@/components/reviews/TestimonialsBanner";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
    product: string,
    description1: string;
    description2: string;
    description3: string;
}

const Hero: React.FC<HeroProps> = ({ product, description1, description2, description3 }) => {
    const oneNightRef = useRef<HTMLDivElement>(null);
    const [showOneNightText, setShowOneNightText] = useState(true); // Assuming you always want to show these texts
    const smallDreamRef = useRef<HTMLDivElement>(null);
    const [showSmallDreamText, setShowSmallDreamText] = useState(true); // Assuming you always want to show these texts
    const [showDescription, setShowDescription] = useState(true); // Assuming you always want to show these texts
    const descriptionRef1 = useRef(null);
    const descriptionRef2 = useRef(null);
    const descriptionRef3 = useRef(null);
    const [isClient, setIsClient] = useState(false);

    const isTabletAndDesktop = useBetterMediaQuery('(min-width: 768px)');
    const isMobile = useBetterMediaQuery('(max-width: 767px)');
    const tl1 = useRef(null);

    const line1Ref = useRef(null);
    const line2Ref = useRef(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Animate first line
            if (line1Ref.current) {
                const splitLine1 = new SplitType(line1Ref.current, { types: 'words,chars' });
                gsap.timeline()
                    .to(splitLine1.chars, {
                        color: '#faf7f7',
                        opacity: 0.6,
                        stagger: { amount: 0.1 },
                        ease: 'power2.inOut',
                    })
                    .to(splitLine1.chars, {
                        opacity: 0.9,
                        duration: 0.1,
                        ease: 'power2.inOut',
                        stagger: { amount: 1.1 },
                    });
            }

            // Animate second line
            if (line2Ref.current) {
                const splitLine2 = new SplitType(line2Ref.current, { types: 'words,chars' });
                gsap.timeline()
                    .to(splitLine2.chars, {
                        color: '#faf7f7',
                        opacity: 0.6,
                        delay: 0.8,
                        stagger: { amount: 0.1 },
                        ease: 'power2.inOut',
                    })
                    .to(splitLine2.chars, {
                        opacity: 0.9,
                        duration: 0.1,
                        delay:0.5,
                        ease: 'power2.inOut',
                        stagger: { amount: 1.1 },
                    });
            }
        });

        return () => ctx.revert();
    }, [showOneNightText]);



    return (
        <div className="relative h-screen lg:h-screen z-[1] black-gradient-background" id={"smooth-content"}>
            <div className="w-[99vw] md:w-[99.2vw] h-screen pt-[5vh] 3xs:pt-[6.5vh] 2xs:pt-[8vh] md:pt-[5vh] lg:pt-[3vh] 3xl:pt-[6vh] px-6 2xs:px-8 sm:px-15 md:px-20 flex flex-col items-center justify-start black-gradient-background">
                <h3 className={"header-bg-clip text-lg xs:text-xl lg:text-2xl font-sans hidden my-0 md:my-2 dark:block"}>
                    {product}
                </h3>
                <h3 className="header-bg-clip-light  text-lg xs:text-xl lg:text-2xl font-sans my-0 md:my-2 dark:hidden">
                    {product}
                </h3>
                <div className="">
                    {showSmallDreamText && (
                        <div ref={smallDreamRef}
                             className="flex items-center justify-center text-[#e7ecef] text-opacity-50 font-bold text-xs 2xs:text-sm xs:text-lg sm:text-xl lg:text-2xl ">
                            Don&apos;t let unwanted light spoil your night.

                        </div>
                    )}
                </div>
                <div className="2xl:pt-1">
                    {showOneNightText && (
                        <div ref={oneNightRef}
                             className="flex flex-col items-center justify-center text-[#faf7f7] text-opacity-60 font-bold text-3xl 2xs:text-5xl xs:text-7xl lg:text-7xl"
                             style={{ opacity: 1 }}
                        >
                            <div ref={line1Ref}>Total blackout meets</div>
                            <div ref={line2Ref}>unmatched comfort.</div>
                        </div>
                    )}
                </div>

                <div className="mt-3 3xl:mt-4 z-[1]">
                    {showDescription && (
                        <div className="md:px-[10vw] lg:px-[16vw] xl:px-[20vw] 2xl:px-[24vw] xlarge:px-[26vw] xxlarge:px-[27.5vw] 3xl:px-[29vw]">
                            <p className="text-[#e7ecef] mx-auto text-base 2xs:text-lg xs:text-2xl large:text-[1.33rem] 2xl:text-[1.3rem] xxlarge:text-[1.4rem] 3xl:text-xl font-semibold font-sans !leading-normal tracking-wide text-center">
                                <span ref={descriptionRef1}
                                      className="text-[#e7ecef]/70 inline">{description1}</span>

                                <span ref={descriptionRef2}
                                      className="text-[#e7ecef]/70 inline">{description2}</span>

                                <span ref={descriptionRef3} className="text-[#e7ecef]/70">{description3}</span>
                            </p>
                        </div>
                    )}
                </div>
                 <div className={"pt-4"}>
                <TestimonialsBanner />
                 </div>
                {isClient && (
                    <>
                        {isTabletAndDesktop && (
                            <MaskSequence />
                        )}
                        {isMobile && (
                            <div className="m-0 p-0">


                                    <div
                                        className="canvas-container h-[35vh] md:h-[50vh] ">
                                        <Image src="/images/sequence/sleepmask_014.png" alt="hero-mobile"
                                               width={375}
                                               height={600} quality={100}
                                               className={"object-contain max-h-[40vh]  2xs:max-h-[48vh] mt-[15vh] 2xs:mt-[13vh] md:mt-[10vh] max-w-[92vw] 2xs:max-w-[96vw] md:max-h-[50vh]   md:max-w-[100vw]"}/>

                                    </div>


                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Hero;
