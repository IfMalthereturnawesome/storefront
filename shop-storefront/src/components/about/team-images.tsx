'use client';

import {  useRef } from 'react';
import Image from 'next/image'
import { useTransform, useScroll, motion } from 'framer-motion';
import BispebjergLasse from '../../../public/images/team-picture-01.jpg'
import WaterGroup from '../../../public/images/team-mosaic-02.jpg'
import LasseTrackAndField from '../../../public/images/team-image-2.jpg'
import TeamThree from '../../../public/images/team-image-3.jpg'
import TeamFour from '../../../public/images/team-image-biking.jpg'
import forrestFrogView from '../../../public/images/team-image-runner.jpg'

import annaRunningSuperFast from '../../../public/images/anna-running-fast-forrest.jpg'
import lasseBikingFast from '../../../public/images/lasse-biking-fast.jpg'
import maltheLasseSwimmingInLake from '../../../public/images/lasse-malthe-swimming-in-lake.jpg'


export default function TeamImages() {
  const gallery = useRef(null);

  const { scrollYProgress } = useScroll({
    target: gallery,



  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const y6 = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
      <section className="relative -mt-8" ref={gallery}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative w-full h-0 pb-3/4">
              <motion.figure className="absolute h-auto" style={{ top: '45%', width: '41.67%', maxWidth: '320px', y: y1 }} data-aos="fade-right">
                <Image src={WaterGroup} width="320" height="240" alt="Team mosaic 02" />
              </motion.figure>
              <motion.figure className="relative mx-auto h-auto" style={{ width: '78.13%', maxWidth: '600px', y: y2 }} data-aos="fade-down" data-aos-delay="100">
                <Image src={maltheLasseSwimmingInLake} width="600" height="338" alt="Team mosaic 01" />
              </motion.figure>
              <motion.figure className="absolute mx-auto h-auto" style={{ top: '50%', left: '65%', width: '49.52%', maxWidth: '212px', y: y3 }} data-aos="fade-down" data-aos-delay="100">
                <Image src={annaRunningSuperFast} width="250" height="250" alt="Team mosaic 01" />
              </motion.figure>
              <motion.figure className="absolute h-auto" style={{ top: '8.5%', right: '0', width: '32.55%', maxWidth: '250px', y: y4 }} data-aos="fade-left" data-aos-delay="200">
                <Image src={LasseTrackAndField} width="250" height="188" alt="Team mosaic 03" />
              </motion.figure>
              <motion.figure className="absolute h-auto" style={{ bottom: '10%', right: '0', width: '35.52%', maxWidth: '212px', y: y5 }} data-aos="fade-up" data-aos-delay="300">
                <Image src={lasseBikingFast} width="250" height="250" alt="Team mosaic 04" />
              </motion.figure>
              <motion.figure className="absolute h-auto" style={{ bottom: '0', right: '39%', width: '45.52%', maxWidth: '212px', y: y6 }} data-aos="fade-up" data-aos-delay="300">
                <Image src={BispebjergLasse} width="350" height="350" alt="Team mosaic 04" />
              </motion.figure>
            </div>
          </div>
        </div>
      </section>
  );
}
