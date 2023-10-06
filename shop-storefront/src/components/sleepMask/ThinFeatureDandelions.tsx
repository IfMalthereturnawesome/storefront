'use client';

// ThinFeature.tsx

import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {SplitText} from 'gsap/SplitText';
import usePageSettings from "@/utils/hooks/usePageSettings";
import {PlusIcon} from "@heroicons/react/24/solid";

import Lenis from "@studio-freight/lenis";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

const ThinFeatureDandelions: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textTopRef = useRef<HTMLDivElement>(null);
    const textBottomRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const textTopAnimatedRef = useRef<HTMLDivElement>(null);
    let [hasReachedHeight, setHasReachedHeight] = useState(false);
    const plusIconTopRef = useRef<HTMLDivElement>(null);
    const plusIconBottomRef = useRef<HTMLDivElement>(null);


    // usePageSettings();

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


            if (containerRef.current && textTopRef.current && textBottomRef.current && canvasRef.current) {

                const canvas = canvasRef.current;
                canvas.width = 1000;
                canvas.height = 700;

                const frameCount = 112;
                const currentFrame = (index: number) =>
                    `/images/sequencetwo/thinmask_${(index)
                        .toString()
                        .padStart(3, "0")}.png`;

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

                        context?.drawImage(images[sleepMask.frame], 0, 0);
                    }
                };

                gsap.to(sleepMask, {
                    frame: frameCount - 1,
                    snap: "frame",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".pinThinFeature",
                        start: 'center center',
                        end: '+=3000',
                        scrub: true,
                        pin: true, // Pinning here
                    },
                    onUpdate: render,
                });


                // ANIMATIONS START HERE

                const masterTimeline = gsap.timeline({

                    scrollTrigger: {
                        trigger: ".pinThinFeature",
                        start: 'center center',
                        end: '+=1000',
                        scrub: true,


                    },
                });

                const containerTimeline = gsap.timeline();
                containerTimeline.to(containerRef.current, {
                    height: '70vh',
                    ease: 'Power3.out', // Easing: Starts quick, slows down towards the end
                    duration: 0.5, // Slightly longer duration for smoother effect

                });

// Text animation with easing
                const textTimeline = gsap.timeline();
                textTimeline
                    .to([textTopRef.current], {
                        y: '-35vh',
                        x: '50px',
                        scale: 0.7,
                        ease: 'Power3.out',
                        duration: 0.5,
                    }, '<')
                    .to([plusIconTopRef.current], {
                        y: '-35vh',
                        x: '50px',
                        ease: 'Power3.out',
                        duration: 0.5,
                    }, '<')
                    .to(textBottomRef.current, {
                        y: '35vh',
                        x: '-50px',
                        scale: 0.7,
                        ease: 'Power3.out',
                        duration: 0.5,
                    }, '<')
                    .to([plusIconBottomRef.current], {
                        y: '35vh',
                        x: '-50px',
                        ease: 'Power3.out',
                        duration: 0.5,
                    }, '<')
                    .to(plusIconBottomRef.current, {
                        opacity: 1,
                    }, '<');


                // Add child timelines to master timeline
                masterTimeline.add(containerTimeline).add(textTimeline, '<');


                return () => {

                };
            }
        });
        return () => ctx.revert(); // <-- CLEANUP!
    }, []);


    return (
        <>

            <section
                className="relative h-[100vh] max-h-100 flex flex-col justify-center items-center pinThinFeature"
                style={{
                    background: 'linear-gradient(to bottom, #242424, #2B2B2B, #252525, #2B2B2B, #242424)'
                }}
            >
                <div className="grain">
                    <div className="grain-texture">

                    </div>
                </div>
                <div className="mx-auto flex flex-col justify-center mt-10">

                    {/* Text above the image always visible but cut in half */}
                    <div ref={textTopRef} className="absolute top-[51.6%] left-[41.5%] z-[2] "
                         style={{transform: 'translate(-50%, -50%)'}}>
                        <span className="text-9xl font-poppins font-thin text-custom-white ">Slim</span>
                    </div>

                    <div ref={plusIconTopRef} className="absolute top-[52.1%] left-[50%] z-[3] "
                         style={{transform: 'translate(-50%, -50%)'}}>
                        <PlusIcon width={60} height={60} className={"text-white fill-white"}/>
                    </div>

                    <div ref={plusIconBottomRef} className="absolute top-[52.1%] left-[50%] z-[3] opacity-0"
                         style={{transform: 'translate(-50%, -50%)'}}>
                        <PlusIcon width={60} height={60} className={"text-white fill-white"}/>
                    </div>


                    {/* Text below the image */}
                    <div ref={textBottomRef} className="absolute top-[51.7%] left-[58.5%] z-[2]"
                         style={{transform: 'translate(-50%, -50%)'}}>
                        <span className="text-9xl font-poppins font-semibold text-custom-white">Soft</span>
                    </div>


                    {/* Container for Image Sequence */}
                    <div
                        ref={containerRef}
                        className="overflow-hidden relative border border-amber-10 w-screen rounded-[2rem] bg-white z-[1] shadow-gray-900 shadow-2xl  "
                        style={{
                            height: '0px',
                            perspective: '1000px' // Perspective for 3D effect
                        }}
                    >
                        {/* Canvas for Image Sequence */}
                        <canvas ref={canvasRef} className="object-cover w-[100vw]"></canvas>
                    </div>


                </div>
            </section>
        </>
    );
};
export default ThinFeatureDandelions;