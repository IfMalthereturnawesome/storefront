import {allPosts, allHelp, allResources, allTerms} from 'contentlayer/generated';

const URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'https://www.eightathletics.com';

export default async function sitemap(){
   const posts = allPosts.map((post) => {
      return {
         url: `${URL}/blog/${post.slug}`,
         lastModified: post.publishedAt,
         changeFrequency: 'weekly',
         priority: 0.8,
      };
   });

   const helps = allHelp.map((help) => {
      return {
         url: `${URL}/help/${help.slug}`,
         lastModified: help.updatedAt,
         changeFrequency: 'monthly',
         priority: 0.5,
      };
   });

   const resources = allResources.map((resource) => {
      return {
         url: `${URL}/resources/${resource.slug}`,
         // Assume you'll use the current date if there's no specific last modified date
         lastModified: new Date().toISOString(),
         changeFrequency: 'monthly',
         priority: 0.9,
      };
   });

   const terms = allTerms.map((term) => {
      return {
         url: `${URL}/terms/${term.slug}`,
         lastModified: term.updatedAt,
         changeFrequency: 'monthly',
         priority: 0.3,
      };
   });

   const routes = ['/resources', '/blog','/terms', '/contact',
      '/about', '/faq', '/track-order'].map(route => {
      return {
         url: `${URL}${route}`,
         lastModified: new Date().toISOString(),
         changeFrequency: 'weekly',
         priority: 0.7,
      };
   });

   const productRoutes = ['','/store',
      '/products/sleep-mask-one', '/products/sleep-mask-one-custom'].map(route => {
      return {
         url: `${URL}${route}`,
         lastModified: new Date().toISOString(),
         changeFrequency: 'weekly',
         priority: 1,
      };
   })

   return [...posts, ...helps, ...resources, ...terms, ...routes, ...productRoutes];


}