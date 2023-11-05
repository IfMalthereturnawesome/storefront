'use client';

import React, {useState} from 'react';
import MinimalWeight from "@/components/sleepMask/MinimalWeight";
import ThinFeatureDandelions from "@/components/sleepMask/ThinFeatureDandelions";
import ParticlesBackground from "@/components/animations/ParticlesBackground";
import ScrollBar from "@/components/sleepMask/ScrollBar";
import MaximumComfortMeetsTotalBlackout from "@/components/sleepMask/MaximumComfortMeetsTotalBlackout";
import MediaQuery from "react-responsive";


const WrappedComponent: React.FC = () => {
    const [shouldPlayParticles, setShouldPlayParticles] = useState(false);

    return (
        <>
            <MediaQuery minWidth={1024}>

            <ScrollBar>
                <ThinFeatureDandelions/>
            </ScrollBar>

            <div className={"relative w-[99vw] md:w-[99.2vw] h-[100vh] container-particle "}>
            <ParticlesBackground shouldPlayParticles={shouldPlayParticles}/>
                <MinimalWeight setShouldPlayParticles={setShouldPlayParticles}/>

            </div>


            </MediaQuery>


        </>
    );
};

export default WrappedComponent;
