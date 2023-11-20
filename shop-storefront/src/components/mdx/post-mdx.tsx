import { useMDXComponent } from 'next-contentlayer/hooks'
import PostLink from './link'
import PostImage from './image'
import BlueHighlight from './highlight'
import SleepLib from '@/components/dictionary/SleepDictionary';
import InternalLink from '@/components/dictionary/InternalLink';
import ExternalLink from "@/components/dictionary/ExternalLink";

const mdxComponents = {
  Link: PostLink,
  Image: PostImage,
  BlueHighlight: BlueHighlight,
  SleepLib: SleepLib,
  InternalLink: InternalLink,
  ExternalLink: ExternalLink,
}

interface PostMdxProps {
  code: string
}

export function PostMdx({ code }: PostMdxProps) {
  const Component = useMDXComponent(code)

  return (
    <article className="prose prose-slate prose-h3:text-slate-12 prose-strong:text-slate-12 w-full max-w-full pt-10 prose-h2:text-3xl  text-slate-11 prose-p:text-lg prose-ul:text-lg">
      <Component components={{...mdxComponents}} />
    </article>
  );
}
