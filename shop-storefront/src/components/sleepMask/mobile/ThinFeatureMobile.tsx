// ThinFeatureMobile.tsx

import React, {FC} from 'react';
import Image from 'next/image';
import {PlusIcon} from "@heroicons/react/24/solid";

const ThinFeatureMobile: FC = () => {
    return (
        <section
            id="SlimAndSoft"
            className="flex flex-col items-center px-4 py-8 bg-custom-white dark:bg-mask-black"

        >
            <div
                className=" p-6 rounded-lg w-full max-w-md shadow-2xl mb-8 bg-black dark-linear-gradient border-2 border-[#FEE7B3]">

                <div className="relative -mr-6 -mt-6 mb-4">
                    <Image
                        src="/images/thinSequence/thinmask_001-mobile.png"
                        alt="Slim and Soft Feature"
                        width={600}
                        height={400}
                        className="object-cover "
                    />

                </div>
                <div className={"flex justify-center mb-8 mt-4 items-center"}>
                    <h2 className="text-10xl font-poppins font-thin text-custom-white ">Slim</h2>
                    <PlusIcon width={35} height={35} className={"text-white fill-[#FEE7B3] dark:fill-amberA-12 mx-2"}/>
                    <h2 className="text-10xl font-poppins font-semibold text-custom-white">Soft</h2>
                </div>
                {/* Slim Feature Description */}
                <h3 className="font-semibold text-xl mb-2 text-white">Slim</h3>
                <p className="font-medium font-sans tracking-tighter text-lg text-slate-8 dark:text-custom-white/70 mb-8">
                    It&apos;s ultra-slim design is so comfortable that you&apos;ll forget it&apos;s on your face, offering a pressure-free experience perfect for side sleepers.
                </p>

                {/* Soft Feature Description */}
                <h3 className="font-semibold text-xl mb-2 text-white">Soft</h3>
                <p className="font-medium font-sans tracking-tighter text-lg text-slate-8 dark:text-white/70">
                    Feel the difference with our cool, soft nylon fabric. The ultra-fine fibers provide a smooth touch
                    even for the most sensitive skin.
                </p>
            </div>
        </section>
    );
};

export default ThinFeatureMobile;
