'use client'
import React from 'react';
import Script from 'next/script';

interface IconColorScheme {
    primary: string;
    secondary: string;
    outline: string;
}

interface TrackingComponentProps {
    title?: string;
    description?: string;
    defaultErrorMessage?: string;
    loaderMessage?: string;
    trackingNumberQueryParam?: string[];
    errorImageUrl?: string;
    iconColorScheme?: IconColorScheme;
}

const TrackingComponent: React.FC<TrackingComponentProps> = ({
                                                                 title = '',
                                                                 description = '',
                                                                 defaultErrorMessage = '',
                                                                 loaderMessage = '',
                                                                 trackingNumberQueryParam = ['package_number', 'tracking_number', 'tracking', 'shipment'],
                                                                 errorImageUrl = '',
                                                                 iconColorScheme = {
                                                                     primary: '#ffffff',
                                                                     secondary: '#ffffff',
                                                                        outline: '#000000'
                                                                 }
                                                             }) => {
    return (
        <div>
            <Script
                src="https://assets.coolrunner.dk/scripts/embeddable-tracking/embeddable-tracking.js"
                strategy="afterInteractive"
                onLoad={() => {
                    if (typeof window !== 'undefined') {
                        new (window as any).Homerunner.Tracking({
                            target: document.getElementById("tracking"),
                            props: {
                                allowManualLookup: true,
                                title,
                                description,
                                defaultErrorMessage,
                                loaderMessage,
                                trackingNumberQueryParam,
                                errorImageUrl,
                                iconColorScheme
                            }
                        });
                    }
                }}
            />
            <link rel="stylesheet" href="https://assets.coolrunner.dk/scripts/embeddable-tracking/embeddable-tracking.css"/>
               <div id="tracking"  className={"bg-cbg"}/>



        </div>
    )
}

export default TrackingComponent;