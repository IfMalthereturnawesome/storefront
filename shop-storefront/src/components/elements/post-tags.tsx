import React from 'react';
import Link from 'next/link';

type TagColor = {
  [key: string]: string;
};

const tagColor: TagColor = {
  'Sleep Athletics':
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Sleep Science':
    'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  'Sleep Essentials':
    'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  'Sleep Problems':
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Sleep Disorders':
    'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  Other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

export default function PostTags({tags}: {tags: string[]}) {
  return (
    <ul className="-m-1 flex flex-wrap text-xs font-medium">
      {tags.map((tag, tagIndex) => (
        <li key={tagIndex} className="m-1">
          <Link href="/blog/#latest-articles" >
            <span
              className={`inline-flex rounded-full px-3 py-1 text-center transition duration-150 ease-in-out hover:opacity-80 ${tagColor[tag]}`}
            >
              {tag}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
