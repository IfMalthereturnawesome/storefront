// MinimalWeightMobile.tsx

import React from 'react';

const MinimalWeightMobile: React.FC = () => {
    return (
        <>
            <section className="flex flex-col items-center px-4  bg-custom-white dark:bg-mask-black">
                <div
                    className="px-4 pt-6 rounded-lg shadow-lg  text-left max-w-md  bg-black blue-linear-gradient border-b border-white">

                        <div className="text-center mb-4">
                            <div className={"mb-2"}>
                                <h2 className="text-5xl 2xs:text-7xl font-normal text-custom-white mb-2 inline">Minimal </h2>
                                <h2 className="text-5xl 2xs:text-7xl font-normal  text-custom-white mb-2 inline"> Weight</h2>
                            </div>
                            <div className={""}>
                                <h2 className="text-4xl 2xs:text-6xl font-extrabold text-custom-white inline ">Just </h2>
                                <h2 className="text-4xl 2xs:text-6xl font-extrabold text-amber-9 dark:text-amber-12  inline"> 14
                                    Grams</h2>
                            </div>
                        </div>

                        <p className="text-custom-white/70 mx-auto text-lg xs:text-2xl large:text-[1.33rem] font-semibold font-sans !leading-normal tracking-wide text-center">
                            Whether it’s your first run in a while, a 10K, or a triathlon, it takes a certain mentality
                            to
                            seek out challenges that test you physically.
                        </p>


                    <div className="flex items-center justify-center mt-8  p-4 -mx-10 border-2 border-black rounded-[1.3rem]
                 bg-custom-white rounded-tr-lg rounded-bl-lg shadow-xl">
                        <span className="text-4xl 2xs:text-6xl font-bold text-black">Maximum Comfort</span>
                    </div>

                </div>
            </section>
        </>
    );
};

export default MinimalWeightMobile;
