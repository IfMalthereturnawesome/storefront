'use client';

import { useEffect } from 'react';

const usePageSettings = () => {
    useEffect(() => {
        const header = document.getElementById('header_1');
        const banner = document.getElementById('banner');
        const darkMode = document.getElementById('theme-toggle');
        const body = document.querySelector('body');
        const main = document.querySelector('main');


        if (header) {
            header.style.backgroundColor = '#030203';


        }

        if (banner) {
            banner.style.display = 'none';
        }

        if (darkMode) {
            darkMode.style.opacity = '0';
            darkMode.style.pointerEvents = 'none';

        }

        if (body) {
            body.classList.add('dark');

        }

        if (main) {
            main.classList.remove('bg-cyan-1')
        }



        return () => {
            if (header) {
                header.style.backgroundColor = ''; // Reset to original color

            }
            if (banner) {
                banner.style.display = ''; // Reset to original display value
            }
            if (darkMode) {
                darkMode.style.opacity = '1'; // Reset to original display value
                darkMode.style.pointerEvents = 'auto';

            }
            if (body) {
                body.classList.remove('dark');


            }
            if (main) {
                main.classList.add('bg-cyan-1')
            }
        };
    }, []);
};

export default usePageSettings;
