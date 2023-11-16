"use client"

import { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSInit = () => {
    useEffect(() => {
        AOS.init({
            once: false,
            disable: 'phone',
            duration: 600,
            easing: 'ease-out-sine',
        });
    });

    return null
}