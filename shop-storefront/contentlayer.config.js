import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

const NameSlugPair = defineNestedType(() => ({
  name: 'NameSlugPair',
  fields: {
    name: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
    },
  },
}));

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    publishedAt: {
      type: 'date',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
    author: {
      type: 'string',
      required: true,
    },
    authorImg: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'list',
      of: {type: 'string'},
    },
    image: {
      type: 'string',
    },

  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.replace(/blog\/?/, ''),
    },
  },
}));

const Resource = defineDocumentType(() => ({
  name: 'Resource',
  filePathPattern: `resources/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
    topic: {
      type: 'nested',
      of: NameSlugPair,
      required: true,
    },
    order: {
      type: 'number',
      required: true,
    },
    prev: {
      type: 'nested',
      of: NameSlugPair,
    },
    next: {
      type: 'nested',
      of: NameSlugPair,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.replace(/resources\//, ''),
    },
  },
}));

const Help = defineDocumentType(() => ({
  name: 'Help',
  filePathPattern: `help/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    updatedAt: {
      type: 'date',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.replace(/help\/?/, ''),
    },
  },
}));

const Terms = defineDocumentType(() => ({
  name: 'Terms',
  filePathPattern: `terms/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    updatedAt: {
      type: 'date',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.replace(/terms\/?/, ''),
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Help, Resource, Terms],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{type: 'text', value: ' '}];
            }
          },
          onVisitHighlightedLine(node) {
            // Each line node by default has `class="line"`.
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            // Each word node has no className by default.
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
    ],
  },
});
