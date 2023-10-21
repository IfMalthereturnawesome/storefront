'use client'


import Footer from '@/components/ui/Footer';
import Header from "@/components/ui/Header";
import {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PageLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    useEffect(() => {
        AOS.init({
            once: false,
            disable: 'phone',
            duration: 600,
            easing: 'ease-out-sine',
        });
    });

    return (
        <>
            <Header className={"bg-cyan-1 dark:bg-mask-black"}/>
            <main className="grow bg-custom-white dark:bg-mask-black pt-[70px] lg:pt-[104px]">
                {children}
            </main>
            <Footer/>
        </>
    )
}
