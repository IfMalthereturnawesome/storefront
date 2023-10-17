import { getProductByHandle } from "@lib/data"
import ProductSleepMaskOneTemplate from "@modules/products/templates/ProductSleepMaskOneTemplate"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductSleepMaskOneCustomTemplate from "@modules/products/templates/ProductSleepMaskOneCustomTemplate";
import ProductTemplate from "@modules/products/templates";

type Props = {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getProductByHandle(params.handle)

  const product = data.products[0]

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Eight Athletics Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Eight Athletics Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function CollectionPage({ params }: Props) {
  const { products } = await getProductByHandle(params.handle).catch((err) => {
    notFound()
  });

  const product = products[0];

  // Decide which template to use based on handle
  if (params.handle === "sleep-mask-one") {
    return <ProductSleepMaskOneTemplate product={product} />;
  } else if (params.handle === "sleep-mask-one-custom") {
    return <ProductSleepMaskOneCustomTemplate product={product} />;
  } else {
    return <ProductTemplate product={product} />; // Default
  }
}

