import Providers from "@modules/providers"
import "@/css/globals.css"
import {Inter, Architects_Daughter, Poppins} from 'next/font/google';
import 'flowbite';
import BreakpointsIndicator from "@/components/helper/breakpoints";
import {ProvidersNextUI} from "@/app/providers";
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';

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
    title: 'Eight Athletics',
    description: 'Eight Athletics Store',
}


type RootLayoutProps = {
    children: React.ReactNode;

};

export default function RootLayout({children}: RootLayoutProps) {


    return (
        <html lang="en" className="dark  md:border-2  border-amber-12">
        <body
            className={`${inter.variable} ${poppins.variable}  ${architects_daughter.variable}  font-inter tracking-tight  antialiased`}
        >
        <BreakpointsIndicator />
        <ProvidersNextUI>
            <Providers>
                <div className="flex min-h-screen flex-col overflow-hidden bg-mask-black ">
                    {children}
                </div>
            </Providers>
        </ProvidersNextUI>
        <Analytics />
        </body>
        </html>
    );
}

