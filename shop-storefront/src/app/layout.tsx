import Providers from "@modules/providers"
import "@/css/globals.css"
import { Inter, Architects_Daughter, Poppins } from "next/font/google"
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"
import CookieBanner from "@/components/analytics/CookieBanner"
import { ProvidersNextUI } from "@/app/providers"
import { Analytics } from "@vercel/analytics/react"
import { Metadata } from "next"
import BreakpointsIndicatorExtended from "@/components/helper/breakpointsExtended"
import BreakpointsIndicator from "@/components/helper/breakpoints"
import React, { Suspense } from "react"
import { PHProvider, PostHogPageview } from "./provider"
import Script from "next/script"

const GTAG = process.env.NEXT_PUBLIC_MEASUREMENT_ID

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const architects_daughter = Architects_Daughter({
  subsets: ["latin"],
  variable: "--font-architects-daughter",
  weight: "400",
  display: "swap",
})

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:8000"
  ),
  title:
    "Eight Athletics | Enhance Recovery & Performance for Athletes through Sleep",
  category: "Sleep Products",
  robots: "all",
  description:
    "Experience better sleep and performance with Eight Athletics' sleep products. Tailored for athletes to boost recovery and success - achieve your dreams one night at a time.",
  openGraph: {
    title:
      "Eight Athletics | Enhance Recovery & Performance for Athletes through Sleep",
    description:
      "Experience better sleep and performance with Eight Athletics' sleep products. Tailored for athletes to boost recovery and success - achieve your dreams one night at a time.",
    type: "website",
    images:
      "https://www.eightathletics.com/images/Eight-Athletics-black-logo.svg",
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

function Fallback() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex  items-center  justify-center lg:justify-start">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-8"></div>
      </div>
    </div>
  )
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTAG}');
        `}
      </Script>
      <Suspense fallback={<Fallback />}>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <link rel="dns-prefetch" href="https://region1.google-analytics.com" />

        <body
          className={`${inter.variable} ${poppins.variable}  ${architects_daughter.variable}  font-inter tracking-tight antialiased`}
        >
          {/*<BreakpointsIndicatorExtended />*/}
          {/*<BreakpointsIndicator/>*/}
          <ProvidersNextUI>
            <Providers>
              <div className="flex md:border-2  border-black dark:border-[#FEE7B3] min-h-screen flex-col overflow-hidden bg-mask-black ">
                {children}
              </div>
            </Providers>
          </ProvidersNextUI>
          <Analytics />
          <Suspense fallback={<Fallback />}>
            <GoogleAnalytics GA_MEASUREMENT_ID={GTAG} />
            <CookieBanner />
          </Suspense>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTAG}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
            }}
          />
        </body>
      </PHProvider>
    </html>
  )
}
