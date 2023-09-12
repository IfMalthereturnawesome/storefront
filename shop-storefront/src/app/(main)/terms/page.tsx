import type { Metadata } from 'next';
import { allTerms } from 'contentlayer/generated'; // change to your actual import path
import PostDate from '@/components/post-date';
import Link from 'next/link';
import NeoButton from "@/components/elements/NeoButton";
import Container from '@/components/elements/Container';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Terms and Policies',
        description: 'Overview of all our terms and policies',
    }
}

export default function TermsIndex() {
    return (
        <Container>
            <h1 className="text-center mb-vw-20 lg:mb-vw-10 custom-header-1">Terms and Policies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 2xs:gap-5  lg:gap-6 xl:gap-8 2xl:gap-10">
                {allTerms.map((term) => (
                    <Link href={`/terms/${term.slug}`} passHref className={"group"}>
                    <div key={term.slug}
                         className="flex flex-col h-full p-6 border-2 border-black dark:border-slate-1 dark:border-[1px] bg-slate-1 dark:bg-cyan-2 rounded-[0.3rem] hover:border-cyan-12 dark:hover:border-slate-5 hover:bg-bronze-1 dark:hover:bg-cyan-1 transition-all duration-300 transform shadow hover:drop-shadow-xl">
                        <div className="flex-grow">
                            <h3 className="text-2xl font-semibold mb-2 text-slate-12">
                                <Link href={`/terms/${term.slug}`}>{term.title}</Link>
                            </h3>
                            <p className="text-slate-10 text-sm">Last updated -
                                <span className="text-slate-10 text-sm"><PostDate dateString={term.updatedAt}/></span></p>
                            <p className="text-slate-11 mt-4 mb-2">{term.summary}</p>
                        </div>
                        <div className="mt-auto">
                            <NeoButton href={`/terms/${term.slug}`} className="">
                                Read it here &rarr;
                            </NeoButton>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </Container>
    )
}
