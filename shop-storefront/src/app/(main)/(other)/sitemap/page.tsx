import React from 'react';
import Container from '@/components/elements/Container';

interface LinkItem {
    label: string;
    url?: string;
}

interface Category {
    title: LinkItem;
    links: LinkItem[];
}


const categories: Category[] = [

    {
        title: {
            label: "Main pages",
        },
        links: [
            {label: "Home", url: "https://www.eightathletics.com"},
            {label: "Resources", url: "https://www.eightathletics.com/resources"},
            {label: "Blog", url: "https://www.eightathletics.com/blog"},
            {label: "Terms", url: "https://www.eightathletics.com/terms"},
            {label: "Contact", url: "https://www.eightathletics.com/contact"},
            {label: "About", url: "https://www.eightathletics.com/about"},
            {label: "FAQ", url: "https://www.eightathletics.com/faq"},
            {label: "Track Order", url: "https://www.eightathletics.com/track-order"},
            {label: "Store", url: "https://www.eightathletics.com/store"},
        ]
    },
    {
        title: {
            label: "Product pages",
            url: "https://www.eightathletics.com/store"

        },
        links: [
            {label: "Sleep Mask One", url: "https://www.eightathletics.com/products/sleep-mask-one"},
            {label: "Sleep Mask One Custom", url: "https://www.eightathletics.com/products/sleep-mask-one-custom"},
        ]
    },

    {
        title: {
            label: "FAQ",
            url: "https://www.eightathletics.com/faq",
        },
        links: [
            {label: "Contact Support", url: "https://www.eightathletics.com/faq/contact-support"},
            {label: "Legal", url: "https://www.eightathletics.com/faq/legal"},
            {label: "Ordering & Payments", url: "https://www.eightathletics.com/faq/ordering-payments"},
            {label: "Product Information", url: "https://www.eightathletics.com/faq/product-information"},
            {label: "Returns & Exchanges", url: "https://www.eightathletics.com/faq/returns-exchanges"},
            {label: "Shipping & Delivery", url: "https://www.eightathletics.com/faq/shipping-delivery"}
        ]
    },
    {
        title: {
            label: "Resources",
            url: "https://www.eightathletics.com/resources"
        },
        links: []
    },
    {
        title: {
            label: "Resources - Sleep Athletics",
            url: "https://www.eightathletics.com/resources/sleep-athletics/overview"
        },
        links: [
            {label: "Overview", url: "https://www.eightathletics.com/resources/sleep-athletics/overview"},
            {
                label: "Accuracy, Reaction Time, and Optimal Sleep",
                url: "https://www.eightathletics.com/resources/sleep-athletics/accuracy-reaction-time-and-optimal-sleep"
            },
            {
                label: "Circadian Rhythms and Athletic Performance",
                url: "https://www.eightathletics.com/resources/sleep-athletics/circadian-rhythms-and-athletic-performance"
            },
            {
                label: "Jet Lag and Travel Fatigue in Athletes",
                url: "https://www.eightathletics.com/resources/sleep-athletics/jet-lag-and-travel-fatigue-in-athletes"
            },
            {
                label: "Key Takeaways in the Sleep Athletics Resource",
                url: "https://www.eightathletics.com/resources/sleep-athletics/key-takeaways-in-the-sleep-athletics-resource"
            },
            {
                label: "Sleep and Athletic Performance",
                url: "https://www.eightathletics.com/resources/sleep-athletics/sleep-and-athletic-performance"
            },
            {
                label: "Sleep and Injury Risk Reduction and Recovery",
                url: "https://www.eightathletics.com/resources/sleep-athletics/sleep-and-injury-risk-reduction-and-recovery"
            },
            {
                label: "Sleep and Skill Learning for Athletes",
                url: "https://www.eightathletics.com/resources/sleep-athletics/sleep-and-skill-learning-for-athletes"
            },
            {
                label: "Sleep's Impact on Speed, Power, and Endurance",
                url: "https://www.eightathletics.com/resources/sleep-athletics/sleeps-impact-on-speed-power-and-endurance"
            }
        ]
    },
    {
        title: {
            label: "Resources - Sleep Essentials",
            url: "https://www.eightathletics.com/resources/sleep-essentials/overview"
        },
        links: [
            {label: "Overview", url: "https://www.eightathletics.com/resources/sleep-essentials/overview"},
            {
                label: "Food, Fitness, and Sleep",
                url: "https://www.eightathletics.com/resources/sleep-essentials/food-fitness-and-sleep"
            },
            {
                label: "Impact of Sleep Deprivation",
                url: "https://www.eightathletics.com/resources/sleep-essentials/impact-of-sleep-deprivation"
            },
            {
                label: "Intro to the Science of Sleep",
                url: "https://www.eightathletics.com/resources/sleep-essentials/intro-to-the-science-of-sleep"
            },
            {
                label: "Key Takeaways in the Sleep Essentials Resource",
                url: "https://www.eightathletics.com/resources/sleep-essentials/key-takeaways-in-the-sleep-essentials-resource"
            },
            {
                label: "Sleep and Technology",
                url: "https://www.eightathletics.com/resources/sleep-essentials/sleep-and-technology"
            },
            {
                label: "Sleep Disorders",
                url: "https://www.eightathletics.com/resources/sleep-essentials/sleep-disorders"
            },
            {label: "Sleep Habits", url: "https://www.eightathletics.com/resources/sleep-essentials/sleep-habits"},
            {
                label: "Sleep Medication and Natural Remedies",
                url: "https://www.eightathletics.com/resources/sleep-essentials/sleep-medication-and-natural-remedies"
            },
            {
                label: "Sleep Needs at Different Stages of Life",
                url: "https://www.eightathletics.com/resources/sleep-essentials/sleep-needs-at-different-stages-of-life"
            }
        ]
    },
    {
        title: {
            label: "Resources - Sleep Science",
            url: "https://www.eightathletics.com/resources/sleep-science/overview"
        },
        links: [
            {label: "Overview", url: "https://www.eightathletics.com/resources/sleep-science/overview"},
            {
                label: "Chronobiology and Sleep",
                url: "https://www.eightathletics.com/resources/sleep-science/chronobiology-and-sleep"
            },
            {
                label: "Future of Sleep Science",
                url: "https://www.eightathletics.com/resources/sleep-science/future-of-sleep-science"
            },
            {
                label: "Genetics of Sleep",
                url: "https://www.eightathletics.com/resources/sleep-science/genetics-of-sleep"
            },
            {
                label: "Key Takeaways in the Sleep Science Resource",
                url: "https://www.eightathletics.com/resources/sleep-science/key-takeaways-in-the-sleep-science-resource"
            },
            {
                label: "Neurobiology of Sleep",
                url: "https://www.eightathletics.com/resources/sleep-science/neurobiology-of-sleep"
            },
            {
                label: "Science of Dreaming",
                url: "https://www.eightathletics.com/resources/sleep-science/science-of-dreaming"
            },
            {
                label: "Sleep and Hormones",
                url: "https://www.eightathletics.com/resources/sleep-science/sleep-and-hormones"
            }
        ]
    },
    {
        title: {
            label: "Blog",
            url: "https://www.eightathletics.com/blog",  // URL for the 'Blog' title
        },
        links: [
            {
                label: "Deep Sleep: What is it and are you getting enough?",
                url: "https://www.eightathletics.com/blog/deep-sleep-what-is-it-and-are-you-getting-enough"
            },
            {
                label: "How Much Sleep Do Kids Need?",
                url: "https://www.eightathletics.com/blog/how-much-sleep-do-kids-need"
            },
            {
                label: "Light Sleep: What is it and why is it important?",
                url: "https://www.eightathletics.com/blog/light-sleep-what-is-it-and-why-is-it-important"
            },
            {
                label: "Oversleeping: Is it bad to sleep too much?",
                url: "https://www.eightathletics.com/blog/oversleeping-is-it-bad-to-sleep-too-much"
            },
            {
                label: "Symptoms of Sleep Deprivation",
                url: "https://www.eightathletics.com/blog/symptoms-of-sleep-deprivation"
            },
            {
                label: "The 4 Stages of Sleep: How they affect your life quality",
                url: "https://www.eightathletics.com/blog/the-4-stages-of-sleep-how-they-affect-your-life-quality"
            },
            {
                label: "The Circadian Rhythm: What is it and why is it important for sleep",
                url: "https://www.eightathletics.com/blog/the-circadian-rhythm-what-is-it-and-why-is-it-important-for-sleep"
            },
            {
                label: "What is REM Sleep? Are you getting enough?",
                url: "https://www.eightathletics.com/blog/what-is-rem-sleep-are-you-getting-enough"
            },
        ]
    },
    {
        title: {
            label: "Terms",
            url: "https://www.eightathletics.com/terms"
        },
        links: [
            {label: "Acceptable Use Policy", url: "https://www.eightathletics.com/terms/acceptable-use-policy"},
            {label: "Cookie Policy", url: "https://www.eightathletics.com/terms/cookie-policy"},
            {label: "Disclaimer", url: "https://www.eightathletics.com/terms/disclaimer"},
            {label: "Privacy Policy", url: "https://www.eightathletics.com/terms/privacy-policy"},
            {label: "Returns Policy", url: "https://www.eightathletics.com/terms/returns-policy"},
            {label: "Shipping Policy", url: "https://www.eightathletics.com/terms/shipping-policy"},
            {label: "Terms and Conditions", url: "https://www.eightathletics.com/terms/terms-and-conditions"},
        ]
    },


];

function Sitemap() {
    return (
        <Container>
            <div className="container mx-auto p-6">
                <a href={"https://www.eightathletics.com/sitemap"}>
                    <h1 className="text-4xl font-bold mb-5">Sitemap</h1>
                </a>
                {categories.map(category => (
                    <div key={category.title.label} className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">
                            <a href={category.title.url} className="text-slate-12">
                                {category.title.label}
                            </a>
                        </h2>
                        <ul>
                            {category.links.map(link => (
                                <li key={link.url} className="mb-2">
                                    <a href={link.url} className="text-blue-500 hover:underline underline-offset-2">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="mt-8">
                    <p className="text-lg font-medium">For a raw XML representation:</p>
                    <a href="https://www.eightathletics.com/sitemap.xml"
                       className="text-blue-500 hover:underline mt-2 block">
                        View our sitemap.xml
                    </a>
                </div>
            </div>
        </Container>
    );
}

export default Sitemap;
