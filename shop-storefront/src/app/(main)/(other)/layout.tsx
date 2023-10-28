'use client'

import {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '@/components/ui/Footer';
import Header from "@/components/ui/Header";


export default function PageLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    useEffect(() => {
        AOS.init({
            once: true,
            disable: 'phone',
            duration: 600,
            easing: 'ease-out-sine',
        });
    });
    return (
        <div className="flex flex-col min-h-screen bg-cyan-1">
            <Header />
            <main className="flex-grow bg-cyan-1 mt-[66px] lg:mt-[116px]">
                {children}
            </main>
            <Footer/>
        </div>
    )
}
