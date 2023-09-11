'use client';

import {useRef, useEffect, useState} from 'react';
import {useAppProvider} from '@/app/app-provider';
import {useSelectedLayoutSegments} from 'next/navigation';
import {Transition} from '@headlessui/react';
import Link from 'next/link';
import SidebarLink from './sidebar-link';
import SidebarLinkGroup from './sidebar-link-group';
import SleepEssentialsSVG from '../../../public/images/eight-athletics-sleep-essentials_resource.svg';
import SleepScienceSVG from '../../../public/images/eight-athletics-sleep-science_resource.svg';
import SleepAthleticsSVG from '../../../public/images/eight-athletics-sleep-athletics_resource.svg';
import Image from "next/image";


export default function SupportSidebar() {
  const sidebar = useRef<HTMLDivElement>(null);
  const {sidebarOpen, setSidebarOpen} = useAppProvider();
  const segments = useSelectedLayoutSegments();
  const [openGroupName, setOpenGroupName] = useState<string | null>(null);

  const toggleGroup = (groupName: string) => {
    if (openGroupName === groupName) {
      setOpenGroupName(null);
    } else {
      setOpenGroupName(groupName);
    }
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({target}: {target: EventTarget | null}): void => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode}: {keyCode: number}): void => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const sleepEssentialsURL = '/resources/sleep-essentials/';
  const sleepScienceURL = '/resources/sleep-science/';
  const sleepAthleticsURL = '/resources/sleep-athletics/';

  return (
    <>
      {/* Backdrop */}
      <Transition
        className="inset-0 z-10 bg-cyan-1 bg-opacity-20 transition-opacity  2xl:hidden"
        show={sidebarOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div ref={sidebar}>
        <Transition
          show={sidebarOpen}
          unmount={false}
          as="aside"
          id="sidebar"
          className=" prose  prose-slate fixed left-0 top-[calc(80px+54px)] z-10 h-screen  w-64 border-r border-slate-200 bg-cyan-1 prose-a:no-underline prose-ul:list-none dark:border-slate-800  2xl:left-auto 2xl:!block 2xl:shrink-0 2xl:!opacity-100 "
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* Gradient bg displaying on light layout only */}
          <div
            className="pointer-events-none absolute inset-0 -left-[9999px] -z-10 bg-gradient-to-b from-cyan-1 to-cyan-2 dark:hidden"
            aria-hidden="true"
          ></div>

          <div className=" no-scrollbar bottom-0 top-0 w-64 overflow-y-auto px-4 sm:px-6 md:pl-0 md:pr-8">
            <div className="pb-8 pt-12 md:pt-16">
              {/* Docs nav */}
              <nav className="md:block">
                <ul className=" text-sm  ">
                  {/* 1st level */}
                  <SidebarLinkGroup
                      open={openGroupName === 'sleep-essentials'}
                      toggle={() => toggleGroup('sleep-essentials')}
                  >
                    {(handleClick, open) => {
                      return (
                        <>
                          <a
                            href="#0"
                            className={`relative flex items-center p-1 font-[650] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded before:bg-gradient-to-tr before:from-sky-10 before:to-cyan-5 before:opacity-20  ${
                              !segments.includes('sleep-essentials') &&
                              'before:hidden'
                            }`}
                            onClick={e => {
                              e.preventDefault();
                              handleClick();
                                toggleGroup('sleep-essentials');
                            }}
                          >
                            <Image src={SleepEssentialsSVG} width={28} height={28} className="my-0 mr-3 shrink-0" alt={"Eight Athletics' Sleep Essentials Resource"} />
                            <span>Sleep Essentials</span>
                          </a>
                          <ul
                            className={`mb-3 ml-4 border-l border-slate-200 pl-6 dark:border-slate-800  ${
                              !open && 'hidden'
                            }`}
                          >
                            <li className="mt-3">
                              <SidebarLink
                                href={sleepEssentialsURL + 'overview'}
                              >
                                Overview - Start Here
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                href={
                                  sleepEssentialsURL +
                                  'intro-to-the-science-of-sleep'
                                }
                              >
                                Sleep Science Intro
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={
                                      sleepEssentialsURL +
                                      'sleep-needs-at-different-stages-of-life'
                                  }
                              >
                                Recommended Sleep
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={
                                      sleepEssentialsURL +
                                      'sleep-disorders'
                                  }
                              >
                                  Sleep Disorders
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={
                                      sleepEssentialsURL +
                                      'impact-of-sleep-deprivation'
                                  }
                              >
                                Sleep Deprivation
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={
                                      sleepEssentialsURL +
                                      'sleep-habits'
                                  }
                              >
                                  Sleep Habits
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={
                                      sleepEssentialsURL +
                                      'food-fitness-and-sleep'
                                  }
                              >
                                Food, Fitness & Sleep
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={
                                      sleepEssentialsURL +
                                      'sleep-and-technology'
                                  }
                              >
                                Sleep & Technology
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={
                                      sleepEssentialsURL +
                                      'sleep-medication-and-natural-remedies'
                                  }
                              >
                                Medication & Natural Remedies
                              </SidebarLink>
                              <SidebarLink
                                  href={
                                      sleepEssentialsURL +
                                      'key-takeaways-in-the-sleep-essentials-resource'
                                  }
                              >
                                Key Takeaways
                              </SidebarLink>
                            </li>
                          </ul>
                        </>
                      );
                    }}
                  </SidebarLinkGroup>

                  {/* 2st level */}
                  <SidebarLinkGroup
                      open={openGroupName === 'sleep-science'}
                      toggle={() => toggleGroup('sleep-science')}
                  >
                    {(handleClick, open) => {
                      return (
                        <>
                          <a
                            href="#0"
                            className={`relative flex items-center p-1 font-[650] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded before:bg-gradient-to-tr before:from-sky-10 before:to-cyan-5 before:opacity-20  ${
                              !segments.includes('sleep-science') &&
                              'before:hidden'
                            }`}
                            onClick={e => {
                              e.preventDefault();
                              handleClick();
                              toggleGroup('sleep-science');
                            }}
                          >
                            <Image src={SleepScienceSVG} width={28} height={28} className="my-0 mr-3 shrink-0" alt={"Eight Athletics' Sleep Science Resource"} />
                            <span>Sleep Science</span>
                          </a>
                          <ul
                            className={`mb-3 ml-4 list-none border-l  border-slate-200 pl-6 dark:border-slate-800  ${
                              !open && 'hidden'
                            }`}
                          >
                            <li className="mt-3">
                              <SidebarLink href={sleepScienceURL + 'overview'}>
                                Overview - Start Here
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                href={sleepScienceURL + 'neurobiology-of-sleep'}
                              >
                                Neurobiology of Sleep
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepScienceURL + 'chronobiology-and-sleep'}
                              >
                                Chronobiology & Sleep
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepScienceURL + 'genetics-of-sleep'}
                              >
                                Genetics of Sleep
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepScienceURL + 'sleep-and-hormones'}
                              >
                                Sleep & Hormones
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepScienceURL + 'science-of-dreaming'}
                              >
                                Science of Dreaming
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepScienceURL + 'future-of-sleep-science'}
                              >
                                The Future of Sleep Science
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepScienceURL + 'key-takeaways-in-the-sleep-science-resource'}
                              >
                                Key Takeaways
                              </SidebarLink>
                            </li>
                          </ul>
                        </>
                      );
                    }}
                  </SidebarLinkGroup>
                  {/* 3rd level */}
                    <SidebarLinkGroup open={openGroupName === 'sleep-athletics'} toggle={() => toggleGroup('sleep-athletics')}>
                    {(handleClick, open) => {
                      return (
                        <>
                          <a
                            href="#0"
                            className={`relative flex items-center p-1 font-[650] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded before:bg-gradient-to-tr before:from-sky-10 before:to-cyan-5 before:opacity-20  ${
                              !segments.includes('sleep-athletics') &&
                              'before:hidden'
                            }`}
                            onClick={e => {
                              e.preventDefault();
                              handleClick();
                                toggleGroup('sleep-athletics');
                            }}
                          >
                            <Image src={SleepAthleticsSVG} width={28} height={28} className="my-0 mr-3 shrink-0" alt={"Eight Athletics' Sleep Athletics Resource"} />
                            <span>Sleep Athletics</span>
                          </a>
                          <ul
                            className={`mb-3 ml-4 list-none border-l border-slate-200 pl-6 dark:border-slate-800  ${
                              !open && 'hidden'
                            }`}
                          >
                            <li className="mt-3">
                              <SidebarLink
                                href={sleepAthleticsURL + 'overview'}
                              >
                                Overview - Start Here
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                href={sleepAthleticsURL + 'sleep-and-athletic-performance'}
                              >
                                The Need for Sleep
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepAthleticsURL + 'circadian-rhythms-and-athletic-performance'}
                              >
                                Circadian Rhythms & Performance
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepAthleticsURL + 'jet-lag-and-travel-fatigue-in-athletes'}
                              >
                                Jetlag & Travel Fatigue
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepAthleticsURL + 'accuracy-reaction-time-and-optimal-sleep'}
                              >
                                Accuracy & Reaction Time
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepAthleticsURL + 'sleeps-impact-on-speed-power-and-endurance'}
                              >
                                Speed, Power & Endurance
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepAthleticsURL + 'sleep-and-skill-learning-for-athletes'}
                              >
                                Sleep & Skill Learning
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepAthleticsURL + 'sleep-and-injury-risk-reduction-and-recovery'}
                              >
                                Injury Risk Reduction & Recovery
                              </SidebarLink>
                            </li>
                            <li className="mt-3">
                              <SidebarLink
                                  href={sleepAthleticsURL + 'key-takeaways-in-the-sleep-athletics-resource'}
                              >
                                Key Takeaways
                              </SidebarLink>
                            </li>
                          </ul>
                        </>
                      );
                    }}
                  </SidebarLinkGroup>
                </ul>
              </nav>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
}
