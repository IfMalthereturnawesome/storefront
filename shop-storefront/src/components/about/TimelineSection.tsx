'use client';

import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Image from 'next/image';


import {CalendarIcon} from "@radix-ui/react-icons";
import React, {useRef, useState, useEffect} from 'react';


interface Milestone {
    title: string;
    date: string;
    description: string;
    logo: string;
}


// Milestone data
const milestones: Milestone[] = [
    {
        title: 'Idea',
        date: '21. Mar 2021',
        description: 'Sleep is the most essential part of a healthy lifestyle. We identified multiple issues that make sleeping difficult and could benefit from better solutions. The first issue we want to address is light pollution in the bedroom, which a sleep mask can faq with.',
        logo: 'eight-athletics-idea', // If you want to use images
    },
    {
        title: 'Foundation of Eight Athletics',
        date: '1. Dec 2021',
        description: "Eight Athletics' mission is to develop new, cutting-edge sleep products to address the growing issue of sleep deprivation.",
        logo: 'eight-athletics-idea',
    },
    {
        title: 'Sleepmask - Prototype 9',
        date: '22. Apr 2022',
        description: 'High-fidelity prototype developed from the materials to be used in the final product, taking into account the production methods to be used in the final product.',
        logo: 'eight-athletics-idea',
    },
    {
        title: 'Funding',
        date: '12. June 2022',
        description: 'We have received funding!',
        logo: 'eight-athletics-idea',
    },
    {
        title: 'Blackout Mask Lux - Launch',
        date: '2. Jan 2023',
        description: 'Expected launch sometime in the start of the new year.',
        logo: 'eight-athletics-idea',
    },
];


const TimelineSection: React.FC = () => {
    // State to track which elements are in view
    const [inView, setInView] = useState<boolean[]>(new Array(milestones.length).fill(false));
    const [scrollPosition, setScrollPosition] = useState(0);
    // Refs to track each VerticalTimelineElement
    const refs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        // Function to check if an element is in view
        const checkInView = () => {
            const newInView = refs.current.map((ref) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
                }
                return false;
            });
            setInView(newInView);
        };

        // Add scroll event listener
        window.addEventListener('scroll', checkInView);

        // Check in view initially
        checkInView();

        // Cleanup
        return () => window.removeEventListener('scroll', checkInView);
    }, []);


    return (
        <div className="grow dark:bg-cyan-1 p-8 pt-10">
            <div className="container mx-auto  ">
                <h2 className="h2 mb-4 text-center py-20 text-slate-800 dark:text-slate-200">From concept to
                    reality</h2>
                <VerticalTimeline lineColor="#BBBBBB">
                    {milestones.map((milestone, index) => (
                        <VerticalTimelineElement
                            key={index}
                            className="vertical-timeline-element border-none p-16"
                            contentStyle={{background: 'rgba(255,255,255,0)', color: '#fff', padding: '0',}}
                            contentArrowStyle={{borderRight: '0px solid  #B7B0B0FF'}}
                            date={milestone.date}
                            dateClassName={`text-slate-12 ${inView[index] ? 'font-bold' : ''}`}
                            icon={<CalendarIcon/>}

                            iconStyle={inView[index] ? {background: 'rgb(255,255,255)', color: '#000000'} : {background: '#eeeeee', color: '#000000'}}
                            intersectionObserverProps={{threshold: 0.2}}
                        >
                            <div
                                ref={(el) => (refs.current[index] = el)}
                                className={`leading-7  text-center ${inView[index] ? 'bg-cyan-1' : 'bg-cyan-1'} text-slate-11 border border-black hover:border-sky-11 dark:hover:border-cyan-10 hover:bg-sky-2 transition-all duration-300 transform `}
                            >
                                <div className="flex  m-8  justify-start items-start max-w-full text-left flex-col">
                                    <Image
                                        src={`/images/${milestone.logo}.jpg`}
                                        alt={milestone.title}
                                        className="object-cover flex-shrink-0 mb-2 w-full max-w-full h-56 border-none"
                                        width={500}
                                        height={300}
                                    />
                                    <h3
                                        className="inline-flex bg-gradient-to-r from-slate-11 via-slate-12 to-slate-11 bg-clip-text py-3 text-3xl font-bold text-transparent"
                                        style={{lineHeight: 1.3}}
                                    >
                                        {milestone.title}
                                    </h3>
                                    <div className="max-w-full text-sm leading-5 text-slate-11">
                                        {milestone.description.split('\n').map((line, i) => (
                                            <p key={i} className="mb-1">{line}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </div>
        </div>
    );
};

export default TimelineSection;

