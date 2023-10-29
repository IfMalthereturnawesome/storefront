import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';



interface ScrollBarProps {
    children: React.ReactNode;
}

const ScrollBar: React.FC<ScrollBarProps> = ({ children }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollTextRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            if (scrollContainerRef.current && scrollTextRef.current) {
                gsap.set(scrollTextRef.current, { y: 0, opacity: 0, willChange: "transform, opacity" });

                const moveRange = scrollContainerRef.current.offsetHeight - scrollTextRef.current.offsetHeight;

                gsap.to(scrollTextRef.current, {
                    scrollTrigger: {
                        trigger: scrollContainerRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                        onUpdate: (self) => {
                            const scrollProgress = self.progress;
                            let newOpacity = 0.4;

                            if (scrollProgress < 0.20) {
                                newOpacity = scrollProgress * 2;
                            } else if (scrollProgress < 0.80) {
                                newOpacity = 0.4;
                            } else {
                                newOpacity = 0.4 - ((scrollProgress - 0.85) * 2);
                            }

                            gsap.set(scrollTextRef.current, {
                                y: scrollProgress * moveRange,
                                opacity: newOpacity
                            });
                        },


                    },onComplete: () => {
                        gsap.set(scrollTextRef.current, { willChange: "auto" });
                    }
                });
            }
        });
        return () => ctx.revert(); // Cleanup
    }, []);

    return (
        <div style={{ position: 'relative', overflow: 'hidden'}} ref={scrollContainerRef}>
            {children}
            <div ref={scrollTextRef} style={{ position: 'absolute', right: 20, top: -20, writingMode: 'vertical-rl', zIndex: 41 }} className={"opacity-50 cursor-default select-none"} >
                <span className={"font-poppins text-3xl font-extrabold text-[#faf7f7]"}>Maximum</span>
                <div
                    className="stroke-white bg-transparent font-poppins text-3xl font-extrabold text-[#faf7f7]"
                    style={{
                        WebkitTextStroke: "1px white",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    Comfort
                </div>
            </div>
        </div>
    );
};

export default ScrollBar;
