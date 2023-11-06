'use client';
import {allPosts} from 'contentlayer/generated';
import Link from 'next/link';
import Image from 'next/image';
import Highlighter, {HighlighterItem} from '@/components/highlighter/highlighter';
import PostDate from '@/components/post-date';
import PostTags from '@/components/elements/post-tags';
import PostItem from '@/components/post-item';
import React, {useState} from 'react';
import SpinnerButton from '@/components/elements/SpinnerButton';
import Filter, {SortOption, sortOptions} from '@/components/elements/Filter';
import FeatureImg01 from '/public/images/eight-athletics-sleep-resources-blog.png';
import TopNavBanner from '@/components/ui/NavBanner';
import {Button} from '@nextui-org/button';


// export const metadata = {
//   title: 'Blog - Open PRO',
//   description: 'Page description',
// };

export default function Blog() {

  const featuredPost = allPosts[0];
  const otherPosts = allPosts.slice(1);

  const [filteredPosts, setFilteredPosts] = useState(() =>
    otherPosts.slice(0, 6),
  );

  const [isLoading, setIsLoading] = useState(false);
  const [currentSortOption, setCurrentSortOption] = useState<SortOption | null>(() => {
    const initialOption = sortOptions.find(option => option.current);
    if (initialOption) {
      return initialOption;
    }
    // Handle the case where no option has `current: true`
    // For example, you might want to default to the first option
    return sortOptions[0];
  });

  const loadMorePosts = async () => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 200));
    const morePosts = otherPosts
      .filter(
        post =>
          !filteredPosts.find(filteredPost => filteredPost._id === post._id),
      )
      .slice(0, 6);
    setFilteredPosts(prevFilteredPosts => [...prevFilteredPosts, ...morePosts]);
    setIsLoading(false);
  };



  return (
    <>
      <section className="relative bg-cyan-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="pb-12 pt-16 md:pb-20 md:pt-40">
            {/*  Page header */}
            <div className="max-w-3xl pb-12 text-center md:pb-20 md:text-left">
              <h1
                className="custom-header-1 format format-blue mb-4 dark:format-invert"
                data-aos="fade-up"
              >
                Eight Athletics&apos; blog
              </h1>
            </div>

            {/*  Featured article */}
            <div className="pb-12 md:pb-20">
              <article className="mx-auto grid max-w-sm items-center gap-6 md:max-w-none md:grid-cols-2 md:gap-8 lg:gap-12 xl:gap-16">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group relative block"
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  <div
                    className="pointer-events-none absolute inset-0 hidden transform bg-gray-800 transition duration-700 ease-out group-hover:translate-x-0 group-hover:translate-y-0 md:block md:translate-x-4 md:translate-y-2 xl:translate-x-8 xl:translate-y-4"
                    aria-hidden="true"
                  ></div>
                  {featuredPost.image && (
                    <figure className="relative h-0 transform overflow-hidden pb-9/16 transition duration-700 ease-out group-hover:translate-x-0 group-hover:translate-y-0 md:-translate-y-2 md:pb-3/4 lg:pb-9/16 xl:-translate-y-4">
                      <Image
                        className="absolute inset-0 h-full w-full transform object-cover transition duration-700 ease-out hover:scale-105"
                        src={featuredPost.image}
                        width="540"
                        height="303"
                        alt={featuredPost.title}
                      />
                    </figure>
                  )}
                </Link>
                <div data-aos="fade-left" data-aos-delay="200">
                  <header>
                    <div className="mb-3">
                      {featuredPost.tags && (
                        <div className="mb-3">
                          <PostTags tags={featuredPost.tags} />
                        </div>
                      )}
                    </div>
                    <h3 className="h3 mb-4 text-2xl lg:text-3xl">
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="text-slate-11 transition duration-150 ease-in-out hover:text-slate-11 dark:text-gray-200 dark:hover:text-gray-100"
                      >
                        {featuredPost.title}
                      </Link>
                    </h3>
                  </header>
                  <p className="grow text-lg text-gray-800 dark:text-gray-400 ">
                    {featuredPost.summary}
                  </p>
                  <footer className="mt-4 flex items-center">
                    <Link href="#">
                      <Image
                        className="mr-4 shrink-0 rounded-full"
                        src={featuredPost.authorImg}
                        width={40}
                        height={40}
                        alt={featuredPost.author}
                      />
                    </Link>
                    <div>
                      <Link
                        href="#"
                        className="font-medium text-slate-11 transition duration-150 ease-in-out  dark:text-gray-200"
                      >
                        {featuredPost.author}
                      </Link>
                      <span className="text-slate-11"> - </span>
                      <span className="text-gray-500">
                        <PostDate dateString={featuredPost.publishedAt} />
                      </span>
                    </div>
                  </footer>
                </div>
              </article>
            </div>
            <div className="relative py-12 md:pb-20">
              {/* Blurred shape */}
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 -mb-20 -translate-x-1/2 opacity-50 blur-2xl"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="434"
                  height="427"
                >
                  <defs>
                    <linearGradient
                      id="bs2-a"
                      x1="119.609%"
                      x2="50%"
                      y1="14.544%"
                      y2="100%"
                      className="hidden dark:block "
                    >
                      <stop offset="0%" stopColor="#0F5096FF" />
                      <stop offset="100%" stopColor="#0F5096FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#bs2-a)"
                    fillRule="evenodd"
                    d="m346 898 461 369-284 58z"
                    transform="translate(-346 -898)"
                  />
                </svg>
              </div>

              {/* Grid */}
              <Highlighter className="group grid gap-6 md:grid-cols-12">
                {/* Box #1 */}
                <div className="md:col-span-12" data-aos="fade-down">
                  <HighlighterItem>
                    <div className="relative z-20 h-full overflow-hidden rounded-[inherit] border-2  border-black  dark:border-black dark:border-[1px] bg-slate-1 dark:bg-cyan-2 hover:border-cyan-12 dark:hover:border-cyan-10 hover:bg-gold-1 dark:hover:bg-cyan-1 transition-all duration-300 transform shadow hover:drop-shadow-xl drawBlogCard">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        {/* Blurred shape */}
                        <div
                          className="absolute right-0 top-0 blur-2xl"
                          aria-hidden="true"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="342"
                            height="393"
                          >
                            <defs>
                              <linearGradient
                                id="bs-a"
                                x1="19.609%"
                                x2="50%"
                                y1="14.544%"
                                y2="100%"
                              className="hidden dark:block "
                              >
                                <stop offset="80%" stopColor="#0F5096FF" />
                                <stop
                                  offset="100%"
                                  stopColor="#0F5096FF"
                                  stopOpacity="0"
                                />
                              </linearGradient>

                            </defs>
                            <path
                              fill="url(#bs-a)"
                              fillRule="evenodd"
                              d="m104 .827 461 369-284 58z"
                              transform="translate(0 -112.827)"
                              opacity=".7"
                            />
                          </svg>
                        </div>
                        {/* Radial gradient */}
                        <div
                          className="aspect-square pointer-events-none absolute bottom-0 left-1/2 -z-10 flex h-full -translate-x-1/2 translate-y-1/2 items-center justify-center"
                          aria-hidden="true"
                        >
                          <div className="translate-z-0 absolute inset-0 rounded-full bg-blue-1 opacity-70 blur-[120px]" />
                          <div className="translate-z-0 absolute h-1/4 w-1/4 rounded-full bg-purple-400 blur-[40px]" />
                        </div>
                        {/* Text */}
                        <div className="order-1 shrink-0 p-6 md:order-none md:max-w-[480px] md:p-8 md:pr-0">
                          <div className="mb-5">
                            <div>
                              <h3 className="inline-flex bg-gradient-to-r from-slate-11 via-slate-12 to-slate-11  bg-clip-text pb-1 text-xl font-bold text-transparent">
                                In-Depth Sleep Resources
                              </h3>
                              <p className="text-slate-11 ">
                                With science-backed advice and practical tips to
                                enhance your sleep quality, our comprehensive
                                guides will help you catch those elusive Z&apos;s.
                                Don&apos;t let poor sleep hold you back - discover
                                the secrets to better sleep today!
                              </p>
                            </div>
                          </div>
                          <Button>
                            <Link
                              className="btn-sm group relative  group text-slate-12 custom-button-neo"
                              href={"/resources"}
                            >
                              <span className="relative inline-flex items-center">
                                Learn more{' '}
                                <span className="ml-1 tracking-normal text-blue-500  transition-transform duration-150 ease-in-out group-hover:translate-x-1">
                                  -&gt;
                                </span>
                              </span>
                            </Link>
                          </Button>
                        </div>
                        {/* Image */}
                        <div className="relative h-64 w-full overflow-hidden md:h-auto">
                          <Image
                              className="absolute bottom-0 left-1/2 mx-auto max-w-none -translate-x-1/2 md:relative w-full md:w-auto"
                              src={FeatureImg01}
                              width="410"
                              height="330"
                              alt="Feature 01"
                          />
                        </div>

                      </div>
                    </div>
                  </HighlighterItem>
                </div>
              </Highlighter>
            </div>

            {/*  Articles list */}
            <div className="mx-auto max-w-sm md:max-w-none">
              {/*  Section title */}
              <h4
                className="h4 mb-10 pb-6 text-gray-800 dark:text-gray-200 "
                data-aos="fade-up"
                id="latest-articles"
              >
                Latest articles
              </h4>
              <div className="pb-8">
                <Filter
                  setFilteredPosts={setFilteredPosts}
                  currentSortOption={currentSortOption}
                  setCurrentSortOption={setCurrentSortOption}
                  otherPosts={otherPosts}
                  featuredPost={featuredPost}
                />
              </div>

              {/*  Articles container */}
              <div className="grid items-start gap-12 sm:grid-cols-1 md:grid-cols-2 md:gap-x-6 md:gap-y-8 lg:grid-cols-3">
                {filteredPosts.map((post, postIndex) => (
                  <PostItem key={postIndex} {...post} />
                ))}
              </div>
            </div>

            {/*  LoadMore  */}
            <div className="m-16 text-center">
              <SpinnerButton
                isLoading={isLoading}
                onClick={loadMorePosts}
                noMorePosts={otherPosts.length === filteredPosts.length}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
