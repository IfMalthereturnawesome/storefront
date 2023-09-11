'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
gsap.registerPlugin(ScrollTrigger);


interface HorizontalTextScrollProps {
    text?: string;
}

const HorizontalTextScroll: React.FC<HorizontalTextScrollProps> = ({ text = "Achieve your dreams, one night at a time. Achieve your dreams, one night at a time. Achieve your dreams, one night at a time. Achieve your dreams, one night at a time." }) => {

    const textRef = useRef(null);
    const slider = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            const splitText = new SplitType(textRef.current, { types: 'chars' });
            const chars = splitText.chars || [];

            // Hide all characters initially
            gsap.set(chars, { opacity: 0 });

            // Create the staggered reveal for the characters
            gsap.to(chars, {
                opacity: 1,
                stagger: 0.13,
                repeat: -1,  // Infinite loop for the reveal

            });
        }


        // Horizontal scrolling effect
        gsap.fromTo(
            slider.current,
            { x: 210 }, // Start from the right end of the screen
            {
                x: () => -(textRef.current as unknown as HTMLElement).offsetWidth || 0,
                ease: "none",
                duration: 20,
                repeat: -1
            }
        );

    }, []);

    return (
        <div className="relative pb-20 md:mt-[-71rem]">
            <div ref={slider} className="whitespace-nowrap ">
                <p ref={textRef} className="inline-block text-9xl font-bold pr-5 text-slate-12">
                    {text}
                </p>


            </div>
        </div>
    );
};

export default HorizontalTextScroll;

