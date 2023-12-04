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

  const localImagePath = `/images/products/${params.handle}/thumbnail/thumbnail-${params.handle}.png`;

  return {
    title: `Eight Athletics Sleep Mask One: Perfect Fit & Comfort`,
    description: `Experience unmatched sleep with Sleep Mask One. Tailored for all faces, ensuring total blackout and ultimate comfort. Ideal for athletes and side sleepers`,
    openGraph: {
      title: `Eight Athletics Sleep Mask One: Perfect Fit & Comfort`,
      description: `Experience unmatched sleep with Sleep Mask One. Tailored for all faces, ensuring total blackout and ultimate comfort. Ideal for athletes and side sleepers`,
      images: [localImagePath],
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

