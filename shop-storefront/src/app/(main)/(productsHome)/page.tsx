import { getProductByHandle } from "@lib/data";
import ProductSleepMaskOneTemplate from "@modules/products/templates/ProductSleepMaskOneTemplate";


async function Home({ product }) {
    let params = { handle: "sleep-mask-one" };
    let products;
    try {
        const result = await getProductByHandle(params.handle);
        products = result.products;
    } catch (err) {
        return { notFound: true };
    }


    const producta = products[0];

    return <ProductSleepMaskOneTemplate product={producta} />
}

 const metadata: ({params}: { params: any }) => Promise<{ description: string; title: string }> = async ({ params }) => {
    let productHandle = "sleep-mask-one";
    const { products } = await getProductByHandle(productHandle);
    const product = products[0];

    return {
        title: `Eight Athletics | Enhance Recovery & Performance for Athletes through Sleep`,
        description:`${product.description} | Experience better sleep and performance with Eight Athletics' sleep mask. Tailored for athletes to boost recovery and success - achieve your dreams nightly.`,
        openGraph: {
            title: `${product.title} | Eight Athletics Homepage`,
            description: `${product.title} | Experience better sleep and performance with Eight Athletics' sleep mask. Tailored for athletes to boost recovery and success - achieve your dreams nightly.`,
            images: product.thumbnail ? [product.thumbnail] : [],
        },

    };
}

export default Home;

