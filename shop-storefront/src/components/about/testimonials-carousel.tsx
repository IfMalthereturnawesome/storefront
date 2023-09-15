'use client'

import { useState, useRef, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Transition } from '@headlessui/react'


import WorldImage from '../../../public/images/worldmap.png'
import UserImage01 from '../../../public/images/world-user-01.jpg'
import UserImage02 from '../../../public/images/world-user-02.jpg'
import UserImage03 from '../../../public/images/world-user-03.jpg'
import UserImage04 from '../../../public/images/world-user-04.jpg'
import UserImage05 from '../../../public/images/world-user-05.jpg'
import UserImage06 from '../../../public/images/world-user-06.jpg'
import UserImage07 from '../../../public/images/world-user-07.jpg'
import UserImage08 from '../../../public/images/world-user-08.jpg'

export default function TestimonialsCarousel() {

  const [active, setActive] = useState<number>(0)
  const [autorotate, setAutorotate] = useState<boolean>(true)
  const [autorotateTiming] = useState<number>(7000)

  interface Item {
    img: StaticImageData
    alt: string
    quote: string
    name: string
    role: string
  }

  const items: Item[] = [
    {
      img: UserImage01,
      alt: 'Client Testimonial 01',
      quote: '“The Eight Athletics sleep mask has been a game-changer for my recovery. My sleep quality has improved dramatically.”',
      name: 'Sophie Müller',
      role: 'Triathlete, Berlin'
    },
    {
      img: UserImage02,
      alt: 'Client Testimonial 02',
      quote: '“As a professional footballer, rest is crucial. The Eight Athletics sleep mask helps me get the deep sleep I need.”',
      name: 'Luca Bianchi',
      role: 'Footballer, Rome'
    },
    {
      img: UserImage03,
      alt: 'Client Testimonial 03',
      quote: '“I’m a long-distance runner, and I can’t emphasize enough how important good sleep is. This mask from Eight Athletics is a must-have.”',
      name: 'Anna Eriksson',
      role: 'Runner, Stockholm'
    }
  ]

  
  const testimonials = useRef<HTMLDivElement>(null)  

  useEffect(() => {
    if (!autorotate) return
    const interval = setInterval(() => {
      setActive(active + 1 === items.length ? 0 : active => active + 1)
    }, autorotateTiming)
    return () => clearInterval(interval)
  }, [active, autorotate, autorotateTiming, items.length])

  const heightFix = () => {
    if (testimonials.current && testimonials.current.parentElement) testimonials.current.parentElement.style.height = `${testimonials.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, [])

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16" data-aos-anchor="[data-aos-id-testimonialcar]">
            <h2 className="custom-header-1 text-4xl mb-4" data-aos="fade-up" data-aos-anchor="[data-aos-id-testimonialcar]">Hear From Our Athlete Clients</h2>
            <p className="text-xl text-slate-11" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-testimonialcar]">Learn how athletes across the World are enhancing their recovery and performance with our sleep products</p>
          </div>

          {/* Check list */}
          <div className="max-w-3xl mx-auto pb-16">
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center items-center text-lg text-slate-11 -mx-3 -my-2">
              <li className="flex items-center mx-3 my-2" data-aos="fade-up" data-aos-delay="400" data-aos-anchor="[data-aos-id-testimonialcar]">
                <svg className="w-6 h-6 mr-3 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="fill-current text-green-500" cx="12" cy="12" r="12" />
                  <path className="fill-current text-white" d="M16.28 8.28l-6.292 6.294-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7A1 1 0 0016.28 8.28z" />
                </svg>
                <span>Enhanced Recovery</span>
              </li>
              <li className="flex items-center mx-3 my-2" data-aos="fade-up" data-aos-delay="500" data-aos-anchor="[data-aos-id-testimonialcar]">
                <svg className="w-6 h-6 mr-3 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="fill-current text-green-500" cx="12" cy="12" r="12" />
                  <path className="fill-current text-white" d="M16.28 8.28l-6.292 6.294-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7A1 1 0 0016.28 8.28z" />
                </svg>
                <span>Improved Sleep Quality</span>
              </li>
              <li className="flex items-center mx-3 my-2" data-aos="fade-up" data-aos-delay="600" data-aos-anchor="[data-aos-id-testimonialcar]">
                <svg className="w-6 h-6 mr-3 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="fill-current text-green-500" cx="12" cy="12" r="12" />
                  <path className="fill-current text-white" d="M16.28 8.28l-6.292 6.294-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7A1 1 0 0016.28 8.28z" />
                </svg>
                <span>Optimized Performance</span>
              </li>
            </ul>
          </div>


          {/* Carousel area*/}
          <div className="max-w-2xl mx-auto">

            {/* World map */}
            <div className="py-12">
              <div className="relative">
                {/* Map */}
                <div className="absolute inset-0 flex justify-center items-end" aria-hidden="true">
                  <div className="bottom-0 border-l border-dashed border-gray-500 transform translate-y-8" style={{ height: '50%' }}></div>
                </div>
                {/* People pics */}
                <Image src={WorldImage} width={672} height={330} alt="World map" />
                <Image className="absolute rounded-full" style={{ top: '29%', left: '47%' }} src={UserImage01} width={22} height={22} alt="User 01" data-aos="fade-up" />
                <Image className="absolute rounded-full" style={{ top: '38%', left: '48%' }} src={UserImage02} width={24} height={24} alt="User 02" data-aos="fade-up" data-aos-delay="400" />
                <Image className="absolute rounded-full" style={{ top: '13.5%', left: '50.5%' }} src={UserImage03} width={24} height={24} alt="User 02" data-aos="fade-up" data-aos-delay="100" />
                <Image className="absolute rounded-full" style={{ top: '34%', left: '76.5%' }} src={UserImage04} width={50} height={50} alt="User 04" data-aos="fade-up" data-aos-delay="700" />
                <Image className="absolute rounded-full" style={{ top: '29.5%', left: '8.5%' }} src={UserImage05} width={33} height={33} alt="User 05" data-aos="fade-up" data-aos-delay="500" />
                <Image className="absolute rounded-full" style={{ top: '56%', left: '19%' }} src={UserImage06} width={33} height={33} alt="User 06" data-aos="fade-up" data-aos-delay="200" />
                <Image className="absolute rounded-full" style={{ top: '20%', left: '24.5%' }} src={UserImage07} width={44} height={44} alt="User 07" data-aos="fade-up" data-aos-delay="600" />
                <Image className="absolute rounded-full" style={{ top: '39%', left: '43%' }} src={UserImage08} width={33} height={33} alt="User 08" data-aos="fade-up" data-aos-delay="300" />
              </div>
            </div>

            {/* Carousel */}
            <div className="mt-6">

              {/* Testimonials */}
              <div className="transition-all">
                <div className="relative flex flex-col items-start" ref={testimonials}>

                  {items.map((item, index) => (
                    <Transition
                      key={index}
                      show={active === index}
                      className="text-center"
                      enter="transition ease-in-out duration-500 transform order-first"
                      enterFrom="opacity-0 scale-98"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-out duration-300 transform absolute"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-98"
                      beforeEnter={() => heightFix()}
                    >
                      <div className="relative inline-flex flex-col justify-center mb-4">
                        <Image className="rounded-full" src={item.img} width={56} height={56} alt={item.alt} />
                        <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                        </svg>
                      </div>
                      <blockquote className="text-lg text-slate-11">{item.quote}</blockquote>
                      <div className="text-slate-12 font-medium mt-3">
                        <cite className="text-slate-11 not-italic">{item.name}</cite> / <span className="text-purple-600">{item.role}</span>
                      </div>
                    </Transition>
                  ))}

                </div>
              </div>

              {/* Bullets */}
              <div className="flex justify-center mt-6">

                {items.map((item, index) => (
                  <button className="p-1 group" key={index} onClick={() => { setActive(index); setAutorotate(false); }}>
                    <span className={`block w-2 h-2 rounded-full group-hover:bg-gray-400 transition duration-150 ease-in-out ${active === index ? 'bg-gray-11' : 'bg-gray-6'}`}></span>
                  </button>
                ))}

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
