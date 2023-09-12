import type { Metadata } from 'next'
import { allTerms } from 'contentlayer/generated' // change to your actual import path
import { notFound } from 'next/navigation'
import PostDate from '@/components/post-date'
import { TermsMdx } from '@/components/mdx/terms-mdx'
import Container from "@/components/elements/Container"


export async function generateStaticParams() {
    return allTerms.map((term) => ({
        slug: term.slug,
    }))
}

export async function generateMetadata({ params }: {
    params: { slug: string }
}): Promise<Metadata | undefined> {

    const term = allTerms.find((term) => term.slug === params.slug)

    if (!term) return

    const { title, summary: description } = term

    return {
        title,
        description,
    }
}

export default async function SingleTerm({ params }: {
    params: { slug: string }
}) {

    const term = allTerms.find((term) => term.slug === params.slug)

    if (!term) notFound()

    return (
        <Container>
                <div className="flex flex-col md:flex-row">

                    <main className="md:flex-auto md:pl-10 order-1" data-aos="fade-up">
                        <div className="mb-8">
                            <h2 className="h2 mb-4 text-slate-800 dark:text-slate-200">{term.title}</h2>
                            <p className="text-slate-11">Last updated - <span className="text-purple-600"><PostDate dateString={term.updatedAt} /></span></p>
                        </div>
                        <TermsMdx code={term.body.code} />
                    </main>

                </div>
        </Container>
    )
}