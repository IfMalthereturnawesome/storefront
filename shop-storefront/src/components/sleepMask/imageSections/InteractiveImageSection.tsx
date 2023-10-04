'use client';

import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface InteractiveImageSectionProps {
    leftImageSrc: string;
    rightImageSrc: string;
    leftDescription: string;
    rightDescription: string;
}

const InteractiveImageSection: React.FC<InteractiveImageSectionProps> = ({
                                                                             leftImageSrc,
                                                                             rightImageSrc,
                                                                             leftDescription,
                                                                             rightDescription,
                                                                         }) => {
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const leftTextRef = useRef(null);
    const rightTextRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'center center',
                end: 'bottom center',
                scrub: 0.5,  // Adjust scrubbing speed
            },
        });

        tl.fromTo(
            leftRef.current,
            { flex: '0 1 62.5%' },
            { flex: '0 1 50%', ease: "power2.inOut", duration: 3 },
            0
        )
            .fromTo(
                leftTextRef.current,
                { opacity: 1 },
                { opacity: 1, ease: "power2.inOut", duration: 1 },
                0
            )
            .fromTo(
                rightRef.current,
                { flex: '0 1 37.5%', opacity: 0.5 },
                {opacity: 1, flex: '0 1 50%', ease: "power2.inOut", duration: 2 },
                0
            )
            .fromTo(
                rightTextRef.current,
                { opacity: 0 },
                { opacity: 1, ease: "power2.inOut", duration: 1 },
                0.5  // Delay showing text a bit to make the transition smoother
            )
            .to(
                leftRef.current,
                { flex: '0 1 37.5%', ease: "power2.inOut", duration: 3, opacity: 0.5 },
                1  // Start shrinking after a delay
            )
            .to(
                rightRef.current,
                { flex: '0 1 62.5%', ease: "power2.inOut", duration: 3 },
                1  // Expand right side at the same time
            )
            .to(
                containerRef.current,
                { y: '0vh', ease: "none", duration: 2 },
                0
            )
            .to(
                rightRef.current,
                { y: '35vh', ease: "none", duration: 5 },
            )
            .to(
                rightTextRef.current,
                { y: '5vh', ease: "none", duration: 1 },"<",
            );

    }, []);




    return (
        <div className="flex w-full h-screen" ref={containerRef}>

            <div ref={leftRef} className="flex flex-col items-center justify-center relative flex-1 transition-all">
                <Image src={leftImageSrc} alt="" width={1920} height={1080} className={"object-cover w-full h-[90vh]"}/>
                <h3 ref={leftTextRef}
                    className="absolute top-1/2 font-bold text-white text-8xl break-words max-w-4xl p-4 ">{leftDescription}</h3>
            </div>
            <div ref={rightRef} className="flex flex-col items-center justify-center relative flex-1 transition-all">
                <Image src={rightImageSrc} alt="" width={1920} height={1080}
                       className={"object-cover w-full h-[90vh]"}/>
                <h4 ref={rightTextRef}
                    className="absolute top-1/2 text-3xl font-sans font-semibold leading-7 tracking-tight max-w-2xl text-left text-white ">{rightDescription}</h4>
            </div>
        </div>
    );
};

export default InteractiveImageSection;
