import Image, {StaticImageData} from 'next/image';

interface PostImageProps {
  alt: string;
  caption?: string;
  src: StaticImageData;
  author?: string;
}

export default function PostImage({
  alt,
  caption,
  author,
  ...props
}: PostImageProps) {
  return (
    <figure>
      <Image className="w-full" {...props} alt={alt} />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      )}
      {author && (
        <div className="mt-2 text-center text-sm text-gray-500">
          Photo by {author}
        </div>
      )}
    </figure>
  );
}
