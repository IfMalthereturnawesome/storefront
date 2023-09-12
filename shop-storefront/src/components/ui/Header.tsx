'use client';

import Link from 'next/link';
import Image from 'next/image';
import {ThemeToggle} from '../darkMode/ThemeToggle';
import {useState, useEffect} from 'react';
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

    return (
        <>
            {/*<TopNavBanner bannerMsg="Step Into the Future: Discover the World's First Custom Sleep Mask!" />*/}

            <header id="header_1" className="z-30 bg-cyan-1">
                <TopNav/>

                {/*  NAVIGATION DESKTOP */}
                <nav
                    className="mx-auto flex  items-center justify-between px-4  py-4 "
                    aria-label="Global"
                >
                    <div className="hidden lg:flex lg:w-1/4 items-center justify-center">
                        <Link href="/" className="block" aria-label="Eight Athletics">
                            <Image
                                src={'/images/Eight-Athletics-black-logo.svg'}
                                alt={'Eight Athletics Logo'}
                                width={120}
                                height={120}
                                className="dark:hidden"
                            ></Image>
                            <Image
                                src={'/images/Eight-Athletics-white-logo.svg'}
                                alt={'Eight Athletics Logo'}
                                width={120}
                                height={120}
                                className="hidden dark:block"
                            ></Image>

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
                    <div className="flex lg:hidden lg:w-1/4 items-center justify-center">
                        <Link href="/" className="block" aria-label="Eight Athletics">
                            <Image
                                src={'/images/Eight-Athletics-black-logo.svg'}
                                alt={'Eight Athletics Logo'}
                                width={90}
                                height={90}
                                className="dark:hidden"
                            ></Image>
                            <Image
                                src={'/images/Eight-Athletics-white-logo.svg'}
                                alt={'Eight Athletics Logo'}
                                width={90}
                                height={90}
                                className="hidden dark:block"
                            ></Image>

                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:w-1/2 justify-center">
                        {/* NAV COMPONENTS */}
                        <Popover.Group className="hidden lg:flex lg:gap-x-6">
                            <ProductNav activeSubMenu={activeSubMenu} setActiveSubMenu={setActiveSubMenu}/>
                            <ResourceNav activeSubMenu={activeSubMenu} setActiveSubMenu={setActiveSubMenu}/>
                            <SupportNav activeSubMenu={activeSubMenu} setActiveSubMenu={setActiveSubMenu}/>

                            {/* <BlogNav /> */}
                        </Popover.Group>
                    </div>

                    <div className="hidden 2xs:flex lg:w-1/4 justify-center items-center pr-2">
                        <ThemeToggle/>
                        <Search/>

                        <div className="hidden lg:flex items-center gap-x-6 h-full">
                            {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal/>}
                            <Link href="/account">
                                <UserIcon className="h-5 w-5 dark:stroke-white" aria-hidden="true"/>
                            </Link>
                        </div>
                        <CartDropdown/>

                    </div>
                </nav>

                {/* MOBILE START */}

                <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>
            </header>

        </>
    );
}


