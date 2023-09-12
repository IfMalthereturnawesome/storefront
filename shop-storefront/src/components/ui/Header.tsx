'use client';

import Link from 'next/link';
import Image from 'next/image';
import {ThemeToggle} from '../darkMode/ThemeToggle';
import {useState, useEffect, useRef} from 'react';
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


export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [topNavBanner, setTopNavBanner] = useState(false);


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

            <header id="header_1" className={`z-30 bg-cyan-1 mx-[2px] ${isVisible ? 'headerVisible' : 'headerHidden'}`}>
                {topNavBanner && <TopNav />}

                <nav
                    className="relative mx-auto flex items-center justify-between px-4 py-4"
                    aria-label="Global"
                >
                    <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2">
                        <Link href="/" aria-label="Eight Athletics">
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
                        <Link href="/" aria-label="Eight Athletics" className={"lg:ml-[15%]"}>
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
                            <Bars3Icon className="h-8 w-8" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:w-1/2 justify-center">
                        <Popover.Group className="hidden lg:flex lg:gap-x-6">
                            <ProductNav activeSubMenu={activeSubMenu} setActiveSubMenu={setActiveSubMenu} />
                            <ResourceNav activeSubMenu={activeSubMenu} setActiveSubMenu={setActiveSubMenu} />
                            <SupportNav activeSubMenu={activeSubMenu} setActiveSubMenu={setActiveSubMenu} />
                        </Popover.Group>
                    </div>

                    <div className="flex lg:w-1/4 justify-center items-center pr-2">
                        <ThemeToggle />
                        <Search />

                        <div className="hidden lg:flex items-center gap-x-6 h-full">
                            {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
                            <Link href="/account">
                                <UserIcon className="h-5 w-5 xl:h-6 xl:w-6 stroke-mask-black dark:stroke-custom-white" aria-hidden="true" />
                            </Link>
                        </div>
                        <CartDropdown />
                    </div>
                </nav>

                <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
            </header>
        </>
    );
}


