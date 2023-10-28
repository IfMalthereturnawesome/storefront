import React, {Dispatch, SetStateAction, useRef, useEffect, useState, useCallback} from 'react';
import {Transition} from '@headlessui/react';
import {
    allResources,
    Resource,
    allPosts,
    Post,
} from 'contentlayer/generated';
import Link from 'next/link';
import {QuestionMarkIcon} from "@radix-ui/react-icons";
import {
    ChatBubbleBottomCenterIcon,
    ArrowPathRoundedSquareIcon,
    ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { debounce } from 'lodash';



type SearchModalProps = {
    id: string;
    searchId: string;
    modalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const formatTopic = (topic: string) => {
    return topic
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const SearchModal: React.FC<SearchModalProps> = ({ id, searchId, modalOpen, setModalOpen }) => {
    const modalContent = useRef<HTMLDivElement>(null);
    const searchInput = useRef<HTMLInputElement>(null);

    const [searchTerm, setSearchTerm] = useState<string>('');

    const [groupedResourceSearchResults, setGroupedResourceSearchResults] = useState<Record<string, Resource[]>>({});
    const [groupedBlogSearchResults, setGroupedBlogSearchResults] = useState<Record<string, Post[]>>({});

    useEffect(() => {
        const clickHandler = ({ target }: { target: EventTarget | null }): void => {
            if (!modalOpen || modalContent.current?.contains(target as Node)) return;
            setModalOpen(false);
        };

        document.addEventListener('click', clickHandler);
        document.addEventListener('touchstart', clickHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
            document.removeEventListener('touchstart', clickHandler);
        };
    }, [modalOpen]);

    useEffect(() => {
        const keyHandler = (event: KeyboardEvent) => {
            if (modalOpen && event.key === 'Escape') setModalOpen(false);
            if (!modalOpen && event.key === '/') {
                event.preventDefault();
                setModalOpen(true);
            }
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, [modalOpen]);

    useEffect(() => {
        if (modalOpen) {
            const timer = setTimeout(() => {
                searchInput.current?.focus();
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [modalOpen]);




    const handleSearch = useCallback((searchQuery: string) => {
        searchQuery = searchQuery.toLowerCase();
        const groupedResourceSearchResults: Record<string, Resource[]> = {};
        const groupedBlogSearchResults: Record<string, Post[]> = {};

        allResources.forEach(resource => {
            if (
                resource.title.toLowerCase().includes(searchQuery) ||
                resource.summary.toLowerCase().includes(searchQuery)
            ) {
                const topic = formatTopic(resource.topic.slug);
                if (groupedResourceSearchResults[topic]) {
                    groupedResourceSearchResults[topic].push(resource);
                    // Sort resources in this topic by order field
                    groupedResourceSearchResults[topic].sort((a, b) => a.order - b.order);
                } else {
                    groupedResourceSearchResults[topic] = [resource];
                }
            }
        });


        allPosts.forEach(post => {
            if (
                post.title.toLowerCase().includes(searchQuery) ||
                post.summary.toLowerCase().includes(searchQuery)
            ) {
                if (post.tags && post.tags.length > 0) {
                    const formattedTag = formatTopic(post.tags[0]);
                    if (groupedBlogSearchResults[formattedTag]) {
                        groupedBlogSearchResults[formattedTag].push(post);
                    } else {
                        groupedBlogSearchResults[formattedTag] = [post];
                    }
                }
            }
        });

        setGroupedResourceSearchResults(groupedResourceSearchResults);
        setGroupedBlogSearchResults(groupedBlogSearchResults);
    }, []);

    const debouncedHandleSearch = debounce(handleSearch, 300);

    const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedHandleSearch(value);
    };

    return (
        <>
            {/* Modal backdrop */}
            <Transition
                className="fixed inset-0 z-50 bg-cyan-3 bg-opacity-60 transition-opacity"
                show={modalOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-out duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                aria-hidden="true"
            />
            {/* Modal dialog */}
            <Transition
                id={id}
                className="custom-scrollbar dark:custom-scrollbar-dark-mode dark:c fixed inset-0 top-20 z-50 mb-4 flex items-start justify-center overflow-hidden px-4 sm:px-6 md:top-28"
                role="dialog"
                aria-modal="true"
                show={modalOpen}
                enter="transition ease-in-out duration-200"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
            >
                <div
                    ref={modalContent}
                    className="max-h-full w-full max-w-2xl overflow-auto rounded bg-white shadow-lg dark:bg-cyan-2"
                >
                    {/* Search form */}
                    <form className="border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center">
                            <label htmlFor={searchId}>
                                <span className="sr-only">Search</span>
                                <svg
                                    className="ml-4 h-4 w-4 shrink-0 fill-slate-600 dark:fill-slate-400"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="m14.707 13.293-1.414 1.414-2.4-2.4 1.414-1.414 2.4 2.4ZM6.8 12.6A5.8 5.8 0 1 1 6.8 1a5.8 5.8 0 0 1 0 11.6Zm0-2a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z"/>
                                </svg>
                            </label>
                            <input
                                id={searchId}
                                className="w-full appearance-none border-0 bg-white py-3 pl-2 pr-4 text-sm text-slate-600 placeholder-slate-400 focus:ring-transparent dark:bg-cyan-2 dark:text-slate-200 dark:placeholder:text-slate-500"
                                type="search"
                                placeholder="Search for anything…"
                                ref={searchInput}
                                value={searchTerm}
                                onChange={onSearchInputChange}
                            />
                        </div>
                    </form>
                    <div className="space-y-4 px-2 py-4">
                        <div>
                            {/* No results */}
                            {Object.keys(groupedResourceSearchResults).length === 0 &&
                                Object.keys(groupedBlogSearchResults).length === 0 && (
                                    <div className="px-2 py-4 text-sm leading-6 text-slate-800 dark:text-slate-200">
                                        No results found
                                    </div>
                                )}

                            {/* Support */}
                            <div>
                                <div className="mb-2 px-2 text-base font-medium text-slate-500">
                                    Support
                                </div>
                                <ul>
                                    <li>
                                        <Link
                                            className="flex items-center rounded px-2 py-1 text-sm leading-6 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                                            href="/contact"
                                            onClick={() => setModalOpen(!modalOpen)}
                                        >
                                            <ChatBubbleBottomCenterIcon className="mr-4 w-5 h-5 shrink-0"/>


                                            <span className="font-medium">Contact support</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="flex items-center rounded px-2 py-1 text-sm leading-6 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                                            href="/faq"
                                            onClick={() => setModalOpen(!modalOpen)}
                                        >
                                            <QuestionMarkIcon className="mr-4 w-5 h-5 shrink-0"/>


                                            <span className="font-medium">FAQ</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="flex items-center rounded px-2 py-1 text-sm leading-6 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                                            href="/terms/returns-policy"
                                            onClick={() => setModalOpen(!modalOpen)}
                                        >
                                            <ArrowPathRoundedSquareIcon className="mr-4 w-5 h-5 shrink-0"/>

                                            <span className="font-medium">Returns</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="flex items-center rounded px-2 py-1 text-sm leading-6 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                                            href="/terms"
                                            onClick={() => setModalOpen(!modalOpen)}
                                        >
                                            <ClipboardDocumentListIcon className="mr-4 w-5 h-5 shrink-0"/>

                                            <span className="font-medium">Terms and Policies</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            {/* Resources */}
                            <div className="my-2 px-2 text-base font-medium text-slate-500 ">
                                Resources
                            </div>

                            {Object.entries(groupedResourceSearchResults).map(
                                ([topic, resources]) => (
                                    <div key={topic}>
                                        <Link
                                            href={`/resources/${
                                                resources[0].slug.split('/')[0]
                                            }/overview`}
                                        >
                                            <h3
                                                className="mb-2 ml-4 bg-gradient-to-r from-caction-700 via-csecondary-900 to-caction-800 bg-clip-text px-2  text-sm font-bold
  text-transparent transition duration-500 
  ease-in-out hover:from-caction-800 hover:via-csecondary-700 hover:to-caction-950 hover:bg-clip-text 
  dark:from-caction-300 dark:via-cgreen-100 dark:to-cgreen-300 
  dark:hover:from-caction-300 dark:hover:via-cgreen-200 dark:hover:to-caction-200"
                                            >
                                                {topic}
                                            </h3>
                                        </Link>
                                        <ul>
                                            {resources.map(resource => (
                                                <li
                                                    className=" ml-6 flex items-center rounded px-2 py-1 text-sm font-medium leading-6 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                                                    key={resource.slug}
                                                >
                                                    <svg
                                                        data-testid="geist-icon"
                                                        fill="currentColor"
                                                        height="20"
                                                        shapeRendering="geometricPrecision"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.5"
                                                        viewBox="0 0 24 24"
                                                        width="20"
                                                        className="mr-3 h-4 w-4 shrink-0 fill-gray-100 dark:fill-gray-900"
                                                    >
                                                        <path
                                                            d="M7.06883 21.6H16.219C18.7973 21.6 20.8879 19.5093 20.8879 16.9312V5.86885C20.8879 3.29074 18.7973 1.20001 16.219 1.20001H7.06883C4.49072 1.20001 2.39999 3.29074 2.39999 5.86885V16.9312C2.39999 19.5093 4.49072 21.6 7.06883 21.6Z"></path>
                                                        <path
                                                            d="M15.3946 15.842H7.89178M15.3946 11.245H7.89178M10.755 6.6586H7.89232"></path>
                                                    </svg>

                                                    <Link href={`/resources/${resource.slug}`}
                                                          onClick={() => setModalOpen(false)}>
                                                        {resource.title}
                                                    </Link>

                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ),
                            )}
                        </div>
                        {/* Blog Results */}
                        <div>
                            <div className="mb-2 px-2 text-base font-semibold text-slate-500 ">
                                Posts
                            </div>
                            {Object.entries(groupedBlogSearchResults).map(([tag, posts]) => (
                                <div key={tag}>
                                    <h3
                                        className="mb-2 ml-4 bg-gradient-to-r from-caction-700 via-csecondary-900 to-caction-800 bg-clip-text px-2  text-sm font-bold
text-transparent transition duration-500 
ease-in-out hover:from-caction-800 hover:via-csecondary-700 hover:to-caction-950 hover:bg-clip-text 
dark:from-caction-300 dark:via-cgreen-100 dark:to-cgreen-300 
dark:hover:from-caction-300 dark:hover:via-cgreen-200 dark:hover:to-caction-200"
                                    >
                                        {tag}
                                    </h3>
                                    <ul>
                                        {posts.map(post => (
                                            <li
                                                className=" ml-6 flex items-center rounded px-2 py-1 text-sm font-medium leading-6 text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                                                key={post.slug}
                                            >
                                                <svg
                                                    data-testid="geist-icon"
                                                    fill="currentColor"
                                                    height="20"
                                                    shapeRendering="geometricPrecision"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    viewBox="0 0 24 24"
                                                    width="20"
                                                    className="mr-3 h-4 w-4 shrink-0 fill-gray-100 dark:fill-gray-900"
                                                >
                                                    <path d="M17 10H3"></path>
                                                    <path d="M21 6H3"></path>
                                                    <path d="M21 14H3"></path>
                                                    <path d="M17 18H3"></path>
                                                </svg>

                                                <Link href={`/blog/${post.slug}`} onClick={() => setModalOpen(false)}>
                                                    {post.title}
                                                </Link>

                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    );
}

export default React.memo(SearchModal);