import {useMDXComponent} from 'next-contentlayer/hooks';
import PostLink from './link';
import PostImage from './image';
import PostBanner from './banner';
import PostVideoModal from './video-modal';
import PostAccordion from './accordion';
import PostTag from './tag';
import TooltipMdx from './TooltipLink';
import Quote from '@/components/resources/mdx/quote';
import SleepLib from '@/components/dictionary/SleepDictionary';
import InternalLink from '@/components/dictionary/InternalLink';
import ExternalLink from "@/components/dictionary/ExternalLink";
import PostTable, {
    TableHead,
    TableBody,
    TableHeadRow,
    TableBodyRow,
    TableTh,
    TableTd,
} from './table';

const mdxComponents = {
    Link: PostLink,
    Image: PostImage,
    Banner: PostBanner,
    VideoModal: PostVideoModal,
    Accordion: PostAccordion,
    Tag: PostTag,
    Table: PostTable,
    THead: TableHead,
    TBody: TableBody,
    ThRow: TableHeadRow,
    TbRow: TableBodyRow,
    Th: TableTh,
    Td: TableTd,
    TooltipLink: TooltipMdx,
    Quote: Quote,
    SleepLib: SleepLib,
    InternalLink: InternalLink,
    ExternalLink: ExternalLink,
};

interface MdxProps {
    code: string;
}

export function Mdx({code}: MdxProps) {
    const Component = useMDXComponent(code);

    return (
        <article className="prose prose-slate text-slate-11 prose-p:text-lg prose-li:text-lg ">
            <Component components={{...mdxComponents}}/>
        </article>
    );
}
