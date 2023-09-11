'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Tooltip} from 'flowbite-react';
import {allPosts} from 'contentlayer/generated';

interface PostLinkProps {
  href: string;
  tooltipTitle: string;
  tooltipContent: string;
  children: React.ReactNode;
}

export default function TooltipMdx({
  href,
  tooltipTitle,
  tooltipContent,
  children,
}: PostLinkProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const tooltip = (
    <div>
      <h3 className="my-2 text-lg">{tooltipTitle}</h3>
      <p className="mb-2 text-sm dark:text-gray-300">{tooltipContent}</p>
      <Link
        href={href}
        className="text-sm text-blue-600 underline dark:text-blue-500"
      >
        Read more
      </Link>
    </div>
  );

  return (
    <>
      {isClient && (
        <span className="inline-block">
          <Tooltip
            content={tooltip}
            animation="duration-300"
            arrow
            className="max-w-xs "
          >
            <Link href={href}>{children}</Link>
          </Tooltip>
        </span>
      )}
      {!isClient && <Link href={href}>{children}</Link>}
    </>
  );
}


