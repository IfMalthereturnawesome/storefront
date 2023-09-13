import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import  {ProductNavPop} from "@/components/ui/ProductNav";

import {ResourceNavPop} from "@/components/ui/ResourceNav";
import {SupportNavPop} from "@/components/ui/SupportNav";

const NavigationMenuDemo = () => {
    return (
        <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
            <NavigationMenu.List className="center  m-0 flex list-none  p-1 ">
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger
                        className="text-base flex items-center gap-x-2 px-6 py-2 font-semibold leading-6 hover:text-indigo-500 focus:outline-none dark:hover:text-cgreen-200
  data-[state=open]:text-blue-600 dark:data-[state=open]:text-cgreen-200
  data-[state=closed]:text-mask-black dark:data-[state=closed]:text-custom-white"
                    >
                        Product{' '}
                        <CaretDownIcon
                            className=" relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180 data-[state=open]:text-blue-600 dark:data-[state=open]:text-cgreen-200
  data-[state=closed]:text-mask-black dark:data-[state=closed]:text-custom-white"
                            aria-hidden
                        />
                    </NavigationMenu.Trigger>

                    <NavigationMenu.Content className="z-10 mb-0 w-screen absolute top-0 left-0 w-full  max-w-md overflow-hidden rounded-3xl bg-cyan-1 shadow-lg ring-1 ring-gray-900/5 dark:text-white border-black border-2
                    data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromLeft data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToLeft">
                        <ProductNavPop  />
                    </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                    <NavigationMenu.Trigger
                        className="text-base flex items-center gap-x-2 px-6 py-2 font-semibold leading-6 hover:text-indigo-500 focus:outline-none dark:hover:text-cgreen-200
  data-[state=open]:text-blue-600 dark:data-[state=open]:text-cgreen-200
  data-[state=closed]:text-mask-black dark:data-[state=closed]:text-custom-white"
                    >
                        Resources{' '}
                        <CaretDownIcon
                            className=" relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180 data-[state=open]:text-blue-600 dark:data-[state=open]:text-cgreen-200
  data-[state=closed]:text-mask-black dark:data-[state=closed]:text-custom-white"
                            aria-hidden
                        />
                    </NavigationMenu.Trigger>

                    <NavigationMenu.Content className="z-10 mb-0 w-screen  absolute top-0 left-0 w-full max-w-md overflow-hidden rounded-3xl bg-cyan-1 shadow-lg ring-1 ring-gray-900/5 dark:text-white border-black border-2
                    data-[motion=from-start]:animate-fadeIn data-[motion=from-end]:animate-fadeIn data-[motion=to-start]:animate-fadeOut data-[motion=to-end]:animate-fadeOut">
                        <ResourceNavPop  />
                    </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                    <NavigationMenu.Trigger
                        className="text-base flex items-center gap-x-2 px-6 py-2 font-semibold leading-6 hover:text-indigo-500 focus:outline-none dark:hover:text-cgreen-200
  data-[state=open]:text-blue-600 dark:data-[state=open]:text-cgreen-200
  data-[state=closed]:text-mask-black dark:data-[state=closed]:text-custom-white"
                    >
                        Support{' '}
                        <CaretDownIcon
                            className=" relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180 data-[state=open]:text-blue-600 dark:data-[state=open]:text-cgreen-200
  data-[state=closed]:text-mask-black dark:data-[state=closed]:text-custom-white"
                            aria-hidden
                        />
                    </NavigationMenu.Trigger>

                    <NavigationMenu.Content className="z-10 mb-0 w-screen absolute top-0 left-0 w-full max-w-md overflow-hidden rounded-3xl bg-cyan-1 shadow-lg ring-1 ring-gray-900/5 dark:text-white border-black border-2
                    data-[motion=from-start]:animate-enterFromRight data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToRight data-[motion=to-end]:animate-exitToRight">
                        <SupportNavPop  />
                    </NavigationMenu.Content>
                </NavigationMenu.Item>


                <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                    <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-blue-600 dark:bg-cgreen" />
                </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
                <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-3xl bg-cyan-1 transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
            </div>
        </NavigationMenu.Root>
    );
};


export default NavigationMenuDemo;