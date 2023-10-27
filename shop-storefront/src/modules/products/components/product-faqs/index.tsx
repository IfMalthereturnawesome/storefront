import React from 'react';
import PostAccordion from '@/components/resources/mdx/accordion';

interface ProductFAQProps {
    productFAQ: { question: string; answer: string }[];
    shippingFAQ: { question: string; answer: string }[];
}

const ProductFAQ: React.FC<ProductFAQProps> = ({ productFAQ, shippingFAQ }) => {
    return (
        <div className="mx-auto px-vw-8 pt-vw-8">
            <div className="mb-4 px-vw-2 text-3xl font-semibold">Product FAQs</div>
            <div className="md:flex md:flex-wrap">
                {productFAQ.map((item, index) => (
                    <div key={index} className="md:w-1/2 p-2">
                        <PostAccordion title={item.question} active={index === 0}>
                            {item.answer}
                        </PostAccordion>
                    </div>
                ))}
            </div>
            <div className="mt-8 px-vw-2 mb-4 text-3xl font-semibold">Shipping FAQs</div>
            <div className="md:flex md:flex-wrap">
                {shippingFAQ.map((item, index) => (
                    <div key={index} className="md:w-1/2 p-2">
                        <PostAccordion title={item.question} active={index === 0}>
                            {item.answer}
                        </PostAccordion>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductFAQ;
