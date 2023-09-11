
import TeamImages from '@/components/about/team-images'
import Timeline from '@/components/about/timeline'
import TestimonialsCarousel from '@/components/about/testimonials-carousel'
import ScrollSection from "@/components/about/ScrollSection";
import React from "react";
import HorizontalTextScroll from "@/components/about/HorizontalTextScroll";
import {LogoSection} from "@/components/about/LogoSection";

export const metadata = {
    title: 'About us - Open PRO',
    description: 'Page description',
}


export default function About() {
    return (
        <>

            <ScrollSection/>

            <LogoSection/>

            <HorizontalTextScroll/>



            <Timeline />



            <TeamImages />


            <TestimonialsCarousel />


        </>
    )
}