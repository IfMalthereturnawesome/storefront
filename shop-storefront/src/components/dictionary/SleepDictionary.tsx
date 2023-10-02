'use client';
import {useEffect, useMemo, useState} from 'react';
import {SlBookOpen} from 'react-icons/sl';
import * as HoverCard from '@radix-ui/react-hover-card';
import {Tooltip} from 'flowbite-react';

type SleepWord = {
    title: string;
    content: string;
};

type SleepDictionary = {
    [key: string]: SleepWord;
};

export const sleepDictionary: SleepDictionary = {
    actigraphy: {
        title: 'Actigraphy',
        content:
            'Actigraphy involves monitoring bodily movements over a period of time, using tools such as wearable gadgets. This method can determine the duration spent on various activities, including slumber.',
    },
    acute: {
        title: 'Acute',
        content:
            'Acute denotes conditions that are intense, sudden, or of brief duration. In the realm of sleep issues, acute distinguishes transient conditions from chronic ones.',
    },
    adenosine: {
        title: 'Adenosine',
        content:
            "Adenosine is a chemical that accumulates in your body while you're awake and causes drowsiness. It gradually breaks down while you sleep.",
    },
    arousal: {
        title: 'Arousal',
        content:
            'Arousal represents a swift transition from deep sleep or sleep towards wakefulness. Sleep studies can identify arousals through shifts in heart rhythm, respiration, or muscular movements.',
    },
    artificialLight: {
        title: 'Artificial Light',
        content:
            'Artificial light is illumination derived from sources other than the sun.',
    },
    aromatherapy: {
        title: 'Aromatherapy',
        content:
            'Aromatherapy involves using particular aromas to impact physical or mental well-being. Regarding sleep, it usually involves spreading scents aimed at promoting evening relaxation or daytime alertness.',
    },
    atonia: {
        title: 'Atonia',
        content:
            'Atonia refers to the momentary paralysis of the majority of body muscles. It happens during the rapid eye movement (REM) sleep phase, restricting muscular activity, barring the muscles controlling respiration, heartbeat, and eye movements.',
    },
    awakenings: {
        title: 'Awakenings',
        content:
            'Awakenings signify the process of emerging from any sleep stage. Sleep studies may identify awakenings through shifts in the activity of the heart, lungs, brain, and muscles.',
    },
    badDream: {
        title: 'Bad Dream',
        content:
            'A bad dream involves distressing or unpleasant content during the dreaming phase, but it does not awaken the individual.',
    },
    bpapDevice: {
        title: 'BPAP Device',
        content:
            'A BPAP (Bilevel Positive Airway Pressure) device is a machine that maintains an open airway by delivering pressurized air through the mouth or nose, thus preventing breathing interruptions. This device, which delivers different air pressure levels for inhaling and exhaling, is commonly employed in the treatment of obstructive sleep apnea.',
    },
    biologicalClock: {
        title: 'Biological Clock',
        content:
            'The "biological clock" is a broad term that refers to the internal mechanisms in organisms that control various physiological functions and behaviors in a regular, cyclic manner. These clocks are present in nearly all living organisms, from bacteria to plants to humans, and they regulate a wide range of functions, including sleep-wake cycles, feeding behavior, hormone production, and cell regeneration.',
    },

    biphasicSleep: {
        title: 'Biphasic Sleep',
        content:
            'Biphasic sleep is a pattern where total daily sleep is divided into two parts. It typically comprises a night-time sleep period and a daytime nap.',
    },
    blueLight: {
        title: 'Blue Light',
        content:
            'Blue light refers to a category of light with a specific wavelength, part of the visible light spectrum. It is frequently emitted by many LEDs and digital devices, and it potentially influences the circadian rhythm more than other light wavelengths.',
    },

    cataplexy: {
        title: 'Cataplexy',
        content:
            'Cataplexy is a sudden loss of muscle tone that can cause a person to collapse. It is often triggered by strong emotions, such as laughter, surprise, or anger. Cataplexy is a symptom of narcolepsy, a sleep disorder that causes excessive daytime sleepiness and sudden sleep attacks.',
    },
    chronic: {
        title: 'Chronic',
        content:
            'Chronic refers to conditions or problems that persist over a long period or recur frequently. In the context of sleep issues or disorders, "chronic" differentiates them from acute or short-term conditions.',
    },
    circadianAlertingSystem: {
        title: 'Circadian Alerting System',
        content:
            'The circadian alerting system involves signals originating from the brain that stimulate wakefulness and alertness, aiding in the regulation of sleep and wake cycles.',
    },
    circadianPacemaker: {
        title: 'Circadian Pacemaker',
        content:
            'The circadian pacemaker is a region in the brain known as the suprachiasmatic nucleus (SCN) that governs the circadian rhythm by sending out regulating signals to various body systems. The functioning of the circadian pacemaker is greatly influenced by light exposure.',
    },
    circadianRhythm: {
        title: 'Circadian Rhythm',
        content:
            'Circadian rhythm is the body’s internal clock that operates roughly on a 24-hour cycle. This clock assists in synchronizing a variety of physiological and cognitive functions, including sleep.',
    },
    chronobiology: {
        title: 'Chronobiology',
        content:
            'Chronobiology is the field of study focused on natural biological rhythms in living organisms. In the realm of sleep science, it predominantly centers on understanding the circadian rhythm.',
    },
    chronotype: {
        title: 'Chronotype',
        content:
            'Chronotype refers to an individual’s pattern of sleep and wake activities that mirrors their circadian rhythm. Examples of chronotypes include "larks" or early risers, and "night owls", those who are most active at night.',
    },
    cbtForInsomnia: {
        title: 'CBT for Insomnia',
        content:
            'CBT for Insomnia, or Cognitive-Behavioral Therapy for Insomnia, is a form of counseling tailored to address insomnia. The aim is to reframe negative thought patterns related to sleep while fostering healthy sleep practices.',
    },
    cognitiveImpairment: {
        title: 'Cognitive Impairment',
        content:
            'Cognitive impairment is a condition marked by challenges with mental functions like thinking, attention, response time, memory, learning, and judgement.',
    },
    cpapDevice: {
        title: 'CPAP Device',
        content:
            'A CPAP (Continuous Positive Airway Pressure) device is a machine that supplies a constant stream of pressurized air via the mouth or nose to keep the airway clear and reduce abnormal breathing. This device, which maintains a consistent pressure level during both inhaling and exhaling, is a standard treatment for obstructive sleep apnea.',
    },
    daytimeImpairment: {
        title: 'Daytime Impairment',
        content:
            'Daytime impairment refers to adverse consequences stemming from sleep issues that are evident during awake periods. Such impacts could be cognitive shortfalls, physical issues, or disturbances in emotional state or mood.',
    },
    deepSleep: {
        title: 'Deep Sleep',
        content:
            'Deep sleep, also known as stage 3, N3, delta sleep, or slow-wave sleep, is the final phase of non-rapid eye movement (NREM) sleep. In this phase, breathing and heart rates reach their lowest points, brain activity slows, but showcases occasional bursts of particular brain waves called delta waves.',
    },
    deltaSleep: {
        title: 'Delta Sleep',
        content:
            'Delta sleep is a phase of sleep characterized by large amplitude brain waves referred to as delta waves. This phase coincides with the last stage of NREM sleep, also denoted as stage 3, N3, deep sleep, or slow-wave sleep.',
    },
    diurnal: {
        title: 'Diurnal',
        content:
            'Diurnal refers to activities that predominantly occur during daylight hours.',
    },
    dream: {
        title: 'Dream',
        content:
            'A dream refers to the thoughts or mental images that we experience while asleep. Though dreams can occur during any sleep stage, they tend to be most frequent and vivid during REM sleep. The content of dreams can range from pleasant to distressing to bewildering, and its believed that we dont recall most of them.',
    },
    dreamRecall: {
        title: 'Dream Recall',
        content:
            'Dream recall pertains to the capacity to recall the contents of a dream after waking.',
    },
    electroencephalograph: {
        title: 'Electroencephalograph (EEG)',
        content:
            'An electroencephalograph, or EEG, is a diagnostic procedure that employs sensors placed on the scalp to record brain activity. Different brain wave patterns on the EEG faq in recognizing various sleep stages. An EEG is typically included in a comprehensive sleep test known as a polysomnogram.',
    },
    entrainment: {
        title: 'Entrainment',
        content:
            'Within the sphere of sleep, entrainment refers to the alignment of an individual’s circadian rhythm with the natural cycle of light and darkness. The responsiveness of the circadian pacemaker to light plays a crucial role in this alignment process.',
    },
    excessiveDaytimeSleepiness: {
        title: 'Excessive Daytime Sleepiness (EDS)',
        content:
            'Excessive Daytime Sleepiness, abbreviated as EDS, describes a state of persistent drowsiness or challenges maintaining alertness and wakefulness during the day.',
    },
    fatigue: {
        title: 'Fatigue',
        content:
            'Fatigue is a state of depleted mental or physical energy. It often co-occurs with symptoms like excessive daytime sleepiness, cognitive impairment, and other indications of sleep disturbances.',
    },
    galanin: {
        title: 'Galanin',
        content:
            'Galanin is a neuropeptide that has been implicated in various physiological functions, including sleep regulation. It is involved in the modulation of sleep-wake cycles, and its release in certain areas of the brain is associated with increased sleepiness and promotion of sleep. Galanin is believed to play a role in the homeostatic regulation of sleep and may contribute to the regulation of sleep intensity and duration.',
    },
    homeostaticSleepDrive: {
        title: 'Homeostatic Sleep Drive',
        content:
            'Homeostatic sleep drive represents the body’s internal system regulating sleepiness. The urge to sleep is minimal soon after awakening but gradually increases as the individual remains awake for an extended period.',
    },
    hormones: {
        title: 'Hormones',
        content:
            'Hormones are the bodys chemical signals that are transported through blood vessels to regulate numerous bodily functions. The hormone production and control system is referred to as the endocrine system.',
    },
    hyperarousal: {
        title: 'Hyperarousal',
        content:
            'Hyperarousal signifies a heightened state of stress, anxiety, or being excessively "alert". It is often linked to insomnia and difficulties in initiating or maintaining sleep.',
    },
    hypersomnolence: {
        title: 'Hypersomnolence',
        content:
            'Hypersomnolence is the condition of extreme sleepiness during periods when an individual would typically be awake. It is also commonly termed as excessive daytime sleepiness or hypersomnia.',
    },
    hypersomnia: {
        title: 'Hypersomnia',
        content:
            'Hypersomnia, a sleep disorder, is characterized by intense sleepiness during periods when a person is expected to be awake. Hypersomnia is also known as hypersomnolence or excessive daytime sleepiness.',
    },
    hypnagogic: {
        title: 'Hypnagogic',
        content:
            'Hypnagogic refers to the transitional period surrounding the onset of sleep.',
    },
    hypnogram: {
        title: 'Hypnogram',
        content:
            'A hypnogram is a graphical representation of sleep patterns during a single sleep period. Typically produced during a sleep study, or polysomnogram, it illustrates the duration spent in each sleep stage and the frequency of awakenings.',
    },
    hypnopompic: {
        title: 'Hypnopompic',
        content:
            'The term "hypnopompic" is used to describe the time period just before waking up from sleep.',
    },
    hypnotic: {
        title: 'Hypnotic',
        content:
            'Hypnotics refer to a category of medications that promote sleepiness.',
    },
    hypopnea: {
        title: 'Hypopnea',
        content:
            'Hypopnea is the condition characterized by abnormally slow or shallow breathing.',
    },
    hypothalamus: {
        title: 'Hypothalamus',
        content:
            'The hypothalamus is a small but important part of the brain that controls many of the body’s functions, including sleep. It is located just above the brain stem and below the thalamus.',
    },
    hypoxia: {
        title: 'Hypoxia',
        content:
            'Hypoxia is a condition where oxygen levels are insufficient. Sleep-disordered breathing can lead to hypoxia in certain tissues.',
    },
    insomnia: {
        title: 'Insomnia',
        content:
            'Insomnia is a common sleep disorder that involves difficulty falling asleep or staying asleep throughout the night. People with insomnia may feel unsatisfied with their sleep and usually experience fatigue, low energy, difficulty concentrating, mood disturbances, and decreased performance in work or school.',
    },
    insufficientSleep: {
        title: 'Insufficient Sleep',
        content:
            'Insufficient sleep refers to a state where both the body and mind are unable to function optimally due to insufficient duration of sleep or because sleep is excessively disrupted or fragmented.',
    },
    jetLag: {
        title: 'Jet Lag',
        content:
            'Jet lag describes a condition where the bodys circadian rhythm, the internal clock, is out of sync with the external environment due to rapid travel across several time zones.',
    },
    lightSleep: {
        title: 'Light Sleep',
        content:
            'Often referred to stages 1 or N1 of sleep, light sleep is a period when an individual can be awakened with relative ease. Sometimes, both stage 1 and stage 2 of NREM sleep are grouped under the term "light sleep".',
    },
    lightTherapy: {
        title: 'Light Therapy',
        content:
            'Light therapy is a treatment methodology for certain sleep issues that employs brief periods of exposure to intense light to modify an individual’s circadian timing.',
    },
    longSleep: {
        title: 'Long Sleep',
        content:
            'Long sleep refers to a sleep period that extends beyond the recommended duration based on an individual’s age and health.',
    },
    lucidDream: {
        title: 'Lucid Dream',
        content:
            'A lucid dream is a type of dream where the individual is consciously aware that they are in a dream state.',
    },
    melatonin: {
        title: 'Melatonin',
        content:
            'Melatonin is a hormone that your brain produces in response to darkness. It helps with the timing of your circadian rhythms (24-hour internal clock) and with sleep.',
    },
    metabolism: {
        title: 'Metabolism',
        content:
            'The term "Metabolism" encompasses a variety of physiological processes that are involved in the generation and utilization of energy within the body.',
    },
    microsleep: {
        title: 'Microsleep',
        content:
            'Microsleep pertains to extremely brief periods of sleep, usually lasting only a few seconds. This condition is often associated with severe daytime sleepiness.',
    },
    monophasicSleep: {
        title: 'Monophasic Sleep',
        content:
            'Monophasic sleep refers to a sleep pattern where an individuals total sleep duration for the day is consolidated into one single period.',
    },
    N1Sleep: {
        title: 'N1 Sleep',
        content:
            'N1 sleep, or stage 1, denotes the first phase of the Non-Rapid Eye Movement (NREM) sleep cycle.',
    },
    N2Sleep: {
        title: 'N2 Sleep',
        content:
            'Stage 2, or N2 sleep, is the second phase of the Non-Rapid Eye Movement (NREM) sleep cycle.',
    },
    N3Sleep: {
        title: 'N3 Sleep',
        content:
            'N3 sleep marks the third and deepest stage of the Non-Rapid Eye Movement (NREM) sleep cycle. It is also known as stage 3, deep sleep, delta sleep, or slow-wave sleep.',
    },
    nap: {
        title: 'Nap',
        content:
            'A nap refers to a brief period of sleep that is usually taken during daylight hours, separate from the individual´s main sleep period. It is sometimes referred to as a "siesta," the term used in Spanish.',
    },
    naturalLight: {
        title: 'Natural Light',
        content:
            'Natural light is the light produced by the sun.',
    },
    narcolepsy: {
        title: 'Narcolepsy',
        content:
            'Narcolepsy is a chronic sleep disorder characterized by overwhelming daytime drowsiness and sudden attacks of sleep. People with narcolepsy often find it difficult to stay awake for long periods, regardless of the circumstances.',
    },
    neuropeptide: {
        title: 'Neuropeptide',
        content:
            'Neuropeptides are small protein-like molecules that act as signaling molecules in the nervous system. They play a role in sleep regulation and are involved in various sleep-related functions such as sleep onset, depth, and duration. Examples include galanin, orexin, hypocretin, and melanin-concentrating hormone (MCH). Neuropeptides contribute to the complex mechanisms underlying sleep regulation.'
    },
    neurotransmitters: {
        title: 'Neurotransmitters',
        content:
            'Neurotransmitters are chemicals that transmit signals between neurons in the brain. They play an important role in sleep, mood, memory, and other brain functions.',
    },
    nightmare: {
        title: 'Nightmare',
        content:
            'A nightmare is a distressing dream that can cause the individual to awaken from their sleep. The dream´s unsettling content is typically recalled upon waking.',
    },
    nocturia: {
        title: 'Nocturia',
        content:
            'Nocturia refers to the frequent need to urinate during the night. It is generally characterized by the individual waking up one or more times to use the bathroom. Some research, however, delves deeper into the impact of multiple nighttime bathroom visits.',
    },
    nocturnal: {
        title: 'Nocturnal',
        content:
            'Nocturnal is the natural inclination to sleep during the night and be awake and active during the day. This pattern is largely influenced by our internal biological clock, or circadian rhythm, which aligns our sleep-wake cycle with the 24-hour day-night cycle. Most humans are naturally diurnal, meaning they are active during the day and sleep at night. However, certain sleep disorders, work schedules, or lifestyle choices can lead to a more nocturnal sleep pattern, where the majority of sleep occurs during the day and wakefulness is primarily at night.',
    },
    nonRapidEyeMovementSleep: {
        title: 'Non-Rapid Eye Movement Sleep (NREM)',
        content:
            'Non-Rapid Eye Movement Sleep, or NREM, consists of the initial three stages of sleep: N1, N2, and N3. NREM sleep is characterized by a significant reduction in brain and bodily activity compared to when awake. The majority of NREM sleep usually occurs during the first half of the sleep period.',
    },
    partialSleepDeprivation: {
        title: "Partial Sleep Deprivation",
        content: "Refers to a situation where an individual gets some sleep, yet not as much as they need. The sleep duration for partial sleep deprivation can differ according to various studies. It is not to be confused with total sleep deprivation, where an individual does not get any sleep at all."
    },
    pathogens: {
        title: 'Pathogens',
        content:
            'Pathogens are microorganisms that cause disease. They include bacteria, viruses, fungi, and parasites. Pathogens can be transmitted through the air, water, food, or bodily fluids. They can also be spread by contact with contaminated surfaces or objects.',
    },
    pharmacotherapy: {
        title: "Pharmacotherapy",
        content: "Involves the use of medication or prescription drugs. This therapy can be used to treat a vast array of health conditions and disorders."
    },
    polysomnography: {
        title: "Polysomnography",
        content: "A specific type of sleep study also referred to as a polysomnogram. It records numerous factors such as brain waves, muscle activity, and eye movements. This study is usually done in a sleep clinic and helps diagnose a variety of sleep disorders."
    },
    positiveAirwayPressureDevice: {
        title: "Positive Airway Pressure (PAP) Device",
        content: "A device that delivers pressurized air through the nose or mouth to ensure the airways remain open during sleep. It is most commonly used in the treatment of obstructive sleep apnea. Examples include Continuous (CPAP) and Bilevel (BPAP) machines."
    },
    rapidEyeMovementSleep: {
        title: "Rapid Eye Movement (REM) Sleep",
        content:
            "This sleep stage is marked by significant brain activity and often associated with vivid dreaming. Most body muscles are paralyzed in REM sleep except for those involved in breathing, heart function, and eye movement. The bulk of REM sleep typically happens during the latter half of a sleep period.",
    },
    remRebound: {
        title: "REM Rebound",
        content:
            "This refers to an extended duration of REM sleep following a period of sleep deprivation or reduced REM sleep.",
    },
    restlessLegSyndrome: {
        title: 'Restless Leg Syndrome',
        content:
            'Restless legs syndrome (RLS) is a condition that causes an uncontrollable urge to move your legs, usually because of an uncomfortable sensation. It typically happens in the evening or nighttime hours when you are sitting or lying down.',
    },
    screenTime: {
        title: "Screen Time",
        content:
            "This refers to the duration spent utilizing electronic gadgets including smartphones, tablets, laptops, other computers, and televisions.",
    },
    sedative: {
        title: "Sedative",
        content:
            "This is a substance or drug that promotes drowsiness or sleepiness.",
    },
    serotonin: {
        title: 'Serotonin',
        content:
            'Serotonin is a neurotransmitter that is involved in the regulation of mood, sleep, appetite, and other functions. It is produced in the brain and intestines and is found in the blood and tissues of animals and humans.',
    },
    shiftWork: {
        title: "Shift Work",
        content:
            "This is work that involves non-standard working hours, often including evenings or overnight, instead of the typical 9 a.m. to 5 p.m. workday.",
    },
    shortSleep: {
        title: "Short Sleep",
        content:
            "This is when the total duration of sleep is less than the recommended amount for a person's age and health status.",
    },
    sleepAid: {
        title: "Sleep Aid",
        content:
            "This refers to substances or drugs used to enhance sleep quality or duration. Sleep aids can include prescription medications, over-the-counter drugs, dietary supplements, or even practices like aromatherapy.",
    },
    sleepApnea: {
        title: 'Sleep Apnea',
        content:
            'Sleep apnea is a serious sleep disorder in which breathing repeatedly stops and starts during sleep. This can result in the brain and the rest of the body not getting enough oxygen. Symptoms include loud snoring, restless sleep, and sleepiness during the day.',
    },
    sleepArchitecture: {
        title: "Sleep Architecture",
        content:
            "The cycle of sleep, which includes both NREM and REM sleep, as it progresses through each stage. A hypnogram, a type of graph, can be used to depict the structure of sleep.",
    },
    sleepBruxism: {
        title: 'Sleep Bruxism',
        content:
            'Sleep bruxism, or teeth grinding, is a sleep-related movement disorder that involves clenching the jaw and grinding the teeth during sleep. This can lead to dental damage, headaches, and jaw pain.',
    },
    sleepCenters: {
        title: "Sleep Centers",
        content: "Sleep centers refer to specific regions or structures within the brain that are involved in controlling and regulating sleep. These sleep centers include various areas such as the hypothalamus, brainstem, and thalamus, which play important roles in coordinating the sleep-wake cycle and regulating sleep processes. "

    },
    sleepContinuity: {
        title: "Sleep Continuity",
        content:
            "This refers to a stretch of sleep without any disruptions or instances of waking up.",
    },
    sleepCycle: {
        title: "Sleep Cycle",
        content:
            "This is a sequence through various sleep stages, including NREM and REM sleep. Typically, an individual experiences 4 to 6 sleep cycles per night, each lasting from 70 to 120 minutes.",
    },
    sleepDebt: {
        title: "Sleep Debt",
        content:
            "This is the cumulative impact of consistently getting less sleep than needed over a prolonged period.",
    },
    sleepDeficiency: {
        title: "Sleep Deficiency",
        content:
            "This refers to a lack of sufficient rest due to either reduced sleep duration and/or fragmented sleep. It can also be called insufficient sleep or sleep insufficiency.",
    },
    sleepDeprivation: {
        title: "Sleep Deprivation",
        content:
            "Sleep deprivation is a condition where an individual gets less sleep than what is recommended for their age and health. It can also be referred to as insufficient sleep or sleep deficiency in everyday language.",
    },
    sleepDisorders: {
        title: 'Sleep Disorders',
        content:
            'Sleep disorders are conditions that affect the ability to sleep well on a regular basis. They can be caused by a range of issues, from teeth grinding (bruxism) to night terrors. Common sleep disorders include insomnia, sleep apnea, restless legs syndrome, and narcolepsy.',
    },
    sleepDisturbance: {
        title: "Sleep Disturbance",
        content:
            "This is a disruption in sleep that leads to arousal or awakening.",
    },
    sleepDuration: {
        title: "Sleep Duration",
        content:
            "This is the total amount of time that a person sleeps, which can be measured for a single sleep period or over a full 24-hour day.",
    },
    sleepEfficiency: {
        title: "Sleep Efficiency",
        content:
            "This measures the percentage of time in bed that is actually spent sleeping. It's determined by dividing the total sleep time by the total time spent in bed.",
    },
    sleepEnvironment: {
        title: "Sleep Environment",
        content:
            "This refers to the place where a person sleeps, typically a bedroom. It includes factors like the mattress, bedding, light, noise, smell, and temperature.",
    },
    sleepFragmentation: {
        title: "Sleep Fragmentation",
        content:
            "This refers to sleep that is interrupted by frequent arousals or awakenings.",
    },
    sleepHygiene: {
        title: "Sleep Hygiene",
        content:
            "These are the practices and habits that influence sleep quality, including elements of the sleep environment. Good sleep hygiene is often recommended to faq improve sleep issues.",
    },
    sleepInertia: {
        title: "Sleep Inertia",
        content:
            "This is a feeling of drowsiness or disorientation that can occur immediately after waking up from sleep.",
    },
    sleepLatency: {
        title: "Sleep Latency",
        content:
            "This is the time it takes to fall asleep after going to bed or 'lights out'.",
    },
    sleepMaintenance: {
        title: "Sleep Maintenance",
        content:
            "This refers to the ability to stay asleep for the intended or planned duration after initially falling asleep.",
    },
    sleepMechanisms: {
        title: "Sleep Mechanisms",
        content: "Sleep mechanisms refer to the underlying processes and biological systems involved in the regulation and control of sleep. These mechanisms encompass a complex interplay of neurochemical, neurophysiological, and genetic factors. Key sleep mechanisms include the interaction between the sleep-promoting and wake-promoting systems in the brain, the regulation of the sleep-wake cycle by the circadian rhythm, the modulation of sleep stages and transitions, and the homeostatic regulation of sleep drive."
    },
    sleepOnset: {
        title: "Sleep Onset",
        content:
            "This term is used to describe the act of falling asleep or beginning a sleep period.",
    },
    sleepPattern: {
        title: "Sleep Pattern",
        content:
            "This refers to an individual's sleep schedule, including bedtimes, wake times, and napping habits. It can also encompass the timing and duration of sleep interruptions.",
    },
    sleepParalysis: {
        title: 'Sleep Paralysis',
        content:
            'Sleep paralysis is a state, during waking up or falling asleep, in which a person is aware but unable to move or speak. During an episode, one may hallucinate (hear, feel, or see things that are not there), which often results in fear. Episodes generally last less than a couple of minutes.',
    },
    sleepPhase: {
        title: "Sleep Phase",
        content:
            "This is the timing of an individual's usual sleep period. It can be advanced, delayed, or disrupted, potentially affecting sleep duration. Also known as the sleep-wake phase, it's often linked to the circadian rhythm.",
    },
    sleepQuality: {
        title: "Sleep Quality",
        content:
            "This term refers to the overall satisfaction a person has with their sleep, including factors like ease of falling asleep, ability to stay asleep, duration of sleep, and feeling refreshed upon waking. It's often based on personal perception rather than objective measures.",
    },
    sleepRegression: {
        title: "Sleep Regression",
        content:
            "This is often noticed by parents when their infant or toddler, who had been sleeping well, suddenly starts having sleep problems. There's no universally accepted definition, and it can vary depending on the child and their previous sleep habits.",
    },
    sleepRegulation: {
        title: "Sleep Regulation",
        content:
            "Sleep regulation refers to the processes and mechanisms that control when and how much we sleep. It involves the body's internal clock, known as the circadian rhythm, as well as factors like sleep drive and environmental cues. Sleep regulation ensures that we get the right amount and timing of sleep for optimal functioning and well-being. Disruptions to sleep regulation can lead to sleep problems and disorders.",
    },
    sleepStages: {
        title: "Sleep Stages",
        content:
            "These are the four phases of the sleep cycle, categorized into NREM and REM sleep. Changes in brain and body activity throughout these stages can be monitored during a sleep study.",
    },
    sleepingPosition: {
        title: "Sleeping Position",
        content:
            "This refers to the physical posture a person adopts while sleeping. The main sleeping positions include sleeping on one's side (lateral decubitus), back (supine), and stomach (prone).",
    },
    sleepWakeCycle: {
        title: 'Sleep-wake Cycle',
        content:
            'The sleep-wake cycle is a 24-hour cycle that regulates our sleep and wakefulness. It is controlled by the circadian rhythm, which is a biological clock that tells us when to sleep and when to wake up. The circadian rhythm is influenced by external factors such as light and temperature, as well as internal factors such as hormones and neurotransmitters.',
    },
    sleepWakeHomeostasis: {
        title: 'Sleep Wake Homeostasis',
        content:
            "Sleep/wake homeostasis is a concept that describes how our body's need for sleep intensifies the longer we stay awake. Essentially, the more time we spend awake, the stronger our body's desire for sleep becomes. If sleep/wake homeostasis was the only mechanism regulating our sleep patterns, we would theoretically feel the most energized right after waking up in the morning. Conversely, by the end of the day, after hours of being awake, we would feel the most tired and ready for sleep.",
    },
    sleepWalking: {
        title: 'Sleepwalking',
        content:
            'Sleepwalking, also known as somnambulism, involves getting up and walking around while in a state of sleep. Its more common in children than adults and is more likely to occur if a person is sleep deprived.',
    },
    slowWaveSleep: {
        title: "Slow-Wave Sleep",
        content:
            "This is the third stage of NREM sleep characterized by specific brain wave patterns. It's also referred to as stage 3, N3, deep sleep, or delta sleep.",
    },
    somnolence: {
        title: "Somnolence",
        content:
            "Somnolence refers to the state of feeling sleepy or drowsy.",
    },
    snoring: {
        title: "Snoring",
        content:
            "Snoring is the audible vibration of tissue at the back of the throat. When it occurs frequently, it may be referred to as chronic snoring or primary snoring.",
    },
    soporific: {
        title: "Soporific",
        content:
            "Soporific refers to something that induces drowsiness.",
    },
    suprachiasmaticNucleus: {
        title: "Suprachiasmatic Nucleus (SCN)",
        content:
            "The suprachiasmatic nucleus (SCN), located in the hypothalamus, is responsible for regulating the body's circadian rhythm. It is often referred to as the circadian pacemaker.",
    },
    timeInBed: {
        title: "Time in Bed",
        content:
            "Time in bed refers to the total amount of time a person spends in bed, regardless of whether they are asleep or awake. This term is commonly used in sleep studies to calculate sleep efficiency.",
    },
    totalSleepDeprivation: {
        title: "Total Sleep Deprivation",
        content:
            "Total sleep deprivation refers to a period of time in which a person goes without any sleep, such as when pulling an all-nighter.",
    },
    totalSleepTime: {
        title: "Total Sleep Time (TST)",
        content:
            "Total sleep time (TST) represents the duration of actual sleep during a planned sleep episode. It includes the combined time spent in both REM and NREM sleep.",
    },
    tryptophan: {
        title: 'Tryptophan',
        content:
            'Tryptophan is an essential amino acid that is found in many foods. It is a precursor to serotonin, which is a neurotransmitter that regulates mood and sleep. Tryptophan can be found in turkey, chicken, eggs, milk, soymilk powder, soybean, and other protein-rich foods.',
    },
    vividDream: {
        title: "Vivid Dream",
        content:
            "A vivid dream is an episode of dreaming that is especially immersive or clear in terms of perception and recall.",
    },
    whiteNoise: {
        title: "White Noise",
        content:
            "White noise is a type of noise that combines sounds at all audible frequencies, played at the same amplitude and in random order. It is often characterized as a 'shhh' or static-like sound and can be used to mask external noise when trying to sleep.",
    },
    zeitgeber: {
        title: "Zeitgeber",
        content:
            "A zeitgeber is a factor that helps entrain a person's circadian rhythm to the 24-hour day-night cycle. Light is considered the most powerful zeitgeber.",
    },


    // InternalLinks also below

    oversleeping: {
        title: 'Oversleeping',
        content:
            'Oversleeping refers to the condition where a person sleeps beyond the typical seven to nine hours a night. While occasionally sleeping in can be beneficial, chronic oversleeping may indicate an underlying health issue.',
    },

    stagesOfSleep: {
        title: 'Stages of Sleep',
        content:
            'These are the four phases of the sleep cycle, categorized into NREM and REM sleep. Changes in brain and body activity throughout these stages can be monitored during a sleep study.',
    },
    remSleep: {
        title: 'REM Sleep',
        content:
            'REM sleep, or Rapid Eye Movement sleep, is a unique phase of sleep characterized by random movement of the eyes, low muscle tone, and vivid dreams. This stage is associated with learning, memory, and mood regulation.',
    },
};

type SleepLibProps = {
    word: keyof SleepDictionary;
    children: React.ReactNode;
};

export default function SleepLib({word, children}: SleepLibProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const data = useMemo(() => sleepDictionary[word], [word]);

    const tooltip = (
        <div>
            <p className="m-2 inline-block text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold">
                {data.title}
            </p>
            <span className="inline-block my-0">
        <SlBookOpen/>
      </span>
            <p className="m-2 text-xs 3xs:text-sm sm:text-md   font-normal text-slate-7">
                {data.content}
            </p>
        </div>
    );

    return (
        <>
            {isClient && (
                <span className="inline-block cursor-help text-blue-600 my-0 ">
          <Tooltip
              content={tooltip}
              animation="duration-700"
              arrow={false}
              className="max-w-sm !bg-blue-12 dark:!bg-white !text-slate-2 3xs:p-2 md:p-4"
          >
            <span className="border-b-2 cursor-help font-semibold border-blue-600 text-gray-700 dark:text-gray-300">
              {children}
            </span>
          </Tooltip>
        </span>
            )}
            {!isClient && (
                <span className="border-b-1 cursor-help border-blue-600 text-gray-700">
          {children}
        </span>
            )}
        </>
    );
}