'use client';

// ZoomableImage.jsx

import React, {useState, useRef} from 'react';
import Image from 'next/image';
import {gsap} from 'gsap';

function ZoomableImage({src, alt}) {
    const [isZoomed, setIsZoomed] = useState(false);
    const imgRef = useRef(null);
    const containerRef = useRef(null);


    const zoomOut = () => {
        if (isZoomed) {
            gsap.to(imgRef.current, {duration: 0.3, scale: 1, xPercent: 0, yPercent: 0});
            setIsZoomed(false);
        }
    };

    const handleMouseMove = (e) => {
        if (!isZoomed || !imgRef.current) return;

        const {left, top, width, height} = containerRef.current.getBoundingClientRect();
        const relativeX = e.clientX - left; // Using clientX/Y to account for scroll
        const relativeY = e.clientY - top;

        const x = (relativeX / width) * 100;
        const y = (relativeY / height) * 100;

        gsap.to(imgRef.current, {
            duration: 0.3,
            xPercent: 50 - x,
            yPercent: 50 - y,
        });
    };

    const handleImageClick = (e) => {
        if (isZoomed) {
            zoomOut();
        } else {
            const {left, top, width, height} = containerRef.current.getBoundingClientRect();
            const relativeX = e.clientX - left; // Using clientX/Y here as well
            const relativeY = e.clientY - top;

            const x = (relativeX / width) * 100;
            const y = (relativeY / height) * 100;

            gsap.to(imgRef.current, {
                duration: 0.3,
                scale: 2,
                xPercent: 50 - x,
                yPercent: 50 - y,
            });
            setIsZoomed(true);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative group overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={zoomOut}
        >

            <Image
                key={src}
                src={src}
                alt={alt}
                ref={imgRef}
                height={700}
                sizes={'100vw'}
                width={700}
                quality={95}
                priority
                blurDataURL={"/images/placeholder-images.jpg"}
                placeholder={"blur"}
                className={`w-full bg-[#E8EDEF] h-full object-contain transition-transform duration-300 ease-in-out fade-in'}`}
            />
        </div>
    );
}

export default ZoomableImage;

