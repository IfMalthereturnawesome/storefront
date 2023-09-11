import Link from 'next/link';
import Image from 'next/image';
import PostDate from '@/components/post-date';
import PostTags from '@/components/elements/post-tags';
import Highlighter, {
  HighlighterItemTwo,
} from '@/components/highlighter/highlighter';

interface RelatedPost {
  slug: string;
  title: string;
  summary: string;
  image?: string;
  author: string;
  authorImg: string;
  publishedAt: string;
  tags?: string[];
}

interface RelatedPostsProps {
  relatedPosts: RelatedPost[];
}

export default function RelatedPosts({relatedPosts}: RelatedPostsProps) {
  if (relatedPosts.length === 0) {
    return null; // Return null if there are no related posts
  } 

   const sortedRelatedPosts = relatedPosts.sort((a, b) => {
     const dateA = new Date(a.publishedAt);
     const dateB = new Date(b.publishedAt);
     return dateB.getTime() - dateA.getTime();
   });
  const limitedPosts = sortedRelatedPosts.slice(0, 3);

  return (
      <Highlighter className="group grid gap-6 md:grid-cols-3">
        {limitedPosts.map((post) => (
            <div className="md:col-span-1" data-aos="fade-down" key={post.slug}>
              <HighlighterItemTwo className="flex min-h-[200px] flex-col items-stretch sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]">
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] dark:bg-cyan-2 bg-cyan-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <article
                        className="flex h-full min-h-[200px] flex-col items-stretch  sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]"
                        data-aos="fade-up"
                    >
                      <header>
                        {post.image && (
                            <Link href={`/blog/${post.slug}`} className="mb-6 block">
                              <figure className="relative h-0 overflow-hidden rounded-sm pb-9/16">
                                <Image
                                    className="absolute inset-0 h-full w-full transform object-cover transition duration-700 ease-out hover:scale-105"
                                    src={post.image}
                                    width={352}
                                    height={198}
                                    alt={post.title}
                                />
                              </figure>
                            </Link>
                        )}
                        {post.tags && (
                            <div className="mb-3 px-4">
                              <PostTags tags={post.tags} />
                            </div>
                        )}
                        <h3 className="h4 mb-2 px-4">
                          <Link
                              href={`/blog/${post.slug}`}
                              className="text-gray-800 transition duration-150 ease-in-out dark:text-gray-200"
                          >
                            {post.title}
                          </Link>
                        </h3>
                      </header>
                      <p className="grow px-4 text-base text-gray-800 dark:text-gray-400">
                        {post.summary}
                      </p>
                      <footer className="my-4 flex items-center px-4 md:mb-4">
                        <Link href="#">
                          <img
                              className="mr-4 shrink-0 rounded-full"
                              src={post.authorImg}
                              width={40}
                              height={40}
                              alt={post.author}
                          />
                        </Link>
                        <div className="font-medium">
                          <Link
                              href="#"
                              className="text-gray-800 transition duration-150 ease-in-out dark:text-gray-200"
                          >
                            {post.author}
                          </Link>
                          <span className="text-gray-700"> - </span>
                          <span className="text-gray-500">
                        <PostDate dateString={post.publishedAt} />
                      </span>
                        </div>
                      </footer>
                    </article>
                  </div>
                </div>
              </HighlighterItemTwo>
            </div>
        ))}
      </Highlighter>
  );
}
