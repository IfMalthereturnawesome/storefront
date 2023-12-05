import Providers from "@modules/providers"
import "@/css/globals.css"
import {Inter, Architects_Daughter, Poppins} from 'next/font/google';
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import CookieBanner from "@/components/analytics/CookieBanner";
import {ProvidersNextUI} from "@/app/providers";
import {Analytics} from '@vercel/analytics/react';
import {Metadata} from 'next';
import BreakpointsIndicatorExtended from "@/components/helper/breakpointsExtended";
import BreakpointsIndicator from "@/components/helper/breakpoints";
import React, {Suspense} from "react";
import {PHProvider, PostHogPageview} from "./provider";

const GTAG = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const architects_daughter = Architects_Daughter({
    subsets: ['latin'],
    variable: '--font-architects-daughter',
    weight: '400',
    display: 'swap',
});

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ['latin'],
    variable: '--font-poppins',
    display: 'swap'
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:8000'),
    title: 'Eight Athletics | Enhance Recovery & Performance for Athletes through Sleep',
    category: 'Sleep Products',
    robots: 'all',
    description: 'Experience better sleep and performance with Eight Athletics\' sleep products. Tailored for athletes to boost recovery and success - achieve your dreams one night at a time.',
    openGraph: {
        title: 'Eight Athletics | Enhance Recovery & Performance for Athletes through Sleep',
        description: 'Experience better sleep and performance with Eight Athletics\' sleep products. Tailored for athletes to boost recovery and success - achieve your dreams one night at a time.',
        type: 'website',
        images: 'https://www.eightathletics.com/images/Eight-Athletics-black-logo.svg',
    },
}


type RootLayoutProps = {
    children: React.ReactNode;

};

function SearchBarFallback() {
    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="flex  items-center  justify-center lg:justify-start">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-8">
                </div>
            </div>
        </div>
    )
}


export default function RootLayout({children}: RootLayoutProps) {


    return (
        <html lang="en" className="dark" style={{colorScheme: 'dark'}}>
        <Suspense fallback={<SearchBarFallback/>}>
            <PostHogPageview/>
        </Suspense>
        <PHProvider>


            <body
                className={`${inter.variable} ${poppins.variable}  ${architects_daughter.variable}  font-inter tracking-tight antialiased`}
            >
            {/*<BreakpointsIndicatorExtended />*/}
            {/*<BreakpointsIndicator/>*/}
            <ProvidersNextUI>
                <Providers>
                    <div
                        className="flex md:border-2  border-black dark:border-[#FEE7B3] min-h-screen flex-col overflow-hidden bg-mask-black ">
                        {children}
                    </div>
                </Providers>
            </ProvidersNextUI>
            <Analytics/>
            <Suspense fallback={<SearchBarFallback/>}>
                <GoogleAnalytics GA_MEASUREMENT_ID={GTAG}/>
                <CookieBanner/>
            </Suspense>

            </body>
        </PHProvider>
        </html>
    );
}
