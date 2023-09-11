import type {Metadata} from 'next';
import {allPosts} from 'contentlayer/generated';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PostDate from '@/components/post-date';
import PostTags from '@/components/elements/post-tags';
import {PostMdx} from '@/components/mdx/post-mdx';
import Breadcrumb from '@/components/elements/Breadcrumb';
import RelatedPosts from '@/components/post-components/RelatedPosts';
import SocialShare from '@/components/post-components/SocialShare';


export async function generateStaticParams() {
  return allPosts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: {slug: string};
}): Promise<Metadata | undefined> {
  const post = allPosts.find(post => post.slug === params.slug);

  if (!post) return;

  const {title, summary: description} = post;

  return {
    title,
    description,
  };
}

export default async function SinglePost({params}: {params: {slug: string}}) {
  const post = allPosts.find(post => post.slug === params.slug);
  const relatedPosts = allPosts.filter(p => {
    if (post && post.tags) {
      //  return max 3 related posts
      return post.tags.some(tag => p.tags?.includes(tag));
    }
    return false;
  });

  if (!post) notFound();

  return (

    <section className="relative bg-cyan-1">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-16 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-3xl">
            <div className="pb-12">
              <Breadcrumb postTitle={post.title} />
            </div>


              <header className="mb-8">
                {/* Title and excerpt */}
                <div className="text-center md:text-left">
                  <h1
                    className="custom-header-1 format format-blue mb-6 dark:format-invert"
                    data-aos="fade-up"
                  >
                    {post.title}
                  </h1>
                  <p
                    className="format format-blue text-xl dark:format-invert lg:format-lg"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {post.summary}
                  </p>
                </div>
                {/* Article meta */}
                <div className="mt-3 md:flex md:items-center md:justify-between">
                  {/* Author meta */}
                  <div
                    className="flex items-center justify-center"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <Link href="#">
                      <Image
                        className="mr-4 shrink-0 rounded-full "
                        src={post.authorImg}
                        width={40}
                        height={40}
                        alt={post.author}
                      />
                    </Link>
                    <div className="format format-blue dark:format-invert">
                      {post.author}

                      <span className="text-gray-700"> - </span>
                      <span className="text-gray-500">
                        <PostDate dateString={post.publishedAt} />
                      </span>
                    </div>
                  </div>
                  {/* Article tags */}
                  {post.tags && (
                    <div
                      className="mt-4 flex justify-center md:mt-0"
                      data-aos="fade-up"
                      data-aos-delay="600"
                    >
                      <PostTags tags={post.tags} />
                    </div>
                  )}
                  {/* Article Social Share */}
                  <div data-aos="fade-up" data-aos-delay="600">
                    <SocialShare url={post.slug} title={post.title} />
                  </div>
                </div>
              </header>

              {/* Article image */}

              {post.image && (
                <figure
                  className="mb-10 lg:-ml-32 lg:-mr-32"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <Image
                    className=" mx-auto w-full rounded-lg"
                    src={post.image}
                    width={700}
                    height={500}
                    alt={post.title}
                    priority
                    quality={90}
                  />
                </figure>
              )}
              <div>
              {/* Article content */}
              <PostMdx code={post.body.code} />
              </div>
          </div>
        </div>

          <div className="mt-5 lg:mt-20 pb-14">
            <h3 className="format py-10 text-xl font-bold dark:format-invert md:text-3xl">
              Related Posts
            </h3>
            <RelatedPosts relatedPosts={relatedPosts} />
          </div>
      </div>
    </section>

  );
}
