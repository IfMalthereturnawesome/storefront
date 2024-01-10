import Footer from '@/components/ui/Footer';
import Header from "@/components/ui/Header";
import React from "react";


export default function PageLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <>
            <link rel="dns-prefetch" href="https://cdn.jsdelivr.net"/>

            <div className="flex flex-col min-h-screen bg-cyan-1">
                <Header className="flex-shrink-0 bg-cyan-1"/>
                <main className="flex-grow bg-cyan-1 mt-[66px] lg:mt-[116px]">
                    {children}
                </main>
                <Footer/>
            </div>
        </>
    );
}