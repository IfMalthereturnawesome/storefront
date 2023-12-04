import {getProductByHandle} from "@lib/data";
import ProductSleepMaskOneTemplate from "@modules/products/templates/ProductSleepMaskOneTemplate";
import type {Metadata} from 'next'

async function Home({product}) {
    let params = {handle: "sleep-mask-one"};
    let products;
    try {
        const result = await getProductByHandle(params.handle);
        products = result.products;
    } catch (err) {
        return {notFound: true};
    }


    const producta = products[0];

    return <ProductSleepMaskOneTemplate product={producta}/>
}

export const metadata: Metadata = {
    title: `Eight Athletics | Enhance Recovery & Performance for Athletes through Sleep`,
    description: `Experience better sleep and performance with Eight Athletics' sleep mask. Tailored for athletes to boost recovery and success - achieve your dreams one night at a time.`,
    openGraph: {
        title: `Eight Athletics | Enhance Recovery & Performance for Athletes through Sleep`,
        description: `Experience better sleep and performance with Eight Athletics' sleep mask. Tailored for athletes to boost recovery and success - achieve your dreams one night at a time.`,
        type: 'website',
        images: 'https://www.eightathletics.com/images/Eight-Athletics-black-logo.svg',
    },
};

export default Home;

