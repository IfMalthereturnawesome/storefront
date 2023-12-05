// components/analytics/CookieBanner.tsx
"use client"

import Link from "next/link"
import { getLocalStorage, setLocalStorage } from "@/lib/analytics/StorageHelper"
import { useState, useEffect } from "react"
import { usePostHog } from "posthog-js/react"
import Image from "next/image"
import { Tooltip } from "@nextui-org/react"

export default function CookieBanner() {
  const posthog = usePostHog()
  const [cookieConsent, setCookieConsent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null)
    setCookieConsent(storedCookieConsent)
    setIsLoading(false)
  }, [])

  const acceptCookies = () => {
    posthog.opt_in_capturing()
    updateConsentState(true)
  }

  const declineCookies = () => {
    posthog.opt_out_capturing()
    updateConsentState(false)
  }

  const updateConsentState = (consent) => {
    setCookieConsent(consent)
    setLocalStorage("cookie_consent", consent)

    const newValue = consent ? "granted" : "denied"
    window.gtag("consent", "update", {
      analytics_storage: newValue,
      ad_storage: newValue,
      ad_user_data: newValue,
      ad_personalization: newValue,
    })
  }

  useEffect(() => {
    if (!isLoading) {
      const newValue = cookieConsent ? "granted" : "denied"

      window.gtag("consent", "update", {
        analytics_storage: newValue,
        ad_storage: newValue,
        ad_user_data: newValue,
        ad_personalization: newValue,
      })

      setLocalStorage("cookie_consent", cookieConsent)
    }
  }, [cookieConsent, isLoading])

  if (isLoading) {
    return null
  }

  const tooltipContent = (
    <div className="px-1 py-2 ">
      <div className="text-md font-bold">Cookie Policy</div>
      <div className="text-sm">
        Just like Ursula von der Leyen champions digital privacy in the European
        Commission, we at Eight Athletics are committed to protecting your data.
      </div>
      <Link
        href="/terms/cookie-policy"
        className="text-blue-300 text-sm underline hover:text-yellow-300 transition-colors underline-offset-2"
      >
        Our cookie policy
      </Link>
    </div>
  )
  return (
    <>
      <div
        className={`fixed z-50 left-0 bottom-0 lg:left-10 lg:bottom-5 
                bg-cbg/60 lg:bg-cbg backdrop-blur-lg 
                rounded-lg 
        shadow-lg sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto border border-white/20 mb-2
        ${
          cookieConsent !== null ? "hidden" : "flex"
        } flex-col lg:flex-row lg:items-start justify-between`}
      >
        <div className="text-black  pl-5 pr-3 py-5 lg:mt-0 flex flex-col items-center lg:items-start font-sans">
          <p className={"text-lg inline font-extrabold"}>
            EightAthletics.com doesn&apos;t use third-party cookies
          </p>
          <p className={"inline-flex w-full"}>- only first-party cookies.</p>
          <p className={"pt-4 text-sm"}>
            No data is sent, shared or sold to a third-party.
          </p>

          <div className="flex gap-2 xl:gap-4 flex-col mt-4 w-full">
            <button
              className="bg-yellow-300 hover:bg-yellow-300/90 border-2 border-mask-black text-black w-full font-bold py-2 px-4 rounded hover:underline transition-colors"
              onClick={acceptCookies}
            >Yes to Safe Cookies</button>
            <button
              className="bg-mask-black/90 hover:bg-mask-black border border-yellow-300 text-white w-full font-bold py-2 px-4 rounded hover:underline transition-colors"
              onClick={declineCookies}
            >
              No Cookies, Please
            </button>
          </div>
        </div>
        <div className={"pt-4 pr-3 font-sans hidden lg:block "}>
          <p className={"text-black text-md font-normal py-1 italic"}>
            Click the cookie to learn more
          </p>
          <Tooltip
            content={tooltipContent}
            showArrow
            placement="right-start"
            color={"foreground"}
            size={"lg"}
            classNames={{
              base: ["before:bg-neutral-400 dark:before:bg-white"],
              content: [
                "py-2 px-4 shadow-xl",
                "bg-gradient-to-br from-black to-bg-gray-900 max-w-sm backdrop-blur-lg text-white p-2 md:p-4",
              ],
            }}
          >
            <Link href="/terms/cookie-policy">
              <Image
                height={400}
                width={300}
                quality={92}
                src="/images/ursulla-cookie-banner-arrow.png"
                alt="Ursulla Cookie Banner"
                className="w-[50%] h-full lg:w-[90%] object-cover "
              />
            </Link>
          </Tooltip>
        </div>
      </div>
      {/*<div*/}
      {/*  className={`pt-4 pr-3 font-sans fixed z-50 left-4 bottom-0 lg:hidden  ${*/}
      {/*    cookieConsent !== null ? "flex" : "flex"*/}
      {/*  }`}*/}
      {/*>*/}
      {/*  <Link href="/terms/cookie-policy" className="">*/}
      {/*    <Image*/}
      {/*      height={400}*/}
      {/*      width={200}*/}
      {/*      quality={100}*/}
      {/*      src="/images/ursulla-cookie-banner-arrow.png"*/}
      {/*      alt="Ursulla Cookie Banner"*/}
      {/*      className="w-[70%] h-full lg:w-[90%] object-cover "*/}
      {/*    />*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </>
  )
}
