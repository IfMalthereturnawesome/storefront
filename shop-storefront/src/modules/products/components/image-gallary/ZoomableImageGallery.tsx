// ZoomableImageGallery.jsx

import React, {useState} from 'react';
import ZoomableImage from './ZoomableImage';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";

type ZoomableImageGalleryProps = {
    images: string[];
};

const ZoomableImageGallery: React.FC<ZoomableImageGalleryProps> = ({images}) => {
    const initialImages = images.slice(0, 4);
    // State to determine if all images are shown or just the initial set.
    const [displayedImages, setDisplayedImages] = useState<string[]>(initialImages);
    // State to determine the button label.
    const [isAllImagesShown, setIsAllImagesShown] = useState<boolean>(false);

    // Toggle between displaying all images and the initial set.
    const toggleImages = () => {
        if (isAllImagesShown) {
            setDisplayedImages(initialImages);
        } else {
            setDisplayedImages(images);
        }
        setIsAllImagesShown(!isAllImagesShown);
    };

    return (
        <div className="relative grid grid-cols-2 gap-1 cursor-zoom-in">
            {displayedImages.map((imagePath) => (
                <ZoomableImage key={imagePath} src={imagePath} alt={`Product image`}/>
            ))}
            <button
                onClick={toggleImages}
                className="absolute left-[44%] bottom-[-1.8%] transform -translate-x-50% -translate-y-50% w-fit  h-12
                 py-0 px-4 m-0 text-sm font-semibold leading-5 text-left uppercase bg-white bg-none rounded-none border
                 border-black border-solid cursor-pointer text-slate-1 hover:text-slate-6 flex items-center justify-start"
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
