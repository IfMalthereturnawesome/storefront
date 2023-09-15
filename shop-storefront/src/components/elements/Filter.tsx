import React, {Fragment, useState, useEffect, useCallback} from 'react';
import {Dialog, Disclosure, Menu, Popover, Transition} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
import { Post } from 'contentlayer/generated';

type SortOption = {
  name: string;
  href: string;
  current: boolean;
};


export const sortOptions = [
  {name: 'Newest', href: '#', current: true},
  {name: 'Oldest', href: '#', current: false},
];
const filters = [
  {
    id: 'tags',
    name: 'Category',
    options: [
      {value: 'Sleep Essentials', label: 'Sleep Essentials', checked: false},
      {value: 'Sleep Athletics', label: 'Sleep Athletics', checked: false},
      {value: 'Sleep Science', label: 'Sleep Science', checked: false},
      {value: 'Sleep Problems', label: 'Sleep Problems', checked: false},
      {value: 'Sleep Disorders', label: 'Sleep Disorders', checked: false},

      {value: 'All', label: 'All', checked: false},
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface FilterProps {
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  currentSortOption: SortOption | null;
  setCurrentSortOption: React.Dispatch<React.SetStateAction<SortOption | null>>;
  otherPosts: Post[];
  featuredPost: Post;
}

export default function Filter({
  setFilteredPosts,
  currentSortOption,
  setCurrentSortOption,
  otherPosts,
  featuredPost,
}: FilterProps) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [open, setOpen] = useState(false);

  const applyFilters = () => {
    let filteredPosts = [...otherPosts, featuredPost];

    selectedFilters.forEach(selectedFilter => {
      if (selectedFilter !== 'All') {
        filteredPosts = filteredPosts.filter(post =>
          post.tags?.some(
            tag => tag.toLowerCase() === selectedFilter.toLowerCase(),
          ),
        );
      }
    });

    // Apply sorting
    switch (currentSortOption?.name) {
      case 'Newest':
        filteredPosts.sort((a, b) => {
          const dateA = new Date(a.publishedAt).getTime();
          const dateB = new Date(b.publishedAt).getTime();
          return dateB - dateA;
        });
        break;
      case 'Oldest':
        filteredPosts.sort((a, b) => {
          const dateA = new Date(a.publishedAt).getTime();
          const dateB = new Date(b.publishedAt).getTime();
          return dateA - dateB;
        });
        break;
      default:
        // No sorting logic specified
        break;
    }

    filteredPosts = filteredPosts.slice(0, 6);

    setFilteredPosts(filteredPosts);
  };

  const toggleFilter = (filterValue: string) => {
    const updatedFilters = [...selectedFilters];

    if (updatedFilters.includes(filterValue)) {
      updatedFilters.splice(updatedFilters.indexOf(filterValue), 1);
    } else {
      updatedFilters.push(filterValue);
    }

    setSelectedFilters(updatedFilters);
  };

  const removeFilter = filterValue => {
    const updatedFilters = selectedFilters.filter(
      selectedFilter => selectedFilter !== filterValue,
    );

    setSelectedFilters(updatedFilters);
    applyFilters();
  };

  // Apply filters when selectedFilters state changes
  useEffect(() => {
    applyFilters();
  }, [selectedFilters, currentSortOption]);

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-cyan-1 py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                    Filters
                  </h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-cyan-1 p-2 text-gray-400  dark:text-gray-200"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map(section => (
                    <Disclosure
                      as="div"
                      key={section.name}
                      className="border-t border-gray-200 px-4 py-6 dark:border-gray-600 "
                    >
                      {({open}) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex  w-full items-center justify-between bg-cbg px-2 py-3 text-sm text-gray-400 dark:bg-caction ">
                              <span className="font-medium text-gray-900 dark:text-gray-200">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? '-rotate-180' : 'rotate-0',
                                    'h-5 w-5 transform',
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex cursor-pointer items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}-${optionIdx}`}
                                    value={option.value}
                                    type="checkbox"
                                    checked={selectedFilters.includes(
                                      option.value,
                                    )}
                                    onChange={() => toggleFilter(option.value)}
                                    className="z-50select-none h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3  select-none text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-cgreen"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Filters */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>

        <div className="border-b border-gray-200 bg-cyan-1 pb-4 dark:border-gray-800">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className="group inline-flex justify-center text-sm font-medium 
                  text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map(option => (
                      <Menu.Item key={option.name}>
                        {({active}) => (
                          <button
                            onClick={() => {
                              sortOptions.forEach(
                                option => (option.current = false),
                              ); // Reset the current field of all options
                              option.current = true; // Set the current field of the selected option
                              setCurrentSortOption({...option}); // Spread to create a new object to trigger re-render
                              applyFilters(); // Call the applyFilters function to update the posts based on the selected sort option
                            }}
                            className={classNames(
                              option.current
                                ? 'font-medium text-gray-900 dark:text-gray-400'
                                : 'text-gray-500 ',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filters
            </button>

            <div className="z-50 hidden sm:block">
              <div className="flow-root">
                <Popover.Group className=" -mx-4 flex items-center divide-x divide-gray-200">
                  {filters.map((section, sectionIdx) => (
                    <Popover
                      key={section.name}
                      className="relative inline-block px-4 text-left"
                    >
                      <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <span>{section.name}</span>
                        {selectedFilters.length > 0 && (
                          <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                            {selectedFilters.length}
                          </span>
                        )}
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <form className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}-${optionIdx}`}
                                  value={option.value}
                                  type="checkbox"
                                  checked={selectedFilters.includes(
                                    option.value,
                                  )}
                                  onChange={() => toggleFilter(option.value)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </form>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ))}
                </Popover.Group>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        <div className="bg-cyan-1">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:flex sm:items-center sm:px-6 lg:h-[40px] lg:px-8 lg:py-8">
            <h3 className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400  dark:hover:text-white">
              Filters
              <span className="sr-only">, active</span>
            </h3>
            <div
              aria-hidden="true"
              className="hidden h-5 w-px bg-gray-300 dark:bg-gray-700 sm:ml-4 sm:block"
            />
            <div className="mt-2 sm:ml-4 sm:mt-0">
              <div className="flex flex-wrap items-center sm:justify-start">
                {selectedFilters.map(activeFilter => (
                  <span
                    key={activeFilter}
                    className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1 pl-2 pr-1 text-xs font-medium text-gray-900 dark:bg-gray-200 sm:py-1 sm:pl-2 sm:pr-1.5 md:text-sm lg:py-1.5 lg:pl-3 lg:pr-2"
                  >
                    <span>{activeFilter}</span>
                    <button
                      type="button"
                      className="ml-1 inline-flex h-4 w-4  flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                      onClick={() => removeFilter(activeFilter)}
                    >
                      <span className="sr-only">
                        Remove filter for {activeFilter}
                      </span>
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
