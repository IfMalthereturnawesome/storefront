import React from "react";

export type Feature = {
    icon: JSX.Element;
    headline: string;
    description?: string;
};

export type ProductData = {
    title: string;
    productId: string;
    price?: string;
    news?: string;
    imageSrc: string;
    imageArray?: string[];
    features: Feature[];
    colors: string[];
};


import DandelionIcon from '@modules/common/icons/dandelion-icon';
import CustomFitIcon from "@modules/common/icons/custom-fit-icon";
import UniversalFitIcon from "@modules/common/icons/universal-fit-icon";
import TotalDarknessIcon from "@modules/common/icons/total-darkness-icon";


export const SleepMaskOneData: ProductData = {
    title: "Sleep Mask One",
    productId: "prod_01HAJJPFSZ3YCV83DF5WBR52B1",  // New field for the product ID
    imageSrc: "/images/sequence/sleepmask_144.png",
    imageArray: [
        "/images/sequence/sleepmask_141.png",
        "/images/sequence/sleepmask_142.png",
        "/images/sequence/sleepmask_143.png"
    ],
    news: "New",
    colors: ["#422020", "#090606", "#1a1919"],
    features: [
        {
            icon: <DandelionIcon size={32}/>,
            headline: "Weightless Comfort",

        },
        {
            icon: <UniversalFitIcon size={32}/>,
            headline: "Universal Fit",
            description: "Data from thousands for universal comfort"
        },
        {
            icon: < TotalDarknessIcon size={32}/>,
            headline: "Total Darkness",
            description: "Ensures undisturbed sleep even in the brightest environments",

        },

    ]
};

export const SleepMaskCustomData: ProductData = {
    title: "Sleep Mask One Custom",
    productId: 'prod_01HAJJPFSZ3YCV83DF5WBR52B1',
    imageSrc: "/images/sequence/sleepmask_144.png",
    imageArray: [
        "/images/sequence/sleepmask_141.png",
        "/images/sequence/sleepmask_142.png",
        "/images/sequence/sleepmask_143.png"
    ],
    news: "Coming soon",
    colors: ["#002536", "#1a1919", "#881212"],
    features: [
        {
            icon: <DandelionIcon size={32}/>,
            headline: "Supreme Comfort",

        },
        {
            icon: <CustomFitIcon size={32}/>,
            headline: "Custom Fit",
            description: "A fit that's as unique as you"
        },
        {
            icon: < TotalDarknessIcon size={32}/>,
            headline: "Absolute Darkness",
            description: "Experience true darkness, regardless of your surroundings",

        },

    ]
};
