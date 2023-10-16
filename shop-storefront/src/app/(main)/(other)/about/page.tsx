
import TeamImages from '@/components/about/team-images';
import Timeline from '@/components/about/timeline';
import TestimonialsCarousel from '@/components/about/testimonials-carousel';
import ScrollSection from "@/components/about/ScrollSection";
import React from "react";
import HorizontalTextScroll from "@/components/about/HorizontalTextScroll";
import {LogoSection} from "@/components/about/LogoSection";
import { ConditionalRender } from '@/components/utils/ConditionalRender';

export const metadata = {
    title: 'About us - Eight Athletics',
    description: 'Eight Athletics mission is to create innovative sleep products that help you perform better, recover faster, and sleep deeper',
};

const About: React.FC = () => {


    return (
        <>
            <ScrollSection />


            {/* Only include HorizontalTextScroll for non-mobile devices */}
            <div className="hidden lg:block">
                <ConditionalRender showOn={['desktop']}>
                    <LogoSection />
                </ConditionalRender>
            </div>

            <HorizontalTextScroll />
            <Timeline />
            <TeamImages />
            <TestimonialsCarousel />
        </>
    );
};

export default About;
