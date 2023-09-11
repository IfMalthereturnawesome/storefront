'use client';

import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {PauseIcon} from "@radix-ui/react-icons";
import {PlayIcon} from '@heroicons/react/20/solid';
import usePageSettings from "@/utils/hooks/usePageSettings";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import SplitType from 'split-type';

import MaskSequence from "@/components/sleepMask/MaskSequence";


if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const VideoAnimation: React.FC = () => {
    usePageSettings();

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
    const [showCanvas, setShowCanvas] = useState(true);



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
        ctx.revert();


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


    let ctx = gsap.context(() => {


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
            setShowHeaderText(false);
            if (headerRef.current) {
                headerRef.current.style.opacity = '0';
            }
            smoothDisappearHeader();

            const videoContainer = videoContainerRef.current;

            gsap.to(videoContainer, {
                opacity: 0, duration: 1,
                onComplete: () => {

                    setShowVideo(false);
                    // Jump to the top of the page


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

            return () => mm.revert();
        }, [state]);


        // VIDEO
        useEffect(() => {
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
            // if showPlayAgain button is true, then smooth disappear header

            // Add this block to start the video after 1.2 seconds
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
                        end: "1%",

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
        }, []);


        // ACHIEVE YOUR DREAMS - HEADER
        const showHeaderAnimation = () => {
            useEffect(() => {
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


            }, [showHeaderText])
        };
        showHeaderAnimation();

        //  ONE NIGHT AT A TIME - Header
        useEffect(() => {

            if (oneNightRef.current && showOneNightText) {
                oneNightRef.current.style.opacity = '1';
                const splitTextNight = new SplitType(oneNightRef.current, {types: 'words, chars'});
                const tl = gsap.timeline({
                    onStart: () => {
                        if (oneNightRef.current) {
                            oneNightRef.current.style.opacity = '1';
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
        }, [showOneNightText]);


        // Smaller "achieve your dreams" Text
        useEffect(() => {
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
            return () => ctx.revert();

        }, [showSmallDreamText]);
    }, wrapperRef);


    return (
        <>
            <div ref={wrapperRef} className="relative h-[120vh] pin-video" id={"smooth-content"}>

                <div ref={headerRef}
                     className="absolute top-[18vh] w-[99vw] h-[20vh] flex items-center justify-center text-[#e7ecef] font-bold text-8xl  "
                     style={{zIndex: 1}}>
                    achieve your dreams
                </div>


                {(showSmallDreamText && showOneNightText) && (
                    <div
                        className={`w-[99vw] h-[100vh] pt-[16vh] px-20 flex flex-col items-center justify-start bg-mask-black `}>
                        <div className="">  {/* Added minHeight */}
                            {showSmallDreamText && (
                                <div ref={smallDreamRef}
                                     className="flex items-center justify-center text-[#e7ecef] text-opacity-50 font-bold text-3xl ">
                                    achieve your dreams,
                                </div>
                            )}
                        </div>
                        <div className="">  {/* Added minHeight */}
                            {showOneNightText && (
                                <div ref={oneNightRef}
                                     className="flex items-center justify-center text-[#faf7f7] text-opacity-60 font-bold text-8xl"
                                     style={{opacity: 1}}

                                >
                                    one night at a time.
                                </div>
                            )}
                        </div>


                        <div className=" mt-4 z-[1]">
                            {showDescription && (
                                <div className="md:px-[10vw] lg:px-[16vw] xl:px-[20vw] 2xl:px-[28vw] 3xl:px-[30vw]"
                                     data-aos="fade-up">
                                    <p className="text-[#e7ecef] mx-auto font-sans text-2xl text-opacity-90 font-semibold tracking-normal text-center">
                                        {/*A new era of sleep masks has arrived, where total blackout meets unmatched*/}
                                        {/*comfort.*/}
                                        {/*Made for a unique fit that adapts seamlessly to the unique features of your*/}
                                        {/*face, —elevating your peak*/}
                                        {/*performance, no matter your location or how you sleep.*/}

                                        Enter a new sleep era where total blackout meets unmatched comfort. Custom-fit
                                        for your unique face.
                                        Elevate your peak performance, no matter your location or how you sleep.
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


                <div ref={videoContainerRef} className="relative "
                     style={{display: showVideo ? 'block' : 'none', opacity: showVideo ? 1 : 0}}>
                    <video
                        ref={videoRef}
                        className="w-full h-fit "
                        preload="auto"
                        muted={true}
                        autoPlay={false}
                        // src={"/videos/Eight-Athletics-sleep-mask-commercial-web.mp4"}
                        src={"/videos/test-video-for-animation.mp4"}
                    >
                        Your browser does not support the video tag.
                    </video>
                    <button
                        onClick={togglePlayPause}
                        className="absolute bottom-4 right-4 z-10 focus:outline-none rounded-full border border-white p-1 flex items-center justify-center"
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

