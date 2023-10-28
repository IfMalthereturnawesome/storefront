'use client'

import { useState, useEffect } from 'react'

export default function SecondaryNav() {

  const [targets, setTargets] = useState<HTMLElement[]>([])
  const [links, setLinks] = useState<HTMLElement[]>([])

  const scrollSpy = () => {
    const links = document.querySelectorAll('[data-scrollspy-link]') as NodeListOf<HTMLElement>
    if (links.length < 1) return
    const addActive = (i: number) => {
      const link = links[i] ? links[i] : links[0]
      link.classList.add('scrollspy-active')
    }
    const removeActive = (i: number) => {
      links[i].classList.remove('scrollspy-active')
    }
    // @ts-ignore
    const removeAllActive = () => [...Array(targets.length).keys()].forEach((link) => removeActive(link))
    const targetMargin = 100
    let currentActive = 0
    addActive(0)
    // listen for scroll events
    window.addEventListener('scroll', () => {
      const current = targets.length - [...targets].reverse().findIndex((target) => window.scrollY >= target.offsetTop - targetMargin) - 1
      if (current !== currentActive) {
        removeAllActive()
        currentActive = current
        addActive(current)
      }
    })
  }
  
  // select targets
  useEffect(() => {
    const targets = document.querySelectorAll('h2') as NodeListOf<HTMLElement>
    setTargets(Array.from(targets))
  }, [])  

  // populate the right sidebar
  useEffect(() => {
    let linksArray: HTMLElement[]  = []
    targets.map((target) => {
      linksArray.push(target)
    })
    setLinks(linksArray)
  }, [targets])

  // init scrollspy
  useEffect(() => {
    scrollSpy()
  }, [links])

  return (
    <div className="hidden w-48 shrink-0 xl:block">
      {links.length > 0 && (
        <nav>
          <div className="no-scrollbar fixed bottom-0 h-[calc(100vh-5rem)] w-48 overflow-y-auto pb-8 pt-32">
            <div className="border-l border-slate-200 dark:border-slate-800">
              <div className="flex items-center">
                <div
                  className="cursor-pointer py-1.5 pl-4 text-xs font-[650] uppercase text-slate-12"
                  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                >
                  On this page
                </div>
                {/* Svg icon for scroll to top */}
                <span
                  className="ml-2 cursor-pointer text-slate-8 hover:text-slate-12"
                  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </span>
                {/* End of svg icon for scroll to top */}
              </div>

              {/* End of svg icon for scroll to top */}
              <ul className="text-sm">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                        data-scrollspy-link="true"
                      className="relative block py-1.5 pl-4 font-normal text-slate-11 before:absolute before:-left-px before:bottom-2 before:top-2 before:w-0.5"
                      href={`#${link.id}`}
                    >
                      {link.innerHTML.split(':')[0]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}