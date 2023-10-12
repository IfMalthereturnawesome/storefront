import { Image as MedusaImage } from "@medusajs/medusa"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import clsx from "clsx"
import Image from "next/image"
import React from "react"



type ThumbnailProps = {
    productHandle: string;  // Add a prop for the product handle
    size?: "small" | "medium" | "large" | "full";
}
const buildThumbnailPath = (productHandle) => `/images/products/${productHandle}/thumbnail/thumbnail-${productHandle}.png`;
const Thumbnail: React.FC<ThumbnailProps> = ({
                                                 productHandle,
                                                 size
                                             }) => {
    const thumbnailPath = buildThumbnailPath(productHandle);  // Build the local thumbnail path

    return (
        <div
            className={clsx("relative aspect-[29/34]", {
                "w-[180px]": size === "small",
                "w-[290px]": size === "medium",
                "w-[440px]": size === "large",
                "w-full": size === "full",
            })}
        >
            <ImageOrPlaceholder image={thumbnailPath} size={size} />
        </div>
    )
}

const ImageOrPlaceholder = ({
                                image,
                                size,
                            }: Pick<ThumbnailProps, "size"> & { image?: string }) => {
    return image ? (
        <Image
            src={image}
            alt="Thumbnail"
            className="absolute inset-0"
            draggable={false}
            fill
            sizes="100vw"
            style={{
                objectFit: "cover",
                objectPosition: "center",
            }}
        />
    ) : (
        <div className="w-full h-full absolute inset-0 bg-gray-100 flex items-center justify-center">
            <PlaceholderImage size={size === "small" ? 16 : 24} />
        </div>
    )
}

export default Thumbnail;
