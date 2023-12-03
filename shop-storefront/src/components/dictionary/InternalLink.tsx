'use client';
import {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import {Tooltip} from "@nextui-org/react";
import {CgInternal} from 'react-icons/cg';

type SleepWord = {
    title: string;
    content: string;
    url: string;
};

type SleepLinks = {
    [key: string]: SleepWord;
};

export const internalLinksData: SleepLinks = {
    lightSleep: {
        title: 'Light Sleep',
        content:
            'Light sleep is a type of sleep that is not deep and is usually considered a transitional phase. It is called light sleep because it is lighter than deep sleep, but it still has some of the same benefits as deep and REM sleep.',
        url: '/blog/light-sleep-what-is-it-and-why-is-it-important/',
    },
    deepSleep: {
        title: 'Deep Sleep',
        content:
            'Deep sleep is the most restorative stage of sleep, during which the body repairs and regrows tissues, builds bone and muscle, and strengthens the immune system.',
        url: '/blog/deep-sleep-what-is-it-and-are-you-getting-enough',
    },
    howMuchSleepDoKidsNeed: {
        title: 'How Much Sleep Do Kids Need?',
        content:
            'The amount of sleep kids need varies significantly over the course of their development. Newborns need up to 17 hours a day, while teenagers need about 9 hours on average.',
        url: '/blog/how-much-sleep-do-kids-need',
    },
    oversleeping: {
        title: 'Oversleeping',
        content:
            'Oversleeping refers to the condition where a person sleeps beyond the typical seven to nine hours a night. While occasionally sleeping in can be beneficial, chronic oversleeping may indicate an underlying health issue.',
        url: '/blog/oversleeping-is-it-bad-to-sleep-too-much',
    },
    symptomsOfSleepDeprivation: {
        title: 'Symptoms of Sleep Deprivation',
        content:
            'Symptoms of sleep deprivation can include fatigue, difficulty concentrating, mood disturbances, and decreased performance in work or school. Chronic sleep deprivation can lead to serious health problems like heart disease and diabetes.',
        url: '/blog/symptoms-of-sleep-deprivation',
    },
    stagesOfSleep: {
        title: 'The 4 Stages of Sleep',
        content:
            'The four stages of sleep include stage 1 (light sleep), stage 2 (deep sleep), stage 3 (deep sleep), and REM sleep. Each stage has unique characteristics and plays a different role in the sleep cycle.',
        url: '/blog/the-4-stages-of-sleep-how-they-affect-your-life-quality',
    },
    circadianRhythm: {
        title: 'Circadian Rhythm',
        content:
            'The circadian rhythm is a natural, internal process that regulates the sleep-wake cycle. It repeats roughly every 24 hours and can be influenced by factors such as light and temperature.',
        url: '/blog/the-circadian-rhythm-what-is-it-and-why-is-it-important-for-sleep',
    },
    remSleep: {
        title: 'REM Sleep',
        content:
            'REM sleep, or Rapid Eye Movement sleep, is a unique phase of sleep characterized by random movement of the eyes, low muscle tone, and vivid dreams. This stage is associated with learning, memory, and mood regulation.',
        url: '/blog/what-is-rem-sleep-are-you-getting-enough',
    },
    sleepEssentialsResource: {
        title: 'Sleep Essentials Resource',
        content:
            'At the heart of it all, sleep is a shared necessity - a universal part of the playbook for all animals and us humans. And don\'t be fooled, it\'s not just for survival. It is a key player in our health and well-being, just as important as a balanced diet or regular exercise. Explore the essentials of sleep in this resource.',
        url: '/resources/sleep-essentials/overview',
    },
    sleepScienceIntro: {
        title: 'Sleep Science Intro',
        content:
            'Sleep is a natural process that occurs in all animals and humans. It is essential for survival, and it has been shown to have a significant impact on our health and well-being. Sleep science is the study of sleep and its effects on the body, mind, and behavior.',
        url: '/resources/sleep-essentials/intro-to-the-science-of-sleep',
    },
    sleepNeeds: {
        title: 'Recommended Sleep',
        content:
            'Sleep is a vital part of our lives. It is essential for our health and well-being, and it can affect our mood, energy levels, and ability to concentrate. The amount of sleep we need varies from person to person, but there are some general guidelines that can faq you determine how much sleep you should be getting each night.',
        url: '/resources/sleep-essentials/sleep-needs-at-different-stages-of-life',
    },
    sleepDisorders: {
        title: 'Sleep Disorders',
        content:
            'Sleep disorders are a group of conditions that affect the ability to fall asleep or stay asleep. They can be caused by medical conditions, mental health issues, or environmental factors. Sleep disorders can have serious consequences for physical and mental health.',
        url: '/resources/sleep-essentials/sleep-disorders',
    },
    sleepDeprivation: {
        title: 'Sleep Deprivation',
        content:
            'Sleep deprivation is a condition that occurs when a person does not get enough sleep. It can be caused by many factors, including stress, anxiety, depression, and medical conditions. Sleep deprivation can have serious consequences for physical and mental health.',
        url: '/resources/sleep-essentials/impact-of-sleep-deprivation',
    },
    sleepHabits: {
        title: 'Sleep Habits',
        content:
            'Sleep habits are the behaviors and routines that people engage in before going to bed. These habits can have a significant impact on sleep quality and quantity.',
        url: '/resources/sleep-essentials/sleep-habits',
    },
    healthyLifestyle: {
        title: 'Food, Fitness, and Sleep',
        content:
            'From the break of dawn to the descending twilight, two essential aspects weave through the tapestry of our lives - diet and exercise. These pillars of daily routine, far from being trivial, have a profound impact on our sleep.',
        url: '/resources/sleep-essentials/food-fitness-and-sleep',
    },
    sleepAndTechnology: {
        title: 'Sleep & Technology',
        content:
            'Technology has become an integral part of our lives. We use it to communicate, work, and play. But what effect does technology have on our sleep? The answer is not as straightforward as you might think.',
        url: '/resources/sleep-essentials/sleep-and-technology',
    },
    medicationAndRemedies: {
        title: 'Sleep Medication and Natural Remedies',
        content:
            'Sleep is a vital part of our lives. It helps us recharge and rejuvenate, and it can have a significant impact on our health and well-being. But what happens when you can’t sleep? There are many medications and remedies available to faq you get the rest you need.',
        url: '/resources/sleep-essentials/medication-and-remedies',
    },
    sleepEssentialsKeyTakeaways: {
        title: 'Key Takeaways from Sleep Essentials',
        content:
            'Immerse yourself in the culminating review of the Sleep Essentials Resource. This article will faq you consolidate your knowledge and provide you with a quick reference for the key takeaways from the resource.',
        url: '/resources/sleep-essentials/key-takeaways-in-the-sleep-essentials-resource',
    },
    sleepScienceResource: {
        title: 'Sleep Science Resource',
        content:
            'Sleep is a natural process that occurs in all animals and humans. It is essential for survival, and it has been shown to have a significant impact on our health and well-being. Sleep science is the study of sleep and its effects on the body, mind, and behavior.',
        url: '/resources/sleep-science/overview',
    },
    neurobiologyOfSleep: {
        title: 'Neurobiology of Sleep',
        content:
            'This article sheds light on the intricate mechanisms within the brain during sleep, offering a holistic understanding of how our nervous system orchestrates our sleep patterns.',
        url: '/resources/sleep-science/neurobiology-of-sleep',
    },
    chronobiologyAndSleep: {
        title: 'Chronobiology and Sleep',
        content:
            'Chronobiology is the study of biological rhythms. These rhythms are found in all living things, from plants to animals to humans. They can be daily, weekly, monthly, or even yearly. Chronobiology has been studied for centuries, but it wasn’t until recently that scientists began to understand how these rhythms affect our health and well-being.',
        url: '/resources/sleep-science/chronobiology-and-sleep',
    },
    geneticsOfSleep: {
        title: 'Genetics of Sleep',
        content:
            'Sleep is a complex process that involves many different parts of the brain. It’s not just about getting enough sleep; it’s also about how well you sleep. Genetics play an important role in determining your sleep patterns and quality of sleep.',
        url: '/resources/sleep-science/genetics-of-sleep',
    },
    sleepAndHormones: {
        title: 'Sleep and Hormones',
        content:
            'In "Sleep and Hormones," we explore the complex relationship between hormones like melatonin, cortisol, and our sleep. This article dissects the role of hormones in sleep regulation, presenting an in-depth view of how our endocrine system interplays with sleep and wakefulness.',
        url: '/resources/sleep-science/sleep-and-hormones',
    },
    scienceOfDreaming: {
        title: 'Science of Dreaming',
        content:
            'Dreams are a fascinating phenomenon that has been studied for centuries. They have been the subject of many theories and hypotheses, but there is still much we do not know about them. This article explores what we know about dreams and how they affect our lives.',
        url: '/resources/sleep-science/science-of-dreaming',
    },
    futureOfSleepScience: {
        title: 'The Future of Sleep Science',
        content:
            'In the article, "The Future of Sleep Science," we explore the cutting-edge research and breakthroughs poised to redefine our understanding of sleep. Here, we cast a speculative eye toward the horizon of sleep science, discussing emerging trends and thrilling advancements that are just on the brink of transforming our sleep experiences.',
        url: '/resources/sleep-science/future-of-sleep-science',
    },
    sleepScienceKeyTakeaways: {
        title: 'Key Takeaways from Sleep Science',
        content:
            'Dive into the concluding review of our comprehensive Sleep Science Resource where we offer key takeaways from all the chapters so far.',
        url: '/resources/sleep-science/key-takeaways-in-the-sleep-science-resource',
    },
    sleepAthleticsResource:{
        title: 'Sleep Athletics Resource',
        content:
            'Sleep is a vital part of athletic performance. It helps athletes recover from training and competition, improves their mood, and reduces the risk of injury. But how much sleep do athletes need? And what can they do to get better quality sleep?',
        url: '/resources/sleep-athletics/overview',
    },
    sleepAthleticPerformance: {
        title: 'Sleep and Athletic Performance',
        content:
            'Sleep is a vital part of athletic performance. It helps athletes recover from training and competition, improves their mood, and reduces the risk of injury. But how much sleep do athletes need? And what can they do to get better quality sleep?',
        url: '/resources/sleep-athletics/sleep-and-athletic-performance',
    },
    circadianRhythmsAthleticPerformance: {
        title: 'Circadian Rhythms and Athletic Performance',
        content:
            'Circadian factors influence athletic performance to such a degree that, based on 40 years of win-loss data, west coast NFL teams have proven dominant when playing evening games on the east coast. Imagine harnessing this knowledge for your team.',
        url: '/resources/sleep-athletics/circadian-rhythms-and-athletic-performance',
    },
    accuracyReactionTimeSleep: {
        title: 'Accuracy, Reaction Time, and Optimal Sleep',
        content:
            'The faster your reaction time is, the more time you have to process what happens on the field - and make the right decision. But how do you improve your reaction time? And what does sleep have to do with it?',
        url: '/resources/sleep-athletics/accuracy-reaction-time-and-optimal-sleep',
    },
    accuracyReactionTimeSleepOptimization: {
        title: 'Sleep Optimization for Athletes',
        content:
            'Sleep is a vital part of athletic performance. It helps athletes recover from training and competition, improves their mood, and reduces the risk of injury. But how much sleep do athletes need? And what can they do to get better quality sleep?',
        url: '/resources/sleep-athletics/accuracy-reaction-time-and-optimal-sleep#sleep-optimization-strategies-for-athletes-to-enhance-performance-through-sleep',
    },
    sleepSpeedPowerAndEndurance: {
        title: 'Sleeps Impact on Speed, Power, and Endurance',
        content:
            'Recent studies suggest that sleep deprivation can lead to decreases in strength, speed, and endurance. Prolonged sleep loss may affect strength endurance and complex motor skills. Proper sleep could enhance athletic performance.',
        url: '/resources/sleep-athletics/sleeps-impact-on-speed-power-and-endurance',
    },
    sleepAndLearning: {
        title: 'Sleep and Skill Learning for Athletes',
        content:
            'Sleep is crucial in the learning process for athletes, it helps in the formation and reinforcement of new skills and memories. But how does sleep deprivation impact performance?',
        url: '/resources/sleep-athletics/sleep-and-skill-learning-for-athletes',
    },
    sleepAndInjuryRisk: {
        title: 'Sleep and Injury Risk Reduction and Recovery',
        content:
            'Sleep serves an absolutely vital physiological function and is arguably the single most important factor in exercise recovery. But how does sleep impact injury risk? And how can athletes optimize their sleep to reduce injury risk?',
        url: '/resources/sleep-athletics/sleep-and-injury-risk-reduction-and-recovery',
    },
    sleepAndInjuryRiskSleepQuality: {
        title: 'Sleep Optimization for Athletes',
        content:
            'Sleep is a vital part of athletic performance. It helps athletes recover from training and competition, improves their mood, and reduces the risk of injury. But how much sleep do athletes need? And what can they do to get better quality sleep?',
        url: '/resources/sleep-athletics/sleep-and-injury-risk-reduction-and-recovery#strategies-to-improve-sleep-quality',
    },
    jetLagAndTravelFatigue: {
        title: 'Managing Jet Lag and Travel Fatigue for Athletes',
        content:
            'Jet lag and travel fatigue are common problems for athletes who travel frequently. These conditions can have a negative impact on performance, recovery, and overall health. But there are ways to manage these issues so that they don’t affect your athletic performance, as much',
        url: '/resources/sleep-athletics/jet-lag-and-travel-fatigue-in-athletes',
    },






};

type SleepLibProps = {
    word: keyof SleepLinks;
    children: React.ReactNode;
};

export default function InternalLink({word, children}: SleepLibProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const data = useMemo(() => internalLinksData[word], [word]);

    const tooltip = (
        <div>
            <p className=" m-2 inline-block text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold">
                {data.title}
            </p>
            <span className="inline-block my-0">
        <CgInternal size={17}/>
      </span>
            <p className="m-2 text-xs 3xs:text-sm sm:text-md   font-normal text-slate-7">{data.content}</p>
            <Link
                href={data.url}
                className="m-2 text-xs3xs:text-sm sm:text-md text-blue-200 dark:text-blue-600 hover:text-indigo-500 dark:hover:text-indigo-500 underline"
            >
                Learn more
            </Link>
        </div>
    );

    return (
        <>
            {isClient && (
                <span className="inline-block my-0">
          <Tooltip
              content={tooltip}
              className="max-w-sm !bg-blue-12 dark:!bg-white !text-slate-2 3xs:p-2 md:p-4"
          >
            <Link href={data.url}
                  className={'text-blue-10 hover:text-indigo-500 dark:hover:text-indigo-500 no-underline'}>{children}</Link>
          </Tooltip>
        </span>
            )}
            {!isClient && <Link href={data.url}>{children}</Link>}
        </>
    );
}
