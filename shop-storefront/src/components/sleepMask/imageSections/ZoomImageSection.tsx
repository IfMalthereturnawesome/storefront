'use client';

import React, {useLayoutEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {ArrowDownIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import SplitType from 'split-type';
import MediaQuery from "react-responsive";
import useBetterMediaQuery from "@/utils/useBetterMediaQuery";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ZoomImageSectionProps {
    imageSrc: string;
    headerLine1: string;
    bigDescriptionText: string;
    descriptionText: string;


}

const ZoomImageSection: React.FC<ZoomImageSectionProps> = ({
                                                               imageSrc, headerLine1,
                                                               bigDescriptionText,
                                                               descriptionText,
                                                           }) => {
    const initialScrollTextRef = useRef(null);
    const maximumTextRef = useRef(null);
    const comfortTextRef = useRef(null);
    const discoverTextRef = useRef(null);
    const bigDescriptionTextRef = useRef(null);

    const imageRef = useRef(null);
    const headerRef = useRef(null);


    const tl = useRef(null);

    const tl2 = useRef(null);
    const isDesktop = useBetterMediaQuery('(min-width: 1024px)');


    useLayoutEffect(() => {
        if (!isDesktop) return;



        const ctx = gsap.context(() => {



            tl.current = gsap.timeline({
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                },
            });

            // Image zoom animation
            tl.current.fromTo(
                imageRef.current,
                {scale: 1.18},
                {scale: 1, duration: 3}
            );


            if (bigDescriptionTextRef.current) {
                const split = new SplitType(bigDescriptionTextRef.current, {types: 'lines, words, chars'});

                tl.current.from(split.chars, {
                    opacity: 0,
                    color: '#faf7f7',
                    scale: 0.7,
                    stagger: {amount: 0.5},
                    ease: 'power2.inOut',

                }, '<');


                tl.current.to(split.chars, {
                        color: '#fdc500',
                        opacity: 0.8,
                        scale: 1,
                        stagger: {amount: 1.5},
                        ease: 'power1.out',

                    },
                    '<');
            }


            tl2.current = gsap.timeline({
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                },
            });

            tl2.current.to(
                initialScrollTextRef.current,
                {opacity: 0.5, duration: 3, stagger: 0.5}
            );

            tl2.current.fromTo(
                discoverTextRef.current,
                {y: 100, opacity: 0},
                {y: 0, opacity: 1, duration: 6}
            );

            tl2.current.fromTo(
                [maximumTextRef.current, comfortTextRef.current],
                {y: -50, opacity: 0},
                {y: 0, opacity: 1, duration: 3, stagger: 0.5}
            );

        });

        return () => {
            ctx.revert();
        };
    }, [isDesktop]);


    return (

        <>
            {isDesktop && (
                <div className="relative z-[1]" id={"increase-melatonin-production"}>

                    <div className="w-full h-screen" >
                        <Image src={imageSrc} ref={imageRef} className="w-[1920px] h-full object-cover"
                               alt="Increase Melatonin Production with Eight Athletics Sleep Mask"
                               width={1920}
                               height={1080}
                               quality={85}/>
                    </div>

                    <div
                        className="absolute top-[38%] left-[15%] transform  -translate-y-1/2 p-4 max-w-xs lg:max-w-lg xl:max-w-2xl hidden lg:flex flex-col justify-center">
                        <h3 ref={headerRef}
                            className="text-8xl lg:text-7xl font-bold text-white mb-6 max-w-[30vw] 3xl:max-w-[33vw]">
                            {headerLine1}
                        </h3>
                        <p
                            ref={bigDescriptionTextRef}
                            className="leading-7 font-[400] text-2xl tracking-tight mb-2 text-left text-custom-white">
                            {bigDescriptionText}
                        </p>
                        <p data-aos="fade-up"
                           className="font-sans font-semibold leading-7 text-xl tracking-tight text-left text-custom-white">
                            {descriptionText}
                        </p>
                    </div>


                    <Link href="#SlimAndSoft" style={{textDecoration: 'none'}} className={"group"}>
                        <div
                            ref={initialScrollTextRef}
                            style={{
                                position: 'absolute',
                                right: 18,
                                bottom: -180,
                                writingMode: 'vertical-rl',
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                            className={"opacity-0"}
                        >
                        <span ref={discoverTextRef}
                              className={"font-poppins text-9xl scale-[1.2] font-extrabold text-[#faf7f7] mb-16 "}>Discover </span>
                            <div>
                        <span ref={maximumTextRef}
                              className={"font-poppins text-3xl font-extrabold text-[#faf7f7] block"}>Maximum</span>
                                <div ref={comfortTextRef}
                                     className=" stroke-white bg-transparent font-poppins text-3xl font-extrabold text-[#faf7f7] block"
                                     style={{
                                         WebkitTextStroke: "1px white",
                                         WebkitTextFillColor: "transparent"
                                     }}
                                >
                                    Comfort
                                </div>
                            </div>
                            <span>

        </span>
                        </div>
                    </Link>
                </div>
            )}

        </>
    );
};

export default ZoomImageSection;
