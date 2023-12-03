// components/analytics/CookieBanner.tsx
'use client';

import Link from 'next/link'
import {getLocalStorage, setLocalStorage} from '@/lib/analytics/StorageHelper';
import {useState, useEffect} from 'react';
import {usePostHog} from "posthog-js/react";
import Image from "next/image";


export default function CookieBanner() {
    const posthog = usePostHog();
    const [cookieConsent, setCookieConsent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null);
        setCookieConsent(storedCookieConsent);
        setIsLoading(false);
    }, []);

    const acceptCookies = () => {
        posthog.opt_in_capturing();
        updateConsentState(true);
    };

    const declineCookies = () => {
        posthog.opt_out_capturing();
        updateConsentState(false);
    };

    const updateConsentState = (consent) => {
        setCookieConsent(consent);
        setLocalStorage("cookie_consent", consent);

        const newValue = consent ? 'granted' : 'denied';
        window.gtag("consent", 'update', {
            'analytics_storage': newValue,
            'ad_storage': newValue,
            'ad_user_data': newValue,
            'ad_personalization': newValue
        });
    };

    useEffect(() => {
        if (!isLoading) {
            const newValue = cookieConsent ? 'granted' : 'denied';

            window.gtag("consent", 'update', {
                'analytics_storage': newValue,
                'ad_storage': newValue,
                'ad_user_data': newValue,
                'ad_personalization': newValue
            });

            setLocalStorage("cookie_consent", cookieConsent);
        }
    }, [cookieConsent, isLoading]);

    if (isLoading) {
        return null;
    }

    return (
        <div
            className={`fixed z-50 left-10 lg:bottom-5 bottom-[75px] bg-black/80 backdrop-blur-lg dark:bg-gray-800 rounded-lg 
        shadow-lg   sm:max-w-md lg:max-w-lg  mx-auto border border-white/20 mb-2
        ${cookieConsent !== null ? "flex" : "flex"} flex-col lg:flex-row lg:items-start justify-between`}>
            <div className="text-white  pl-5 pr-3 py-5 lg:mt-0 flex flex-col items-center lg:items-start font-sans">
                <p className={"text-lg inline font-extrabold"}>EightAthletics.com doesn't use third-party cookies</p>
                <p className={"inline-flex "}>- only first-party cookies.</p>
                <p className={"pt-4 text-sm"}>No data is sent, shared or sold to a third-party.</p>

                <div className="flex gap-2 flex-col mt-4 w-full">
                    <button
                        className="bg-yellow-300 hover:bg-yellow-300/90 border-2 border-mask-black text-black w-full font-bold py-2 px-4 rounded hover:underline transition-colors"
                        onClick={acceptCookies}>
                        Accept
                    </button>
                    <button
                        className="bg-mask-black/80 hover:bg-mask-black border border-yellow-300 text-white w-full font-bold py-2 px-4 rounded hover:underline transition-colors"
                        onClick={declineCookies}>
                        Decline
                    </button>

                </div>
            </div>
            <div className={"pt-4 pr-3 font-sans"}>
            {/*   Text Click cookie to learn more */}
                <p className={"text-yellow-300 text-md font-normal pt-1 pb-1"}>Click the cookie to learn more</p>
                <Link href="/terms/cookie-policy" className="">
            <Image height={400} width={300} quality={92} src="/images/ursulla-cookie-banner-arrow.png" alt="Ursulla Cookie Banner"
                   className="w-40 h-40 lg:w-[90%] lg:h-full object-cover "/>


                </Link>
            </div>
        </div>
    )
}