import Link from 'next/link';
import Image from 'next/image';
import PostDate from '@/components/post-date';
import PostTags from '@/components/elements/post-tags';
import Highlighter, {
  HighlighterItemTwo,
} from '@/components/highlighter/highlighter';

export default function PostItem({...props}) {
  return (
    <Highlighter className="group grid gap-6  md:grid-cols-3">
      <div className="md:col-span-3" data-aos="fade-down">
        <HighlighterItemTwo className="flex min-h-[200px] flex-col items-stretch sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]">
          {' '}
          {/* Add items-stretch and min-h here */}
          <div className="relative z-20 h-full overflow-hidden rounded-[inherit] dark:bg-cyan-2 bg-cyan-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <article
                className="flex h-full min-h-[200px] flex-col items-stretch  sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]"
                data-aos="fade-up"
              >
                <header>
                  {props.image && (
                    <Link href={`/blog/${props.slug}`} className="mb-6 block ">
                      <figure className="relative h-0 overflow-hidden rounded-sm pb-9/16">
                        <Image
                          className=" absolute inset-0 h-full w-full transform object-cover transition duration-700 ease-out hover:scale-105"
                          src={props.image}
                          width={352}
                          height={198}
                          alt={props.title}
                        />
                      </figure>
                    </Link>
                  )}
                  {props.tags && (
                    <div className="mb-3 px-4">
                      <PostTags tags={props.tags} />
                    </div>
                  )}
                  <h3 className="h4 mb-2 px-4">
                    <Link
                      href={`/blog/${props.slug}`}
                      className="text-gray-800 transition duration-150 ease-in-out dark:text-gray-200"
                    >
                      {props.title}
                    </Link>
                  </h3>
                </header>
                <p className="grow px-4 text-md text-gray-800 dark:text-gray-400">
                  {props.summary}
                </p>
                <footer className="my-4 flex items-center px-4 md:mb-4">
                  <Link href="#">
                    <img
                      className="mr-4 shrink-0 rounded-full"
                      src={props.authorImg}
                      width={40}
                      height={40}
                      alt={props.author}
                    />
                  </Link>
                  <div className="font-medium">
                    <Link
                      href="#"
                      className="text-gray-800 transition duration-150 ease-in-out dark:text-gray-200"
                    >
                      {props.author}
                    </Link>
                    <span className="text-gray-700"> - </span>
                    <span className="text-gray-500">
                      <PostDate dateString={props.publishedAt} />
                    </span>
                  </div>
                </footer>
              </article>
            </div>
          </div>
        </HighlighterItemTwo>
      </div>
    </Highlighter>
  );
}
