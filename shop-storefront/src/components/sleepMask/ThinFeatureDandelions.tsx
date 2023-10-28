'use client';

// ThinFeature.tsx

import React, {useLayoutEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import {PlusIcon} from "@heroicons/react/24/solid";


const ThinFeatureDandelions: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textTopRef = useRef<HTMLDivElement>(null);
    const textBottomRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const plusIconTopRef = useRef<HTMLDivElement>(null);
    const plusIconBottomRef = useRef<HTMLDivElement>(null);
    const descTopRef = useRef<HTMLDivElement>(null);
    const descBottomRef = useRef<HTMLDivElement>(null);
    const hotspotTopRef = useRef<HTMLDivElement>(null);
    const hotspotBottomRef = useRef<HTMLDivElement>(null);
    const SlimAndSoftRef = useRef<HTMLDivElement>(null);
    const softLineRef = useRef<SVGLineElement>(null);
    const slimLineRef = useRef<SVGLineElement>(null);

    // Timeline REFS

    const masterTimeline = useRef(null);
    const containerTimelineRef = useRef(null);
    const textTimelineRef = useRef(null);
    const slimTimelineRef = useRef(null);
    const softTimelineRef = useRef(null);


    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            masterTimeline.current = gsap.timeline();
            if (containerRef.current && textTopRef.current && textBottomRef.current && canvasRef.current) {

                const canvas = canvasRef.current;
                canvas.width = containerRef.current.offsetWidth;
                canvas.height = containerRef.current.offsetHeight;
                const context = canvas.getContext("2d");
                const img = new Image();
                img.src = "/images/thinSequence/thinmask_000.png";

                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);
                };
                const sleepMask = {
                    frame: 0
                };

                gsap.to(sleepMask, {
                    frame: 0,
                    snap: "frame",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".pinThinFeature",
                        start: 'center center',
                        end: '+=3500',
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                    },

                });
                gsap.to(canvasRef.current, {
                    rotationX: -3,
                    rotationY: -3,
                    rotationZ: -3,
                    x: 15,
                    y: -15,
                    z: 5,
                    scale: 1.02,
                    duration: 2,
                    ease: 'sine.inOut',
                    scrollTrigger: {
                        trigger: ".pinThinFeature",
                        start: 'center center',
                        end: '+=3500',
                        scrub: true,
                    }
                });


                // ANIMATIONS START HERE


                masterTimeline.current = gsap.timeline({

                    scrollTrigger: {
                        trigger: ".pinThinFeature",
                        start: 'center center',
                        end: '+=1000',
                        scrub: true,


                    },
                });

                let animationsInitiated = false;

                containerTimelineRef.current = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".pinThinFeature",
                        start: 'center center',
                        end: '+=1000',
                        scrub: true,
                        onUpdate: (self) => {
                            if (self.progress === 1 && !animationsInitiated) {
                                animationsInitiated = true;  // Ensure we only initiate the animations once
                                initiateHighlightAnimations();
                            }
                        }
                    },
                });


                containerTimelineRef.current.to(containerRef.current, {
                    height: '74vh',
                    ease: 'Power3.out',
                    duration: 0.5,
                });

// Text animation with easing
                textTimelineRef.current = gsap.timeline();
                textTimelineRef.current
                    .to([textTopRef.current], {
                        y: '-37vh',
                        x: '50px',
                        scale: 0.7,
                        ease: 'Power3.out',
                        duration: 0.5,
                    }, '<')
                    .to([plusIconTopRef.current], {
                        y: '-37vh',
                        x: '50px',
                        ease: 'Power3.out',
                        duration: 0.5,
                    }, '<')
                    .to(textBottomRef.current, {
                        y: '37vh',
                        x: '-50px',
                        scale: 0.7,
                        ease: 'Power3.out',
                        duration: 0.5,
                        opacity: 0.7,
                    }, '<')
                    .to([plusIconBottomRef.current], {
                        y: '37vh',
                        x: '-50px',
                        ease: 'Power3.out',
                        duration: 0.5,
                    }, '<')
                    .to(plusIconBottomRef.current, {
                        opacity: 0.3,
                    }, '<');


                // Add child timelines to master timeline
                masterTimeline.current
                    .add(containerTimelineRef.current)
                    .add(textTimelineRef.current, '<');

                const initiateHighlightAnimations = () => {

                    const slimTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'center center',
                            end: '+=1000',
                            scrub: true,

                        },
                    });


                    // Slim feature animations
                    slimTimeline
                        .to(SlimAndSoftRef.current, {zIndex: 40})

                        .to(canvasRef.current, {marginTop: '-15vh', ease: 'Power3.out', duration: 8, delay: 2}, '-=2.5')
                        .to(containerRef.current, {
                            marginTop: '-14.5vh',
                            height: '88.95vh',
                            ease: 'Power3.out',
                            duration: 8
                        }, '<')
                        .to(textTopRef.current, {scale: 0.8, duration: 8, ease: "Power2.easeInOut"}, '<')
                        .to(plusIconTopRef.current, {opacity: 1, duration: 8}, '<')
                        .to([hotspotTopRef.current, slimLineRef.current],
                            {opacity: 1, duration: 2.5, stagger: 1.5, ease: "Power2.easeInOut"})
                        .to(descTopRef.current, {opacity: 1, duration: 5, ease: "none", color: '#fff'}, '<')
                        .to({}, {duration: 4, delay: 4})  // Adding a pause
                        .to(textTopRef.current, {scale: 0.7, duration: 2.5, ease: "Power2.easeInOut"}, '-=2.5')
                        .to(plusIconTopRef.current, {opacity: 0.5}, '<')
                        .to(descTopRef.current, {opacity: 0.7, duration: 3, ease: "none", color: '#e3dcdc'}, '<');

                    const softTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'bottom top',
                            end: '+=1000',
                            scrub: true,

                        },
                    });


                    // Soft feature animations
                    softTimeline
                        .to(SlimAndSoftRef.current, {zIndex: 40})
                        .to([hotspotTopRef.current, slimLineRef.current], {opacity: 0, duration: 3, ease: "none"}, '<')
                        .to(canvasRef.current, {marginTop: '-23vh', ease: 'Power3.out', duration: 8, delay: 2}, '-=2.5')
                        .to(containerRef.current, {
                            height: '99vh',
                            marginTop: '-4.4vh',
                            ease: 'Power3.out',
                            duration: 8
                        }, '<')
                        .to(textBottomRef.current, {opacity: 1, scale: 0.8, duration: 8, ease: "Power2.easeInOut"}, '<')
                        .to(plusIconBottomRef.current, {opacity: 1, duration: 8}, '<')
                        .to([hotspotBottomRef.current, softLineRef.current],
                            {opacity: 1, duration: 2.5, stagger: 0.5, ease: "Power2.easeInOut"})
                        .to(descBottomRef.current, {opacity: 1, duration: 5, ease: "none", color: '#fff'}, '<')
                        .to({}, {duration: 4, delay: 4})  // Adding a pause
                        .to([hotspotBottomRef.current, softLineRef.current], {
                            opacity: 0,
                            duration: 3,
                            ease: "none",
                            delay: 2
                        }, '<')


                    masterTimeline.current
                        .add(slimTimelineRef.current);
                    masterTimeline.current
                        .add(softTimelineRef.current, '+=10');

                }


            }
        });
        return () => ctx.revert(); // <-- CLEANUP!
    }, []);


    return (
        <>

            <section id={"SlimAndSoft"} ref={SlimAndSoftRef}
                     className="relative h-[100vh] max-h-100 flex flex-col  justify-center items-center pinThinFeature z-[1]"

            >

                <div className="mx-auto  flex flex-col justify-center mt-10 ">

                    {/* Text above the image always visible but cut in half */}
                    <div ref={textTopRef} className="absolute top-[51.6%] left-[41.5%] z-[2] "
                         style={{transform: 'translate(-50%, -50%)'}}>
                        <span className="text-9xl font-poppins font-thin text-custom-white ">Slim</span>
                    </div>

                    <div ref={plusIconTopRef} className="absolute top-[52.1%] left-[50%] z-[3] opacity-75"
                         style={{transform: 'translate(-50%, -50%)'}}>
                        <PlusIcon width={60} height={60} className={"text-white fill-white dark:fill-amberA-12"}/>
                    </div>

                    <div ref={plusIconBottomRef} className="absolute top-[52.1%] left-[50%] z-[3] opacity-0"
                         style={{transform: 'translate(-50%, -50%)'}}>
                        <PlusIcon width={60} height={60} className={"text-white fill-white dark:fill-amberA-12"}/>
                    </div>


                    {/* Text below the image */}
                    <div ref={textBottomRef} className="absolute top-[51.7%] left-[58.5%] z-[2]"
                         style={{transform: 'translate(-50%, -50%)'}}>
                        <span className="text-9xl font-poppins font-semibold text-custom-white">Soft</span>
                    </div>


                    {/* Container for Image Sequence */}

                    <div
                        ref={containerRef}
                        className="overflow-hidden grain relative border border-amberA-1 dark:border-amberA-12 w-[99vw] rounded-[2rem] z-[1] shadow-gray-900 shadow-2xl  "

                        style={{
                            background: 'linear-gradient(to bottom, #191919, #1f1f1f, #1c1c1c, #1f1f1f, #191919)',

                            height: '0px',
                            perspective: '1000px' // Perspective for 3D effect
                        }}
                    >

                        {/* Hotspot for Slim feature */}
                        <div ref={hotspotTopRef} className="absolute bottom-[53%] right-[25%] z-[6] opacity-0 ">
                            <div className="w-5 h-5 rounded-full bg-white "></div>
                        </div>
                        {/* Description for Slim feature */}
                        <div ref={descTopRef} className="absolute top-[19%] right-[23%] max-w-sm z-[2] opacity-0">
                            <p className="text-xl font-poppins text-slate-11 ">
                                A detailed description about the slim feature.
                                A detailed description about the slim feature.
                            </p>
                        </div>

                        {/* Hotspot for Soft feature */}
                        <div ref={hotspotBottomRef} className="absolute bottom-[51%] left-[38%] z-[6] opacity-0">
                            <div className="w-5 h-5 rounded-full bg-white "></div>
                        </div>

                        {/* Description for Soft feature */}
                        <div ref={descBottomRef} className="absolute max-w-sm bottom-[15%] left-[23%] z-[2] opacity-0">
                            <p className="text-xl font-poppins text-slate-11 ">
                                A detailed description about the soft feature.
                                A detailed description about the soft feature.
                            </p>
                        </div>

                        {/* SVG for the arrow for Slim feature */}
                        <svg className="absolute bottom-[8.4%] right-[0.6%] w-full h-full pointer-events-none z-[5]">
                            {/* Line from Slim hotspot to its description */}
                            <line ref={slimLineRef} x1="75%" y1="54%" x2="72%" y2="42%"
                                  className={"opacity-0 stroke-white"} strokeWidth="2"/>
                        </svg>

                        {/* SVG for the arrow for soft feature*/}
                        <svg className="absolute bottom-[8.6%] left-[28.5%] w-full h-full pointer-events-none z-[3]">
                            {/* Line from Soft hotspot to its description */}
                            <line ref={softLineRef} x1="6%" y1="78%" x2="10%" y2="57%"
                                  className={"opacity-0 stroke-white"} strokeWidth="2"/>
                        </svg>
                        {/* Canvas for Image Sequence */}
                        <canvas ref={canvasRef} className="object-contain object-center w-full h-[74vh] z-[1]"></canvas>
                    </div>
                </div>
            </section>
        </>
    );
};
export default ThinFeatureDandelions;