'use client';

import React, {useState} from 'react';
import MinimalWeight from "@/components/sleepMask/MinimalWeight";
import ThinFeatureDandelions from "@/components/sleepMask/ThinFeatureDandelions";
import ParticlesBackground from "@/components/animations/ParticlesBackground";
import ScrollBar from "@/components/sleepMask/ScrollBar";


const WrappedComponent: React.FC = () => {
    const [shouldPlayParticles, setShouldPlayParticles] = useState(false);

    return (
        <>
            <div className={"relative w-[99vw] md:w-[99.2vw] h-[100vh]"}>
            <ParticlesBackground shouldPlayParticles={shouldPlayParticles}/>
                <MinimalWeight setShouldPlayParticles={setShouldPlayParticles}/>
            </div>

            <ScrollBar>
                <ThinFeatureDandelions/>
            </ScrollBar>


        </>
    );
};

export default WrappedComponent;
