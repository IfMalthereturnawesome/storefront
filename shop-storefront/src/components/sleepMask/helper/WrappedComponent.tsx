'use client';

import React, {useState} from 'react';
import MinimalWeight from "@/components/sleepMask/MinimalWeight";
import ThinFeatureDandelions from "@/components/sleepMask/ThinFeatureDandelions";
import ParticlesBackground from "@/components/animations/ParticlesBackground";
import ScrollBar from "@/components/sleepMask/ScrollBar";
import useBetterMediaQuery from "@/utils/useBetterMediaQuery";

const WrappedComponent: React.FC = () => {
    const [shouldPlayParticles, setShouldPlayParticles] = useState(false);
    const isDesktop = useBetterMediaQuery('(min-width: 1024px)');
    return (
        <>
            {isDesktop && (
                <><ScrollBar>
                    <ThinFeatureDandelions/>
                </ScrollBar>
                    <div className={"relative w-[99vw] md:w-[99.2vw] h-[100vh] container-particle "}>
                        <ParticlesBackground shouldPlayParticles={shouldPlayParticles}/>
                        <MinimalWeight setShouldPlayParticles={setShouldPlayParticles}/>

                    </div>
                </>
            )}

        </>
    );
};

export default WrappedComponent;
