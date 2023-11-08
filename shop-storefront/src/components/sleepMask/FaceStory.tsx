'use client';

import gsap from "gsap";
import React, {useLayoutEffect, useRef, useState} from 'react';
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import MediaQuery from "react-responsive";
import useBetterMediaQuery from 'utils/useBetterMediaQuery'


interface FaceStoryProps {
    headline: string;
    descriptionOne?: string;
    descriptionTwo?: string;
    descriptionThree?: string;
}


const FaceStory: React.FC<FaceStoryProps> = ({headline, descriptionOne, descriptionTwo, descriptionThree}) => {
    const isDesktop = useBetterMediaQuery('(min-width: 1024px)');
    const faceStoryRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const textRefOne = useRef<HTMLParagraphElement | null>(null);
    const textRefTwo = useRef<HTMLParagraphElement | null>(null);
    const textRefThree = useRef<HTMLParagraphElement | null>(null);
    const textSectionRef = useRef<HTMLDivElement | null>(null);


    useLayoutEffect(() => {
        if (!isDesktop) return;
        let ctx = gsap.context(() => {


            // Canvas code

            if (canvasRef.current) {
                canvasRef.current.width = 960;
                canvasRef.current.height = 640;


                const frameCount = 25;
                const currentFrame = (index: number) =>
                    `/images/facestory/facestory_${(index)
                        .toString()
                        .padStart(1, "1")}.png`;


                const images: any[] = [];
                const sleepMask = {
                    frame: 1,
                };

                for (let i = 0; i < frameCount; i++) {
                    const img = new Image();
                    img.src = currentFrame(i);
                    images.push(img);
                }

                images[1].onload = () => {
                    if (canvasRef.current) {
                        const context = canvasRef.current.getContext("2d");
                        context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                        context?.drawImage(images[1], 0, 0, canvasRef.current.width, canvasRef.current.height);
                    }
                };


                const render = () => {
                    if (canvasRef.current) {
                        const context = canvasRef.current.getContext("2d");
                        const img = images[sleepMask.frame];

                        // Set canvas size to image size
                        canvasRef.current.width = img.width;
                        canvasRef.current.height = img.height;

                        context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                        context?.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);

                    }
                };


                gsap.to(sleepMask, {
                        frame: frameCount - 1,
                        snap: "frame",
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".pinFaceStory",
                            start: "center center",
                            end: "+=95%",
                            scrub: true,
                            onEnter: render,
                        },
                        onUpdate: render,
                    }
                );


                gsap.fromTo(canvasRef.current,
                    {
                        opacity: 0,
                    },
                    {
                        duration: 5,
                        opacity: 1,
                        ease: "power2.out",
                    }
                );


                gsap.to(canvasRef.current, {
                    scale: 1,
                    ease: "none",

                    scrollTrigger: {
                        trigger: ".pin-video",
                        start: "center center",
                        end: "+=100%",
                        scrub: true,


                    },
                });

                images[0].onload = render;

            }
            if (faceStoryRef.current) {
                ScrollTrigger.create({
                    trigger: faceStoryRef.current,
                    start: "center center",
                    end: "+=100%",
                    pin: ".pinFaceStory",
                    pinSpacing: true,

                });
            }


            if (textRefOne.current && textRefTwo.current && textRefThree.current) {
                gsap.set(textRefOne.current.querySelectorAll('.text-opacity'), {opacity: 0});
                gsap.set(textRefTwo.current.querySelectorAll('.text-opacity'), {opacity: 0});
                gsap.set(textRefThree.current.querySelectorAll('.text-opacity'), {opacity: 0});
                gsap.set(textRefOne.current.querySelectorAll('strong'), {opacity: 0});
                gsap.set(textRefTwo.current.querySelectorAll('strong'), {opacity: 0});
                gsap.set(textRefThree.current.querySelectorAll('strong'), {opacity: 0});

                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: textSectionRef.current,
                        start: "center center",
                        endTrigger: textSectionRef.current,
                        end: "bottom top",
                        scrub: true,
                        markers: false,
                        toggleActions: "play none none reverse",
                    }
                });

                // Animating only the spans for opacity changes
                tl.to(textRefOne.current.querySelectorAll('.text-opacity'), {opacity: 0.8, duration: 1, ease: "power2.out"})
                    .to(textRefOne.current.querySelectorAll('strong'), {opacity: 0.8, duration: 1, ease: "power2.out"},"<")
                    .to(textRefTwo.current.querySelectorAll('.text-opacity'), {opacity: 0.8, duration: 1, ease: "power2.out"})
                    .to(textRefTwo.current.querySelectorAll('strong'), {opacity: 0.8, duration: 1, ease: "power2.out"},"<")
                    .to(textRefOne.current.querySelectorAll('.text-opacity'), {opacity: 0.3, duration: 0.2, ease: "power2.out"}, "<")
                    .to(textRefThree.current.querySelectorAll('.text-opacity'), {opacity: 0.8, duration: 1, ease: "power2.out"})
                    .to(textRefThree.current.querySelectorAll('strong'), {opacity: 0.8, duration: 1, ease: "power2.out"},"<")
                    .to(textRefTwo.current.querySelectorAll('.text-opacity'), {opacity: 0.3, duration: 0.2, ease: "power2.out"}, "<")
                    .to(textRefThree.current.querySelectorAll('.text-opacity'), {opacity: 0.3, duration: 0.2, ease: "power2.out"}, );
            }


        });
        return () => ctx.revert();
    }, [isDesktop])

    return (
        <>
            {isDesktop && (
                <div id={"crafted-from-thousands-of-unique-faces"} ref={faceStoryRef}
                     className="flex pinFaceStory bg-[#130612] z-[1]">
                    <div className="w-fit ml-2 h-screen ">

                        <canvas ref={canvasRef} className="w-full h-full object-contain"/>

                    </div>

                    <div className="w-auto mx-auto flex flex-col justify-center pl-8 -mt-[3rem]" ref={textSectionRef}>
                        <h2 className="text-8xl lg:text-7xl font-bold text-white mb-6 max-w-[30vw] 3xl:max-w-[33vw]">{headline}</h2>
                        <p ref={textRefOne}
                           className="text-xl font-sans font-semibold leading-7 tracking-tight text-left text-custom-white max-w-[30vw]">
                            <span className="text-opacity">The </span><strong className={"font-semibold"}>Sleep Mask One</strong><span
                            className="text-opacity"> transcends the ordinary, born from </span><strong className={"font-semibold"}>extensive
                            research</strong><span className="text-opacity"> and innovative design.</span>
                        </p>
                        <p ref={textRefTwo}
                           className="text-xl font-sans font-semibold leading-7 tracking-tight text-left text-custom-white max-w-[30vw]">
                            <span className="text-opacity">Recognizing that </span><strong className={"font-semibold"}>every face tells a
                            story</strong><span className="text-opacity">, we've digitally mapped over </span><strong className={"font-semibold"}>4,000
                            unique faces</strong><span className="text-opacity"> to shape our sleep mask.</span>
                        </p>
                        <p ref={textRefThree}
                           className="text-xl font-sans font-semibold leading-7 tracking-tight text-left text-custom-white max-w-[30vw]">
                            <span
                                className="text-opacity">This approach allows the mask to align </span><strong className={"font-semibold"}>smoothly</strong><span
                            className="text-opacity"> with each individual's facial features, offering an unrivaled </span><strong className={"font-semibold"}>fit
                            and comfort</strong><span className="text-opacity">.</span>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default FaceStory;
