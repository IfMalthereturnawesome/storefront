'use client';

import gsap from "gsap";
import React, {useEffect, useRef} from 'react';
import Lenis from '@studio-freight/lenis'
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";


if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const MaskSequence: React.FC = () => {
    const canvasRefVideo = useRef<HTMLCanvasElement | null>(null);


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
        if (canvasRefVideo.current) {
            const canvas = canvasRefVideo.current;

            canvas.width = 960;
            canvas.height = 640;

            const frameCount = 20;
            const currentFrame = (index: number) =>
                `/images/sequence/sleepmask_${(index)
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
                ease: "slow",
                scrollTrigger: {
                    trigger: ".pin-video",
                    start: "top top",
                    end: "+=50%",
                    scrub: true,


                },
                onUpdate: render,
            });



            // Fade in the mask
            gsap.from(canvasRefVideo.current, {
                duration: 0.5, // Duration in seconds
                opacity: 0,
                ease: "power2.out",
                delay: 1,


            });

            // fade in the mask from 0 to 1
            gsap.to(canvasRefVideo.current, {
                duration: 3, // Duration in seconds
                opacity: 1,
                ease: "power2.out",
                delay: 1,
            });


            // Add scaling at the end of the ScrollTrigger
            gsap.to(canvasRefVideo.current, {
                scale: 1.05,
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
    });
    return () => ctx.revert(); // <-- CLEANUP!
    }, [])

    return (
        <div className="m-0 p-0" >
            <div className="canvas-container h-[35vh] md:h-[50vh] xl:min-h-[45vh] 2xl:min-h-[50vh] 3xl:min-h-[61vh]">
                <canvas ref={canvasRefVideo} id="hero-lightpass" className={"max-h-[40vh]  2xs:max-h-[45vh] mt-[38vh] max-w-[98vw] md:max-h-[65vh] md:mt-[18vh] md:max-w-[100vw]"} />

            </div>
        </div>
    );

};

export default MaskSequence;