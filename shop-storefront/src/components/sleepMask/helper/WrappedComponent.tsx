'use client';

import React, {useState} from 'react';
import MinimalWeight from "@/components/sleepMask/MinimalWeight";
import ThinFeatureDandelions from "@/components/sleepMask/ThinFeatureDandelions";
import ParticlesBackground from "@/components/animations/ParticlesBackground";
import ScrollBar from "@/components/sleepMask/ScrollBar";
import ZoomImageSection from "@/components/sleepMask/imageSections/ZoomImageSection";

const WrappedComponent: React.FC = () => {
    const [shouldPlayParticles, setShouldPlayParticles] = useState(false);

    return (
        <div className="relative">
            <ParticlesBackground shouldPlayParticles={shouldPlayParticles} />
            <MinimalWeight setShouldPlayParticles={setShouldPlayParticles} />
            <ScrollBar>
                <ThinFeatureDandelions />
            </ScrollBar>
        </div>
    );
};

export default WrappedComponent;
