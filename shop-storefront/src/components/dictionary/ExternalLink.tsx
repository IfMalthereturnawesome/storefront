'use client';
import {useEffect, useMemo, useState} from 'react';
import {Tooltip} from 'flowbite-react';
import {FaCheckCircle} from 'react-icons/fa';
import {FaCheck} from "react-icons/fa";

interface ExternalLinkProps {
    href: string,
    children?: React.ReactNode,
    citationNumber: number
}

export default function ExternalLink({href, children, citationNumber}: ExternalLinkProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const tooltip = (
        <div>
            <p className=" m-2 inline-block text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold">
                Trusted Source
            </p>
            <span className="inline-block">
                <FaCheckCircle size={17} className={'text-teal-11'} />
            </span>
            <p className="m-2 text-xs 3xs:text-sm md:text-base  font-normal text-slate-7">
                We ensure our studies and resources come from trusted, reputable sources. We adhere strictly to a policy of quality information based on scientific research and evidence.
            </p>
            <a
                href={href}
                target="_blank"
                className="m-2 text-xs 3xs:text-sm md:text-base text-blue-600 hover:text-indigo-500 dark:hover:text-indigo-500 underline"
            >
                View Source
            </a>
        </div>
    );

    return (
        <>
            {isClient && (
                <span className="inline-block">
                    <Tooltip
                        content={tooltip}
                        animation="duration-700"
                        arrow={false}
                        className="max-w-sm !bg-blue-12 dark:!bg-white !text-slate-2 3xs:p-2 md:p-4"
                    ><a href={href} className={'no-underline'} target="_blank">
                       <sup className="flex items-baseline">
                            <span className="text-teal-11 text-xs mr-1">{citationNumber}</span>
                            <FaCheck className="text-teal-11" size={11}/>
                        </sup>
                        {children}</a>
                    </Tooltip>
                </span>
            )}
            {!isClient &&
                <sup className="flex items-baseline">
                  <span className="text-teal-11 text-xs mr-1">{citationNumber}</span>
                  <FaCheck className="text-teal-11" size={11}/>
                </sup>
                && <a href={href}>{children}</a>
            }
        </>
    );
}