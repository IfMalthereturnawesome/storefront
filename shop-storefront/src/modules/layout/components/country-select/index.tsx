"use client"

import { Listbox, Transition } from "@headlessui/react"
import { useStore } from "@lib/context/store-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import { revalidateTags } from "app/actions"
import { useRegions } from "medusa-react"
import {Fragment, useEffect, useMemo, useRef, useState} from "react"
import ReactCountryFlag from "react-country-flag"

type CountryOption = {
  country: string
  region: string
  label: string
}

const CountrySelect = () => {
  const { countryCode, setRegion } = useStore()
  const { regions } = useRegions()
  const [current, setCurrent] = useState<CountryOption | undefined>(undefined)
  const { state, open, close } = useToggleState()
  const dropdownRef = useRef(null);
  const [dropdownDirection, setDropdownDirection] = useState("bottom");

  const options: CountryOption[] | undefined = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o.country === countryCode)
      setCurrent(option)
    }
  }, [countryCode, options])

  const checkDropdownDirection = () => {
    const rect = dropdownRef.current.getBoundingClientRect();
    const spaceToBottom = window.innerHeight - rect.bottom;
    const spaceToTop = rect.top;
    setDropdownDirection(spaceToBottom > spaceToTop ? "bottom" : "top");
  };

  const handleMouseEnter = () => {
    checkDropdownDirection();
    open();
  };

  useEffect(() => {
    window.addEventListener("resize", checkDropdownDirection);
    return () => window.removeEventListener("resize", checkDropdownDirection);
  }, []);

  const handleChange = (option: CountryOption) => {
    revalidateTags(["medusa_request", "products", "collections"])
    setRegion(option.region, option.country)
    close()
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={close} >
      <Listbox
        onChange={handleChange}
        defaultValue={
          countryCode
            ? options?.find((o) => o.country === countryCode)
            : undefined
        }
      >
        <Listbox.Button className="py-1 w-full" >
          <div className="text-small-regular flex items-center gap-x-2 xsmall:justify-end">
            <span>Shipping to:</span>
            {current && (
              <span className="text-small-semi flex items-center gap-x-2">
                <ReactCountryFlag
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  countryCode={current.country}
                />
                {current.label}
              </span>
            )}
          </div>
        </Listbox.Button>
        <div className="relative w-full min-w-[316px]" ref={dropdownRef}>
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
                className={`absolute ${dropdownDirection === "top" ? "-bottom-[calc(100%-50px)]" : "-top-[calc(100%-20px)]"} left-0 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll z-[900] bg-white drop-shadow-md text-small-regular uppercase text-black no-scrollbar`}
                static
            >
              {options?.map((o, index) => {
                return (
                  <Listbox.Option
                    key={index}
                    value={o}
                    className="py-2 hover:bg-gray-200 px-3 cursor-pointer flex items-center gap-x-2"
                  >
                    <ReactCountryFlag
                      svg
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      countryCode={o.country}
                    />{" "}
                    {o.label}
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CountrySelect
