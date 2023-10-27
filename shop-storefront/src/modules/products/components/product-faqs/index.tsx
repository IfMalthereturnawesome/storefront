import React from 'react';
import PostAccordion from '@/components/resources/mdx/accordion';
import Link from 'next/link';

interface ProductFAQProps {
    productFAQ: { question: string; answer: string }[];
    shippingFAQ: { question: string; answer: string }[];
    returnFAQ: { question: string; answer: string }[];
}

const ProductFAQ: React.FC<ProductFAQProps> = ({productFAQ, shippingFAQ, returnFAQ}) => {
    return (
        <div className="mx-auto px-vw-8 py-vw-10  bg-gradient-to-r from-cyan-2 to-cyan-1 dark:from-cyan-3 dark:to-cyan-1  z-0">

            <div className="md:flex justify-center items-center text-center mb-4 mt-4 md:mt-6 md:mb-8">
                <h3 className="text-4xl font-semibold z-10 mr-4">Questions?</h3>
                <h3 className="text-5xl font-semibold header-bg-clip !leading-[2] transform rotate-[-10deg]">We got you.</h3>
            </div>


            <div className="md:flex md:flex-wrap">
                <div className="md:w-1/3 p-2 mb-5 md:mb-0">
                    <div className="mb-4 ml-3 md:ml-0 px-vw-3 text-xl font-medium">Returns</div>
                    {returnFAQ.map((item, index) => (
                        <PostAccordion key={index} title={item.question}>
                            {item.answer}
                        </PostAccordion>
                    ))}
                </div>

                <div className="md:w-1/3 p-2 mb-5 md:mb-0">
                    <div className="mb-4 ml-3 md:ml-0 px-vw-3 text-xl font-medium">Shipping </div>
                    {shippingFAQ.map((item, index) => (
                        <PostAccordion key={index} title={item.question}>
                            {item.answer}
                        </PostAccordion>
                    ))}
                </div>
                <div className="md:w-1/3 p-2 mb-5 md:mb-0">
                    <div className="mb-4 ml-3 md:ml-0 px-vw-3 text-xl font-medium">Product </div>
                    {productFAQ.map((item, index) => (
                        <PostAccordion key={index} title={item.question}>
                            {item.answer}
                        </PostAccordion>
                    ))}
                </div>
            </div>
            <div className="mt-8 md:mb-2 text-center">
                <Link href="/faq" className="text-sm font-medium underline">
                    Have more questions? Check our FAQ page.
                </Link>
            </div>

        </div>
    );
};

export default ProductFAQ;
