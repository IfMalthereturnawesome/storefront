'use client';

import dynamic from "next/dynamic";
import React, {RefObject, useEffect, useLayoutEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {PauseIcon} from "@radix-ui/react-icons";
import {PlayIcon} from '@heroicons/react/20/solid';
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import SplitType from 'split-type';
const MaskSequence = dynamic(() => import('@/components/sleepMask/MaskSequence'));
import useBetterMediaQuery from "@/utils/useBetterMediaQuery";
import Image from "next/image";


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
    const [showCanvas, setShowCanvas] = useState(false);
    const descriptionRef1 = useRef(null);
    const descriptionRef2 = useRef(null);
    const descriptionRef3 = useRef(null);
    const [isClient, setIsClient] = useState(false);

    //  Timeline REFs
    const tl = useRef(null);
    const tl2 = useRef(null);
    const tl3 = useRef(null);
    const tl4 = useRef(null);
    const tl5 = useRef(null);


    const isTabletAndDesktop = useBetterMediaQuery('(min-width: 768px)');
    const isMobile = useBetterMediaQuery('(max-width: 767px)');


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

    useEffect(() => {
        setIsClient(true)
    }, []);


    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            let mm = gsap.matchMedia();
            mm.add('(max-width: 767px)', () => {
                setState(false);

            });
            mm.add('(min-width: 768px)', () => {
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

            ctx.revert();
        };
    }, [state, smoothDisappear]);


    // VIDEO
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            if (headerRef.current) {

                headerRef.current.style.opacity = '0';
            }
            if (showPlayAgainButton) {
                setShowHeaderText(false);


            }
            tl.current = gsap.timeline();
            if (videoRef.current) {
                tl.current.fromTo(
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
        useLayoutEffect(() => {
            let ctx = gsap.context(() => {
                if (headerRef.current) {
                    const splitText = new SplitType(headerRef.current, {types: 'words,chars'});

                    tl2.current = gsap.timeline({
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


                    tl2.current.from(splitText.chars, {
                        opacity: 0,
                        color: '#fdc500',
                        scale: 0.7,
                        stagger: {amount: 0.5},
                        ease: 'power2.inOut',

                    });


                    tl2.current.to(splitText.chars, {
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
    useLayoutEffect(() => {

        let ctx = gsap.context(() => {
            if (oneNightRef.current && showOneNightText) {
                oneNightRef.current.style.opacity = '1';
                const splitTextNight = new SplitType(oneNightRef.current, {types: 'words,chars'});
                tl3.current = gsap.timeline({
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

                            tl4.current = gsap.timeline({defaults: {duration: 1, stagger: 0.5, color: "#e7ecef"}});

                            tl4.current.to(descriptionRef1.current, {opacity: 0.9}, "+=3")
                                .to(descriptionRef2.current, {opacity: 0.9}, "+=1.2")
                                .to(descriptionRef3.current, {opacity: 0.9}, "+=1.2");
                        }

                    },
                    onComplete: () => {


                    }
                });


                if (splitTextNight.words) {
                    splitTextNight.words.forEach((word, index) => {
                        const space = document.createElement('span');
                        space.innerHTML = '&nbsp;';
                        space.style.display = 'inline-block';
                        word.parentNode?.insertBefore(space, word.nextSibling);
                    });
                }

                tl3.current.to(splitTextNight.chars, {
                    color: '#faf7f7',
                    opacity: 0.6,
                    stagger: {amount: 0.1},
                    ease: 'power2.inOut',
                });


                if (splitTextNight.chars) {
                    splitTextNight.chars.forEach((char, index) => {
                        tl3.current.to(char, {
                            opacity: 0.9,
                            duration: 0.1,
                            ease: 'power2.inOut',
                            stagger: {amount: 0.1},
                            delay: 0.5,
                            onStart: () => {
                                char.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.4)';
                                // change the innerHTML of the char to different letters

                                tl3.current.to(splitTextNight.chars, {
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
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            if (smallDreamRef.current && showSmallDreamText) {
                smallDreamRef.current.style.opacity = '1';

                tl5.current = gsap.timeline({
                    onComplete: () => {
                        if (smallDreamRef.current) {
                            smallDreamRef.current.style.zIndex = '0';
                        }
                        //     set timeout to show description
                        setShowDescription(true);


                    }
                });

                tl5.current.to(smallDreamRef.current, {
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

        window.scrollTo({
            top: 0,
        });

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

            <div ref={wrapperRef} className={`relative h-screen lg:h-[120vh]  pin-video  z-[1] ${showVideo ? '' : 'black-gradient-background'}`} id={"smooth-content"} >

                <div ref={headerRef}
                     className="absolute top-[18vh] w-[99vw] md:w-[99.2vw] h-[20vh] flex items-center justify-center text-[#e7ecef] font-bold text-3xl 2xs:text-5xl xs:text-7xl  lg:text-8xl  "
                     style={{zIndex: 1}}>
                    achieve your dreams
                </div>


                {(showSmallDreamText && showOneNightText) && (

                    <div
                        className={`w-[99vw] md:w-[99.2vw] h-[120vh] pt-[8vh] 3xs:pt-[9.5vh] 2xs:pt-[11vh] md:pt-[5vh] lg:pt-[6vh] 3xl:pt-[10vh] px-6 2xs:px-8 sm:px-15 md:px-20 flex flex-col items-center justify-start black-gradient-background `}>
                        <h3 className={"header-bg-clip text-lg xs:text-xl lg:text-2xl font-sans hidden my-0 md:my-2 dark:block"}>
                            {product}
                        </h3>
                        <h3 className="header-bg-clip-light  text-lg xs:text-xl lg:text-2xl font-sans my-0 md:my-2 dark:hidden">
                            {product}
                        </h3>
                        <div className="">
                            {showSmallDreamText && (
                                <div ref={smallDreamRef}
                                     className="flex items-center justify-center text-[#e7ecef] text-opacity-50 font-bold text-lg 2xs:text-xl xs:text-2xl lg:text-3xl ">
                                    achieve your dreams,
                                </div>
                            )}
                        </div>
                        <div className="2xl:pt-1">
                            {showOneNightText && (
                                <div ref={oneNightRef}
                                     className="flex items-center justify-center text-[#faf7f7] text-opacity-60 font-bold text-3xl 2xs:text-6xl xs:text-7xl  lg:text-8xl"
                                     style={{opacity: 1}}

                                >
                                    one night at a time.
                                </div>
                            )}
                        </div>


                        <div className=" mt-3 3xl:mt-4 z-[1] ">
                            {showDescription && (
                                <div
                                    className="md:px-[10vw] lg:px-[16vw] xl:px-[20vw] 2xl:px-[24vw] xlarge:px-[26vw] xxlarge:px-[27.5vw] 3xl:px-[29vw]"
                                    data-aos="fade-up">
                                    <p className="text-[#e7ecef] mx-auto text-lg xs:text-2xl large:text-[1.33rem] 2xl:text-[1.37rem] xxlarge:text-[1.4rem] 3xl:text-2xl font-semibold font-sans !leading-normal tracking-wide text-center">
                                        <span ref={descriptionRef1}
                                              className="text-[#e7ecef] inline">{description1}</span>

                                        <span ref={descriptionRef2}
                                              className="text-[#e7ecef] inline">{description2}</span>

                                        <span ref={descriptionRef3} className="text-[#e7ecef] ">{description3}</span>
                                    </p>

                                </div>
                            )}

                        </div>
                        {showCanvas && isClient && (
                            <>

                                {isTabletAndDesktop && (
                                    <MaskSequence/>
                                )}

                                {isMobile && (
                                    <div className="m-0 p-0">

                                        <div
                                            className="canvas-container h-[35vh] md:h-[50vh] ">
                                            <Image src="/images/sequence/sleepmask_014.png" alt="hero-mobile"
                                                   width={375}
                                                   height={600} quality={100}
                                                   className={"object-contain max-h-[40vh]  2xs:max-h-[48vh] mt-[21vh] 2xs:mt-[19vh] max-w-[92vw] 2xs:max-w-[96vw] md:max-h-[50vh]  md:mt-[12vh] md:max-w-[100vw]"}/>

                                        </div>

                                    </div>
                                )}


                            </>
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
                        className={`py-4 px-2  bg-opacity-50  rounded md:p-0  sm:p-4 lg:p-0 ${showVideo ? 'bg-mask-black' : 'black-gradient-background'}`}
                        style={{opacity: showVideo ? 1 : 0, visibility: showVideo ? 'visible' : 'hidden'}}>
                        <div
                            className="aspect-w-16 aspect-h-9 md:aspect-w-16 md:aspect-h-9 lg:aspect-w-4 lg:aspect-h-3 ">
                            <video
                                ref={videoRef}
                                className="w-full h-[85vh] lg:h-fit object-cover lg:object-contain rounded lg:rounded-none border-2 border-amberA-12 md:border-0"
                                preload="auto"
                                muted={true}
                                playsInline={true}
                                autoPlay={false}
                                onLoadedData={() => setIsLoading(false)}
                                onWaiting={() => setIsLoading(true)}
                            >

                                {isTabletAndDesktop && (
                                    <source src={"https://res.cloudinary.com/dpiu5gs3g/video/upload/v1700139288/eight-athletics-sleep-mask-commercial-web_lgyv4z.mp4"} type="video/mp4" />
                                )}
                                {isMobile && (
                                    <source src={"https://res.cloudinary.com/dpiu5gs3g/video/upload/v1700139242/eight-athletics-sleep-mask-commercial-web-mobile_uddh3v.mp4"} type="video/mp4" />
                                )}


                                Your browser does not support the video tag.
                            </video>

                        </div>
                    </div>

                    <button
                        onClick={togglePlayPause}
                        id={"play-pause-button"}
                        className="hidden lg:flex absolute bottom-[35rem] right-[1rem] z-10 focus:outline-none rounded-full border border-white p-1  items-center justify-center"
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
                        className="hidden lg:flex fixed bottom-4 right-4 focus:outline-none rounded-full border border-white p-1  items-center justify-center z-[2]"
                        style={{width: '2.3rem', height: '2.3rem'}}>
                    <PlayIcon className="w-4 h-4 text-white"/>
                </button>

            )}


        </>
    );
};

export default VideoAnimation;
