import { useMDXComponent } from 'next-contentlayer/hooks'
import PostAccordion from "@/components/resources/mdx/accordion";

const mdxComponents = {
  Accordion: PostAccordion,
}

interface HelpMdxProps {
  code: string
}

export function HelpMdx({ code }: HelpMdxProps) {
  const Component = useMDXComponent(code)

  return (
    <article className="prose prose-slate text-slate-11 prose-p:text-lg prose-li:text-lg">
      <Component components={{ ...mdxComponents }} />
    </article>
  )
}
