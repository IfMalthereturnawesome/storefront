'use client';

import React, {useState} from 'react';
import MinimalWeight from "@/components/sleepMask/MinimalWeight";
import ThinFeatureDandelions from "@/components/sleepMask/ThinFeatureDandelions";
import ParticlesBackground from "@/components/animations/ParticlesBackground";

const WrappedComponent: React.FC = () => {
    const [shouldPlayParticles, setShouldPlayParticles] = useState(false);

    return (
        <>
            <ParticlesBackground shouldPlayParticles={shouldPlayParticles} />
            <MinimalWeight setShouldPlayParticles={setShouldPlayParticles} />
            <ThinFeatureDandelions />
        </>
    );
};

export default WrappedComponent;
