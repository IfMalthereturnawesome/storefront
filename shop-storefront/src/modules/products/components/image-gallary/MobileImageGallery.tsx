import React, { useState, useRef } from 'react';
import Image from 'next/image';

const MobileImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const isPrevDisabled = currentIndex === 0;
    const isNextDisabled = currentIndex === images.length - 1;


    const handleSwipe = (direction) => {
        if (direction === 'left' && !isNextDisabled) {
            setCurrentIndex(currentIndex + 1);
        } else if (direction === 'right' && !isPrevDisabled) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        carouselRef.current = touchDown;
    };

    const handleTouchMove = (e) => {
        const touchDown = carouselRef.current;
        if (touchDown === null) return;

        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            handleSwipe('left');
        } else if (diff < -5) {
            handleSwipe('right');
        }

        carouselRef.current = null;
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full bg-[#E8EDEF]">
            <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                className="overflow-hidden w-full h-[80%]"
            >
                <div
                    className="flex"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            width={500}
                            height={500}
                            quality={95}
                            alt={`Slide ${index}`}
                            className={`block w-full h-full object-cover ${currentIndex === index ?
                                'opacity-100' : 'opacity-0'}`}
                        />
                    ))}

                </div>
            </div>

            <button
                onClick={() => handleSwipe('right')}
                className={`absolute left-0 z-30 p-2 text-black/50 bg-opacity-50 hover:bg-opacity-75 transition-opacity duration-300 ${isPrevDisabled ? 'opacity-50 cursor-default' : ''}`}
                aria-label="Previous"
                disabled={isPrevDisabled}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={() => handleSwipe('left')}
                className={`absolute right-0 z-30 p-2 text-black/50 bg-opacity-50 hover:bg-opacity-75 transition-opacity duration-300 ${isNextDisabled ? 'opacity-50 cursor-default' : ''}`}
                aria-label="Next"
                disabled={isNextDisabled}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center p-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`mx-1 h-2 w-2 rounded-full ${currentIndex === index ? 'bg-gray-700' : 'bg-gray-400'} transition duration-300`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default MobileImageCarousel;
