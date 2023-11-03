import React from 'react';

const BreakpointsIndicator: React.FC = () => {
    return (
        <div className="fixed z-50 top-0 left-0 m-6 p-2 text-xs font-mono 3xs:text-black h-8 w-8 rounded-full shadow-md border-white border flex items-center justify-center
                  3xs:bg-gray-200 2xs:bg-gray-300 xs:bg-gray-400 sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500 2xl:bg-yellow-300 3xl:bg-red-500 3xl:text-gray-500">
            <div className="block 3xs:hidden 2xs:hidden xs:hidden xsmall:hidden sm:hidden md:hidden lg:hidden xl:hidden large:hidden 2xl:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">N/A</div>
            <div className="hidden 3xs:block 2xs:hidden xs:hidden xsmall:hidden sm:hidden md:hidden lg:hidden xl:hidden large:hidden 2xl:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">3xs</div>
            <div className="hidden 2xs:block 3xs:hidden xs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden">2xs</div>
            <div className="hidden 2xs:hidden 3xs:hidden xs:block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden">xs</div>
            <div className="hidden 2xs:hidden 3xs:hidden xs:hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden">sm</div>
            <div className="hidden 2xs:hidden 3xs:hidden xs:hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden 3xl:hidden">md</div>
            <div className="hidden 2xs:hidden 3xs:hidden xs:hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden 3xl:hidden">lg</div>
            <div className="hidden 2xs:hidden 3xs:hidden xs:hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden 3xl:hidden">xl</div>
            <div className="hidden 2xs:hidden 3xs:hidden xs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block 3xl:hidden">2xl</div>
            <div className="hidden 2xs:hidden 3xs:hidden xs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:block">3xl</div>
        </div>
    );
};

export default BreakpointsIndicator;