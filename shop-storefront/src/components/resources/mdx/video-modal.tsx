'use client'
import { useState, useEffect, useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Transition } from '@headlessui/react'

interface VideoModalProps {
  id: string
  ariaLabel: string
  image: StaticImageData,
  imageAlt: string,
  videoSrc: string
  handleClose: () => void
}

export default function PostVideoModal({
  id,
  ariaLabel,
  image,
  imageAlt,
  videoSrc
}: VideoModalProps) {

  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false)
  const modalContent = useRef<HTMLDivElement>(null)

  // close the modal on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!videoModalOpen || modalContent.current?.contains(target as Node)) return
      setVideoModalOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [videoModalOpen, videoModalOpen, modalContent]) 

  // close the modal if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }) => {
      if (keyCode !== 27) return
      setVideoModalOpen(false)
    }
    document.addEventListener('keydown', keyHandler)

    return () => document.removeEventListener('keydown', keyHandler)
  }, [videoModalOpen])

  return (
    <div>
      <div className="relative inline-flex justify-center items-center my-2">
        <Image className="rounded" src={image} width="680" height="382" alt={imageAlt} />
        <button className="absolute group" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); }} aria-controls={id}>
          <svg className="w-16 h-16 fill-current sm:w-20 sm:h-20 group" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
            <circle className="text-white opacity-80 group-hover:opacity-100 transition duration-150 ease-in-out" cx="44" cy="44" r="44" />
            <path
              className="text-blue-600"
              d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z"
            />
          </svg>
        </button>
      </div>
      {/* Modal backdrop */}
      <Transition
        show={videoModalOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 bg-slate-900 bg-opacity-20 z-50 transition-opacity"
        aria-hidden="true"
      />

      {/* Modal dialog */}
      <Transition
        show={videoModalOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ttransition ease-out duration-200"
        leaveFrom="oopacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabel}          
      >        
        <div className="bg-white overflow-auto max-w-4xl w-full max-h-full dark:bg-slate-900" ref={modalContent}>
          <div className="relative pb-9/16">
            <video className="w-full aspect-video m-0" width="1920" height="1080" loop controls>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>            
          </div>          
        </div>
      </Transition>    
    </div>
  )
}
