import React from 'react';

const BreakpointsIndicatorExtended: React.FC = () => {
        return (
            <div className="fixed z-50 top-0 left-0 m-6 p-2 text-2xs font-mono text-white h-9 w-9 rounded-full shadow-md border-white border flex items-center justify-center
                  3xs:bg-gray-200 3xs:text-black 2xs:bg-gray-300 xs:bg-gray-400 xsmall:bg-sky-500 sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500 large:bg-blue-200
                  2xl:bg-yellow-300 xlarge:bg-red-400 xxlarge:bg-cyan-300 3xl:bg-red-500 3xl:text-gray-500">
                    {/* Default case, when none of the breakpoints are active */}
                    <div className="block 3xs:hidden 2xs:hidden xs:hidden xsmall:hidden sm:hidden md:hidden lg:hidden xl:hidden large:hidden 2xl:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">N/A</div>

                    {/* Breakpoints */}
                    <div className="hidden 3xs:block 2xs:hidden xs:hidden xsmall:hidden sm:hidden md:hidden lg:hidden xl:hidden large:hidden 2xl:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">3xs</div>
                    <div className="hidden 2xs:block 3xs:hidden xs:hidden xsmall:hidden sm:hidden md:hidden lg:hidden xl:hidden large:hidden 2xl:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">2xs</div>
                    <div className="hidden xs:block 3xs:hidden 2xs:hidden xsmall:hidden sm:hidden md:hidden lg:hidden xl:hidden large:hidden 2xl:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">xs</div>
                    <div className="hidden xsmall:block 3xs:hidden 2xs:hidden xs:hidden sm:hidden md:hidden lg:hidden xl:hidden large:hidden 2xl:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">xsmall</div>
                    <div className="hidden sm:block 3xs:hidden 2xs:hidden xs:hidden xsmall:hidden md:hidden lg:hidden xl:hidden large:hidden 2xl:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">sm</div>
                    <div className="hidden md:block 3xs:hidden 2xs:hidden xs:hidden xsmall:hidden sm:hidden lg:hidden xl:hidden large:hidden 2xl:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">md</div>
                    <div className="hidden lg:block 3xs:hidden 2xs:hidden xs:hidden xsmall:hidden sm:hidden md:hidden xl:hidden large:hidden 2xl:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">lg</div>
                    <div className="hidden xl:block 3xs:hidden 2xs:hidden xs:hidden xsmall:hidden sm:hidden md:hidden lg:hidden large:hidden 2xl:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">xl</div>
                    <div className="hidden large:block 3xs:hidden 2xs:hidden xs:hidden xsmall:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">large</div>
                    <div className="hidden 2xl:block 3xs:hidden 2xs:hidden xs:hidden xsmall:hidden sm:hidden md:hidden lg:hidden xl:hidden large:hidden xlarge:hidden xxlarge:hidden 3xl:hidden">2xl</div>
                    <div className="hidden xlarge:block 3xs:hidden 2xs:hidden xs:hidden xsmall:hidden sm:hidden md:hidden lg:hidden xl:hidden large:hidden 2xl:hidden xxlarge:hidden 3xl:hidden">xlarge</div>
                    <div className="hidden xxlarge:block 3xs:hidden 2xs:hidden xs:hidden xsmall:hidden sm:hidden md:hidden lg:hidden xl:hidden large:hidden 2xl:hidden xlarge:hidden 3xl:hidden">xxlarge</div>
                    <div className="hidden 3xl:block 3xs:hidden 2xs:hidden xs:hidden xsmall:hidden sm:hidden md:hidden lg:hidden xl:hidden large:hidden 2xl:hidden xlarge:hidden xxlarge:hidden">3xl</div>
            </div>
        );
};

export default BreakpointsIndicatorExtended;
