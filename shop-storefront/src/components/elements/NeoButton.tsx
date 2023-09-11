import Link from 'next/link'
import React from 'react'

interface LinkButtonProps {
    href: string;
    className?: string;
    children: React.ReactNode;
}

const NeoButton: React.FC<LinkButtonProps> = ({ href, className, children }) => {
    const defaultClasses = "inline-flex items-center py-2 m-0 px-8 text-md font-semibold text-slate-12 hover:text-slate-1 dark:bg-black rounded-[0.3rem] border-2" +
        "                        border-solid duration-200 cursor-pointer border-neutral-900 bg-gold-3 hover:bg-black dark:hover:bg-white ";

    return (
        <Link href={href} passHref className={`${defaultClasses} ${className ? className : ''}`}>
                {children}
        </Link>
    )
}

export default NeoButton;