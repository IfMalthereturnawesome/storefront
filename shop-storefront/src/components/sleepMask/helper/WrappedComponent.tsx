'use client';

import React, {useState} from 'react';
import MinimalWeight from "@/components/sleepMask/MinimalWeight";
import ThinFeatureDandelions from "@/components/sleepMask/ThinFeatureDandelions";
import ParticlesBackground from "@/components/animations/ParticlesBackground";
import ScrollBar from "@/components/sleepMask/ScrollBar";
import MaximumComfortMeetsTotalBlackout from "@/components/sleepMask/MaximumComfortMeetsTotalBlackout";


const WrappedComponent: React.FC = () => {
    const [shouldPlayParticles, setShouldPlayParticles] = useState(false);

    return (
        <>

            <ScrollBar>
                <ThinFeatureDandelions/>
            </ScrollBar>

            <div className={"relative w-[99vw] md:w-[99.2vw] h-[100vh] container-particle"}>
            <ParticlesBackground shouldPlayParticles={shouldPlayParticles}/>
                <MinimalWeight setShouldPlayParticles={setShouldPlayParticles}/>

            </div>




        </>
    );
};

export default WrappedComponent;
