'use client';

// ZoomableImage.jsx

import React, {useState, useRef, useEffect} from 'react';
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


    const yourLowResImageDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="


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
                height={600}
                width={600}
                quality={85}
                placeholder={'blur'}
                blurDataURL={yourLowResImageDataURL}
                className="w-full h-auto fade-in"
            />
        </div>
    );
}

export default ZoomableImage;

