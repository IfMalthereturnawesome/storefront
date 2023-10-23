// Inside your pages/app/index.tsx or equivalent homepage file

import { getProductByHandle } from "@lib/data";
import ProductSleepMaskOneTemplate from "@modules/products/templates/ProductSleepMaskOneTemplate";
import { NextResponse } from 'next/server';
import {notFound} from "next/navigation";
import {Metadata} from "next";


async function Home({ product }) {
    let params = { handle: "sleep-mask-one" };
    const { products } = await getProductByHandle(params.handle).catch((err) => {
        notFound()
    });

    const producta = products[0];

    return <ProductSleepMaskOneTemplate product={producta} />;
}

export const metadata: ({params}: { params: any }) => Promise<{ description: string; title: string }> = async ({ params }) => {
    let productHandle = "sleep-mask-one";
    const { products } = await getProductByHandle(productHandle);
    const product = products[0];

    return {
        title: `${product.title} | Eight Athletics Homepage`,
        description: product.description || product.title,
        openGraph: {
            title: `${product.title} | Eight Athletics Store`,
            description: `${product.title}`,
            images: product.thumbnail ? [product.thumbnail] : [],
        },

    };
}


export default Home;
