'use client';

import Link from 'next/link';
import Image from 'next/image';
import {ThemeToggle} from '../darkMode/ThemeToggle';
import React, {useState, useEffect, useRef} from 'react';
import {Popover} from '@headlessui/react';
import ResourceNav from './ResourceNav';
import SupportNav from './SupportNav';
import ProductNav from './ProductNav';
import BlogNav from './BlogNav';
import TopNavBanner from './NavBanner';
import {MobileMenu} from "@/components/ui/MobileMenu";
import {Bars3Icon} from '@heroicons/react/24/outline';
import {UserIcon} from '@heroicons/react/24/outline';
import Search from '../resources/search';
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal";
import CartDropdown from "@modules/layout/components/cart-dropdown";
import TopNav from "@/components/ui/TopNav";
import NavigationMenuDropdowns from "@/components/ui/navigation-menu";
import {useRouter, usePathname, useSearchParams} from 'next/navigation'
import SecondaryButton from "@modules/common/components/button/SecondaryButton";

import {useCart} from "medusa-react";


interface HeaderProps {
    className?: string;
}

export default function Header({className}: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [topNavBanner, setTopNavBanner] = useState(true);


    const pathname = usePathname();

    const isOnProductPage = pathname.includes('/products/') || pathname === '/';


    const { cart, totalItems } = useCart()

    const scrollThreshold = 100;  // Set a threshold, 50 pixels in this example


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.scrollY;
            const scrollDifference = Math.abs(currentScrollPosition - lastScrollPosition);

            if (currentScrollPosition < 100) { // near top of the page
                setTopNavBanner(true);
            } else {
                setTopNavBanner(false);
            }

            if (currentScrollPosition < lastScrollPosition) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            if (scrollDifference >= scrollThreshold) {
                if (currentScrollPosition < lastScrollPosition) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
                setLastScrollPosition(currentScrollPosition);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollPosition]);


    return (
        <>
            {/*<TopNavBanner bannerMsg="Step Into the Future: Discover the World's First Custom Sleep Mask!" />*/}

            <header id="header_1"
                    className={`z-30  ${className || 'bg-cyan-1'} mx-[2px] ${isVisible ? 'headerVisible' : 'headerHidden '} ${topNavBanner ? 'headerFullWidth' : 'headerOnScroll bg-cyan-2 dark:bg-mask-black'}`}>

            {topNavBanner && <TopNav/>}

                <nav
                    className="relative mx-auto flex items-center justify-between px-4 py-4"
                    aria-label="Global"
                >
                    <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2">
                        <Link href="/" aria-label="Eight Athletics" className={"z-[2]"}>

                            <Image
                                src={'/images/Eight-Athletics-black-logo.svg'}
                                alt={'Eight Athletics Logo'}
                                width={100}
                                height={100}
                                className="dark:hidden"
                            />
                            <Image
                                src={'/images/Eight-Athletics-white-logo.svg'}
                                alt={'Eight Athletics Logo'}
                                width={100}
                                height={100}
                                className="hidden dark:block"
                            />
                        </Link>
                    </div>

                    <div className="hidden lg:flex lg:w-1/4 items-center  justify-center lg:justify-start">
                        <Link href="/" aria-label="Eight Athletics" className={"lg:ml-[15%] z-[2]"}>
                            <Image
                                src={'/images/Eight-Athletics-black-logo.svg'}
                                alt={'Eight Athletics Logo'}
                                width={120}
                                height={120}
                                className="dark:hidden"
                            />
                            <Image
                                src={'/images/Eight-Athletics-white-logo.svg'}
                                alt={'Eight Athletics Logo'}
                                width={120}
                                height={120}
                                className="hidden dark:block"
                            />
                        </Link>
                    </div>

                    <div className="flex lg:hidden lg:w-0 w-1/4 justify-start pl-2">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-3 text-black dark:text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-8 w-8" aria-hidden="true"/>
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:w-1/2 justify-center">
                        <Popover.Group className="hidden lg:flex lg:gap-x-6 w-[99vw]">
                            <NavigationMenuDropdowns className={className}/>
                        </Popover.Group>
                    </div>

                    <div className="flex lg:w-1/4 justify-center items-center  pr-2">
                        <ThemeToggle/>
                        <Search/>

                        <div className="hidden lg:flex items-center gap-x-6 h-full">
                            {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal/>}
                            <Link href="/account" className={"z-[2]"}>
                                <UserIcon className="h-5 w-5 xl:h-6 xl:w-6 stroke-mask-black dark:stroke-custom-white"
                                          aria-hidden="true"/>
                            </Link>
                        </div>

                        <div className={"pl-4 z-[2]"}>
                        {isOnProductPage && totalItems === 0 ? (
                            <Link href="#buy-now" >
                                <SecondaryButton variant={"fourth"}
                                                 className={"rounded-[0.5rem] capitalize group text-md !py-2 !px-4 !min-h-[1.5rem]"}>
                                    Buy now
                                </SecondaryButton>
                            </Link>
                        ) : (
                            <CartDropdown/>
                        )}
                        </div>
                    </div>
                </nav>
                <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>


            </header>
        </>
    );
}


