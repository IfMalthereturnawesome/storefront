'use client';

import Link from 'next/link';
import Image from 'next/image';
import NotFoundImage from '../../public/images/404.jpg'; // Replace with a sleep-related image
import React, {useEffect} from 'react';
import gsap from 'gsap';

import Footer from "@/components/ui/Footer";
import Highlighter, {HighlighterItem} from "@/components/highlighter/highlighter";
import FeatureImg01 from '../../public/images/eight-athletics-sleep-resources-blog.png';
import Header from "@/components/ui/Header";


export default function NotFound() {
    useEffect(() => {
        gsap.from(".animate-fade", {duration: 1, opacity: 0, y: -50, stagger: 0.3});
        gsap.to(".animate-fade", {duration: 1, opacity: 1, y: 0, stagger: 0.3});

    }, []);

    return (
        <>
            <Header/>

            <section className="relative bg-cyan-1 section-min-height">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="max-w-3xl mx-auto text-center">
                            {/* Top image */}

                            <div className="relative inline-flex flex-col mb-6 animate-fade">

                                <Image className="rounded-full" src={NotFoundImage} width={196} height={196}
                                       alt="404 Sleepy Panda"/>
                                <svg className="w-20 h-20 fill-current text-purple-600 absolute top-0 right-0 -mr-6"
                                     width="84" height="80" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M80 45.876l-3.434-2.142c-.313-.196-.636-.374-.95-.566l.09-.385c-.217.02-.433.034-.649.053a113.732 113.732 0 00-29.876-12.614l26.527-11.208 7.776-3.285-8.445-.716a283.299 283.299 0 00-56.645.881c-9.887 1.17-14.58 3.26-14.388 4.343.202 1.165 5.204 1.342 14.918.216a295.374 295.374 0 0146.206-1.615l-22.516 9.815-6.55 2.855 7.001 1.372c10.347 2.03 20.402 5.58 29.777 10.452a380.058 380.058 0 01-38.52.822l-5.717-.169 4.521 3.469c5.697 4.371 11.358 8.727 16.633 13.466 4.051 3.638 7.87 7.52 11.232 11.74a100.788 100.788 0 00-21.646-4.049c-2.938-.211-4.42.091-4.428.405-.01.339 1.433.688 4.317.94a98.562 98.562 0 0123.591 5.116c.36.492.722.984 1.069 1.487l.673-.864c.181.066.364.126.545.194l.653.246-.388-.584c-.107-.16-.221-.315-.329-.475l.68-.871c-.556-.198-1.116-.378-1.674-.566-3.728-5.23-8.137-9.96-12.834-14.337-4.72-4.4-9.732-8.465-14.761-12.482 13.89.587 27.83.417 41.73-.533.203.12.411.23.613.35l.094-.396c.366-.025.733-.045 1.1-.072L80 45.876z"
                                        fill="#5D5DFF" fillRule="evenodd"/>
                                </svg>
                            </div>

                            {/* 404 content */}
                            <h1 className="text-5xl custom-header-1 mb-4 animate-fade">Uh-oh! You&apos;re sleepwalking on the
                                web.</h1>


                            <p className="text-lg text-slate-11 mb-4 animate-fade">Seems like you&apos;ve wandered off into
                                dreamland. No worries, we&apos;ve got your back!</p>

                            {/* Action items */}
                            <div className="animate-fade">
                                <Link href="/"
                                      className="text-purple-600 hover:text-blue-600 transition duration-150 ease-in-out">
                                    Return to homepage
                                </Link>
                                <span className="mx-4 text-slate-10">or</span>
                                <Link href="/products"
                                      className="text-purple-600 hover:text-blue-600 transition duration-150 ease-in-out">
                                    Shop products
                                </Link>
                            </div>

                            {/* Contact page */}
                            <div className="mt-16 mb-4 animate-fade">
                                <h3 className="text-2xl custom-header-1">Or would you like to learn more about
                                    sleep?</h3>
                                <div className="relative py-12 md:pb-20">
                                    {/* Blurred shape */}
                                    <div
                                        className="pointer-events-none absolute bottom-0 left-1/2 -mb-20 -translate-x-1/2 opacity-50 blur-2xl"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="434"
                                            height="427"
                                        >
                                            <defs>
                                                <linearGradient
                                                    id="bs2-a"
                                                    x1="119.609%"
                                                    x2="50%"
                                                    y1="14.544%"
                                                    y2="100%"
                                                    className="hidden dark:block "
                                                >
                                                    <stop offset="0%" stopColor="#0F5096FF"/>
                                                    <stop offset="100%" stopColor="#0F5096FF" stopOpacity="0"/>
                                                </linearGradient>
                                            </defs>
                                            <path
                                                fill="url(#bs2-a)"
                                                fillRule="evenodd"
                                                d="m346 898 461 369-284 58z"
                                                transform="translate(-346 -898)"
                                            />
                                        </svg>
                                    </div>

                                    {/* Grid */}
                                    <Highlighter className="group grid gap-6 md:grid-cols-12">
                                        {/* Box #1 */}
                                        <div className="md:col-span-12" data-aos="fade-down">
                                            <HighlighterItem>
                                                <div
                                                    className="relative z-20 h-full overflow-hidden rounded-[inherit] border-2  border-black  dark:border-black dark:border-[1px] bg-slate-1 dark:bg-cyan-2 hover:border-cyan-12 dark:hover:border-cyan-10 hover:bg-gold-1 dark:hover:bg-cyan-1 transition-all duration-300 transform shadow hover:drop-shadow-xl drawBlogCard">
                                                    <div
                                                        className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                        {/* Blurred shape */}
                                                        <div
                                                            className="absolute right-0 top-0 blur-2xl"
                                                            aria-hidden="true"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="342"
                                                                height="393"
                                                            >
                                                                <defs>
                                                                    <linearGradient
                                                                        id="bs-a"
                                                                        x1="19.609%"
                                                                        x2="50%"
                                                                        y1="14.544%"
                                                                        y2="100%"
                                                                        className="hidden dark:block "
                                                                    >
                                                                        <stop offset="80%" stopColor="#0F5096FF"/>
                                                                        <stop
                                                                            offset="100%"
                                                                            stopColor="#0F5096FF"
                                                                            stopOpacity="0"
                                                                        />
                                                                    </linearGradient>

                                                                </defs>
                                                                <path
                                                                    fill="url(#bs-a)"
                                                                    fillRule="evenodd"
                                                                    d="m104 .827 461 369-284 58z"
                                                                    transform="translate(0 -112.827)"
                                                                    opacity=".7"
                                                                />
                                                            </svg>
                                                        </div>
                                                        {/* Radial gradient */}
                                                        <div
                                                            className="aspect-square pointer-events-none absolute bottom-0 left-1/2 -z-10 flex h-full -translate-x-1/2 translate-y-1/2 items-center justify-center"
                                                            aria-hidden="true"
                                                        >
                                                            <div
                                                                className="translate-z-0 absolute inset-0 rounded-full bg-blue-1 opacity-70 blur-[120px]"/>
                                                            <div
                                                                className="translate-z-0 absolute h-1/4 w-1/4 rounded-full bg-purple-400 blur-[40px]"/>
                                                        </div>
                                                        {/* Text */}
                                                        <div
                                                            className="order-1 shrink-0 p-6 pt-0 md:order-none md:max-w-[480px] md:p-8 md:pr-0">
                                                            <div className="mb-5">
                                                                <div>
                                                                    <h3 className="inline-flex bg-gradient-to-r from-slate-11 via-slate-12 to-slate-11  bg-clip-text pb-1 text-xl font-bold text-transparent">
                                                                        In-Depth Sleep Resources
                                                                    </h3>
                                                                    <p className="text-slate-11 ">
                                                                        With science-backed advice and practical tips to
                                                                        enhance your sleep quality, our comprehensive
                                                                        guides will help you catch those elusive Z&apos;s.
                                                                        Don&apos;t let poor sleep hold you back - discover
                                                                        the secrets to better sleep today!
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <Link
                                                                    className="btn-sm group relative  btn-sm group text-slate-12 transition duration-150 ease-in-out
      bg-cyan-1 border-black focus:border-sky-7 focus:outline-sky-9 hover:bg-black hover:text-slate-1 dark:hover:text-slate-12
      dark:bg-cyan-1 dark:border-sky-7 dark:focus:border-sky-9 dark:focus:outline-sky-9 dark:hover:bg-cyan-1 dark:hover:border-sky-9"
                                                                    href={"/resources"}
                                                                >
                              <span className="relative inline-flex items-center">
                                Learn more{' '}
                                  <span
                                      className="ml-1 tracking-normal text-blue-500  transition-transform duration-150 ease-in-out group-hover:translate-x-1">
                                  -&gt;
                                </span>
                              </span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        {/* Image */}
                                                        <div className="relative h-64 w-full overflow-hidden md:h-auto">
                                                            <Image
                                                                className="md:left-0{md}translate{}-x-0 absolute bottom-0 left-1/2 mx-auto max-w-none -translate-x-1/2 md:relative"
                                                                src={FeatureImg01}
                                                                width="260"
                                                                height="330"
                                                                alt="Feature 01"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </HighlighterItem>
                                        </div>
                                    </Highlighter>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </>
    );
}
