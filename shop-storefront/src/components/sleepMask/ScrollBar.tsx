import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollBarProps {
    children: React.ReactNode;
}

const ScrollBar: React.FC<ScrollBarProps> = ({ children }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current && scrollTextRef.current) {
            const container = scrollContainerRef.current;
            const text = scrollTextRef.current;

            gsap.set(text, { y: 0, opacity: 0.4 });

            const moveRange = container.offsetHeight - text.offsetHeight;

            gsap.to(text, {
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                    onUpdate: (self) => {
                        const scrollProgress = self.progress;

                        // Adjust opacity based on scroll progress
                        let newOpacity = 0.4;
                        if (scrollProgress < 0.15) {
                            newOpacity = scrollProgress * 2; // First 15% of scroll: opacity from 0 to 0.5
                        } else if (scrollProgress < 0.85) {
                            newOpacity = 0.4; // Middle 50% of scroll: opacity stays at 0.5
                        } else {
                            newOpacity = 0.4 - ((scrollProgress - 0.85) * 2); // Last 25% of scroll: opacity from 0.5 to 0
                        }
                        gsap.set(text, {
                            y: scrollProgress * moveRange,
                            opacity: newOpacity
                        });
                    }
                }
            });
        }
    }, []);





    return (
        <div style={{ position: 'relative', overflow: 'hidden' }} ref={scrollContainerRef}>
            {children}
            <div ref={scrollTextRef} style={{ position: 'absolute', right: 20, top: -20, writingMode: 'vertical-rl' }} className={"opacity-50"} >
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
