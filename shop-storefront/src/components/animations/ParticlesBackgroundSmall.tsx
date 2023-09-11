// ParticlesBackground.tsx
import React, {useCallback, useState} from 'react';

import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";


const ParticlesBackgroundSmall = () => {
    const { extraParticleOptions } = useParticleOptions();




    const particlesInitTwo = useCallback(async (engine: Engine) => {
        console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoadedTwo = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);
  return (
      <Particles
          id={`tsparticles-custom`}
          init={particlesInitTwo}
          loaded={particlesLoadedTwo}
          className="relative  z-[0]  "
          options={extraParticleOptions}

      />

  );

};
export default ParticlesBackgroundSmall;