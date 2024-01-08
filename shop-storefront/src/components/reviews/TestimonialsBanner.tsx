import React from 'react';
import Image from 'next/image';

const TestimonialsBanner = () => {
    const customerImages = [
        '/images/world-user-01.jpg',
        '/images/world-user-02.jpg',

        '/images/world-user-04.jpg',
        '/images/world-user-05.jpg',
        '/images/world-user-06.jpg',
        '/images/world-user-07.jpg',



    ];
    return (
        <div className="black-gradient-background-reviews w-[85vw] md:w-full rounded-xl overflow-hidden py-2 px-1 md:p-3 md:flex items-center md:space-x-4 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center space-x-1 text-yellow-200 mx-auto md:mx-0 ">
                <div className="text-2xl">
                    ★★★★★
                </div>
                <span className="text-gray-200 text-2xs md:text-xs font-semibold">4.6/5</span>
            </div>
            <div className="flex-grow ">
                <p className="text-gray-300 font-bold text-sm xs:text-base  leading-tight">
                    Join over 1000 happy sleepers
                </p>
                <p className="text-gray-400 text-xs xs:text-sm">
                    {"who no longer let light spoil their sleep."}
                </p>
            </div>
            <div className="flex -space-x-2 justify-center md:justify-start mx-auto md:mx-0">
                {customerImages.map((image, index) => (
                    <div key={index} className="w-8 h-8 md:w-10 md:h-10 border-4 border-[#070920] rounded-full overflow-hidden bg-white">
                        <Image
                            src={image}
                            alt={`Customer ${index + 1}`}
                            width={32}
                            height={32}
                            className="rounded-full cover"
                        />
                    </div>
                ))}
                <div className="flex justify-center items-center w-8 h-8 md:w-10 md:h-10 bg-dark-blue-600 rounded-full bg-black border-2 border-[#070920]">
                    <span className="text-white text-poppins font-bold text-2xs">+1k</span>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsBanner;

// smaller version of TestimonialBanner  without images

export const TestimonialsBannerSmall = () => {
    return (
        <div className="black-gradient-background-reviews w-full rounded-b-xl overflow-hidden py-2 px-1 md:p-3 flex items-center space-x-4 text-left">
            <div className="flex justify-start items-center space-x-1 text-yellow-200 mx-0 ">
                <div className="text-xl">
                    ★★★★★
                </div>
            </div>
            <div className="flex-grow ">
                <p className="text-gray-300 font-bold text-xs xs:text-sm  leading-tight">
                    Join over 1000 happy sleepers
                </p>
                <p className="text-gray-400 text-2xs xs:text-xs">
                    {"who no longer let light spoil their sleep."}
                </p>
            </div>

        </div>
    );
}