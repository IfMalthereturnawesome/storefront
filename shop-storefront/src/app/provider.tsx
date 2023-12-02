"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

if (typeof window !== "undefined") {
    // @ts-ignore
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false,
        opt_out_capturing_by_default: true,
    });
}

export function PostHogPageview(): JSX.Element {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {

        const capturePageLeave = () => {
            posthog.capture("$pageleave", {
                $current_url: window.location.href
            });
        };


        if (pathname) {
            let url = window.origin + pathname;
            if (searchParams && searchParams.toString()) {
                url += `?${searchParams.toString()}`;
            }
            posthog.capture("$pageview", {
                $current_url: url,
            });
        }


        window.addEventListener("beforeunload", capturePageLeave);


        return () => {
            window.removeEventListener("beforeunload", capturePageLeave);
        };
    }, [pathname, searchParams]);

    return <></>;
}

export function PHProvider({ children }: { children: React.ReactNode }) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
