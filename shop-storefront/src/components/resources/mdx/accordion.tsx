'use client'
import React, {useState, useRef, useEffect} from 'react'
import {Button} from '@nextui-org/button';

interface PostAccordionProps {
    title: string
    active?: boolean
    children: React.ReactNode
}

export default function PostAccordion({title, active = false, ...props}: PostAccordionProps) {

    const [accordionOpen, setAccordionOpen] = useState<boolean>(active)
    const contentRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(accordionOpen ? "auto" : "0")

    useEffect(() => {
        setHeight(accordionOpen ? `${contentRef.current?.scrollHeight}px` : "0")
    }, [accordionOpen])

    return (
        <div className={`mb-3 prose-p:m-0 py-1  ${accordionOpen ? ' rounded-[12px]' : ''}`}>
            <Button className={`flex justify-between items-center py-5 px-4 w-full leading-6 cursor-pointer font-medium text-left
                  overflow-hidden dark:bg-cyan-2 dark:hover-cyan-1 bg-cyan-1 hover:bg-gold-1 border border-black hover:border-sky-11 dark:hover:border-cyan-10 transition-all duration-300 transform shadow dark:hover:drop-shadow-xl hover:drop-shadow-sm  ${accordionOpen ? 'rounded-t-[12px]' : 'rounded-[12px]'}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setAccordionOpen(!accordionOpen);
                    }}
                    aria-expanded={accordionOpen}>

                <h4 className={"flex-shrink whitespace-normal text-slate-800 dark:text-slate-200 m-0 text-sm md:text-md "}>{title}</h4>

                <div
                    className={`shrink-0 mr-3 transform transition-transform duration-300 ${accordionOpen ? 'rotate-45' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                </div>

            </Button>
            <div ref={contentRef} style={{height: height, transition: 'height 0.3s ease-out', overflow: 'hidden'}}>
                <div
                    className={`px-4 py-2 mt-2 bg-cyan-1 ${accordionOpen ? 'rounded-b-[12px]' : ''}`}>{props.children}</div>
            </div>
        </div>
    )
}
