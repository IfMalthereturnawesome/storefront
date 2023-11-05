'use client';

import React, {useLayoutEffect, useRef} from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import MediaQuery from "react-responsive";


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
    const imageRef = useRef(null);

    const tl = useRef(null);
    const tl2 = useRef(null);

    const initialX = textPosition === 'left' ? '-200px' : '200px';

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            tl.current = gsap.timeline({ defaults: {immediateRender: false}});

            if (line1Ref.current && line2Ref.current && line3Ref.current) {
                gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
                    x: initialX,
                    y: '-50px',
                    autoAlpha: 0,
                    rotationZ: 11,
                    duration: 1.5,
                    background: '#262a2d',
                    scale: 0.95,
                    ease: 'power2.out',
                });

            }



                // Animation upon scroll for line1
                tl.current.to(line1Ref.current, {
                    duration: 1.5,
                    x: '0',
                    y: '0',
                    autoAlpha: 1,
                    rotationZ: 2,
                    ease: 'elastic.out(1, 0.75)',
                    background: '#EAEEF1',
                    scale: 1,
                    scrollTrigger: {
                        trigger: line1Ref.current,
                        start: 'top center+=200',
                        end: '+=600',
                        scrub: true,
                    }
                });

                // Animation upon scroll for line2
                tl.current.to(line2Ref.current, {
                    duration: 1.5,
                    x: '0',
                    y: '0',
                    autoAlpha: 1,
                    rotationZ: 0,
                    ease: 'elastic.out(1, 0.75)',
                    background: '#ffffff',
                    scale: 1,
                    stagger: 0.3,
                    scrollTrigger: {
                        trigger: line2Ref.current,
                        start: 'top center+=200',
                        end: '+=600',
                        scrub: true,
                    }
                });

                // Animation upon scroll for line3
                tl.current.to(line3Ref.current, {
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
                        start: 'top center+=200',
                        end: '+=600',
                        scrub: true,
                    }
                });


            if (tl2.current){

                tl2.current = gsap.timeline({
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top center+=200',
                        end: 'bottom center',
                        scrub: true,
                    },
                });

                // Image zoom animation
                tl2.current.fromTo(
                    imageRef.current,
                    {scale: 1.05, y: '-50px'},
                    {scale: 1, duration: 3, y: '0'}
                );

            }



            return () => {
                // Clean up animations
                tl.current.kill();
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        });
        return () => {

            ctx.revert();


        };
    }, [line1Ref, line2Ref, line3Ref, initialX]);
    return (

        <div className="relative z-[1] bg-[#EAEEF1] h-full py-10">

            {/* Image */}
            <div ref={imageRef} className="rounded-3xl object-cover w-[60vw] mx-auto z-[10] relative">
                <MediaQuery minWidth={1024}>
                <Image src={imageUrl} alt="Background" width={1200} height={1000} quality={100} />
                </MediaQuery>
            </div>


            {/* Overlay header */}
            <div
                className={`absolute top-[15%] ${textPosition === 'left' ? 'left-16' : 'right-0'} p-8 uppercase z-[11]`}>
                <div ref={line1Ref}
                     className=" opacity-0 bg-[#EAEEF1] w-fit text-left rounded-3xl p-2 text-8xl font-normal text-mask-black tracking-wide sm:!leading-[3.5rem]">
                    <h3 className={`p-2 font-inter ${textPosition === 'left' ? 'mr-4' : 'ml-4'}`}>{line1}</h3>
                </div>
                <div ref={line2Ref}
                     className=" opacity-0 bg-[#E5EAED] w-fit text-left rounded-3xl p-2 text-8xl font-normal text-mask-black tracking-wide sm:!leading-[3.5rem]">
                    <h3 className={`p-2 font-inter ${textPosition === 'left' ? 'mr-4' : 'ml-4'}`}>{line2}</h3>
                </div>
                <div ref={line3Ref}
                     className=" opacity-0 bg-[#E3E7EB] w-fit text-left rounded-3xl p-2 text-8xl font-normal text-mask-black tracking-wide sm:!leading-[3.5rem]">
                    <h3 className={`p-2 font-inter  ${textPosition === 'left' ? 'mr-4' : 'ml-4'}`}>{line3}</h3>
                </div>
            </div>
            <div className={"grain"}>
                <div className={"grain-texture"}/>


            </div>
        </div>

    );
}

export default HeaderOverlayOnImage;
