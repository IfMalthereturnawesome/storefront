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
          <div className={"hidden md:block"}>

            <ParticlesBackground shouldPlayParticles={shouldPlayParticles} />
          </div>
            <MinimalWeight setShouldPlayParticles={setShouldPlayParticles} />

            <ScrollBar>
                <ThinFeatureDandelions />
            </ScrollBar>
      </>
    );
};

export default WrappedComponent;
