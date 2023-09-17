'use client'

import {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '@/components/ui/Footer';
import Header from "@/components/ui/Header";
import FooterNav from "@modules/layout/components/footer-nav";


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
        <>
            <Header/>
            <main className="grow bg-cyan-1">
                {children}
            </main>
            <FooterNav/>
        </>
    )
}
