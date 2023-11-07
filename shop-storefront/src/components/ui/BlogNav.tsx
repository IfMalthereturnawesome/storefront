import Link from 'next/link';
import {Disclosure} from '@headlessui/react';
import {blog, newestPosts} from '../../utils/reuseableData'

import {
    ChevronDownIcon,
} from '@heroicons/react/20/solid';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function BlogNav() {
    return (
        <ul className="flex flex-wrap gap-6 md:gap-10">
            <li>
                <Link
                    href={blog[0].href}
                    className="text-sm flex items-center gap-x-2 px-4 py-2 font-semibold leading-6 text-black hover:text-indigo-500 focus:outline-none dark:text-gray-300 dark:hover:text-cgreen-200"
                >
                    {blog[0].name}
                </Link>
            </li>
        </ul>
    );
}


export function BlogNavMobile({setMobileMenuOpen}) {
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
                            'flex w-full items-center justify-between rounded-lg pt-2 pb-4  pl-3 pr-3.5 text-xl font-bold leading-7 text-black transition duration-150  dark:text-white  hover:dark:text-cgreen',
                        )}
                        aria-hidden="true"
                    >
                        {blog[0].name}
                        <ChevronDownIcon
                            className={classNames(
                                open ? 'rotate-180' : '',
                                'h-5 w-5 flex-none text-gray-500 transition duration-150 dark:text-white',
                            )}
                            aria-hidden="true"
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2">
                        {/* Recent Posts */}
                        <h3 className="py-2 pl-6 pr-3 text-base font-medium text-gray-500 dark:text-gray-500">
                            Recent Posts
                        </h3>
                        {[...newestPosts].map(item => (
                            <Link key={item._id} href={`/blog/${item.slug}`} passHref onClick={handleLinkClick}>
                                <Disclosure.Button
                                    as="a"
                                className="flex items-center justify-start gap-x-3 rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-slate-12 hover:text-indigo-10 transition duration-150"
                            >
                                {item.title}
                            </Disclosure.Button>
                            </Link>
                        ))}
                        <div className="mt-2 pb-4 text-base">
                            <Link
                                href="/blog"
                                onClick={handleLinkClick}
                                className="py-2 pl-6 pr-3 font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500"
                            >
                                View all posts
                                <span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}