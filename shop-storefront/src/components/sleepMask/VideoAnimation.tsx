'use client';

import React, {RefObject, useEffect, useLayoutEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {PauseIcon} from "@radix-ui/react-icons";
import {PlayIcon} from '@heroicons/react/20/solid';
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import SplitType from 'split-type';

import MaskSequence from "@/components/sleepMask/MaskSequence";


if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface VideoAnimationProps {
    product: string,
    description1: string;
    description2: string;
    description3: string;
}

const VideoAnimation: React.FC<VideoAnimationProps> = ({product, description1, description2, description3}) => {
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [showVideo, setShowVideo] = useState(true);
    const [showPlayAgainButton, setShowPlayAgainButton] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const [showHeaderText, setShowHeaderText] = useState(false);
    const [showOneNightText, setShowOneNightText] = useState(false);
    const oneNightRef = useRef<HTMLDivElement>(null);
    const smallDreamRef = useRef<HTMLDivElement>(null);
    const [showSmallDreamText, setShowSmallDreamText] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showCanvas, setShowCanvas] = useState(false);
    const descriptionRef1 = useRef(null);
    const descriptionRef2 = useRef(null);
    const descriptionRef3 = useRef(null);

    const smoothDisappearOneNight = () => {
        if (oneNightRef.current) {
            gsap.to(oneNightRef.current, {
                opacity: 1,
                duration: 3,
                onComplete: () => {
                    if (oneNightRef.current) {
                        oneNightRef.current.style.zIndex = '0';
                    }
                }
            });
        }
    }


    const smoothDisappear = () => {
        setShowCanvas(true);
        setShowHeaderText(false);

        if (headerRef.current) {
            headerRef.current.style.opacity = '0';
        }
        smoothDisappearHeader();


        gsap.to(videoContainerRef.current, {
            opacity: 0, duration: 1,
            onComplete: () => {

                setShowVideo(false);

                setShowPlayAgainButton(true);
                if (videoRef.current) {
                    videoRef.current.pause();  // Pause the video first
                    videoRef.current.addEventListener('loadedmetadata', function () {
                        this.currentTime = 0;  // Rewind the video to the beginning
                    }, false);
                    smoothDisappearOneNight();

                    setIsPlaying(false);  // Set isPlaying to false
                }


            }
        });
    };


    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            let mm = gsap.matchMedia();
            mm.add('(max-width: 399px)', () => {
                setState(false);
            });
            mm.add('(min-width: 400px)', () => {
                setState(true);
                if (!state) return;
                if (wrapperRef.current) {


                    ScrollTrigger.create({
                        trigger: ".pin-video",
                        start: "top top",
                        end: "bottom top",
                        pin: true,
                        pinSpacing: true,
                        refreshPriority: 1,
                        onLeave: ({progress, direction, isActive}) => {
                            if (isActive) {
                                smoothDisappear();
                                setShowSmallDreamText(true);
                                setShowOneNightText(true);
                                setShowDescription(true);
                            }
                        },
                        onEnterBack: ({progress, direction, isActive}) => {
                            if (isActive) {
                                // Your logic here


                            }
                        },
                    });
                }
            });
        });

        return () => {
            // Cleanup logic here...
            ctx.revert();
        };
    }, [state, smoothDisappear]);


    // VIDEO
    useEffect(() => {
        let ctx = gsap.context(() => {

            if (headerRef.current) {

                headerRef.current.style.opacity = '0';
            }
            if (showPlayAgainButton) {
                setShowHeaderText(false);


            }
            const tl = gsap.timeline();
            if (videoRef.current) {
                tl.fromTo(
                    videoRef.current,
                    {opacity: 0},
                    {opacity: 1, duration: 1}
                );
            }

            const timer = setTimeout(() => {

                if (videoRef.current) {
                    videoRef.current.play().then(() => {
                        smoothDisappearHeader();
                        setIsPlaying(true);

                    }).catch((error) => {
                        console.error("Video play failed:", error);
                    });
                }
            }, 1000);

            if (videoContainerRef.current) {
                ScrollTrigger.create({
                        trigger: videoContainerRef.current,
                        start: "top top",
                        end: "2%",
                        onLeave: () => {
                            setShowVideo(false);
                            smoothDisappear();
                            setShowPlayAgainButton(true);
                            setShowSmallDreamText(true);
                            setShowOneNightText(true);
                            setShowDescription(true);
                        },

                        onEnterBack: () => {
                            // Do nothing to prevent reappearing

                        }
                    }
                );
            }

            if (videoRef.current) {
                videoRef.current.addEventListener('ended', () => {
                    smoothDisappear();
                    setShowSmallDreamText(true);
                    setShowOneNightText(true);
                    setShowDescription(true);

                });
            }


            return () => {

                clearTimeout(timer);

            };
        });
        return () => ctx.revert(); // <-- CLEANUP!

    }, []);


    // ACHIEVE YOUR DREAMS - HEADER
    const useShowHeaderAnimation = (showHeaderText: boolean, headerRef: RefObject<HTMLDivElement>) => {
        useEffect(() => {
            let ctx = gsap.context(() => {
                if (headerRef.current) {
                    const splitText = new SplitType(headerRef.current, {types: 'words, chars'});

                    const tl = gsap.timeline({
                        onStart: () => {


                            // Set opacity to 1 when animation starts
                            if (headerRef.current) {
                                headerRef.current.style.opacity = '1';

                            }
                        },
                        onComplete: () => {

                            // Set z-index to 0 after animation completes
                            if (headerRef.current) {
                                headerRef.current.style.zIndex = '0';


                            }


                        },


                    });

                    // Add spaces manually
                    if (splitText.words) {
                        splitText.words.forEach((word, index) => {
                            const space = document.createElement('span');
                            space.innerHTML = '&nbsp;';
                            space.style.display = 'inline-block';
                            word.parentNode?.insertBefore(space, word.nextSibling);
                        });
                    }


                    tl.from(splitText.chars, {
                        opacity: 0,
                        color: '#fdc500',
                        scale: 0.7,
                        stagger: {amount: 0.5},
                        ease: 'power2.inOut',

                    });


                    tl.to(splitText.chars, {
                        color: '#faf7f7',
                        opacity: 0.8,
                        scale: 1,
                        stagger: {amount: 1.5},
                        ease: 'power1.out',

                    });


                }

            });
            return () => ctx.revert(); // <-- CLEANUP!


        }, [showHeaderText, headerRef]);
    };


    //  ONE NIGHT AT A TIME - Header
    useEffect(() => {

        let ctx = gsap.context(() => {
            if (oneNightRef.current && showOneNightText) {
                oneNightRef.current.style.opacity = '1';
                const splitTextNight = new SplitType(oneNightRef.current, {types: 'words, chars'});
                const tl = gsap.timeline({
                    onStart: () => {
                        if (oneNightRef.current) {
                            oneNightRef.current.style.opacity = '1';
                        }

                        if (
                            descriptionRef1.current &&
                            descriptionRef2.current &&
                            descriptionRef3.current
                        ) {
                            // Set initial state
                            gsap.set([descriptionRef1.current, descriptionRef2.current, descriptionRef3.current], {
                                opacity: 0.2, color: 'rgb(255,255,255)'
                            });

                            const tl = gsap.timeline({defaults: {duration: 1, stagger: 0.5, color: "#e7ecef"}});

                            tl.to(descriptionRef1.current, {opacity: 0.9}, "+=3")
                                .to(descriptionRef2.current, {opacity: 0.9}, "+=1.2")
                                .to(descriptionRef3.current, {opacity: 0.9}, "+=1.2");
                        }

                    },
                    onComplete: () => {
                        // Add any completion logic here


                    }
                });

                // Add spaces manually
                if (splitTextNight.words) {
                    splitTextNight.words.forEach((word, index) => {
                        const space = document.createElement('span');
                        space.innerHTML = '&nbsp;';
                        space.style.display = 'inline-block';
                        word.parentNode?.insertBefore(space, word.nextSibling);
                    });
                }

                // Existing animations
                tl.from(splitTextNight.chars, {
                    opacity: 1,
                    color: '#fdc500',
                    scale: 1,
                    stagger: {amount: 0.3},
                    textShadow: '0px 0px 15px rgba(255, 255, 255, 0.8)', // Initial glow
                    ease: 'back.out(1.7)',
                });

                tl.to(splitTextNight.chars, {
                    color: '#faf7f7',
                    opacity: 0.6,
                    stagger: {amount: 0.1},
                    ease: 'power2.inOut',
                });


                if (splitTextNight.chars) {
                    splitTextNight.chars.forEach((char, index) => {
                        tl.to(char, {
                            opacity: 0.9,
                            duration: 0.1,
                            ease: 'power2.inOut',
                            stagger: {amount: 0.1},
                            delay: 1.5,
                            onStart: () => {
                                char.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.4)';
                                // change the innerHTML of the char to different letters

                                tl.to(splitTextNight.chars, {
                                    opacity: 1,
                                    stagger: {amount: 1},
                                    ease: 'power2.inOut',
                                });


                            },
                            onComplete: () => {
                                char.style.textShadow = 'none';


                            }
                        }, index * 0.1);  // stagger time between each char
                    });
                }
            }

        });
        return () => ctx.revert(); // <-- CLEANUP!
    }, [showOneNightText]);


    // Smaller "achieve your dreams" Text
    useEffect(() => {
        let ctx = gsap.context(() => {
            if (smallDreamRef.current && showSmallDreamText) {
                smallDreamRef.current.style.opacity = '1';

                const tl = gsap.timeline({
                    onComplete: () => {
                        if (smallDreamRef.current) {
                            smallDreamRef.current.style.zIndex = '0';
                        }
                        //     set timeout to show description
                        setShowDescription(true);


                    }
                });

                tl.to(smallDreamRef.current, {
                    opacity: 1,
                    duration: 1,
                    delay: 1,
                    ease: 'power2.inOut',
                });


            }

        });
        return () => ctx.revert(); // <-- CLEANUP!

    }, []);


    useShowHeaderAnimation(showHeaderText, headerRef);


    const smoothAppear = () => {

        gsap.to(videoContainerRef.current, {

            opacity: 1, duration: 1, onComplete: () => {

                setShowVideo(true);

                if (videoRef.current) {
                    videoRef.current.play().then(() => {

                        setIsPlaying(true);  // Update the state to reflect that the video is playing
                    }).catch((error) => {
                        console.error("Video play failed:", error);
                    });
                }
            }
        });

        setShowPlayAgainButton(false);
    };

    const scrollToTopAndPlayAgain = () => {


        window.scrollTo({top: 0, behavior: 'smooth'});
        setShowHeaderText(true);

        resetPage();


        smoothAppear();


    };

    // const resetPage
    const resetPage = () => {
        setShowVideo(true);

        setShowSmallDreamText(false);
        setShowOneNightText(false);
        setShowDescription(false);

        // Reset Video Time
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }

        // Reset GSAP animations (if any)
        gsap.killTweensOf(videoContainerRef.current);
        gsap.killTweensOf(headerRef.current);
        gsap.killTweensOf(oneNightRef.current);
        gsap.killTweensOf(smallDreamRef.current);
        // ...

        // Reset zIndex or other inline css
        if (headerRef.current) {
            headerRef.current.style.zIndex = '1';
        }


    }


    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const smoothDisappearHeader = () => {
        if (headerRef.current) {
            gsap.to(headerRef.current, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    if (headerRef.current) {
                        headerRef.current.style.zIndex = '0';


                        setShowHeaderText(false);
                    }
                },

            });
        }
    };


    return (
        <>
            <div ref={wrapperRef} className="relative  min-h-screen lg:min-h-[120vh]  pin-video  z-[1]" id={"smooth-content"}>

                <div ref={headerRef}
                     className="absolute top-[18vh] w-[99vw] h-[20vh] flex items-center justify-center text-[#e7ecef] font-bold text-3xl 2xs:text-5xl xs:text-7xl  lg:text-8xl  "
                     style={{zIndex: 1}}>
                    achieve your dreams
                </div>


                {(showSmallDreamText && showOneNightText) && (

                    <div
                        className={`w-[99vw] h-[100vh] pt-[14vh] lg:pt-[13vh] 3xl:pt-[16vh] px-8 2xs:px-10 sm:px-15 md:px-20 flex flex-col items-center justify-start bg-mask-black `}>
                        <h3 className={"header-bg-clip text-2xl font-sans hidden dark:block"}>
                            {product}
                        </h3>
                        <h3 className="header-bg-clip-light text-2xl font-sans dark:hidden">
                            {product}
                        </h3>
                        <div className="">  {/* Added minHeight */}
                            {showSmallDreamText && (
                                <div ref={smallDreamRef}
                                     className="flex items-center justify-center text-[#e7ecef] text-opacity-50 font-bold text-lg 2xs:text-xl xs:text-2xl lg:text-3xl ">
                                    achieve your dreams,
                                </div>
                            )}
                        </div>
                        <div className="">  {/* Added minHeight */}
                            {showOneNightText && (
                                <div ref={oneNightRef}
                                     className="flex items-center justify-center text-[#faf7f7] text-opacity-60 font-bold text-3xl 2xs:text-5xl xs:text-7xl  lg:text-8xl"
                                     style={{opacity: 1}}

                                >
                                    one night at a time.
                                </div>
                            )}
                        </div>


                        <div className=" mt-3 3xl:mt-4 z-[1] ">
                            {showDescription && (
                                <div className="md:px-[10vw] lg:px-[16vw] xl:px-[20vw] 2xl:px-[24vw] xlarge:px-[26vw] xxlarge:px-[27.5vw] 3xl:px-[29vw]"
                                     data-aos="fade-up">
                                    <p className="text-[#e7ecef] mx-auto text-xl xs:text-2xl 3xl:text-2xl font-semibold font-sans !leading-normal tracking-wide text-center">
                                        <span ref={descriptionRef1}
                                              className="text-[#e7ecef] inline">{description1}</span>

                                        <span ref={descriptionRef2}
                                              className="text-[#e7ecef] inline">{description2}</span>

                                        <span ref={descriptionRef3} className="text-[#e7ecef] ">{description3}</span>
                                    </p>

                                </div>
                            )}

                        </div>
                        {showCanvas && (
                            <MaskSequence/>
                        )
                        }

                    </div>

                )}


                <div ref={videoContainerRef} className="relative"
                     style={{opacity: showVideo ? 1 : 0, visibility: showVideo ? 'visible' : 'hidden'}}>
                    {isLoading && <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <div className="loading-spinner"></div>
                    </div>}

                    <div
                        className={`py-4 px-2  bg-opacity-50 bg-mask-black rounded md:p-0 ${showVideo ? 'block' : 'hidden'} sm:p-4 lg:p-0`}>
                        <div
                            className="aspect-w-16 aspect-h-9 md:aspect-w-16 md:aspect-h-9 lg:aspect-w-4 lg:aspect-h-3 ">
                            <video
                                ref={videoRef}
                                className="w-full h-[85vh] lg:h-fit object-cover lg:object-contain rounded lg:rounded-none border-2 border-amberA-12 md:border-0"
                                preload="auto"
                                muted={true}
                                autoPlay={false}
                                src={"/videos/Eight-Athletics-sleep-mask-commercial-web.mp4"}
                                onLoadedData={() => setIsLoading(false)}
                                onWaiting={() => setIsLoading(true)}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                    <button
                        onClick={togglePlayPause}
                        id={"play-pause-button"}
                        className="absolute bottom-[35rem] right-[1rem] z-10 focus:outline-none rounded-full border border-white p-1 flex items-center justify-center"
                        style={{width: '2.3rem', height: '2.3rem'}}
                    >
                        {isPlaying ? (
                            <PauseIcon className="w-5 h-5 text-white"/>
                        ) : (
                            <PlayIcon className="w-4 h-4 text-white "/>
                        )}
                    </button>
                </div>


            </div>

            {showPlayAgainButton && (
                <button onClick={scrollToTopAndPlayAgain}
                        className="fixed bottom-4 right-4 focus:outline-none rounded-full border border-white p-1 flex items-center justify-center"
                        style={{width: '2.3rem', height: '2.3rem'}}>
                    <PlayIcon className="w-4 h-4 text-white"/>
                </button>
            )}


        </>
    );
};

export default VideoAnimation;

