'use client';


import Image from 'next/image';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {BlogNavMobile} from './BlogNav';
import {ProductNavMobile} from './ProductNav';
import {SupportNavMobile} from './SupportNav';
import {ResourceNavMobile} from './ResourceNav';
import {Dialog} from '@headlessui/react';
import Search from '../resources/search';
import { XMarkIcon} from "@heroicons/react/24/outline";
import  {TopNavMobile} from "@/components/ui/TopNav";
import ReactCountryFlag from "react-country-flag";
import ChevronDown from "@modules/common/icons/chevron-down";
import {useStore} from "@lib/context/store-context";
import useCountryOptions from "@lib/hooks/use-country-options";
import {useMobileMenu} from "@lib/context/mobile-menu-context";
import CountryMenu from "@modules/mobile-menu/components/country-menu"




interface MobileMenuProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (mobileMenuOpen: boolean) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
    const [logoSize, setLogoSize] = useState({ width: 10, height: 10 });
    const [animateMenu, setAnimateMenu] = useState(false);
    const [rotateLogo, setRotateLogo] = useState(false);
    const { countryCode } = useStore();
    const countries = useCountryOptions();

    const {
        close,
        screen: [currentScreen, setScreen],
    } = useMobileMenu()

    const [showMainMenu, setShowMainMenu] = useState(true); // State to control main menu visibility

    const setScreenCountry = () => {
        setScreen("country");
        setShowMainMenu(false); // Hide the main menu when switching to the CountryMenu
    };

    const goBackToMainMenu = () => {
        setScreen("main");
        setShowMainMenu(true); // Show the main menu when going back
    };

    const handleCountrySelected = () => {
        setShowMainMenu(true);  // Set showMainMenu to true
        setScreen("main");      // Optional, if you want to also switch back to the main screen
    };

    useEffect(() => {
        if (mobileMenuOpen) {
            setLogoSize({ width: 20, height: 20 });
        } else {
            setLogoSize({ width: 25, height: 25 });
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
                className={`fixed inset-y-0 right-0 z-40 w-full transform overflow-y-auto bg-cyan-1 ${
                    showMainMenu ? 'px-6' : ''
                } py-6 transition-transform duration-300 ease-in-out sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ${
                    animateMenu ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between">
                    {showMainMenu && (
                        <><Link href="/" className="block" aria-label="Eight Athletics">
                            <Image
                                src={'/images/Eight-Athletics-black-logo-icon.svg'}
                                alt={'Eight Athletics Logo'}
                                width={logoSize.width}
                                height={logoSize.height}
                                className={` transition-all duration-700 ease-in-out dark:hidden ${rotateLogo ? 'rotate-720' : ''}`}
                            ></Image>
                            <Image
                                src={'/images/Eight-Athletics-white-logo-icon.svg'}
                                alt={'Eight Athletics Logo'}
                                width={logoSize.width}
                                height={logoSize.height}
                                className={` transition-all duration-700 ease-in-out dark:block hidden  ${rotateLogo ? 'rotate-720' : ''}`}
                            ></Image>

                        </Link>

                            <div className={"md:hidden"}>
                                <Search/>
                            </div>

                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>

                        </>
                    )}
                </div>

                <div className={`flow-root ${showMainMenu ? 'mt-6' : ''}`}>
                    <div className="-my-6 divide-y divide-gray-500/10 ">
                        <div className={`space-y-2 pb-5 ${showMainMenu ? 'pt-6': ''}`}>
                            {showMainMenu && ( // Conditional rendering of Main Menu
                                <>
                                    {/* PRODUCT - MOBILE */}
                                    <ProductNavMobile />

                                    {/* RESOURCES - MOBILE */}
                                    <ResourceNavMobile />

                                    {/* SUPPORT - MOBILE */}
                                    <SupportNavMobile />

                                    {/* BLOG - MOBILE */}
                                    <BlogNavMobile />
                                </>
                            )}


                            {showMainMenu && (
                                <div className="border-b border-gray-5 -mx-6" />
                            )}



                            {showMainMenu && (
                            <div className="space-y-2 -mx-2 py-5">

                                <TopNavMobile />

                            </div>
                            )}
                            <div className="flex flex-col gap-y-4">
                                {showMainMenu && (
                                    <><span
                                        className="text-sm w-full font-normal uppercase leading-4 cursor-pointer text-slate-11">Delivery</span>
                                        <button
                                            className="flex items-center justify-between border-b border-gray-200 py-2"
                                            onClick={setScreenCountry}>
                                        <span className="sr-only">
                                            Click to select shipping country
                                        </span>
                                            <div className="flex items-center gap-x-2">
                                                <ReactCountryFlag countryCode={countryCode || "us"} svg alt={countries?.find((c) => c.country === countryCode)?.label}/>
                                                <span className="normal-case">
                                                Free Shipping to{" "}
                                                    {countries?.find((c) => c.country === countryCode)?.label}
                                            </span>
                                            </div>
                                            <ChevronDown className="-rotate-90"/>
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="flex flex-col flex-1">
                                {(() => {
                                    switch (currentScreen) {
                                        case "country":
                                            return  <CountryMenu
                                                goBack={goBackToMainMenu}
                                                onCountrySelected={handleCountrySelected}
                                                setMobileMenuOpen={setMobileMenuOpen}
                                            />;
                                        default:
                                            return null;
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
};