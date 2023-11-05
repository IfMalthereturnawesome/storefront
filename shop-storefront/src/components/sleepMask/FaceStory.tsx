'use client';

import gsap from "gsap";
import React, {useLayoutEffect, useRef} from 'react';
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import MediaQuery from "react-responsive";


interface FaceStoryProps {
    headline: string;
    description: string;
}

const FaceStory: React.FC<FaceStoryProps> = ({headline, description}) => {
    const canvasRefImage = useRef<HTMLCanvasElement | null>(null);
    const faceStoryRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {


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
                    frame: 1,
                };

                for (let i = 0; i < frameCount; i++) {
                    const img = new Image();
                    img.src = currentFrame(i);
                    images.push(img);
                }

                images[1].onload = () => {
                    if (canvasRefImage.current) {
                        const context = canvasRefImage.current.getContext("2d");
                        context?.clearRect(0, 0, canvasRefImage.current.width, canvasRefImage.current.height);
                        context?.drawImage(images[1], 0, 0, canvasRefImage.current.width, canvasRefImage.current.height);
                    }
                };


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
                            end: "+=79%",
                            scrub: true,
                            onEnter: render,
                        },
                        onUpdate: render,
                    }
                );


                gsap.fromTo(canvasRefImage.current,
                    {
                        opacity: 0,
                    },
                    {
                        duration: 10,
                        opacity: 1,
                        ease: "power2.out",
                    }
                );


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
        return () => ctx.revert(); // <-- CLEANUP!
    }, [])

    return (

        <div id={"crafted-from-thousands-of-unique-faces"} ref={faceStoryRef}
             className="flex pinFaceStory bg-[#130612] z-[1]">
            {/* Image Sequence to the left */}
            <div className="w-fit ml-2 h-screen ">
                <MediaQuery minWidth={1024}>
                <canvas ref={canvasRefImage} className="w-full h-full object-contain"/>
                </MediaQuery>

            </div>
            {/* Text to the right of the center */}
            <div className="w-auto mx-auto flex flex-col justify-center pl-8 -mt-[3rem] ">
                <h2 className="text-8xl lg:text-7xl font-bold text-white mb-6 max-w-[30vw] 3xl:max-w-[33vw]">{headline}</h2>
                <p data-aos="fade-up"
                   className="text-xl font-sans font-semibold leading-7 tracking-tight text-left text-custom-white max-w-[30vw]">{description}</p>
            </div>
        </div>

    );
};

export default FaceStory;
