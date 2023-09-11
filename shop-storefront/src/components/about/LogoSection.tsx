'use client';

import { stylesWithCssVar } from "@/utils/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";



export const LogoSection = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end end"],
    });
    const textX = useTransform(scrollYProgress, [0.1, 0.4], ["100%", "-100%"]);
    const opacitySection = useTransform(scrollYProgress, [0.1, 0.26], [0, 1]);
    const scale = useTransform(scrollYProgress, [0.1, 0.9], [1, 0.7]);

    const opacityBorder = useTransform(
        scrollYProgress,
        [0.7, 0.71, 0.75],
        [1, 1, 0]
    );
    const finalTextOpacity = useTransform(
        scrollYProgress,
        [0.6, 0.7, 0.8, 0.85, 0.9],  // Adjust these points
        [0, 0, 1, 1, 0]
    );

    const finalTextScale = useTransform(scrollYProgress, [0.8, 0.9], [1.8, 0.7]);
    const iconScale = useTransform(scrollYProgress, [0.03, 0.9], [0.9, 0.1]); // You can adjust the range and scaling factor

    return (

        <motion.section
            style={stylesWithCssVar({
                opacity: opacitySection,
                "--scale": scale,
                "--opacity-border": opacityBorder,
            })}
            ref={targetRef}
            className=" flex h-[600vh] items-start justify-start select-none"
        >
            <div className="fixed top-1/2 left-1/2 min-h-[50rem] min-w-[48rem] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap before:absolute before:inset-0 before:scale-[var(--scale)] before:opacity-[var(--opacity-border)]">
                <motion.p
                    aria-hidden
                    style={{ x: textX, y: "-50%" }}
                    className="whitepspace-nowrap min-w-screen absolute top-1/2 left-[calc(-50vw+25rem)] text-[23rem] text-slate-12 dark:text-slate-12 "
                >
                    <span className="font-[300]">EIGHT</span> <span className="font-[700]">Athletics</span>
                </motion.p>
                <motion.p
                    aria-hidden
                    style={{ x: textX, y: "-50%" }}
                    className="whitepspace-nowrap min-w-screen absolute top-1/2 left-[calc(-50vw+25rem)] z-[11] text-[23rem] text-transparent [-webkit-text-stroke:1px_#000000] dark:[-webkit-text-stroke:1px_#f5f5f7]"
                >
                    <span className="font-[300]">EIGHT</span> <span className="font-[700]">Athletics</span>
                </motion.p>


                <motion.p
                    style={{
                        opacity: finalTextOpacity,
                        scale: finalTextScale,
                        y: "-50%",
                        x: "-50%",
                    }}
                    className="absolute left-1/2 top-1/2 text-[8.8rem] leading-tight text-black dark:text-white"
                >
                    <Image src="/images/Eight-Athletics-black-logo.svg" className="dark:hidden" alt="Eight Athletics Logo" width={750} height={750} />
                    <Image src="/images/Eight-Athletics-white-logo.svg" className="hidden dark:block " alt="Eight Athletics Logo" width={750} height={750} />

                </motion.p>

                <motion.div
                    className="absolute left-[calc(10%*var(--scale)+0%)] top-0 z-12 h-full w-[50vw] origin-left"
                    style={{
                        scale: iconScale,  // using the new scale here
                        opacity: opacityBorder
                    }}
                >
                    <Image src="/images/Eight-Athletics-black-logo-icon.svg" className="dark:hidden -ml-[2.8rem]" alt="Eight Athletics Icon Logo" width={750} height={750} />
                    <Image src="/images/Eight-Athletics-white-logo-icon.svg" className="hidden dark:block -ml-[2.8rem]" alt="Eight Athletics Icon Logo" width={750} height={750} />
                </motion.div>
                <span className="absolute left-[calc(50%*var(--scale)+20%)] top-0 z-10 h-full w-[50vw] origin-left scale-[var(--scale)] bg-cyan-1 opacity-[var(--opacity-border)]" />
                {/*<span className="absolute left-[calc(50%*var(--scale)+50%-(2.5rem*var(--scale)))] top-0 z-[12] h-full w-[50vw] origin-left scale-[var(--scale)] border-l-[2.5rem] border-[#CEF144] opacity-[var(--opacity-border)]" />*/}

            </div>

        </motion.section>


    );
};