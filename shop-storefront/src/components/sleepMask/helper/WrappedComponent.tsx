'use client';

import React, {useState} from 'react';
import dynamic from "next/dynamic"
const MinimalWeight = dynamic(() => import('@/components/sleepMask/MinimalWeight'));
// import MinimalWeight from "@/components/sleepMask/MinimalWeight";
import ThinFeatureDandelions from "@/components/sleepMask/ThinFeatureDandelions";
// import ParticlesBackground from "@/components/animations/ParticlesBackground";
import ScrollBar from "@/components/sleepMask/ScrollBar";
import useBetterMediaQuery from "@/utils/useBetterMediaQuery";

const WrappedComponent: React.FC = () => {
    const [shouldPlayParticles, setShouldPlayParticles] = useState(false);
    const isDesktop = useBetterMediaQuery('(min-width: 1024px)');
    // a state to control the particles animation

    const ParticlesBackground = shouldPlayParticles
        ? dynamic(() => import('@/components/animations/ParticlesBackground'))
        : null;

    return (
      <>
        {isDesktop && (
          <>
            <ScrollBar>
              <ThinFeatureDandelions />
            </ScrollBar>
            <div
              className={
                "relative w-[99vw] md:w-[99.2vw] h-[100vh] container-particle "
              }
            >

                {shouldPlayParticles && ParticlesBackground && (
                    <ParticlesBackground
                        shouldPlayParticles={shouldPlayParticles}
                    />
                )}
                  <MinimalWeight
                    setShouldPlayParticles={setShouldPlayParticles}
                  />

            </div>
          </>
        )}
      </>
    )
};

export default WrappedComponent;
