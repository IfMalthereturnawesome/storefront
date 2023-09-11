import Link from 'next/link';
import { useState } from 'react';

interface Props {
  bannerMsg: string;
}

export default function TopNavBanner({ bannerMsg }: Props) {
  const [showBanner, setShowBanner] = useState(true);

  const closeBanner = () => {
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      <div
        id="banner"
        className="z-10  flex w-full justify-center border border-solid border-gray-200 bg-cyan-2 px-4 py-3 leading-6 dark:border-gray-600   lg:py-4"
      >
        <div className="flex items-center justify-center flex-grow text-black">
          <p className="m-0 text-center text-sm font-medium leading-5 dark:text-white">
            <span className="mr-2 hidden rounded bg-blue-200 px-2 py-px text-xs font-semibold leading-4 text-indigo-900 md:inline">
              New
            </span>
            {bannerMsg}
            <Link
              className="ml-2 inline-flex cursor-pointer items-center text-indigo-700 dark:text-indigo-400 hover:text-blue-600 dark:hover:text-cgreen md:ml-2"
              href="/blocks"
            >
              Check it out
              <svg
                className="ml-1 block h-4 w-4 align-middle"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  className=""
                ></path>
              </svg>
            </Link>
          </p>
        </div>
        <div className="flex items-center ml-auto">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200"
            onClick={closeBanner}
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close banner</span>
          </button>
        </div>
      </div>
    </>
  );
}