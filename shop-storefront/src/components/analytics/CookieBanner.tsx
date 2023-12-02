// components/analytics/CookieBanner.tsx
'use client';

import Link from 'next/link'
import {getLocalStorage, setLocalStorage} from '@/lib/analytics/StorageHelper';
import {useState, useEffect} from 'react';
import { usePostHog } from "posthog-js/react";


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
        <div className={`my-10 mx-auto max-w-max md:max-w-screen-sm z-50
                        fixed bottom-0 left-0 right-0 
                            ${cookieConsent !== null ? "hidden" : "flex"}  px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4  
                         bg-gray-700 rounded-lg shadow`}>

            <div className='text-center'>
                <Link href="/terms/cookie-policy"><p>We use <span className='font-bold text-sky-400'>cookies</span> on
                    our site.</p></Link>
            </div>


            <div className='flex gap-2'>
                <button className='px-5 py-2 text-gray-300 rounded-md border-gray-900'
                        onClick={declineCookies}>Decline</button>
                <button className='bg-gray-900 px-5 py-2 text-white rounded-lg'
                        onClick={acceptCookies}>Allow Cookies</button>
            </div>
        </div>
    )
}