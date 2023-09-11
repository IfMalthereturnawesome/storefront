import InternalLink from "@/components/dictionary/InternalLink";
import Link from "next/link";
import Image from "next/image";
import FeatureImg01 from "/public/images/sleep-essentials-resource.png";
import FeatureImg02 from "/public/images/sleep-science-resource.png";
import FeatureImg03 from "/public/images/sleep-athletics-resource.png";
import React from "react";

export const metadata = {
    title: 'Contact us - Open PRO',
    description: 'Page description',
}

const cardData = [
    {
        title: "Sleep Essentials",
        content: "Our Sleep Essentials collection provides foundational knowledge on sleep, covering everything from recommended sleep, sleep disorders, to the impact of technology and diet on sleep.",
        imgSrc: FeatureImg01,
        imgAlt: "Sleep Essentials Resource",
        actionText: "Start With the Essentials"
    },
    {
        title: "Sleep Science",
        content: "Dive deeper into the intricacies of sleep with our Sleep Science collection. Explore topics such as the neurobiology, chronobiology, genetics of sleep, and the future of sleep science.",
        imgSrc: FeatureImg02,
        imgAlt: "Sleep Science Resource",
        actionText: "Explore the Science of Sleep"
    },
    {
        title: "Sleep Athletics",
        content: "Optimize athletic performance through better sleep with our Sleep Athletics collection. Learn about the influence of circadian rhythms on training scheduling, and the impact of sleep on speed, power, endurance, and learning.",
        imgSrc: FeatureImg03,
        imgAlt: "Sleep Athletics Resource",
        actionText: "Increase Athletic Performance"
    },
];

export default function Resources() {
    return (
        <>
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
                    <div className=" pb-12  md:pb-20">

                        {/* Page header */}
                        <div className="max-w-3xl mx-auto text-left pb-12 md:pb-16">
                            <h4 className="inline-block bg-cyan-3 text-slate-12 py-2 px-4 rounded-full mb-4"
                                data-aos="fade-up">Sleep Better, Live Better: Unleash your Potential</h4>
                            <h1 className="h2 mb-4 text-slate-800 dark:text-slate-200" data-aos="fade-up">Mastering
                                Sleep with Eight Athletics: Your Ultimate Collection of Sleep Resources</h1>
                            <p className="text-xl text-slate-11" data-aos="fade-up" data-aos-delay="200">Explore our
                                science-backed sleep resources for practical advice and actionable tips. Discover how to
                                elevate your sleep quality, harness the power of sleep, and transform your waking
                                hours.</p>

                            <h3 className="h4 mt-12 mb-4 text-slate-800 dark:text-slate-200"
                                data-aos="fade-up">Navigating the Sleep Resources</h3>
                            <p className="text-lg text-slate-11 my-2" data-aos="fade-up" data-aos-delay="200">Follow
                                these steps to get the most out of our resources:</p>

                            <ol className="list-decimal list-inside text-lg text-slate-11 space-y-4" data-aos="fade-up"
                                data-aos-delay="200">
                                <li>We recommend beginning with the <InternalLink
                                    word="sleepEssentialsResource">'Overview'</InternalLink> in the <strong>Sleep
                                    Essentials Resource</strong>. This serves as the foundation of learning about
                                    sleep.
                                </li>
                                <li>Once you've grasped the basics, you can delve into the specific topics within the
                                    chosen collection for a more in-depth exploration.
                                </li>
                                <li>If you're interested in more advanced or specific areas, you can explore
                                    the <InternalLink word="sleepScienceResource">Sleep
                                        Science</InternalLink> and <InternalLink word="sleepAthleticsResource">Sleep
                                        Athletics</InternalLink> Resources.
                                    As always, feel free to choose the order of reading based on your interests and
                                    needs.
                                </li>
                            </ol>

                            <p className="text-lg text-slate-11 my-4" data-aos="fade-up" data-aos-delay="200">Whether
                                you're seeking a broad understanding or specific knowledge, navigate your way through.
                                Happy exploring!</p>
                        </div>

                        <h2 className="h3 mt-8 lg:px-20 text-slate-800 dark:text-slate-200" data-aos="fade-up">Our
                            Resource
                            Collections</h2>


                        {/* Cards */}
                        <div
                            className="relative py-6 sm:px-12 md:px-0 md:py-12 lg:max-w-7xl 2xl:max-w-full 2xl:px-0 lg:px-12 text-left">
                            {/* Grid */}
                            <div className="grid gap-6 md:gap-10 md:grid-cols-12">
                                {/* Looping through the boxes */}
                                {cardData.map(({title, content, imgSrc, imgAlt, actionText}, index) => (

                                    <div className="md:col-span-12" data-aos="fade-down" key={index}>
                                        <Link
                                            key={index}
                                            href={`/resources/${title.toLowerCase().replace(/ /g, "-")}/overview`}
                                            className={"group"}

                                        >
                                            <div
                                                className="relative z-20 h-full overflow-hidden rounded-[12px] border-2 border-black dark:border-black transition-all duration-300 transform shadow hover:drop-shadow-xl drawCard">
                                                <div
                                                    className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                    {/* Text */}
                                                    <div
                                                        className="order-1 shrink-0 p-6 pt-0 md:order-none md:max-w-[360px] lg:max-w-[450px] 3xs:pt-4  md:p-8 md:pr-2">
                                                        <div className="mb-4 md:mb-5">
                                                            <div>
                                                                <h3 className="text-lg md:text-3xl inline-flex bg-gradient-to-r from-slate-11 via-slate-12 to-slate-11 bg-clip-text pb-1 md:pb-2 font-bold text-transparent">
                                                                    {title}
                                                                </h3>
                                                                <p className="text-sm md:text-base text-slate-11">
                                                                    {content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Link
                                                                className="w-full md:w-auto btn-sm group relative text-slate-12 transition duration-150 ease-in-out bg-cyan-1 dark:bg-cyan-2 border-black focus:border-sky-7 focus:outline-sky-9 hover:bg-black dark:hover:bg-cyan-3 dark:hover:border-cyan-10 hover:text-slate-1 dark:hover:text-slate-12 group-hover:bg-black dark:group-hover:bg-cyan-3 group-hover:border-cyan-10 group-hover:text-slate-1 dark:group-hover:text-slate-12"
                                                                href={`/resources/${title.toLowerCase().replace(/ /g, "-")}/overview`}
                                                            >
<span className="relative inline-flex items-center justify-center md:justify-start">
                        {actionText} {' '}
    <span
        className="ml-1 tracking-normal text-blue-500 dark:text-cyan-10 transition-transform duration-150 ease-in-out group-hover:translate-x-1">
                          -&gt;
                        </span>
                      </span> </Link>
                                                        </div>
                                                    </div>
                                                    {/* Image */}
                                                    <div
                                                        className="block md:hidden items-center justify-center w-full md:w-auto">
                                                        <Image
                                                            className="object-cover w-full h-[20rem] md:h-full object-center sm:px-6"
                                                            src={imgSrc}
                                                            width={200}
                                                            height={200}
                                                            alt={imgAlt}
                                                        />
                                                    </div>
                                                    {/* Image - Shown above md */}
                                                    <div
                                                        className="hidden 2xs:flex md:block 3xs:hidden xs:hidden sm:hidden  items-center justify-center w-full md:w-auto ">
                                                        <Image
                                                            className="object-contain  w-full h-full lg:max-h-[470px]"
                                                            src={imgSrc}
                                                            width={400}
                                                            height={400}
                                                            alt={imgAlt}
                                                        />
                                                    </div>


                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                ))}
                            </div>
                        </div>


                        <div className="max-w-3xl mx-auto text-left pb-12 md:pb-16">

                            <h2 className="h2 mb-4 text-slate-800 dark:text-slate-200" data-aos="fade-up"> The Journey
                                Towards Mastering Sleep</h2>
                            <p className="text-xl text-slate-11" data-aos="fade-up" data-aos-delay="200">Harnessing the
                                power of sleep is an invaluable tool to reach your highest potential, unlock hidden
                                capabilities, and turn dreams into reality. Mastering sleep equips you with the
                                resilience to navigate life's challenges, fuels your body for optimum physical
                                performance, stimulates your mind for innovative thinking, and fosters the clarity and
                                focus required for effective leadership.</p>

                            <h3 className="h4 mt-12 mb-4 text-slate-800 dark:text-slate-200"
                                data-aos="fade-up">Achieve your dreams, one night at a time</h3>
                            <p className="text-lg text-slate-11 my-2" data-aos="fade-up" data-aos-delay="200">Adopting
                                healthy sleep habits is an investment in your future - a commitment to your personal
                                growth and development. The road to sleep mastery isn't always easy, and immediate
                                results are not guaranteed. It's a journey of consistency, patience, and learning.</p>

                            <p className="text-lg text-slate-11 my-4" data-aos="fade-up" data-aos-delay="200">With Eight
                                Athletics, you're not alone on this journey. We're here to guide, support, and inspire
                                you with scientifically backed sleep resources and innovative products at every
                                step. </p>
                            <p className="text-lg text-slate-11 my-4" data-aos="fade-up" data-aos-delay="200">So, dream
                                big and sleep
                                well, because a new chapter of your life is just about to start.</p>


                        </div>


                    </div>
                </div>
            </section>
        </>
    )
}