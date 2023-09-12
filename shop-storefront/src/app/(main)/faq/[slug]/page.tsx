import type { Metadata } from 'next'
import { allHelp } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import PostDate from '@/components/post-date'
import Sidebar from './help-sidebar'
import { HelpMdx } from '@/components/mdx/help-mdx'
import Container from "@/components/elements/Container"

export async function generateStaticParams() {
  return allHelp.map((help) => ({
    slug: help.slug,
  }))
}

export async function generateMetadata({ params }: {
  params: { slug: string }
}): Promise<Metadata | undefined> {

  const help = allHelp.find((help) => help.slug === params.slug)

  if (!help) return

  const { title, summary: description } = help

  return {
    title,
    description,
  }
}

export default async function SingleHelp({ params }: {
  params: { slug: string }
}) {

  const help = allHelp.find((help) => help.slug === params.slug)
  
  if (!help) notFound()

  return (
   <Container>
        <div className="flex flex-col md:flex-row">

          <main className="md:flex-auto md:pl-10 order-1" data-aos="fade-up">
            <div className="mb-8">
              <h2 className="h2 mb-4 text-slate-800 dark:text-slate-200">{help.title}</h2>
              <p className="text-slate-11 text-sm italic">Last updated - <span className="italic text-sm"><PostDate dateString={help.updatedAt} /></span></p>
            </div>            
            <HelpMdx code={help.body.code} />
          </main>

          {/* Nav sidebar */}
          <Sidebar />         

        </div>
   </Container>
  )
}