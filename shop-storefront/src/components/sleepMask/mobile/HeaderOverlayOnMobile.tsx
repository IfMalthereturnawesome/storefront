'use client'

import React, {useRef, useLayoutEffect} from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import MediaQuery from "react-responsive";
import useBetterMediaQuery from "@/utils/useBetterMediaQuery";

interface Props {
    imageUrl: string;
    line1: string;
    line2: string;
    line3: string;
    textPosition: 'left' | 'right';
}

const MobileHeaderOverlayOnImage: React.FC<Props> = ({imageUrl, line1, line2, line3, textPosition}) => {

    const imageRef = useRef(null);
    const isSmallerThanDesktop = useBetterMediaQuery('(max-width: 1023px)');

    useLayoutEffect(() => {
            if (!isSmallerThanDesktop) return;
            let ctx = gsap.context(() => {

                    gsap.fromTo(
                        imageRef.current,
                        {x: '95%'},
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
                }
            );
            return () => {
                ctx.revert();
            };


        },
        [isSmallerThanDesktop]);

    return (
        <>
            {isSmallerThanDesktop && (
                <div className="relative z-[1]  h-full py-10">

                    <div ref={imageRef} className=" w-[88vw] ml-auto z-[10] relative">
                        <Image className={"rounded-tl-lg rounded-bl-lg"} src={imageUrl} alt="Background" width={600}
                               height={500} quality={100}/>
                    </div>
                    <div
                        className={`absolute top-[30%]  text-lg text-3xl 2xs:text-5xl font-extrabold    ${textPosition === 'left' ? 'left-0' : 'right-0'}   z-[11]`}>
                        <div className="bg-custom-white dark:bg-mask-black  w-fit text-left rounded-3xl  ">
                            <h3 className={`p-2 text-black dark:text-custom-white/90 ${textPosition === 'left' ? 'mr-3' : 'ml-3'}`}>{line1}</h3>
                        </div>
                        <div className="bg-custom-white dark:bg-mask-black  w-fit text-left rounded-3xl p-1  ">
                            <h3 className={`p-1 text-blue-500 dark:text-amber-12 ${textPosition === 'left' ? 'mr-3' : 'ml-3'}`}>{line2}</h3>
                        </div>
                        <div className="bg-custom-white dark:bg-mask-black  w-fit text-left rounded-3xl p-1 ">
                            <h3 className={`p-1 text-black/80 dark:text-custom-white/75 ${textPosition === 'left' ? 'mr-3' : 'ml-3'}`}>{line3}</h3>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
}

export default MobileHeaderOverlayOnImage;
