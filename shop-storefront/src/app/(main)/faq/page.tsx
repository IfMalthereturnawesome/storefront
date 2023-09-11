
import React from 'react'
import {allHelp} from 'contentlayer/generated'
import PostDate from '@/components/post-date'
import Link from 'next/link'
import NeoButton from "@/components/elements/NeoButton";


export const metadata = {
    title: 'Contact us - Open PRO',
    description: 'Page description',
}

const FAQPage: React.FC = () => {
    return (
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 ">
            <h1 className="text-center mb-16 custom-header-1">Frequently Asked Questions</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {allHelp.map((faq) => (
                    <div key={faq.slug}
                         className="mb-8 p-6 border-2 border-black dark:border-slate-1 dark:border-[1px] bg-slate-1 dark:bg-cyan-2 rounded-[0.3rem] hover:border-cyan-12  dark:hover:border-slate-5 hover:bg-bronze-1 dark:hover:bg-cyan-1 transition-all duration-300 transform shadow hover:drop-shadow-xl">
                        <h3 className="text-2xl font-semibold mb-2 text-slate-12 ">
                            <Link href={`/faq/${faq.slug}`}>{faq.title}</Link>
                        </h3>
                        <p className="text-slate-10 text-sm ">Last updated -
                            <span className="text-slate-10 text-sm"> <PostDate dateString={faq.updatedAt}/></span></p>
                        <p className="text-slate-11 mt-4 mb-2">{faq.summary}</p>

                        <NeoButton href={`/faq/${faq.slug}`} className="mt-4 text-slate-12 bg-transparent border-2 border-black dark:border-white hover:bg-black">
                            Read it here &rarr;
                        </NeoButton>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQPage
