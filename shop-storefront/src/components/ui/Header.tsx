'use client';

import Link from 'next/link';
import Image from 'next/image';
import {ThemeToggle} from '../darkMode/ThemeToggle';
import {useState, useEffect} from 'react';
import {Dialog, Popover} from '@headlessui/react';
import ResourceNav from './ResourceNav';
import {ResourceNavMobile} from './ResourceNav';
import SupportNav from './SupportNav';
import {SupportNavMobile} from './SupportNav';
import ProductNav from './ProductNav';
import {ProductNavMobile} from './ProductNav';
import BlogNav from './BlogNav';
import {BlogNavMobile} from './BlogNav';
import TopNavBanner from './NavBanner';

import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import Search from '../resources/search';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoSize, setLogoSize] = useState({width: 10, height: 10});
  const [animateMenu, setAnimateMenu] = useState(false);
  const [rotateLogo, setRotateLogo] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);


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
    <>
      {/*<TopNavBanner bannerMsg="Step Into the Future: Discover the World's First Custom Sleep Mask!" />*/}

      <header id="header_1" className="z-30 bg-cyan-1">
        {/*  NAVIGATION DESKTOP */}
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4  py-5 "
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
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

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black dark:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
          {/* NAV COMPONENTS */}
          <Popover.Group className="hidden lg:flex lg:gap-x-6">
            <ProductNav activeSubMenu={activeSubMenu} setActiveSubMenu={setActiveSubMenu} />
            <ResourceNav activeSubMenu={activeSubMenu} setActiveSubMenu={setActiveSubMenu} />
            <SupportNav activeSubMenu={activeSubMenu} setActiveSubMenu={setActiveSubMenu} />

            {/* <BlogNav /> */}
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>

          <div className="z-30 hidden lg:order-last lg:flex lg:items-center lg:justify-end">
            <Search />
          </div>
          <div className=" order-first lg:order-last lg:flex lg:items-center lg:justify-end">
            <ThemeToggle />
          </div>
        </nav>

        {/* MOBILE START */}

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-40" />
          <Dialog.Panel
            className={`fixed inset-y-0 right-0 z-40 w-full transform overflow-y-auto bg-cyan-1 px-6 py-6 transition-transform duration-300 ease-in-out sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ${
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
                <div className="space-y-2 py-6">
                  {/* PRODUCT - MOBILE */}

                  <ProductNavMobile />

                  {/* RESOURCES - MOBILE */}
                  <ResourceNavMobile />

                  {/* SUPPORT - MOBILE */}

                  <SupportNavMobile />

                  {/* BLOG - MOBILE */}

                  <BlogNavMobile />
                  <div className="py-4">
                    <Search />
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}
