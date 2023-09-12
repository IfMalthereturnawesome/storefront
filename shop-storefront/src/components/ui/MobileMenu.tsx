'use client';


import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {BlogNavMobile} from './BlogNav';
import {ProductNavMobile} from './ProductNav';
import {SupportNavMobile} from './SupportNav';
import {ResourceNavMobile} from './ResourceNav';
import {ThemeToggle} from '../darkMode/ThemeToggle';
import {Dialog, Popover} from '@headlessui/react';
import Search from '../resources/search';
import {UserIcon, XMarkIcon} from "@heroicons/react/24/outline";
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal";
import CartDropdown from "@modules/layout/components/cart-dropdown";
import TopNav, {TopNavMobile} from "@/components/ui/TopNav";

interface MobileMenuProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (mobileMenuOpen: boolean) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
    const [logoSize, setLogoSize] = useState({width: 10, height: 10});
    const [animateMenu, setAnimateMenu] = useState(false);
    const [rotateLogo, setRotateLogo] = useState(false);

    useEffect(() => {
        if (mobileMenuOpen) {
            setLogoSize({width: 20, height: 20});
        } else {
            setLogoSize({width: 25, height: 25});
        }
    }, [mobileMenuOpen]);

    useEffect(() => {
        if (mobileMenuOpen) {
            setTimeout(() => {
                setAnimateMenu(true);
                setRotateLogo(true);
            }, 10);
        } else {
            setAnimateMenu(false);
            setRotateLogo(false);
        }
    }, [mobileMenuOpen]);

    return (

        <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
        >

            <div className="fixed inset-0 z-40" />
            <Dialog.Panel
                className={`fixed inset-y-0 right-0 z-40 w-full transform overflow-y-auto bg-cyan-1 px-6  py-6 transition-transform duration-300 ease-in-out sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ${
                    animateMenu ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between">
                    <Link href="/" className="block" aria-label="Eight Athletics">
                        <Image
                            src={'/images/Eight-Athletics-black-logo-icon.svg'}
                            alt={'Eight Athletics Logo'}
                            width={logoSize.width}
                            height={logoSize.height}
                            className={` transition-all duration-700 ease-in-out dark:hidden ${
                                rotateLogo ? 'rotate-720' : ''
                            }`}
                        ></Image>
                        <Image
                            src={'/images/Eight-Athletics-white-logo-icon.svg'}
                            alt={'Eight Athletics Logo'}
                            width={logoSize.width}
                            height={logoSize.height}
                            className={` transition-all duration-700 ease-in-out dark:block hidden  ${
                                rotateLogo ? 'rotate-720' : ''
                            }`}
                        ></Image>
                    </Link>

                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="mt-6 flow-root ">
                    <div className="-my-6 divide-y divide-gray-500/10 ">
                        <div className="space-y-2 pt-6 pb-5 ">
                            {/* PRODUCT - MOBILE */}

                            <ProductNavMobile />

                            {/* RESOURCES - MOBILE */}
                            <ResourceNavMobile />

                            {/* SUPPORT - MOBILE */}

                            <SupportNavMobile />

                            {/* BLOG - MOBILE */}

                            <BlogNavMobile />

                            {/* Spacer div with border for break */}
                            <div className="border-b border-gray-5 -mx-6 " />
                            <div className="space-y-2 -mx-2 py-5">

                                    <TopNavMobile />
                                <ThemeToggle />
                            </div>

                        </div>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
};