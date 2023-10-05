
import TeamImages from '@/components/about/team-images';
import Timeline from '@/components/about/timeline';
import TestimonialsCarousel from '@/components/about/testimonials-carousel';
import ScrollSection from "@/components/about/ScrollSection";
import React from "react";
import HorizontalTextScroll from "@/components/about/HorizontalTextScroll";
import {LogoSection} from "@/components/about/LogoSection";

// Import headers from Next.js (as per your Next.js 13 guide)

import { ConditionalRender } from '@/components/utils/ConditionalRender';

export const metadata = {
    title: 'About us - Open PRO',
    description: 'Page description',
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
