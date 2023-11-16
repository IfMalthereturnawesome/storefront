'use client';

import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis'
import SplitType from 'split-type';


gsap.registerPlugin(ScrollTrigger);

const ScrollSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const missionRef = useRef<HTMLDivElement>(null);
    const subtextContainerRef = useRef<HTMLDivElement>(null);
    const subtextRefs = useRef<HTMLDivElement[]>([]);
    const [initialBgColor, setInitialBgColor] = useState('');
    const spacerRef = useRef<HTMLDivElement>(null);

    const texts = [
        {text: "create innovative sleep products,", color: 'text-slate-12 dark:text-slate-12'},
        {
            text: "that have the customer's needs built right into the core of the business,",

            color: 'text-slate-12 dark:text-slate-12'
        },
        {
            text: "with the philosophy that quality sleep is paramount to success.",

            color: 'text-slate-12 dark:text-slate-12'
        }
    ];


    const backgroundClasses = [
        "bg-cyan-1 dark:bg-cyan-1",
        "bg-amber-4 dark:bg-mint-1",
        "bg-mint-6 dark:bg-violet-1",
    ];

    const missionTextClasses = [
        "text-blue-600 dark:text-about-1",
        "text-about-4 dark:text-about-2",
        "text-about-5 dark:text-about-3"
    ];

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(document.body.classList.contains('dark'));
        gsap.globalTimeline.timeScale(0.5);
        const lenis = new Lenis();
        // Update ScrollTrigger on scroll
        lenis.on('scroll', ScrollTrigger.update);

        const rafLoop = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(rafLoop);
        gsap.ticker.lagSmoothing(0);

        const interval = 100 / texts.length;


        // Subtext animations
        subtextRefs.current.forEach((ref, index) => {

            const splitText = new SplitType(ref, {types: "words,chars"});

            const tl = gsap.timeline({


                scrollTrigger: {
                    trigger: containerRef.current!,
                    start: index === texts.length - 1 ? `${index * interval}% center` : `${index * interval}% center`,
                    end: index === texts.length - 1 ? '100% center' : `${(index + 1) * interval}% center`,
                    scrub: 1.5,
                    // Existing code for onEnter and onLeaveBack inside the scrollTrigger
                    onEnter: () => {
                        // Existing logic for background color
                        containerRef.current?.classList.remove(...backgroundClasses.map(cls => cls.split(" ")).flat());
                        containerRef.current?.classList.add(...backgroundClasses[index].split(" "));

                        // New logic for text color
                        ref.classList.remove('text-slate-12', 'dark:text-slate-12');
                        ref.classList.add(...texts[index].color.split(" "));
                    },
                    onLeave: () => {
                        if (index < backgroundClasses.length - 1) {
                            containerRef.current?.classList.remove(...backgroundClasses.map(cls => cls.split(" ")).flat());
                            containerRef.current?.classList.add(...backgroundClasses[index + 1].split(" "));
                        }
                    },
                    onLeaveBack: () => {
                        // Existing logic for background color
                        if (index > 0) {
                            containerRef.current?.classList.remove(...backgroundClasses.map(cls => cls.split(" ")).flat());
                            containerRef.current?.classList.add(...backgroundClasses[index - 1].split(" "));
                        }
                        // New logic for text color
                        if (index > 0) {
                            ref.classList.remove('text-slate-12', 'dark:text-slate-12');
                            ref.classList.add(...texts[index - 1].color.split(" "));
                        }
                    },


                }
            });


            // Fade-in and move up from below
            tl.fromTo(
                ref,
                {y: 300, opacity: 0.2},
                {y: 0, opacity: 1, ease: 'power3.out'}
            );
            tl.from(splitText.words, {
                opacity: 0,
                y: 300,

                stagger: {amount: 0.5},
                ease: 'power2.out'
            });

            tl.to(ref, {y: 0, opacity: 1, ease: 'power2.inOut'});


            if (index === texts.length - 1) {
                tl.to(ref, {y: 0, opacity: 1, ease: 'power2.inOut'}, '+=1');
                tl.add('moveUpwards');
                tl.to(containerRef.current, {
                    backgroundColor: backgroundClasses[0],
                    duration: 3,
                    ease: 'power2.out'
                }, 'moveUpwards');

                tl.to(ref, {y: -80, opacity: 1, duration: 5, ease: 'power2.inOut'}, 'moveUpwards');
                tl.to(missionRef.current, {
                    y: 0,
                    duration: 5,
                    opacity: 0,
                    scale: 0.5,
                    ease: 'power2.inOut'
                }, 'moveUpwards');
                tl.to(ref, {y: -100, opacity: 0, ease: 'power2.in'}, '+=1.5');
            } else {
                tl.to(ref, {y: 0, opacity: 0, ease: 'power2.inOut'}, '+=0.5');
            }


        });


// Mission text color transition
        gsap.to(missionRef.current, {
            scrollTrigger: {
                trigger: containerRef.current!,
                start: 'top top',
                end: '100% center',
                scrub: true,
                onEnter: () => {
                    missionRef.current?.classList.remove(...missionTextClasses.map(cls => cls.split(" ")).flat());
                    missionRef.current?.classList.add(...missionTextClasses[0].split(" "));
                    if (containerRef.current) {
                        containerRef.current.style.backgroundColor = ''; // Remove the inline style
                    }
                },
                onUpdate: (self) => {
                    const progress = self.progress;
                    let index = 0;
                    if (progress > 0.33 && progress <= 0.66) {
                        index = 1;
                    } else if (progress > 0.66) {
                        index = 2;
                    }
                    missionRef.current?.classList.remove(...missionTextClasses.map(cls => cls.split(" ")).flat());
                    missionRef.current?.classList.add(...missionTextClasses[index].split(" "));
                    if (containerRef.current) {
                        containerRef.current.style.backgroundColor = ''; // Remove the inline style
                    }
                },
                onLeaveBack: () => {

                    if (containerRef.current) {
                        containerRef.current.style.backgroundColor = ''; // Remove the inline style
                    }
                }
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: spacerRef.current!,
                start: 'top center',
                end: 'center center',
                scrub: true,

                onEnter: () => {
                    spacerRef.current?.classList.remove(...backgroundClasses.map(cls => cls.split(" ")).flat());
                    spacerRef.current?.classList.add(...backgroundClasses[backgroundClasses.length - 1].split(" "));

                },
                onLeave: () => {
                    spacerRef.current?.classList.remove(...backgroundClasses.map(cls => cls.split(" ")).flat());
                    spacerRef.current?.classList.add(...backgroundClasses[0].split(" "));
                },
                onLeaveBack: () => {
                    // Remove the inline style for background color
                    if (containerRef.current) {
                        containerRef.current.style.backgroundColor = ''; // Remove the inline style
                    }
                    spacerRef.current?.classList.remove(...backgroundClasses.map(cls => cls.split(" ")).flat());
                    spacerRef.current?.classList.add(...backgroundClasses[backgroundClasses.length - 1].split(" "));
                },

            }
        });

// Use gsap.to() to animate the background color from the last to the first color
        tl.fromTo(
            spacerRef.current,
            {backgroundColor: backgroundClasses[backgroundClasses.length - 1]},
            {backgroundColor: backgroundClasses[0], duration: 1, ease: 'power2.out'}
        );

        return () => {
            lenis.destroy();
            gsap.ticker.remove(rafLoop);  // Cleanup the ticker
            gsap.globalTimeline.clear();


        };
    }, [backgroundClasses, missionTextClasses, texts]);

    return (
        <div>
            <div ref={containerRef}
                 style={{ backgroundColor: initialBgColor}}
                 className={"px-4 lg:px-20 smooth-bg-transition h-[600vh] lg:h-[500vh]"}>
                <div className={"w-[90%] lg:w-[80%]"}
                    style={{
                        position: 'fixed',
                        top: '42.8%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',

                        fontWeight: '700',
                    }}
                >
                    <div ref={missionRef}
                         className={`smooth-color-transition dark:text-about-1 text-4xl py-2 lg:text-4xl ${isDarkMode ? missionTextClasses[0].split(" ")[1] : missionTextClasses[0].split(" ")[0]}`}
                         >
                        {"Eight Athletics' mission is to"}
                    </div>

                    <div ref={subtextContainerRef} style={{position: 'relative', width: '100%', textAlign: 'center'}}>
                        {texts.map((text, index) => (
                            <div
                                ref={(el) => (subtextRefs.current[index] = el as HTMLDivElement)}
                                key={index}
                                style={{

                                    color: text.color,
                                    opacity: 0,
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',

                                    fontWeight: '700',
                                    lineHeight: '1.1',
                                }}
                                className={"w-[100%] lg:w-[60%]"}
                            >
                                <h3 className={"text-7xl lg:text-8xl"}>{text.text}</h3>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
            <div ref={spacerRef} className="h-[5vh] lg:h-[100vh] bg-mint-6 dark:bg-violet-1 spacer-smooth-bg-transition"></div>

        </div>

    );
};

export default ScrollSection;