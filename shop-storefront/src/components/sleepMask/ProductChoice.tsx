'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from "react";
import {ProductData, Feature} from '@/utils/productData';
import SecondaryButton from "@modules/common/components/button/SecondaryButton";
import {ChevronRightIcon} from "@radix-ui/react-icons";
import useProductPrice from "@lib/hooks/use-product-price";

interface ProductChoiceProps {
    product1: ProductData;
    product2: ProductData;
    currentProductTitle: string; // Title of the current product
}

const ProductChoice: React.FC<ProductChoiceProps> = ({product1, product2, currentProductTitle}) => {

    let products = [product1, product2];

    if (product2.title === currentProductTitle) {
        products = [product2, product1];
    }

    const sleepMaskOnePriceData = useProductPrice({id: product1.productId});
    const sleepMaskCustomPriceData = useProductPrice({id: product2.productId});


    const [selectedImage1, setSelectedImage1] = React.useState(product1.imageSrc);
    const [selectedImage2, setSelectedImage2] = React.useState(product2.imageSrc);

    const handleColorClick1 = (index: number) => {
        // Assuming there's a corresponding image array in product data for each color
        setSelectedImage1(product1.imageArray[index]);
    };

    const handleColorClick2 = (index: number) => {
        setSelectedImage2(product2.imageArray[index]);
    };



    const renderButton = (productTitle: string) => {
        if (productTitle === currentProductTitle) {
            return <span
                className="block font-sans text-base font-normal tracking-normal text-zinc-500 leading-[1.28577] py-2">Currently viewing</span>;
        } else {
            return (
                <Link href={`/products/${product2.handle}`}>
                    <SecondaryButton variant={"third"}
                                     className={"rounded-[1.5rem] capitalize group text-md !py-2 px-2 min-h-[1.5rem] "}>
                        Read more
                    </SecondaryButton>
                </Link>
            );
        }
    };

    const renderFeatures = (features: Feature[]) => {
        return features.map((feature, index) => (
            <div key={index} className="text-white pb-8 px-vw-4 lg:px-vw-1 justify-between flex-grow flex-col">
                {React.cloneElement(feature.icon, {className: "mx-auto mb-2"})}
                <h4 className="max-w-full font-sans text-base font-semibold mx-0 leading-[1.23536] text-slate-1 dark:text-slate-12">{feature.headline}</h4>
                {feature.description &&
                    <p className="p-0 m-0 min-w-0 max-w-full font-sans text-base font-normal text-slate-10 mx-0 !leading-6">{feature.description}</p>}
            </div>
        ));
    };

    const renderProductSection = (product: ProductData) => {
        const productPriceData = product.title === product1.title ? sleepMaskOnePriceData : sleepMaskCustomPriceData;
        const selectedImage = product.title === product1.title ? selectedImage1 : selectedImage2;
        const handleColorClick = product.title === product1.title ? handleColorClick1 : handleColorClick2;

        let linkHref;
        if (product.title === currentProductTitle) {
            linkHref = "#buy-now";
        } else {
            linkHref = `/products/${product.handle}#buy-now`;
        }

        return (
            <div className="flex flex-col justify-between max-w-full px-2 md:max-w-1/2 md:px-vw-3 ">
                <div
                    className="flex relative flex-col items-center justify-between pb-12 px-[1.0588em] z-10 h-[450px] md:h-[500px]">
                    <Link href={`${linkHref}`}>
                        <div className="flex flex-col justify-end items-center mt-0 mb-8 max-w-full -order-1">
                            <Image src={selectedImage} alt={product.title} width={300} height={300}/>
                        </div>
                    </Link>
                    {/* Colors for each product here */}
                    <div className="flex space-x-2 mb-4 ">
                        {product.colors.map((color, index) => (
                            <button
                                key={index}
                                className="w-4 h-4 rounded-full border border-gold-11 dark:border-gold-5"
                                style={{backgroundColor: color}}
                                onClick={() => handleColorClick(index)}
                            ></button>
                        ))}
                    </div>
                    {/* News */}
                    <div
                        className="flex space-x-2 mb-1 items-center justify-center h-8 rounded-full text-red-1 dark:text-red-11 bg-red-10 dark:bg-red-6 border-red-6 hover:bg-red-7 hover:bg-opacity-40 hover:text-red-1 disabled:hover:bg-red-7 disabled:hover:text-red-1 dark:bg-opacity-20 bg-opacity-20 text-xs font-semibold w-auto px-4"
                    >
                        <span>{product.news}</span>
                    </div>

                    <h3 className="header-bg-clip text-2xl font-sans hidden dark:block">{product.title}</h3>
                    <h3 className="my-4 font-bold header-bg-clip-light text-2xl font-sans dark:hidden ">{product.title}</h3>
                    <p className="mt-2 max-w-full font-sans text-base font-semibold text-zinc-500 mx-0 leading-[1.42859]">
                        {productPriceData.cheapestPrice?.calculated_price || product.price}
                    </p>
                    <div
                        className="flex flex-wrap gap-4 justify-center items-center mt-6 max-w-full min-h-[5vh] max-h-[5vh]">
                        {renderButton(product.title)}
                        <Link href={`${linkHref}`}
                              className="inline-flex min-h-[40px] items-center group mx-0 mb-0 font-sans text-base font-normal text-center ">
                            <span
                                className="leading-5 text-sky-2 dark:text-sky-11 group-hover:text-sky-9 group-hover:underline underline-offset-2">Buy now</span>
                            <ChevronRightIcon
                                className="ml-1 text-sky-2 dark:text-sky-11 group-hover:text-sky-9 group-hover:translate-x-1 transition duration-150 ease-in-out transform"/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="relative pt-12 pb-12 md:pt-32 md:pb-20 tracking-tight leading-6 text-neutral-100 "
                 style={{background: 'linear-gradient(to bottom, #191919, #1f1f1f, #1c1c1c, #1f1f1f, #191919)'}}>
            <div className="grain">
                <div className="grain-texture"></div>
            </div>
            <div
                className="leading-6 text-neutral-100 mx-auto px-0 sm:px-4  md:px-0 max-w-full md:max-w-[80vw] lg:max-w-[68vw]">
                <div className="text-left mx-auto">
                    <header className="bg-transparent content-start pb-10 text-neutral-100 md:items-baseline">
                        <div className="inline-block">
                            <h2 className="inline-block max-w-none font-sans text-4xl md:text-6xl font-semibold tracking-normal text-slate-10">Find
                                the Sleep Mask that fits you.</h2>
                        </div>
                    </header>
                </div>
                <div className="rounded-[2.5rem] bg-black shadow shadow-amberA-10 dark:shadow-amberA-12">
                    <div className="text-center">
                        <div
                            className="mx-auto max-w-[98vw] md:max-w-[80vw] lg:max-w-[65vw] xl:max-w-[55vw] 2xl:max-w-[40vw]">

                            {/* Product Sections */}
                            <div
                                className="flex flex-col md:flex-row justify-center pt-8 md:pt-24 xl:pt-24 text-neutral-100">
                                {products.map((product, index) => (
                                    <div key={product.title}
                                         className="flex flex-col space-y-6 md:space-y-0 w-full md:w-1/2">
                                        {renderProductSection(product)}
                                        <div
                                            className="w-full border-t border-solid border-zinc-700 my-4 py-6 hidden md:block"></div>
                                        <div className="md:hidden px-vw-14">
                                            {renderFeatures(product.features)}
                                            {index === 0 && <div
                                                className="w-full border-t border-solid border-zinc-700 my-4 py-6"></div>}
                                        </div>
                                    </div>
                                ))}
                            </div>


                            {/* Feature Sections for Desktop */}
                            <div className="hidden md:flex flex-row gap-6 justify-center pb-vw-10">
                                {products.map(product => (
                                    <div key={product.title + "-features"}
                                         className="flex flex-col w-1/2 px-2 justify-between">
                                        {renderFeatures(product.features)}
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </section>
    );

}
export default ProductChoice;