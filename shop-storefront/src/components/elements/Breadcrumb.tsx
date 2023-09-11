import React from 'react';
import Link from 'next/link';

interface BreadcrumbItemProps {
  href: string;
  text: string;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({href, text}) => {
  return (
    <li className="inline-flex items-center">
      <Link
        href={href}
        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
      >
        {text}
      </Link>
    </li>
  );
};
interface BreadcrumbProps {
  postTitle: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({postTitle}) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <BreadcrumbItem href="/" text="Home" />
        <svg
          aria-hidden="true"
          className="h-6 w-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <BreadcrumbItem href="/blog" text="Blog" />
        <li aria-current="page">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="h-6 w-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-500 md:ml-2">
              {postTitle}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
