'use client';

// ThinFeature.tsx

import React, {useEffect, useRef, useMemo, useState, useCallback} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {SplitText} from 'gsap/SplitText';
import usePageSettings from "@/utils/hooks/usePageSettings";

import Lenis from "@studio-freight/lenis";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

const ThinFeature: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textTopRef = useRef<HTMLDivElement>(null);
    const textBottomRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const textTopAnimatedRef = useRef<HTMLDivElement>(null);
    let [hasReachedHeight, setHasReachedHeight] = useState(false);

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
            canvas.width = 1200;
            canvas.height = 500;

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
                if (canvas){

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


            const handleMouseMove = (event: MouseEvent) => {
                if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const x = event.clientX - rect.left; //x position within the element.
                    const y = event.clientY - rect.top;  //y position within the element.
                    const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

                    const xc = rect.width / 2;
                    const yc = rect.height / 2;
                    const zc = Math.sqrt(Math.pow(xc, 2) + Math.pow(yc, 2));


                    const dx = x - xc;
                    const dy = y - yc;
                    const dz = z - zc;

                    gsap.to([containerRef.current, textTopRef.current,  textBottomRef.current], {
                        rotationY: 0.001 * dx,  // Reduced multiplier
                        rotationX: -0.001 * dy, // Reduced multiplier
                        rotationZ: 0.001 * dz,  // Reduced multiplier
                        skewX: 0.001 * dx,      // Reduced multiplier
                        skewY: 0.001 * dy,      // Reduced multiplier
                        skewZ: 0.001 * dz,      // Reduced multiplier
                        ease: "none",     // Changed easing for smoother effect
                        duration: 0.3,          // Increased duration for smoother effect
                        transformPerspective: 1000,
                        transformOrigin: "center"
                    });
                }
            };



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
                height: '500px',
                ease: 'Power3.out', // Easing: Starts quick, slows down towards the end
                duration: 0.5, // Slightly longer duration for smoother effect

            });

// Text animation with easing
            const textTimeline = gsap.timeline();
            textTimeline.to([textTopRef.current, textTopAnimatedRef.current], {
                y: '-250px',
                x: '50px',
                scale: 0.7,
                ease: 'Power3.out', // Easing: Starts quick, slows down towards the end
                duration: 0.5, // Same duration as containerTimeline for synchronization
            }, '<')
                .to(textBottomRef.current, {
                    y: '250px',
                    x: '-50px',
                    scale: 0.7,
                    ease: 'Power3.out', // Easing: Starts quick, slows down towards the end
                    duration: 0.5, // Same duration as containerTimeline for synchronization
                }, '<');



            // Add child timelines to master timeline
            masterTimeline.add(containerTimeline).add(textTimeline, '<');

            containerRef.current?.addEventListener('mousemove', handleMouseMove);
            return () => {
                containerRef.current?.removeEventListener('mousemove', handleMouseMove);
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
                    background: 'linear-gradient(to bottom, #2D4C5B, #1E3841, #1C343C, #244958, #32555C)'
                }}
            >
            <div className="grain">
                <div className="grain-texture">

                </div>
            </div>
            <div className="mx-auto flex flex-col justify-center ">

                {/* Text above the image always visible but cut in half */}
                <div ref={textTopRef} className="absolute top-[49.6%] left-[41.5%] z-[2] " style={{ transform: 'translate(-50%, -50%)' }}>
                    <span className="text-9xl font-poppins font-thin text-custom-white ">Razor</span>
                </div>

                {/* Text above the image that will be animated in */}
                {/*<div ref={textTopAnimatedRef} className="absolute top-[49.6%] left-[41.5%] z-0 opacity-0" style={{ transform: 'translate(-50%, -50%)',opacity:0 }}>*/}
                {/*    <span className="text-9xl font-poppins font-thin text-custom-white">Razor</span>*/}
                {/*</div>*/}




                {/* Text below the image */}
                <div ref={textBottomRef} className="absolute top-[50%] left-[58.5%] z-[2]" style={{  transform: 'translate(-50%, -50%)' }}>
                    <span className="text-9xl font-poppins font-thin text-custom-white">Thin</span>
                </div>



                {/* Container for Image Sequence */}
                <div
                    ref={containerRef}
                    className="overflow-hidden relative border border-amber-10 rounded-[2rem] bg-white z-[1] shadow-cyan-1 shadow-2xl  "
                    style={{
                        height: '0px',
                        width: '1000px',

                        perspective: '1000px' // Perspective for 3D effect
                    }}
                >
                    {/* Canvas for Image Sequence */}
                    <canvas ref={canvasRef} className="object-cover w-[1200px] h-full"></canvas>
                </div>


            </div>
        </section>
        </>
    );
};
export default ThinFeature;