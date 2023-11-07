'use client';

import gsap from "gsap";
import React, {useLayoutEffect, useRef} from 'react';
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import MediaQuery from "react-responsive";
import useBetterMediaQuery from 'utils/useBetterMediaQuery'



interface FaceStoryProps {
    headline: string;
    description: string;
}

const FaceStory: React.FC<FaceStoryProps> = ({headline, description}) => {
    const isDesktop = useBetterMediaQuery('(min-width: 1024px)');
    const faceStoryRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);



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
                            end: "+=79%",
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
                        duration: 10,
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
        });
        return () => ctx.revert();
    }, [isDesktop])

    return (
        <>
        {isDesktop && (
        <div id={"crafted-from-thousands-of-unique-faces"} ref={faceStoryRef}
             className="flex pinFaceStory bg-[#130612] z-[1]">
                <div className="w-fit ml-2 h-screen ">

                    <canvas ref={canvasRef} className="w-full h-full object-contain" />

                </div>

            <div className="w-auto mx-auto flex flex-col justify-center pl-8 -mt-[3rem] ">
                <h2 className="text-8xl lg:text-7xl font-bold text-white mb-6 max-w-[30vw] 3xl:max-w-[33vw]">{headline}</h2>
                <p data-aos="fade-up"
                   className="text-xl font-sans font-semibold leading-7 tracking-tight text-left text-custom-white max-w-[30vw]">{description}</p>
            </div>
        </div>
        )}
        </>
    );
};

export default FaceStory;
