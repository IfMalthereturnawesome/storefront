'use client';

// LightweightFeature.tsx

import React, {useEffect, useRef, useMemo, useState, useCallback} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

import Lenis from '@studio-freight/lenis';
import usePageSettings from "@/utils/hooks/usePageSettings";



if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Initialize Hooke's Law constants
const m = 1;  // mass in kg
const k = 10; // spring constant in N/m

const timeIncrement = 0.01; // adjust based on animation speed
const COIN_LAND_FRAMES = [20, 40, 65, 90];
const COIN_LAND_FRAMES_UP = [18, 38, 63, 88];
const INITIAL_TILT = -13;
const LEVER_LENGTH = 278;

const oscillationSpeed = 0.05;
const oscillationAmplitude = 1.2;

const LightweightFeature = () => {
    // usePageSettings();

    const lottieContainer = useRef(null);
    const [rightBowlWeight, setRightBowlWeight] = useState(0);
    const [hitFrames, setHitFrames] = useState(new Set());
    const [coinsLanded, setCoinsLanded] = useState(0);
    const [scrollDirection, setScrollDirection] = useState(0);  // 0 for initial, 1 for down, -1 for up


    const angularFrequency = useMemo(() => Math.sqrt(k / m), []);

    // Initialize time
    let time = 0;

    let oscillationTime = 0;

    let lastFrame = -1;

    // Function to handle bowl rotation
    const rotateBowl = useCallback((selector: gsap.TweenTarget, start: any, end: number, delay = 0, duration = 0.3, easing = "easeInOut") => {

        const oscillate = (amplitude: number, duration: number) => {
            if (Math.abs(amplitude) < 0.1) {
                return;
            }
            gsap.to(selector, {
                rotation: amplitude,
                duration: duration,
                onComplete: () => {
                    oscillate(-amplitude * 0.9, duration * 1.1);
                }
            });
        };

        gsap.to(selector, {
            rotation: start,
            duration: duration,
            delay: delay,
            ease: easing,
            onComplete: () => {
                gsap.to(selector, {
                    rotation: end,
                    duration: duration,
                    ease: easing,
                    onComplete: () => {
                        gsap.to(selector, {
                            rotation: 0,
                            duration: duration,
                            ease: easing,
                            onComplete: () => {
                                // Start the oscillation after initial animation
                                oscillate(end * 0.5, duration);
                            }
                        });
                    }
                });
            }
        });
    }, []);


    useEffect(() => {


        const initialTiltRad = INITIAL_TILT * (Math.PI / -180);

        const deltaYInitial = LEVER_LENGTH * Math.sin(initialTiltRad);
        const deltaXInitial = LEVER_LENGTH * (1 - Math.cos(initialTiltRad));

        const leftBowlInitial = {x: 0, y: 0};
        const rightBowlInitial = {x: 0, y: 0};

        const leftBowlNewInitial = {
            x: leftBowlInitial.x - deltaXInitial,
            y: leftBowlInitial.y - deltaYInitial
        };
        const rightBowlNewInitial = {
            x: rightBowlInitial.x + deltaXInitial,
            y: rightBowlInitial.y + deltaYInitial
        };

        // Set initial positions
        gsap.set('#lever', {rotation: INITIAL_TILT, transformOrigin: 'bottom center'});
        gsap.set('#left_bowl', {x: rightBowlNewInitial.x, y: rightBowlNewInitial.y});
        gsap.set('#right_bowl', {x: leftBowlNewInitial.x, y: leftBowlNewInitial.y});
        gsap.set('#leftCircle', {x: rightBowlNewInitial.x, y: rightBowlNewInitial.y});
        gsap.set('#rightCircle', {x: leftBowlNewInitial.x, y: leftBowlNewInitial.y});


        const lenis = new Lenis();
        // Update ScrollTrigger on scroll
        lenis.on('scroll', ScrollTrigger.update);


        const rafLoop = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(rafLoop);
        gsap.ticker.lagSmoothing(0);

        // if (lottieContainer.current) {
        //     const animation = lottie.loadAnimation({
        //         container: lottieContainer.current,
        //         renderer: 'svg',
        //         loop: true,
        //         autoplay: false,
        //         path: '/images/product/coins-animation.json' // Replace with your Lottie JSON path
        //     });
        //
        //
        //     // Initialize ScrollTrigger
        //     ScrollTrigger.create({
        //         trigger: '.pinScale',
        //         start: 'center center',
        //         end: '+=2000px',
        //         pin: true,
        //         pinSpacing: true,
        //         markers: false,
        //         onEnter: () => {
        //             setCoinsLanded(0);
        //             setRightBowlWeight(0);
        //
        //         },
        //         onLeave: () => {
        //             //     reset coinsLanded
        //             setCoinsLanded(4);
        //             setRightBowlWeight(20);
        //
        //
        //         },
        //
        //         onUpdate: (self) => {
        //             // Update the scroll direction
        //             setScrollDirection(self.direction);
        //
        //             const frame = Math.floor(self.progress * animation.totalFrames);
        //             animation.goToAndStop(frame, true);
        //
        //
        //             if (frame < COIN_LAND_FRAMES[0]) {
        //                 setCoinsLanded(0);
        //                 setRightBowlWeight(0);
        //                 return;
        //             }
        //
        //             if (self.direction === -1) {
        //                 // Scrolling Up
        //                 const lastFrameWhereCoinLanded = COIN_LAND_FRAMES_UP.filter(f => f < frame).pop();
        //
        //                 if (lastFrameWhereCoinLanded !== undefined) {
        //                     const indexOfLastFrame = COIN_LAND_FRAMES_UP.indexOf(lastFrameWhereCoinLanded);
        //
        //                     // Update coinsLanded and rightBowlWeight based on the last frame where a coin landed
        //                     setCoinsLanded(indexOfLastFrame + 1);
        //                     setRightBowlWeight((indexOfLastFrame + 1) * 5);
        //
        //                 } else {
        //                     // Reset if no coins have landed
        //                     setCoinsLanded(0);
        //                     setRightBowlWeight(0);
        //                 }
        //             }
        //
        //
        //             const indexOfFrame = COIN_LAND_FRAMES.indexOf(frame);
        //
        //             if (indexOfFrame !== -1 && !hitFrames.has(frame)) {
        //                 const newSet = new Set(hitFrames);
        //                 newSet.add(frame);
        //                 setHitFrames(newSet);
        //
        //                 setCoinsLanded(indexOfFrame + 1);
        //
        //                 // Update the right bowl weight
        //                 setRightBowlWeight((indexOfFrame + 1) * 5);
        //                 oscillationTime = 0;
        //
        //             } else if (indexOfFrame === -1 && hitFrames.has(frame)) {
        //                 const newSet = new Set(Array.from(hitFrames).filter(f => f !== frame));
        //                 setHitFrames(newSet);
        //
        //             }
        //
        //             if (coinsLanded > 0) {
        //                 oscillationTime += oscillationSpeed;
        //             }
        //
        //             // Update time and angular position based on Hooke's Law
        //             time += timeIncrement;
        //
        //             const A = oscillationAmplitude;
        //             const b = 0.05;  // Damping constant
        //             const w = angularFrequency;
        //             const phi = 0;  // Phase angle
        //
        //
        //             oscillationTime += oscillationSpeed;
        //             const angleOscillation = A * Math.exp(-b * oscillationTime) * Math.cos(w * oscillationTime + phi);
        //
        //             // This block of code is where you calculate 'newTilt' based on oscillation and other factors
        //             const newTiltBase = -15 + (self.progress * 30) + angleOscillation;
        //
        //             // Initialize a variable to hold the actual new tilt angle
        //             let newTilt = newTiltBase;
        //             const newTiltRad = newTilt * (Math.PI / -180);
        //
        //             if (rightBowlWeight === 15) {
        //                 // Slightly adjust the tilt to show that the right bowl is heavier by 1 gram
        //                 // You can fine-tune this value to get the exact visual effect you want
        //                 newTilt += 0.5;  // Add a slight tilt
        //             }
        //
        //
        //             gsap.to('#lever', {rotation: newTilt, transformOrigin: 'bottom center', duration: 0.3});
        //
        //
        //             const deltaY = LEVER_LENGTH * Math.sin(newTiltRad);
        //             const deltaX = LEVER_LENGTH * (1 - Math.cos(newTiltRad));
        //
        //             const leftBowlNew = {
        //                 x: leftBowlInitial.x - deltaX,
        //                 y: leftBowlInitial.y - deltaY
        //             };
        //             const rightBowlNew = {
        //                 x: rightBowlInitial.x + deltaX,
        //                 y: rightBowlInitial.y + deltaY
        //             };
        //
        //             gsap.to('#left_bowl', {x: rightBowlNew.x, y: rightBowlNew.y, duration: 0.3});
        //             gsap.to('#right_bowl', {x: leftBowlNew.x, y: leftBowlNew.y, duration: 0.3});
        //             gsap.to('#leftCircle', {x: rightBowlNew.x, y: rightBowlNew.y, duration: 0.3});
        //             gsap.to('#rightCircle', {x: leftBowlNew.x, y: leftBowlNew.y, duration: 0.3});
        //
        //
        //             //     swing the left bowl a bit to the right and left when a coin lands with rotation
        //             if (COIN_LAND_FRAMES.includes(frame) && !hitFrames.has(frame)) {
        //
        //                 lastFrame = frame;
        //                 oscillationTime = 0;
        //
        //                 // Calculate the weight difference between the two bowls
        //                 const weightDifference = 14 - rightBowlWeight; // 14 grams is the constant weight of the left bowl
        //
        //                 // Calculate the rotation factor for the left bowl based on this weight difference
        //                 const rotationFactorLeft = weightDifference / 14; // This will be a value between 0 and 1
        //
        //
        //                 const endAngleLeft = -0.5 * rotationFactorLeft;
        //
        //                 const endAngleRight = 3.2 * (0.7 / (indexOfFrame + 1));
        //
        //
        //                 rotateBowl('#left_bowl',
        //                     0.5 * rotationFactorLeft,
        //                     endAngleLeft,
        //                     0.03,
        //                     0.2,
        //                     "sin.out"
        //                 );
        //
        //                 rotateBowl('#right_bowl',
        //                     -endAngleRight,
        //                     endAngleRight,
        //                     0,
        //                     0.2,
        //                     "sin.out"
        //                 );
        //
        //
        //             }
        //
        //
        //         },
        //
        //     })
        // }
    }, []);

    return (
        <section className="h-[100vh] max-h-100 flex flex-col justify-center items-center bg-cbg pinScale">
            <div className="mx-auto flex flex-col justify-center space-y-2 pt-[8vh] text-left w-2/4">
                <span className="text-xl pl-1 font-semibold uppercase tracking-widest">Just 14 grams</span>
                <h2 className="text-8xl font-bold ">
                    Minimal weight
                </h2>
                <h2 className="text-8xl font-bold">
                    Maximum comfort
                    <br/>

                </h2>
            </div>

            <div id="scaleContainer" className="flex justify-center items-center relative w-full h-full">
                {/* Sleep Mask */}


                {/* SVG for Scale */}
                <svg className="w-[750px] h-[409px] scale-150" xmlns="http://www.w3.org/2000/svg">
                    {/* Define shadow filter */}
                    <defs>
                        <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
                            <feComponentTransfer in="SourceAlpha">
                                <feFuncA type="table" tableValues="1 0"/>
                            </feComponentTransfer>
                            <feGaussianBlur stdDeviation="3"/>
                            <feOffset dx="4" dy="4" result="offsetblur"/>
                            <feFlood floodColor="black" result="color"/>
                            <feComposite in2="offsetblur" operator="in"/>
                            <feComposite in2="SourceAlpha" operator="in"/>
                            <feMerge>
                                <feMergeNode in="SourceGraphic"/>
                                <feMergeNode/>
                            </feMerge>
                        </filter>

                        <filter id="shadowFilter" x="0" y="0" width="200%" height="200%">
                            <feComponentTransfer in="SourceAlpha">
                                <feFuncA type="table" tableValues="1 0"/>
                            </feComponentTransfer>
                            <feGaussianBlur stdDeviation="4"/>
                            <feOffset dx="4" dy="4" result="offsetblur"/>
                            <feFlood floodColor="black" result="color"/>
                            <feComposite in2="offsetblur" operator="in"/>
                            <feComposite in2="SourceAlpha" operator="in" />
                            <feMerge>
                                <feMergeNode in="SourceGraphic" />
                                <feMergeNode />
                            </feMerge>
                        </filter>
                    </defs>
                    <g style={{pointerEvents: "all"}}>
                        <g id="left_bowl" filter="url(#shadowFilter)">
                            <image href="/images/product/sleep-mask-alpha.png" x="-25" y="80" height="260"
                                   width="260"/>
                        </g>
                        <g id="right_bowl">
                            <foreignObject x="620" y="100" width="40" height="40">
                                <div ref={lottieContainer}/>
                            </foreignObject>
                        </g>

                        {/* Lever */}
                        <path fill="#FFB300C2" stroke="#000"
                              d="M99,128.8725 L655.11931,127.8225 L655.11931,131.8225 L99,132.8725 Z" id="lever"/>

                    </g>
                </svg>


            </div>

        </section>
    );
};

export default LightweightFeature;
