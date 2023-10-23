import {
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    LifebuoyIcon,
    ChatBubbleLeftRightIcon,
    ChatBubbleBottomCenterIcon,
    ArrowPathRoundedSquareIcon,
    ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

import SleepResources from '../../public/images/eight-athletics-sleep-resources.svg';
import SleepEssentialsSVG from '../../public/images/eight-athletics-sleep-essentials_resource.svg';
import SleepScienceSVG from '../../public/images/eight-athletics-sleep-science_resource.svg';
import SleepAthleticsSVG from '../../public/images/eight-athletics-sleep-athletics_resource.svg';

import {QuestionMarkIcon, HomeIcon} from "@radix-ui/react-icons";
import {PhoneIcon, PlayCircleIcon} from '@heroicons/react/20/solid';
import {allPosts} from "contentlayer/generated";
import Image from "next/image";
import React from "react";
import TotalDarknessIcon from "@modules/common/icons/total-darkness-icon";
import UniversalFitIcon from "@modules/common/icons/universal-fit-icon";
import DandelionIcon from "@modules/common/icons/dandelion-icon";
import EightAthleticsIcon from "@modules/common/icons/eightAthleticsIcon";


// Create React components for SVGs
const SleepEssentialsIcon = () => <Image src={SleepEssentialsSVG} width={28} height={28}
                                         className="my-0 mr-3 shrink-0"
                                         alt={"Eight Athletics' Sleep Essentials Resource"}/>
const SleepScienceIcon = () => <Image src={SleepScienceSVG} width={28} height={28} className="my-0 mr-3 shrink-0"
                                      alt={"Eight Athletics' Sleep Science Resource"}/>
const SleepAthleticsIcon = () => <Image src={SleepAthleticsSVG} width={28} height={28} className="my-0 mr-3 shrink-0"
                                        alt={"Eight Athletics' Sleep Athletics Resource"}/>
const SleepResourcesIcon = () => <Image src={SleepResources} width={28} height={26} className="my-0 mr-3 shrink-0"
                                        alt={"Eight Athletics' Sleep Resources"}/>


const posts = allPosts;
// Get 3 newest posts filter by publishedDate
export const newestPosts = posts?.sort((a, b) => {

    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}).slice(0, 3);


export const products = [
    {
        name: 'Achieve your dreams, one night at a time',
        description: 'Wake up looking and feeling refreshed.',
        href: '/products/sleep-mask-one',
        icon: EightAthleticsIcon,
    },
    {
        name: 'Crafted from thousands of unique faces',
        description: 'Tailored for all face shapes and sizes.',
        href: '/products/sleep-mask-one#crafted-from-thousands-of-unique-faces',
        icon: UniversalFitIcon,
    },
    {
        name: 'Increase Melatonin Production',
        description: 'Sleep Mask One is the ultimate training partner.',
        href: '/products/sleep-mask-one#increase-melatonin-production',
        icon: ArrowPathRoundedSquareIcon,
    },

    {
        name: 'Discover Maximum Comfort ',
        description: 'Experience unparalleled comfort and fit.',
        href: '/products/sleep-mask-one#discover-maximum-comfort',
        icon: DandelionIcon,
    },
    {
        name: 'Total blackout',
        description: 'Ensures undisturbed sleep even in the brightest environments.',
        href: '/products/sleep-mask-one#total-blackout',
        icon: TotalDarknessIcon,
    },

];

export const callsToAction = [
    {name: 'Buy now', href: '#', icon: PlayCircleIcon},
    {name: 'Contact sales', href: '/contact', icon: PhoneIcon},
];

interface Resource {
    name: string;
    description: string;
    href: string;
    icon: React.ComponentType<{className: string, 'aria-hidden': string}>; // or just React.ComponentType if you don't want to specify the props
}

export const resources: Resource[] = [
    {
        name: 'Eight Athletics - Sleep Resources',
        description:
            'A collection of guides to get the most out of your sleep.',
        href: '/resources',
        icon: SleepResourcesIcon,
    },
    {
        name: 'Sleep Essentials',
        description:
            'Learn the basics of sleep and how to get the most out of your sleep.',
        href: '/resources/sleep-essentials/overview',
        icon: SleepEssentialsIcon,
    },
    {
        name: 'Sleep Science',
        description:
            'Learn the science behind sleep and how it can improve your life.',
        href: '/resources/sleep-science/overview',
        icon: SleepScienceIcon,
    },
    {
        name: 'Sleep Athletics',
        description: 'Learn how to improve your sleep for athletic performance.',
        href: '/resources/sleep-athletics/overview',
        icon: SleepAthleticsIcon,
    },
];

export const blog = [
    {
        name: 'Blog',
        description: 'Learn more about sleep and how to improve your life.',
        href: '/blog',
        icon: LifebuoyIcon,
    },
];

export const recentPosts = [
    {id: 1, name: 'Boost your conversion rate', href: '#', date: 'May 16, 2023'},
    {
        id: 2,
        name: 'How to use search engine optimization to drive traffic to your site',
        href: '#',
        date: 'Apr 10, 2023',
    },
    {
        id: 3,
        name: 'Improve your customer experience',
        href: '#',
        date: 'Apr 12, 2023',
    },
];
export const supportItems = [
    {
        name: 'Need Support?',
        description:
            'Need help with your order or have a question? See our FAQ or contact us.',
        href: '/contact',
        icon: ChatBubbleLeftRightIcon,
    },
    {
        name: 'FAQ',
        description:
            'Get all of your questions answered in our FAQ page or contact support.',
        href: '/faq',
        icon: QuestionMarkIcon,
    },
    {
        name: 'About Us',
        description:
            'Eight Athletics is a sleep technology company based in Copenhagen, Denmark',
        href: '/about',
        icon: HomeIcon,
    },
    {
        name: 'Contact Us',
        description: 'Contact us for any questions or concerns you may have',
        href: '/contact',
        icon: ChatBubbleBottomCenterIcon,
    },

    {
        name: 'Returns & Exchanges',
        description: 'See how to return or exchange your Eight Athletics products',
        href: '/terms/returns-policy',
        icon: ArrowPathRoundedSquareIcon,
    },
];

export const supportCTA = [
    {name: 'Privacy & Terms', href: '/terms', icon: ClipboardDocumentListIcon},
    {name: 'Contact sales', href: '/contact', icon: PhoneIcon},
];

export const b2b = [
    {
        name: 'B2B Solutions',
        description: 'Learn more about Eight Athletics for business',
        href: '/business',
        icon: LifebuoyIcon,
    },
    {
        name: 'Corporate Sleep Solutions',
        description: 'Learn more about Eight Athletics for business',
        href: '/business',
        icon: LifebuoyIcon,
    },
    {
        name: 'Sports Teams',
        description: 'Learn more about Eight Athletics for business',
        href: '/business',
        icon: LifebuoyIcon,
    },
    {
        name: 'Custom Solutions',
        description: 'Learn more about Eight Athletics for business',
        href: '/business',
        icon: LifebuoyIcon,
    },
    {
        name: 'Case Studies',
        description: 'Learn more about Eight Athletics for business',
        href: '/business',
        icon: LifebuoyIcon,
    },
];