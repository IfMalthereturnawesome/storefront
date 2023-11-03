'use client'

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
    imageUrl: string;
    line1: string;
    line2: string;
    line3: string;
}

const MobileHeaderOverlayOnImageRight: React.FC<Props> = ({ imageUrl, line1, line2, line3 }) => {

    const imageRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                { x: '-95%' }, // Image starts off-screen to the left
                {
                    x: '0%',
                    duration: 1,
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top center+=100',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });
        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div className="relative z-[1] h-full py-10">
            {/* Image */}
            <div ref={imageRef} className="w-[88vw] mr-auto z-[10] relative">
                <Image className="rounded-tl-lg rounded-bl-lg" src={imageUrl} alt="Background" width={600} height={500} quality={100} />
            </div>

            {/* Overlay header */}
            <div className="absolute top-[30%] right-0 text-right text-lg text-3xl 2xs:text-5xl font-extrabold z-[11]">
                <div className="inline-block bg-custom-white dark:bg-mask-black w-fit rounded-3xl">
                    <h3 className="p-2 text-black dark:text-custom-white/90">{line1}</h3>
                </div>
                <div className="inline-block bg-custom-white dark:bg-mask-black w-fit rounded-3xl p-1">
                    <h3 className="p-1 text-blue-500 dark:text-amber-12">{line2}</h3>
                </div>
                <div className="inline-block bg-custom-white dark:bg-mask-black w-fit rounded-3xl p-1">
                    <h3 className="p-1 text-black/80 dark:text-custom-white/75">{line3}</h3>
                </div>
            </div>
        </div>
    );
}

export default MobileHeaderOverlayOnImageRight;
