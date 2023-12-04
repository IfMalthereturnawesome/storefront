import type {Metadata} from 'next';
import {allResources} from 'contentlayer/generated';
import {notFound} from 'next/navigation';
import {Mdx} from '@/components/resources/mdx/mdx';
import TopicTitle from '@/components/resources/topic-title';
import Hamburger from '@/components/resources/hamburger';
import Feedback from '@/components/resources/feedback';
import PageNavigation from '@/components/resources/page-navigation';
import SecondaryNav from '@/components/resources/secondary-nav';
import SocialShare from '@/components/post-components/SocialShare';
import Container from '@/components/elements/Container';

type Props = {
    params: {
        slug: string,
        topic: string,
    }
}

export async function generateStaticParams() {
    return allResources.map(resource => ({
        params: {
            topic: resource.topic,
            slug: resource.slug
        }
    }));
}


export async function generateMetadata({params}: Props): Promise<Metadata> {
    const fullSlug = `${params.topic}/${params.slug}`;
    const resource = allResources.find(resource => resource.slug === fullSlug);


    if (!resource) {
        notFound()
    }


    const topicResources = allResources.filter(resource => resource.topic.slug === params.topic);
    const topicResourcesLength = topicResources.length;
    const sectionDescription = `Article ${resource.order} of ${topicResourcesLength} in the ${resource.topic.name} Resource`;

    return {
        title: `${resource.title}`,
        description: `${resource.summary}`,
        openGraph: {
            title: `${resource.title}`,
            description: `${resource.summary}`,
            type: 'article',
            images: 'https://www.eightathletics.com/images/Eight-Athletics-black-logo.svg',
            tags: `Resource - ${resource.topic.name}`,
            publishedTime: `${resource.publishedAt}`,
            modifiedTime: `${resource.modifiedAt}`,
            locale: 'en_US',
            url: `https://www.eightathletics.com/resources/${fullSlug}`,
            section: sectionDescription,
        },
    }

}


export default async function SingleResource({
                                                 params,
                                             }: {
    params: {
        topic: string;
        slug: string;
    };
}) {
    const resource = allResources.find(
        resource => resource.slug === `${params.topic}/${params.slug}`,
    );

    if (!resource) notFound();

    return (
        <>
            <Container>
                {/* Page header */}
                <div className="mb-6 flex h-16 items-center">
                    <TopicTitle name={resource.topic.name} segment={resource.topic.slug}/>
                </div>

                <article className=" flex xl:space-x-12">
                    {/* Main area */}
                    <div className="min-w-0">
                        {/* Mobile hamburger + breadcrumbs */}
                        <div className="mb-8 flex items-center 2xl:hidden">
                            <Hamburger/>

                            {/* Breadcrumbs */}
                            <div className="ml-3 flex min-w-0 items-center whitespace-nowrap text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                {resource.topic.name}
              </span>
                                <svg
                                    className="mx-2 shrink-0 fill-slate-400 dark:fill-slate-500"
                                    width="8"
                                    height="10"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1 2 2.414.586 6.828 5 2.414 9.414 1 8l3-3z"/>
                                </svg>
                                <span className="truncate font-medium text-slate-800 dark:text-slate-200">
                {resource.title}
              </span>
                            </div>
                        </div>

                        {/* Article content */}
                        <div>
                            <header className="mb-6">
                                <h1 className="h2 mb-4 text-slate-800 dark:text-slate-200">
                                    {resource.title}
                                </h1>
                                <p className="text-lg text-slate-11">
                                    {resource.summary}
                                </p>
                            </header>
                            <Mdx code={resource.body.code}/>
                        </div>

                        {/* Feedback */}
                        <Feedback/>

                        {/* Page navigation */}
                        <PageNavigation
                            prevArticle={resource.prev}
                            nextArticle={resource.next}
                        />

                        {/* Content footer */}

                        <footer className="border-t border-slate-200 pt-8 dark:border-slate-800">
                            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
                                <div className="mb-4 md:mb-0">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Share on social media
                                    </p>
                                </div>
                                {/* Social links */}
                                <SocialShare url={resource.slug} title={resource.title}/>
                            </div>
                        </footer>
                    </div>

                    {/* Secondary navigation */}
                    <SecondaryNav/>
                </article>
            </Container>
        </>
    );
}
