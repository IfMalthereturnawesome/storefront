import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  products,
  resources,
  blog,
  supportItems,
  supportCTA,
  b2b,
} from '@/utils/reuseableData';


export default function Footer() {
  return (
    <footer className='z-10'>
      <div className="bg-cyan-2 py-8 sm:py-24 border-t-2 border-amberA-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 px-8 sm:px-16 md:grid-cols-6 md:px-12 lg:gap-12 lg:px-16 xl:px-16">
            {/* 1st block */}
            <div className="md:col-span-4 lg:col-span-4">
              <div className="mb-2">
                {/* Logo */}
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
              <div
                className="my-4 bg-gradient-to-r from-caction-700 via-csecondary-900 to-caction-800 bg-clip-text text-lg font-bold 
  text-transparent transition duration-500 
  ease-in-out hover:from-caction-800 hover:via-csecondary-700 hover:to-caction-950 hover:bg-clip-text 
  dark:from-caction-300 dark:via-cgreen-100 dark:to-cgreen-300 
  dark:hover:from-caction-300 dark:hover:via-cgreen-200 dark:hover:to-caction-200"
              >
                Sleep Centric Performance
                <br />
                Achieve your dreams, one night at a time
              </div>
            </div>

            {/* 2nd, 3rd and 4th blocks */}
            <div className="grid gap-8 sm:grid-cols-3 md:col-span-6 lg:col-span-6">
              {/* 2nd block */}
              <div className="text-base font-semibold">
                <Link href="/product">
                  <h6
                    className="mb-4 bg-gradient-to-r from-caction-700 via-csecondary-900 to-caction-800 bg-clip-text text-lg font-bold 
  text-transparent transition duration-500 
  ease-in-out hover:from-caction-800 hover:via-csecondary-700 hover:to-caction-950 hover:bg-clip-text 
  dark:from-caction-300 dark:via-cgreen-100 dark:to-cgreen-300 
  dark:hover:from-caction-300 dark:hover:via-cgreen-200 dark:hover:to-caction-200"
                  >
                    Sleep Mask - DreamFIT
                  </h6>
                </Link>
                <ul>
                  {products.map(product => (
                    <li key={product.name} className="mb-2">
                      <Link
                        href={product.href}
                        className="text-gray-500 transition duration-150 ease-in-out hover:text-indigo-500 dark:text-gray-400 dark:hover:text-cgreen"
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3rd block */}
              <div className="text-base font-semibold">
                <Link href="/resources">
                  <h6
                    className="mb-4 bg-gradient-to-r from-caction-700 via-csecondary-900 to-caction-800 bg-clip-text text-lg font-bold 
  text-transparent transition duration-500 
  ease-in-out hover:from-caction-800 hover:via-csecondary-700 hover:to-caction-950 hover:bg-clip-text 
  dark:from-caction-300 dark:via-cgreen-100 dark:to-cgreen-300 
  dark:hover:from-caction-300 dark:hover:via-cgreen-200 dark:hover:to-caction-200"
                  >
                    Resources
                  </h6>
                </Link>
                <ul>
                  {[...resources, ...blog].map(resource => (
                    <li key={resource.name} className="mb-2">
                      <Link
                        href={resource.href}
                        className="text-gray-500 transition duration-150 ease-in-out hover:text-indigo-500 dark:text-gray-400 dark:hover:text-cgreen"
                      >
                        {resource.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4th block */}
              <div className="text-base font-semibold">
                <Link href="/contact">
                  <h6
                    className="mb-4 bg-gradient-to-r from-caction-700 via-csecondary-900 to-caction-800 bg-clip-text text-lg font-bold 
  text-transparent transition duration-500 
  ease-in-out hover:from-caction-800 hover:via-csecondary-700 hover:to-caction-950 hover:bg-clip-text 
  dark:from-caction-300 dark:via-cgreen-100 dark:to-cgreen-300 
  dark:hover:from-caction-300 dark:hover:via-cgreen-200 dark:hover:to-caction-200"
                  >
                    Support
                  </h6>
                </Link>
                <ul>
                  {[...supportItems, ...supportCTA.slice(0, -1)].map(
                    support => (
                      <li key={support.name} className="mb-2">
                        <Link
                          href={support.href}
                          className="text-gray-500 transition duration-150 ease-in-out hover:text-indigo-500 dark:text-gray-400 dark:hover:text-cgreen"
                        >
                          {support.name}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* 5th block */}
  {/*            <div className="text-base font-semibold">*/}
  {/*              <Link href="/b2b">*/}
  {/*                <h6*/}
  {/*                  className="mb-4 bg-gradient-to-r from-caction-700 via-csecondary-900 to-caction-800 bg-clip-text text-lg font-bold */}
  {/*text-transparent transition duration-500 */}
  {/*ease-in-out hover:from-caction-800 hover:via-csecondary-700 hover:to-caction-950 hover:bg-clip-text */}
  {/*dark:from-caction-300 dark:via-cgreen-100 dark:to-cgreen-300 */}
  {/*dark:hover:from-caction-300 dark:hover:via-cgreen-200 dark:hover:to-caction-200"*/}
  {/*                >*/}
  {/*                  B2B Services*/}
  {/*                </h6>*/}
  {/*              </Link>*/}
  {/*              <ul>*/}
  {/*                {[...b2b].map(resource => (*/}
  {/*                  <li key={resource.name} className="mb-2">*/}
  {/*                    <Link*/}
  {/*                      href={resource.href}*/}
  {/*                      className="text-gray-500 transition duration-150 ease-in-out hover:text-indigo-500 dark:text-gray-400 dark:hover:text-cgreen"*/}
  {/*                    >*/}
  {/*                      {resource.name}*/}
  {/*                    </Link>*/}
  {/*                  </li>*/}
  {/*                ))}*/}
  {/*              </ul>*/}
  {/*              <p className="mb-4 text-sm text-gray-500">*/}
  {/*                Increase profitability through improved employee sleep.*/}
  {/*              </p>*/}
  {/*            </div>*/}
            </div>
          </div>

          <hr
            className="mx-0 my-8 h-0 border-x-0 border-b-0 border-t border-solid border-gray-200 leading-6 dark:border-gray-700 lg:mt-12 lg:mb-2"
            style={{borderWidth: '1px'}}
          />

          {/* Footer links */}

          <div className="text-center mb-8">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 text-slate-10 text-xs">
              <li className="hover:text-indigo-500">
                <Link href="/terms/acceptable-use-policy">
                  Acceptable Use Policy
                </Link>
              </li>
              <li className="hover:text-indigo-500">
                <Link href="/terms/cookie-policy">Cookie Policy</Link>
              </li>
              <li className="hover:text-indigo-500">
                <Link href="/terms/disclaimer">Disclaimer</Link>
              </li>
              <li className="hover:text-indigo-500">
                <Link href="/terms/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="hover:text-indigo-500">
                <Link href="/terms/returns-policy">Returns Policy</Link>
              </li>
              <li className="hover:text-indigo-500">
                <Link href="/terms/shipping-policy">Shipping Policy</Link>
              </li>
              <li className="hover:text-indigo-500">
                <Link href="/terms/terms-and-conditions">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>


          {/* Bottom area */}
          <div className="px-8 sm:flex sm:items-center sm:justify-between sm:px-16 md:grid-cols-6 md:px-12 lg:gap-12 lg:px-16 xl:px-16">
            {/* Social links */}
            <ul className="mb-4 flex md:order-1 md:mb-0 md:ml-4 ">
              <li>
                <Link
                  href="/"
                  className="flex items-center justify-center rounded-full  text-caction-600 transition duration-150 ease-in-out hover:text-gray-100 dark:hover:bg-white"
                  aria-label="Twitter"
                >

                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50" className="h-7 w-7  mt-[2px] dark:fill-white">
                    <path d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z"></path>
                  </svg>
                </Link>
              </li>

              <li className="ml-4">
                <Link
                  href="/"
                  className="flex items-center justify-center rounded-full  text-caction-600 transition duration-150 ease-in-out hover:text-gray-100 dark:hover:bg-white"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z"
                      fill="#1877F2"
                    />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link
                  href="/"
                  className="flex items-center justify-center rounded-full  text-caction-600 transition duration-150 ease-in-out hover:text-gray-100 dark:hover:bg-white"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="20.145" cy="11.892" r="1" />
                    <path
                      d="M16 20c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"
                      fill="#FF0359"
                    />
                    <path
                      d="M20 24h-8c-2.056 0-4-1.944-4-4v-8c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zm-8-14c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2v-8c0-.935-1.065-2-2-2h-8z"
                      fill="#E1306C"
                    />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link
                  href="/"
                  className="flex items-center justify-center rounded-full  text-caction-600 transition duration-150 ease-in-out hover:text-gray-100 dark:hover:bg-white"
                  aria-label="Linkedin"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z"
                      fill="#0077B5"
                    />
                  </svg>
                </Link>
              </li>
            </ul>

            {/* Copyrights note */}
            <div className="mr-4 text-sm text-slate-11">
              &copy; EightAthletics.com. All rights reserved 2023
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
