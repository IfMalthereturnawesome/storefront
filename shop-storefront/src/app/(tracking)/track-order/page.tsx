import type { Metadata } from 'next';

import Link from 'next/link';

import Container from '@/components/elements/Container';
import TrackingComponent from "@/components/tracking/TrackingHomerunner";
import ChevronDown from "@modules/common/icons/chevron-down";
import Image from "next/image";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Track order',
        description: 'Track your package from Eight Athletics.',
    }
}

export default function TrackOrder() {
    return (
        <Container>
            <div className="bg-cyan-1 relative small:min-h-screen">
            <div className="h-16 lg:h-20">
                <nav className="flex items-center h-full justify-between content-container">
                    <Link
                        href="/"
                        className="text-small-semi text-slate-11 flex items-center gap-x-2 uppercase flex-1 basis-0"
                    >

                            <ChevronDown className="rotate-90" color={"#ded6d6"} size={16} />

                            <span className="mt-px block small:hidden text-slate-11 hover:text-blue-600 dark:hover:text-cgreen transition-colors duration-200">Back</span>

                    </Link>
                    <Link href="/" className="text-xl-semi ">
                        <Image
                            src={'/images/Eight-Athletics-black-logo.svg'}
                            alt={'Eight Athletics Logo'}
                            width={100}
                            height={100}
                            className="dark:hidden"
                        />
                        <Image
                            src={'/images/Eight-Athletics-white-logo.svg'}
                            alt={'Eight Athletics Logo'}
                            width={100}
                            height={100}
                            className="hidden dark:block"
                        />
                    </Link>
                    <div className="flex-1 basis-0" />
                </nav>
            </div>

            <h1 className="text-center mb-vw-20 lg:mb-vw-10 custom-header-1">Track order</h1>

                    <TrackingComponent
                        title="Track Your Package"
                        description="Enter your tracking number below:"
                        defaultErrorMessage="Sorry, we couldn't find your package."
                        loaderMessage="Loading tracking info..."
                        trackingNumberQueryParam={['package_number', 'tracking_number', 'tracking', 'shipment']}
                    />
            </div>

        </Container>
    )
}