import Link from 'next/link';
import {Disclosure, Popover, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import {products, callsToAction} from '@/utils/reuseableData';
import {useDropdownHoverMenu} from '@/utils/hooks/DropdownHoverHooks';
import {Button} from '@nextui-org/button';
import {ChevronDownIcon} from '@heroicons/react/20/solid';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function  ProductNav({ activeSubMenu, setActiveSubMenu }: { activeSubMenu: string | null, setActiveSubMenu: Function }) {
    const { buttonRef, onHover, handleClick } = useDropdownHoverMenu();

    const onMouseEnterHandler = () => {
        console.log("onMouseEnterHandler called"); // <-- add this line
        onHover(true, 'onMouseEnter');
        setActiveSubMenu('product');
    };

    const onMouseLeaveHandler = () => {
        console.log("onMouseLeaveHandler called"); // <-- add this line
        onHover(false, 'onMouseLeave');
        if (activeSubMenu === 'product') {
            setActiveSubMenu(null);
        }
    };

  return (
      <>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            {({open}) => (
                <div
                    onMouseEnter={onMouseEnterHandler}
                    onMouseLeave={onMouseLeaveHandler}
                    className="flex flex-col"
                >
                  <Popover.Button
                      ref={buttonRef}
                      className={classNames(
                          open
                              ? 'text-blue-600 dark:text-cgreen-200'
                              : 'text-mask-black dark:text-custom-white',
                          'text-base flex items-center gap-x-2 px-4 py-2 font-semibold leading-6 hover:text-indigo-500 focus:outline-none dark:hover:text-cgreen-200',
                      )}
                      onClick={() => handleClick(open)}
                  >
                    Product
                    <ChevronDownIcon
                        className={classNames(
                            open ? 'text-blue-600 dark:text-cgreen-200' : 'text-gray-400',
                            'h-5 w-5 flex-none',
                        )}
                        aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                  >
                    {/* PRODUCT */}
                    <Popover.Panel
                        static
                        className="absolute -left-8  top-full z-10 mb-0 w-screen max-w-md overflow-hidden rounded-3xl bg-cyan-1 shadow-lg ring-1 ring-gray-900/5 dark:text-white border-black border-2"
                    >
                      <div className="mt-2"></div>
                      <div className="p-4">
                        <Link href="/product">
                          <h3
                              className="m-4 bg-gradient-to-r from-caction-700 via-csecondary-900 to-caction-800 bg-clip-text text-2xl font-bold
  text-transparent transition duration-500
  ease-in-out hover:from-caction-800 hover:via-csecondary-700 hover:to-caction-950 hover:bg-clip-text
  dark:from-caction-300 dark:via-cgreen-100 dark:to-cgreen-300
  dark:hover:from-caction-300 dark:hover:via-cgreen-200 dark:hover:to-caction-200"
                          >Sleep Mask One</h3>
                        </Link>
                        {products.map(item => (
                            <div
                                key={item.name}
                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-md leading-6 "
                            >
                              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg ">
                                <item.icon
                                    className="h-6 w-6 text-gray-600 group-hover:text-blue-600 dark:text-cgreen-50 group-hover:dark:text-cgreen-200"
                                    aria-hidden="true"
                                />
                              </div>
                              <div className="flex-auto">
                                  <Link
                                      href={item.href}
                                      className="block font-bold text-slate-800 dark:text-slate-200  hover:text-blue-600  hover:dark:text-cgreen"
                                  >
                                  {item.name}
                                  <span className="absolute inset-0" />
                                </Link>
                                <p className="mt-1 text-slate-11">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-gray-900/5 dark:divide-gold-5 bg-gold-2 dark:bg-gold-2">
                        {callsToAction.map(item => (
                            <Button key={item.name}>
                            <Link

                                href={item.href}
                                className="group flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 dark:text-white hover:dark:text-cgreen"
                            >
                                <item.icon
                                    className="h-5 w-5 flex-none text-slate-11 group-hover:text-blue-600  group-hover:dark:text-cgreen-200"
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                            </Button>

                        ))}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </div>
            )}
          </Popover>
        </Popover.Group>
      </>
  );
}


export function  ProductNavPop() {




    return (
        <>


                                    <div className="p-4">
                                        <Link href="/product">
                                            <h3
                                                className="m-4 bg-gradient-to-r from-caction-700 via-csecondary-900 to-caction-800 bg-clip-text text-2xl font-bold
  text-transparent transition duration-500
  ease-in-out hover:from-caction-800 hover:via-csecondary-700 hover:to-caction-950 hover:bg-clip-text
  dark:from-caction-300 dark:via-cgreen-100 dark:to-cgreen-300
  dark:hover:from-caction-300 dark:hover:via-cgreen-200 dark:hover:to-caction-200"
                                            >Sleep Mask One</h3>
                                        </Link>
                                        {products.map(item => (
                                            <div
                                                key={item.name}
                                                className="group relative flex items-center gap-x-6  p-4 text-md leading-6 "
                                            >
                                                <div className="flex h-11 w-11 flex-none items-center justify-center  ">
                                                    <item.icon
                                                        className="h-6 w-6 text-gray-600 group-hover:text-blue-600 dark:text-cgreen-50 group-hover:dark:text-cgreen-200"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="flex-auto">
                                                    <Link
                                                        href={item.href}
                                                        className="block font-bold text-slate-800 dark:text-slate-200  hover:text-blue-600  hover:dark:text-cgreen"
                                                    >
                                                        {item.name}
                                                        <span className="absolute inset-0" />
                                                    </Link>
                                                    <p className="mt-1 text-slate-11">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 divide-x divide-gray-900/5 dark:divide-gold-5 bg-gold-2 dark:bg-gold-2">
                                        {callsToAction.map(item => (
                                            <Button key={item.name}>
                                                <Link

                                                    href={item.href}
                                                    className="group flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 dark:text-white hover:dark:text-cgreen"
                                                >
                                                    <item.icon
                                                        className="h-5 w-5 flex-none text-slate-11 group-hover:text-blue-600  group-hover:dark:text-cgreen-200"
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            </Button>

                                        ))}
                                    </div>

        </>
    );
}


export function ProductNavMobile() {
  return (
    <Disclosure as="div" className="-mx-3">
      {({open}) => (
        <>
          <Disclosure.Button
            className={classNames(
              open ? 'dark:text-cgreen-200' : 'text-black',
              'flex w-full items-center justify-between rounded-lg py-2  pl-3 pr-3.5 text-xl font-bold leading-7 text-black transition duration-150  dark:text-white  hover:dark:text-cgreen',
            )}
            aria-hidden="true"
          >
            Product
            <ChevronDownIcon
              className={classNames(
                open ? 'rotate-180 dark:text-cgreen' : '',
                'h-5 w-5 flex-none transition duration-150 dark:text-white hover:dark:text-cgreen',
              )}
              aria-hidden="true"
            />
          </Disclosure.Button>
          <Disclosure.Panel className="mt-2 space-y-2">
            <Link href="/product">
              <h3
                className=" m-4 bg-gradient-to-r from-caction-700 via-csecondary-900 to-caction-800 bg-clip-text text-lg font-bold 
  text-transparent transition duration-500 
  ease-in-out hover:from-caction-800 hover:via-csecondary-700 hover:to-caction-950 hover:bg-clip-text 
  dark:from-caction-300 dark:via-cgreen-100 dark:to-cgreen-300 
  dark:hover:from-caction-300 dark:hover:via-cgreen-200 dark:hover:to-caction-200"
              >Sleep Mask One</h3>
            </Link>
            {products.map(item => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className="flex items-center justify-start gap-x-2 rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-slate-12 transition duration-150 hover:text-indigo-10"
              >
                <item.icon
                  className="h-5 w-5 flex-none text-gray-400 dark:text-white "
                  aria-hidden="true"
                />
                {item.name}
              </Disclosure.Button>
            ))}

            <div className="flex items-center space-x-2 py-2 pl-6">
              {callsToAction.map(item => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="flex items-center justify-start gap-x-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold leading-7 text-gray-900 transition duration-150 hover:bg-sky-3 dark:text-white"
                >
                  <item.icon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
