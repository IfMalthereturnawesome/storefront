'use client'

import { useState } from 'react'
import SearchModal from './search-modal'

export default function Search() {

  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false)

  return (
    <div className="mx-1 2xs:mx-3 md:mx-4 flex justify-center items-center z-[2]">
        <button
            className="flex"
            onClick={(e) => {
                e.stopPropagation()
                setSearchModalOpen(true)
            }}
            aria-controls="search-modal"
        >
            <div className="flex items-center justify-center">
                <svg
                    className="h-5 w-5 xl:h-6 xl:w-6 fill-mask-black dark:fill-custom-white "
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m14.707 13.293-1.414 1.414-2.4-2.4 1.414-1.414 2.4 2.4ZM6.8 12.6A5.8 5.8 0 1 1 6.8 1a5.8 5.8 0 0 1 0 11.6Zm0-2a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z" />
                </svg>

            </div>

        </button>

        <div>
        <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
      </div>
    </div>


  )
}
