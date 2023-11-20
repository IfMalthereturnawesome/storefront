import { useMDXComponent } from 'next-contentlayer/hooks'
import PostAccordion from "@/components/resources/mdx/accordion";



const mdxComponents = {
    Accordion: PostAccordion,

}

interface TermsMdxProps {
    code: string
}

export function TermsMdx({ code }: TermsMdxProps) {
    const Component = useMDXComponent(code)

    return (
        <article className="prose prose-slate  prose-strong:text-slate-12 max-w-full text-slate-11 prose-p:text-lg prose-li:text-lg">
            <Component components={{ ...mdxComponents }} />
        </article>
    )
}
