'use client';
// MaximumComfortMeetsTotalBlackout.tsx
import {useLayoutEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import useBetterMediaQuery from "@/utils/useBetterMediaQuery";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}


const MaximumComfortMeetsTotalBlackout = () => {
    const crawlContainerRef = useRef(null);
    const whereverRef = useRef(null);
    const wheneverRef = useRef(null);
    const isDesktop = useBetterMediaQuery('(min-width: 1024px)');

    useLayoutEffect(() => {
        if (!isDesktop) return;
        let ctx = gsap.context(() => {

            if (crawlContainerRef.current) {
                gsap.to(crawlContainerRef.current, {
                    yPercent: 33,
                    duration: 30,
                    ease: "linear",
                    scrollTrigger: {
                        trigger: crawlContainerRef.current,
                        start: 'center center',
                        end: 'bottom top',
                        scrub: true,

                    }
                });

                ScrollTrigger.create({
                    trigger: crawlContainerRef.current,
                    start: 'center-=150 center',
                    end: 'bottom center',

                    onEnter: () => {
                        gsap.to(
                            whereverRef.current,
                            {opacity: 1, duration: 1}
                        );
                        gsap.to(
                            wheneverRef.current,
                            {opacity: 1, delay: 0.7, duration: 1}
                        );
                    }
                });
            }


        });
        return () => ctx.revert(); // <-- CLEANUP!
    }, [isDesktop]);

    return (
        <>
            {isDesktop && (
                <div className="relative z-[1]">
                    <div
                        id="total-blackout"
                        className="w-full h-[100vh] flex flex-col justify-center items-center  font-poppins text-8xl font-extrabold text-[#faf7f7] space-y-8 transform perspective-500 rotateX-25"
                        ref={crawlContainerRef}
                    >
                        <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-duration="2000">
                            <h3 className="inline-flex font-semibold">
                                Maximum
                                <span className="stroke-white ml-2 font-[900]" style={{
                                    WebkitTextStroke: '1px white',
                                    WebkitTextFillColor: 'transparent'
                                }}>Comfort</span>
                            </h3>
                        </div>

                        <div className={"font-semibold"} data-aos="fade-up"
                             data-aos-anchor-placement="center-bottom">meets
                        </div>

                        <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-duration="2000">
                            <h3 className="inline-flex font-semibold">
                                Total
                                <span className="stroke-white ml-2 font-[900]" style={{
                                    WebkitTextStroke: '1px white',
                                    WebkitTextFillColor: 'transparent'
                                }}>Blackout</span>
                            </h3>
                        </div>

                        <div className="flex">
                            <div ref={whereverRef} className={"opacity-0"}>Wherever,</div>
                            <div className="ml-4 opacity-0" ref={wheneverRef}>Whenever.</div>
                        </div>
                    </div>
                    <div className={"h-[25vh] relative z-[1] bg-black/75"}></div>
                </div>
            )}
        </>

    );

};

export default MaximumComfortMeetsTotalBlackout;
