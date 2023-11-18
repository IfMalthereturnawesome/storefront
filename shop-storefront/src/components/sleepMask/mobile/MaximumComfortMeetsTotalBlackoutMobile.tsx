// MaximumComfortMobile.tsx

import React from 'react';

const MobileMaximumComfort: React.FC = () => {
    return (

            <section id={"total-blackout"} className="flex flex-col items-center px-4 pb-8 bg-custom-white dark:bg-mask-black">
                <div className="px-4 pt-2 rounded-br-lg rounded-bl-lg shadow-lg w-full text-left max-w-md pb-6 mb-4 bg-black blue-linear-gradient">
                    <div className="text-center mb-4 mt-2">

                        <div className={"text-2xl 2xs:text-4xl text-slate-12 inline"}>
                            <h3 className={"font-semibold text-custom-white"}>meets</h3>
                        </div>
                        <div className={"mt-4 mb-6"}>
                            <h2 className="text-5xl 2xs:text-7xl font-extrabold  text-amber-9 dark:text-amber-12 inline ">Total </h2>
                            <h2 className="text-5xl 2xs:text-7xl font-extrabold  text-custom-white  inline"> Blackout</h2>
                        </div>
                    </div>

                    <div className="text-center mb-4">
                        <div className={"mb-2"}>
                            <h2 className="text-5xl 2xs:text-7xl font-semibold text-custom-white/90 mb-2 mr-8 ">Wherever,</h2>
                            <h2 className="text-5xl 2xs:text-7xl font-semibold text-custom-white/75 mb-2 ml-8">Whenever.</h2>
                        </div>

                    </div>

                </div>
            </section>

    );
};

export default MobileMaximumComfort;
