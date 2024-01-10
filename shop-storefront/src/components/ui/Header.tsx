'use client';

import Link from 'next/link';
import Image from 'next/image';
import {ThemeToggle} from '../darkMode/ThemeToggle';
import React, {useState, useEffect, useRef} from 'react';
import {Popover} from '@headlessui/react';
import {MobileMenu} from "@/components/ui/MobileMenu";
import {Bars3Icon} from '@heroicons/react/24/outline';
import {UserIcon} from '@heroicons/react/24/outline';
import Search from '../resources/search';
import CartDropdown from "@modules/layout/components/cart-dropdown";
import TopNav from "@/components/ui/TopNav";
import NavigationMenuDropdowns from "@/components/ui/navigation-menu";
import {usePathname} from 'next/navigation'
import SecondaryButton from "@modules/common/components/button/SecondaryButton";

import {useCart} from "medusa-react";

import {usePostHog, useFeatureFlagEnabled, useFeatureFlagVariantKey} from 'posthog-js/react'


interface HeaderProps {
    className?: string;
}

export default  function Header({className}: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [topNavBanner, setTopNavBanner] = useState(true);
    const pathname = usePathname();
    const isOnProductPage = pathname.includes('/products/') || pathname === '/';
    const {cart, totalItems} = useCart();

    // POSTHUG CLIENT SIDE
    // const [ ctaState, setCtaState ] = useState('Buy now')
    // const ctaVariant = useFeatureFlagVariantKey('buy-now-button')
    //
    //
    // useEffect(() => {
    //     if (ctaVariant === 'test') {
    //         setCtaState('Grab Yours')
    //     }
    // }, [ctaVariant])


    const scrollThresholdMobile = 50;
    const scrollThresholdTablet = 75;
    const scrollThresholdDesktop = 100;


    const [lastDirectionChangePosition, setLastDirectionChangePosition] = useState(0);
    const [scrollingUp, setScrollingUp] = useState(false);
    const lastScrollPosition = useRef(0);


    const [isCartLoaded, setIsCartLoaded] = useState(false);
    // Determine the correct logo to show initially
    const initialLogo = totalItems === 0 ? 'icon' : 'full';

    useEffect(() => {
        if (cart) {  // Assuming cart will be non-null/undefined once loaded
            setIsCartLoaded(true);
        }
    }, [cart]);

    const renderLogo = () => {
        if (!isCartLoaded) {

          return null;

        }

        const logoBasePath = '/images/Eight-Athletics-';
        const logoVariant = totalItems === 0 ? 'black-logo-icon.svg' : 'black-logo.svg';
        const logoVariantWhite = totalItems === 0 ? 'white-logo-icon.svg' : 'white-logo.svg';
        const logoSize = totalItems === 0 ? 24 : 80;

        return (
            <>
                <Image
                    src={`${logoBasePath}${logoVariant}`}
                    alt={'Eight Athletics Logo'}
                    width={logoSize}
                    height={logoSize}
                    className="dark:hidden"
                />
                <Image
                    src={`${logoBasePath}${logoVariantWhite}`}
                    alt={'Eight Athletics Logo'}
                    width={logoSize}
                    height={logoSize}
                    className="hidden dark:block"
                />
            </>
        );
    };


    const handleScroll = () => {

        const screenWidth = window.innerWidth;
        let scrollThreshold = scrollThresholdMobile;

        if (screenWidth > 1280) {
            scrollThreshold = scrollThresholdDesktop;
        } else if (screenWidth > 768) {
            scrollThreshold = scrollThresholdTablet;
        }

        const currentScrollPosition = window.scrollY;

        // Handling for when the scroll position is below the threshold
        if (currentScrollPosition < scrollThreshold) {
            setTopNavBanner(true);
            setIsVisible(true);
            lastScrollPosition.current = currentScrollPosition;
            return;
        }

        const isScrollingUpNow = currentScrollPosition < lastScrollPosition.current;
        const scrollDifference = Math.abs(currentScrollPosition - lastScrollPosition.current);

        if (isScrollingUpNow !== scrollingUp) {
            setLastDirectionChangePosition(currentScrollPosition);
            setScrollingUp(isScrollingUpNow);
        }

        // Handle visibility based on scroll direction and difference
        if (scrollDifference >= scrollThreshold) {
            if (isScrollingUpNow && (currentScrollPosition <= lastDirectionChangePosition - scrollThreshold)) {
                setTopNavBanner(false);
                setIsVisible(true);
            } else if (!isScrollingUpNow) {
                setTopNavBanner(false);
                setIsVisible(false);
            }
            lastScrollPosition.current = currentScrollPosition;
        }
    };

    // Add and remove the scroll event listener when the component mounts and unmounts
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollingUp]);


    return (
        <>
            {/*<TopNavBanner bannerMsg="Step Into the Future: Discover the World's First Custom Sleep Mask!" />*/}

            <header id="header_1"
                    className={`z-30  ${className || 'bg-cyan-1'} md:mx-[2px] ${isVisible ? 'headerVisible' : 'headerHidden '} ${topNavBanner ? 'headerFullWidth' : 'headerOnScroll bg-cyan-2 dark:bg-mask-black'}`}>

                {topNavBanner && <TopNav/>}

                <nav
                    className="relative mx-auto flex items-center justify-between px-4 py-4"
                    aria-label="Global"
                >
                    <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2">
                        <Link prefetch={false} href="/" aria-label="Eight Athletics" className={"z-[2]"}>
                            {renderLogo()}
                        </Link>
                    </div>

                    <div className="hidden lg:flex lg:w-1/4 items-center  justify-center lg:justify-start">
                        <Link href="/" prefetch={false} aria-label="Eight Athletics" className={"lg:ml-[15%] z-[2]"}>
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

                    <div className="flex lg:hidden lg:w-0 w-1/4 justify-start sm:pl-2">

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

                    <div className="flex lg:w-1/4 justify-center items-center  sm:pr-2">
                        <ThemeToggle/>
                        <div className={"hidden md:flex"}>
                            <Search/>
                        </div>

                        <div className="hidden lg:flex items-center gap-x-6 h-full">
                            {/*{process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal/>}*/}
                            <Link prefetch={false} href="/account" className={"z-[2]"}>
                                <UserIcon className="h-5 w-5 xl:h-6 xl:w-6 stroke-mask-black dark:stroke-custom-white"
                                          aria-hidden="true"/>
                            </Link>
                        </div>
                        <CartDropdown/>
                        {/*<div className={"sm:pl-4 z-[2]"}>*/}
                        {/*    {isOnProductPage && totalItems === 0 ? (*/}
                        {/*        <Link href="#buy-now">*/}
                        {/*            <SecondaryButton variant={"fourth"} id={"buy-now-button"}*/}
                        {/*                             className={"rounded-[0.5rem] capitalize group text-sm sm:text-md !py-1 !px-2 !min-h-[1.1rem] " +*/}
                        {/*                                 "2xs:!py-1 2xs:!px-3 2xs:!min-h-[1.2rem]" +*/}
                        {/*                                 "sm:!py-2 sm:!px-4 sm:!min-h-[1.5rem] xl:!min-h-[2.5rem]"}>*/}
                        {/*                {ctaState}*/}
                        {/*            </SecondaryButton>*/}
                        {/*        </Link>*/}
                        {/*    ) : (*/}
                        {/*        <CartDropdown/>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                    </div>
                </nav>
                <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>


            </header>
        </>
    );
}


