import React from 'react';

const FeatureItem = ({ text }) => {
    return (
        <div className="flex items-center my-2">
            <svg className="text-green-600 h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-base-regular">{text}</span>
        </div>
    );
};

const FeaturesList = ({ productMetadata }) => {
    // Create an array of feature descriptions from the product metadata
    const features = Object.keys(productMetadata)
        .filter(key => key.startsWith('feature_'))
        .map(key => productMetadata[key]);

    return (
        <div>
            {features.map((feature, index) => (
                <FeatureItem key={index} text={feature} />
            ))}
        </div>
    );
};

export default FeaturesList;
