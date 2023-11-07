// ZoomableImageGallery.tsx

import React, {useEffect, useState} from 'react';
import ZoomableImage from './ZoomableImage';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";

type ZoomableImageGalleryProps = {
    images: string[];
};

const ZoomableImageGallery: React.FC<ZoomableImageGalleryProps> = ({images}) => {


    const [displayedImages, setDisplayedImages] = useState<string[]>([]);
    const [isAllImagesShown, setIsAllImagesShown] = useState<boolean>(false);

    useEffect(() => {
        setDisplayedImages(images.slice(0, 4));
    }, [images]);

    // Toggle between displaying all images and the initial set.
    const toggleImages = () => {
        if (isAllImagesShown) {
            setDisplayedImages(images.slice(0, 4));
        } else {
            setDisplayedImages(images);
        }
        setIsAllImagesShown(!isAllImagesShown);
    };


    return (
        <div className="relative grid grid-cols-2 gap-1 cursor-zoom-in">
            {displayedImages.map((imagePath, index) => (
                <ZoomableImage key={imagePath} src={imagePath} alt={`Product image`}/>
            ))}
            <button
                onClick={toggleImages}
                className="absolute left-[44%] bottom-[-1.8%] transform -translate-x-50% -translate-y-50% w-fit  h-12
                 py-0 px-4 m-0 text-sm font-semibold leading-5 text-left uppercase bg-custom-white dark:bg-black dark:border-slate-8 bg-none rounded-none border
                 border-black border-solid cursor-pointer text-slate-12 hover:text-slate-10 flex items-center justify-start"
            >
                {isAllImagesShown ? (
                    <>
                        Show Less
                        <ChevronUpIcon className="w-6 h-6  ml-4"/>
                    </>
                ) : (
                    <>
                        Show More
                        <ChevronDownIcon className="w-6 h-6 ml-4 "/>
                    </>
                )}
            </button>

        </div>
    );
}

export default ZoomableImageGallery;
