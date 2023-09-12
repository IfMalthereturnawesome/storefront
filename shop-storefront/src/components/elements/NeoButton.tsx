import Link from 'next/link';
import React from 'react';

interface LinkButtonProps {
    href: string;
    className?: string;
    children: React.ReactNode;
}

const NeoButton: React.FC<LinkButtonProps> = ({ href, className, children }) => {
    const defaultClasses = "inline-flex items-center py-2 m-0 px-8 text-md font-semibold mt-4 text-slate-12 custom-button-neo";

    return (
        <Link href={href} passHref>
            <div className={`${defaultClasses} ${className ? className : ''}`}>
                {children}
            </div>
        </Link>
    );
}

export default NeoButton;
