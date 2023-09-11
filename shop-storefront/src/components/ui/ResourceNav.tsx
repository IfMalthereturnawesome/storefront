import {Fragment} from 'react';
import Link from 'next/link';
import {Disclosure, Popover, Transition} from '@headlessui/react';
import {resources, newestPosts} from '@/utils/reuseableData';
import {useDropdownHoverMenu} from '@/utils/hooks/DropdownHoverHooks';
import PostDate from '@/components/post-date';
import {ChevronDownIcon} from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function ResourceNav({ activeSubMenu, setActiveSubMenu }: { activeSubMenu: string | null, setActiveSubMenu: Function }) {
    const { buttonRef, onHover, handleClick } = useDropdownHoverMenu();

    const onMouseEnterHandler = () => {
        console.log("onMouseEnterHandler called"); // <-- add this line
        onHover(true, 'onMouseEnter');
        setActiveSubMenu('resource');
    };

    const onMouseLeaveHandler = () => {
        console.log("onMouseLeaveHandler called"); // <-- add this line
        onHover(false, 'onMouseLeave');
        if (activeSubMenu === 'resource') {
            setActiveSubMenu(null);
        }
    };

    return (
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
                                    : 'text-black dark:text-gray-300',
                                'text-md flex items-center gap-x-2 px-4 py-2 font-semibold leading-6 hover:text-indigo-500 focus:outline-none dark:hover:text-cgreen-200',
                            )}
                            onClick={() => handleClick(open)}
                        >
                            Resources
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
                                className="absolute -left-8 top-full z-10 w-screen max-w-md overflow-hidden rounded-3xl bg-cyan-1 shadow-lg ring-1 ring-gray-900/5 dark:text-white border-black  border-2"
                            >
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="p-4 group-hover:bg-black dark:group-hover:bg-gray-800">
                                        {resources.map(item => (
                                            <div
                                                key={item.name}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 "
                                            >
                                                <div
                                                    className="flex h-11 w-11 flex-none items-center justify-center rounded-lg">
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
                                                        <span className="absolute inset-0"/>
                                                    </Link>
                                                    <p className="mt-1 text-slate-11 ">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-gold-2 dark:bg-amberA-1 px-8 py-4 sm:px-8 sm:py-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-base font-medium text-black dark:text-gray-100">
                                                Recent Posts
                                            </h3>
                                            <div className="text-sm">
                                                <Link
                                                    href="/blog"
                                                    className="font-medium hover:text-indigo-500 transition duration-150 ease-in-out text-blue-600 dark:text-indigo-500 dark:hover:text-blue-600"
                                                >
                                                    View all posts
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <ul role="list" className="mt-4 space-y-4">
                                            {newestPosts.map(post => (
                                                <li key={post._id} className="py-2 text-base">
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        className="flex flex-col items-start text-sm font-medium text-gray-900 transition duration-150 ease-in-out hover:text-gray-700 dark:text-gray-100 dark:hover:text-indigo-500"
                                                    >
                            <span className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                              <PostDate dateString={post.publishedAt}/>
                            </span>
                                                        <span
                                                            className="text-md text-black hover:text-indigo-500 dark:text-white dark:hover:text-indigo-500">
                              {post.title}
                            </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </div>
                )}
            </Popover>
        </Popover.Group>
    );
}

export function ResourceNavMobile() {
    return (
        <Disclosure as="div" className="-mx-3">
            {({open}) => (
                <>
                    <Disclosure.Button
                        className={classNames(
                            open ? 'dark:text-cgreen-200' : 'text-black',
                            'flex w-full items-center justify-between rounded-lg py-2  pl-3 pr-3.5 font-semibold leading-7 text-black transition duration-150  dark:text-white  hover:dark:text-cgreen',
                        )}
                        aria-hidden="true"
                    >
                        Resources
                        <ChevronDownIcon
                            className={classNames(
                                open ? 'rotate-180' : '',
                                'h-5 w-5 flex-none text-gray-500 transition duration-150 dark:text-white',
                            )}
                            aria-hidden="true"
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2">
                        {[...resources].map(item => (
                            <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="flex items-center justify-start gap-x-2 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-slate-12 hover:text-indigo-10 transition duration-150 "
                            >
                                <item.icon
                                    className="h-5 w-5 flex-none text-gray-400"
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Disclosure.Button>
                        ))}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
