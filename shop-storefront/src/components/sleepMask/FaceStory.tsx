'use client';

import gsap from "gsap";
import React, {useEffect, useRef} from 'react';
import Lenis from '@studio-freight/lenis';
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface FaceStoryProps {
    headline: string;
    description: string;
}

const FaceStory: React.FC<FaceStoryProps> = ({headline, description}) => {
    const canvasRefImage = useRef<HTMLCanvasElement | null>(null);
    const faceStoryRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {

            const lenis = new Lenis();
            // Update ScrollTrigger on scroll
            lenis.on('scroll', ScrollTrigger.update);

            const rafLoop = (time: number) => {
                lenis.raf(time * 1000);
            };

            gsap.ticker.add(rafLoop);
            gsap.ticker.lagSmoothing(0);
            // Canvas code
            if (canvasRefImage.current) {
                const canvas = canvasRefImage.current;

                canvas.width = 960;
                canvas.height = 640;

                const frameCount = 25;
                const currentFrame = (index: number) =>
                    `/images/facestory/facestory_${(index)
                        .toString()
                        .padStart(1, "1")}.png`;


                const images: any[] = [];
                const sleepMask = {
                    frame: 0,
                };

                for (let i = 0; i < frameCount; i++) {
                    const img = new Image();
                    img.src = currentFrame(i);
                    images.push(img);
                }


                const render = () => {
                    if (canvas) {
                        const context = canvas.getContext("2d");
                        const img = images[sleepMask.frame];

                        // Set canvas size to image size
                        canvas.width = img.width;
                        canvas.height = img.height;

                        context?.clearRect(0, 0, canvas.width, canvas.height);
                        context?.drawImage(img, 0, 0, canvas.width, canvas.height);

                    }
                };

                gsap.to(sleepMask, {
                        frame: frameCount - 1,
                        snap: "frame",
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".pinFaceStory",
                            start: "center center",
                            end: "+=100%",
                            scrub: true,

                        },
                        onUpdate: render,
                    }
                );


                // Fade in the mask
                gsap.from(canvasRefImage.current, {
                    duration: 1, // Duration in seconds
                    opacity: 0,
                    ease: "power2.out",


                });

                // fade in the mask from 0 to 1
                gsap.to(canvasRefImage.current, {
                    duration: 10, // Duration in seconds
                    opacity: 1,
                    ease: "power2.out",

                });


                gsap.to(canvasRefImage.current, {
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
            // ScrollTrigger code for pinning the component
            if (faceStoryRef.current) {
                ScrollTrigger.create({
                    trigger: faceStoryRef.current,
                    start: "center center",
                    end: "+=100%",
                    pin: ".pinFaceStory", // Pin the component
                    pinSpacing: true,

                });
            }
        });
        return () => ctx.revert(); // <-- CLEANUP!
    }, [])

    return (
        <div ref={faceStoryRef} className="flex pinFaceStory bg-[#130612]">
            {/* Image Sequence to the left */}
            <div className="w-[49vw] ml-2 h-screen ">
                <canvas ref={canvasRefImage} className="w-full h-full "/>
            </div>
            {/* Text to the right of the center */}
            <div className="w-[49vw] flex flex-col justify-center pl-8 -mt-[3rem] ">
                <h2 className="text-8xl lg:text-7xl font-bold text-white mb-6 max-w-[40vw]">{headline}</h2>
                <p className="font-sans font-semibold leading-7 tracking-tight text-left text-white max-w-[30vw]">{description}</p>
            </div>
        </div>
    );
};

export default FaceStory;
