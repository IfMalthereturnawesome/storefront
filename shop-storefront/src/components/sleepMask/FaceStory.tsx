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

                const frameCount = 45;
                const currentFrame = (index: number) =>
                    `/images/sequence/sleepmask_${(index + 100)
                        .toString()
                        .padStart(1, "0")}.png`;


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
                    const canvas = canvasRefImage.current;

                    if (canvas) {
                        const context = canvas.getContext("2d");
                        if (sleepMask.frame === frameCount - 1) {
                            // Stick to the last frame
                            context?.drawImage(images[frameCount - 1], 0, 0);
                        } else {
                            context?.drawImage(images[sleepMask.frame], 0, 0);

                        }
                    }
                }

                //  get current scale of the canvas
                const scale = gsap.getProperty(canvasRefImage.current, "scale");


                gsap.to(sleepMask, {
                        frame: frameCount - 1,
                        snap: "frame",
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".pinFaceStory",
                            start: "top top",
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
                    delay: 1,


                });

                // fade in the mask from 0 to 1
                gsap.to(canvasRefImage.current, {
                    duration: 3, // Duration in seconds
                    opacity: 1,
                    ease: "power2.out",
                    delay: 1,
                });


                // Add scaling at the end of the ScrollTrigger
                gsap.to(canvasRefImage.current, {
                    scale: 1,
                    ease: "none",
                    y: "-20px",

                    scrollTrigger: {
                        trigger: ".pin-video",
                        start: "top top",
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
                    markers: true,
                });
            }
        });
        return () => ctx.revert(); // <-- CLEANUP!
    }, [])

    return (
        <div ref={faceStoryRef} className="flex pinFaceStory bg-purple-1">
            {/* Image Sequence to the left */}
            <div className="w-[49vw] ml-2 h-screen ">
                <canvas ref={canvasRefImage} className="w-[98%] h-full"/>
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
