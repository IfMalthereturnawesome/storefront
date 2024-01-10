import Link from 'next/link';
import {supportCTA, supportItems} from '@/utils/reuseableData';
import {Fragment} from 'react';
import {Disclosure, Popover, Transition} from '@headlessui/react';
import {useDropdownHoverMenu} from '@/utils/hooks/DropdownHoverHooks';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
import {Button} from '@nextui-org/button';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function SupportNav({activeSubMenu, setActiveSubMenu}: { activeSubMenu: string | null, setActiveSubMenu: Function }) {
    const {buttonRef, onHover, handleClick} = useDropdownHoverMenu();

    const onMouseEnterHandler = () => {

        onHover(true, 'onMouseEnter');
        setActiveSubMenu('support');
    };

    const onMouseLeaveHandler = () => {

        onHover(false, 'onMouseLeave');
        if (activeSubMenu === 'support') {
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
                                Support
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
                                <Popover.Panel
                                    static
                                    className="absolute -left-8 top-full z-10 w-screen max-w-md overflow-hidden rounded-3xl bg-cyan-1 shadow-lg ring-1 ring-gray-900/5 dark:text-white border-black border-2"
                                >
                                    <div className="p-4">
                                        {supportItems.map(item => (
                                            <div
                                                key={item.name}
                                                className="group relative flex items-center  gap-x-6 rounded-lg p-4 text-md leading-6 "
                                            >
                                                <div
                                                    className="flex h-11 w-11 flex-none items-center justify-center rounded-lg ">
                                                    <item.icon
                                                        className="h-6 w-6 text-gray-600 group-hover:text-blue-600 dark:text-cgreen-50 group-hover:dark:text-cgreen-200"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="flex-auto">
                                                    <Link
                                                        prefetch={false}
                                                        href={item.href}
                                                        className="block font-bold text-slate-800 dark:text-slate-200  hover:text-blue-600  hover:dark:text-cgreen"
                                                    >
                                                        {item.name}
                                                        <span className="absolute inset-0 "/>
                                                    </Link>
                                                    <p className="mt-1 text-slate-11">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        className="grid grid-cols-2 divide-x divide-gray-900/5 dark:divide-gold-5 bg-gold-2 dark:bg-gold-2">
                                        {supportCTA.map(item => (
                                            <Button key={item.name}>
                                                <Link
                                                    prefetch={false}
                                                    href={item.href}
                                                    className="group flex items-center justify-center gap-x-3 p-3 text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 dark:text-white hover:dark:text-cgreen"
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

export function SupportNavPop() {

    return (
        <>

            <div className="p-4">
                {supportItems.map(item => (
                    <div
                        key={item.name}
                        className="group relative flex items-center  gap-x-6 rounded-lg p-4 text-md leading-6 "
                    >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg ">
                            <item.icon
                                className="h-6 w-6 text-gray-600 group-hover:text-blue-600 dark:text-cgreen-50 group-hover:dark:text-cgreen-200"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="flex-auto">
                            <Link
                                prefetch={false}
                                href={item.href}
                                className="block font-bold text-slate-800 dark:text-slate-200  hover:text-blue-600  hover:dark:text-cgreen"
                            >
                                {item.name}
                                <span className="absolute inset-0 "/>
                            </Link>
                            <p className="mt-1 text-slate-11">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-900/5 dark:divide-gold-5 bg-gold-2 dark:bg-gold-2">
                {supportCTA.map(item => (
                    <Button key={item.name}>
                        <Link
                            prefetch={false}
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


export function SupportNavMobile({setMobileMenuOpen}) {
    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };
    return (
        <Disclosure as="div" className="-mx-3">
            {({open}) => (
                <>
                    <Disclosure.Button
                        className={classNames(
                            open ? 'dark:text-cgreen-200' : 'text-black',
                            'flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-xl font-bold leading-7 text-black transition duration-150  dark:text-white  hover:dark:text-cgreen',
                        )}
                        aria-hidden="true"
                    >
                        Support
                        <ChevronDownIcon
                            className={classNames(
                                open ? 'rotate-180' : '',
                                'h-5 w-5 flex-none text-gray-500 transition duration-150 dark:text-white',
                            )}
                            aria-hidden="true"
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2">
                        {[...supportItems, ...supportCTA.slice(0, -1)].map(item => (
                            <Link key={item.name} href={item.href} passHref prefetch={false} onClick={handleLinkClick}>
                                <Disclosure.Button
                                    as="a"
                                    className={classNames(
                                        'flex items-center justify-start gap-x-2 rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 transition duration-150',
                                        'text-slate-12 hover:text-indigo-10',
                                        {
                                            'hover:text-indigo-500 dark:hover:text-cgreen': !open,
                                            'text-indigo-500 dark:text-cgreen': open,
                                        },
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                            'h-5 w-5 flex-none transition duration-150',
                                            'text-gray-400',
                                            {
                                                'group-hover:text-indigo-500 dark:text-indigo-400': !open,
                                            },
                                            {'dark:text-cgreen-50': open},
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Disclosure.Button>
                            </Link>
                        ))}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
