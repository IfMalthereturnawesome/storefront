'use client'

import React, {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Button} from "@nextui-org/button";

export default function ExtraSmallMobileNavBar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const buttonRef = useRef(null);
    const pathname = usePathname();
    const links = [
        {
            name: 'Product Information',
            href: '/faq/product-information'
        },
        {
            name: 'Ordering & Payments',
            href: '/faq/ordering-payments'
        },
        {
            name: 'Shipping & Delivery',
            href: '/faq/shipping-delivery'
        },
        {
            name: 'Returns & Exchanges',
            href: '/faq/returns-exchanges'
        },
        {
            name: 'Contact & Support',
            href: '/faq/contact-support'
        },
        {
            name: 'Legal & Privacy',
            href: '/faq/legal'
        }
    ]
    const currentCategory = links.find(link => link.href === pathname)?.name || 'FAQ Categories';

    useEffect(() => {
        function handleTouchOutside(event) {
            const sidebar = document.getElementById('sidebar');
            if (buttonRef.current && buttonRef.current.contains(event.target)) {
                return;
            }

            if (sidebar && !sidebar.contains(event.target)) {
                setSidebarOpen(false);
            }
        }

        document.addEventListener('touchstart', handleTouchOutside);

        return () => {
            document.removeEventListener('touchstart', handleTouchOutside);

        };
    }, [isSidebarOpen]);

    useEffect(() => {
        return () => setSidebarOpen(false);
    }, []);


    return (
        <>
            <aside className="fixed w-[98vw] bottom-0 left-1 right-1 bg-cyan-2 border-t border-slate-5 z-10 ">
                <nav className="block xs:hidden">
                    <Button
                        ref={buttonRef}
                        onClick={() => setSidebarOpen(prev => !prev)}
                        className="w-[98vw] bg-cyan-2 text-center py-3 relative flex flex-col items-center justify-center space-y-1"
                    >
                        <div className="flex items-center space-x-2">
                            <span>{currentCategory}</span>
                            <svg
                                className="h-5 w-5 transform"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            >
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </div>
                        <p className="text-2xs">Tap to change</p>
                    </Button>




                </nav>

                <nav className="hidden xs:block">
                    <NavBarLinks links={links} />
                </nav>
            </aside>

            {isSidebarOpen && <Overlay />}
            {isSidebarOpen && <Sidebar setSidebarOpen={setSidebarOpen}  links={links}/>}
        </>
    )
}

function NavBarLinks({ links }) {
    const pathname = usePathname();

    return (
        <ul className="flex flex-col space-y-4 py-2">
            {links.map((link, linkIndex) => (
                <li key={linkIndex} className="text-center">
                    <Link
                        className={`flex flex-col items-center px-2 py-2 text-sm group transition duration-150 ease-in-out ${pathname === link.href ? 'text-blue-500 dark:text-indigo-500' : ' text-slate-11 hover:text-indigo-500 dark:text-white dark:hover:text-gray-300'}`}
                        href={link.href}>
                        <span>{link.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

function Sidebar({ setSidebarOpen, links }) {
    return (
        <div id="sidebar" className="fixed bottom-16 left-1 w-[98vw] h-fit bg-cyan-2 z-20 p-4  ">
            <h4 className="text-lg font-semibold px-3 pb-3 text-center text-slate-800 dark:text-slate-200">Choose a FAQ category</h4>
            <button onClick={() => setSidebarOpen(false)} className="absolute top-2 right-2 text-gray-700 dark:text-white">
                <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                    <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
            </button>
            <NavBarLinks links={links} />
        </div>
    )
}


function Overlay() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40 backdrop-blur-md z-15"></div>
    );
}
