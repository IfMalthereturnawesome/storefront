'use client';

import React, {useEffect, useRef} from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';


interface Props {
    imageUrl: string;
    line1: string;
    line2: string;
    line3: string;
    textPosition: 'left' | 'right';
}

const HeaderOverlayOnImage: React.FC<Props> = ({imageUrl, line1, line2, line3, textPosition}) => {
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);

    const initialX = textPosition === 'left' ? '-200px' : '200px';

    useEffect(() => {

        gsap.from([line1Ref.current, line2Ref.current, line3Ref.current], {
            x: initialX,
            y: '-50px',
            autoAlpha: 0,
            rotationZ: 11,
            duration: 1.5,
            background: '#262a2d',
            scale: 0.95,
            ease: 'power2.out',

        });

        // Animation upon scroll for line1
        gsap.to(line1Ref.current, {
            duration: 1.5,
            x: '0',
            y: '0',
            autoAlpha: 1,
            rotationZ: 2,
            ease: 'elastic.out(1, 0.75)',
            background: '#EAEEF1',  // Change to desired color for line1
            scale: 1,
            scrollTrigger: {
                trigger: line1Ref.current,
                start: 'top center',
                end: '+=600',
                scrub: true,
            }
        });

        // Animation upon scroll for line2
        gsap.to(line2Ref.current, {
            duration: 1.5,
            x: '0',
            y: '0',
            autoAlpha: 1,
            rotationZ: 0,
            ease: 'elastic.out(1, 0.75)',
            background: '#ffffff',  // Change to desired color for line2
            scale: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: line2Ref.current,
                start: 'top center',
                end: '+=600',
                scrub: true,
            }
        });

        // Animation upon scroll for line3
        gsap.to(line3Ref.current, {
            duration: 1.5,
            x: '0',
            y: '0',
            autoAlpha: 1,
            rotationZ: 3,
            ease: 'elastic.out(1, 0.75)',
            background: '#dbe0e5',  // Change to desired color for line3
            scale: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: line3Ref.current,
                start: 'top center',
                end: '+=600',
                scrub: true,
            }
        });
    }, []);
    return (
        <div className="relative z-[1] bg-[#EAEEF1] h-full py-10">

            {/* Image */}
            <Image src={imageUrl} className="rounded-3xl object-cover w-[60vw] mx-auto z-[10] relative" alt="Background" width={1200}
                   height={1000} quality={100}/>

            {/* Overlay header */}
            <div className={`absolute top-[15%] ${textPosition === 'left' ? 'left-16' : 'right-0'} p-8 uppercase z-[11]`}>
                <div ref={line1Ref}
                     className="bg-[#EAEEF1] w-fit text-left rounded-3xl p-2 text-8xl font-normal text-mask-black tracking-wide sm:!leading-[3.5rem]">
                    <h3 className={`p-2 ${textPosition === 'left' ? 'mr-4' : 'ml-4'}`}>{line1}</h3>
                </div>
                <div ref={line2Ref}
                     className="bg-[#E5EAED] w-fit text-left rounded-3xl p-2 text-8xl font-normal text-mask-black tracking-wide sm:!leading-[3.5rem]">
                    <h3 className={`p-2 ${textPosition === 'left' ? 'mr-4' : 'ml-4'}`}>{line2}</h3>
                </div>
                <div ref={line3Ref}
                     className="bg-[#E3E7EB] w-fit text-left rounded-3xl p-2 text-8xl font-normal text-mask-black tracking-wide sm:!leading-[3.5rem]">
                    <h3 className={`p-2 ${textPosition === 'left' ? 'mr-4' : 'ml-4'}`}>{line3}</h3>
                </div>
            </div>
            <div className={"grain"}>
                <div className={"grain-texture"}/>


            </div>
        </div>
    );
}

export default HeaderOverlayOnImage;
