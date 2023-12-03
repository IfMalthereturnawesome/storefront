'use client';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
    const [tooltipContent, setTooltipContent] = useState('Toggle dark mode');
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    useEffect(() => {
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        const themeToggleBtn = document.getElementById('theme-toggle');

        if (!themeToggleDarkIcon || !themeToggleLightIcon || !themeToggleBtn) return;

        const toggleTheme = () => {
            const html = document.querySelector('html');
            if (!html) return;

            const isDarkMode = html.classList.contains('dark');
            if (isDarkMode) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                setTooltipContent('Toggle dark mode');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                setTooltipContent('Toggle light mode');
            }
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');
        };

        // Set the initial theme and tooltip content
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark' || !currentTheme) {
            document.documentElement.classList.add('dark');
            themeToggleLightIcon.classList.remove('hidden');
            setTooltipContent('Toggle light mode');
        } else {
            document.documentElement.classList.remove('dark');
            themeToggleDarkIcon.classList.remove('hidden');
            setTooltipContent('Toggle dark mode');
        }

        // Event listeners for toggling theme
        themeToggleBtn.addEventListener('click', toggleTheme);

        // Event listeners for showing and hiding tooltip
        themeToggleBtn.addEventListener('mouseenter', () => setIsTooltipVisible(true));
        themeToggleBtn.addEventListener('mouseleave', () => setIsTooltipVisible(false));

        // Cleanup function
        return () => {
            themeToggleBtn.removeEventListener('click', toggleTheme);
            themeToggleBtn.removeEventListener('mouseenter', () => setIsTooltipVisible(true));
            themeToggleBtn.removeEventListener('mouseleave', () => setIsTooltipVisible(false));
        };
    }, []);

    return (
        <button
            type="button"
            id="theme-toggle"
            className="z-20 rounded-lg text-sm text-gray-500 dark:text-gray-400 pr-4 md:pr-0"
        >
            {/* SVG for dark mode icon */}
            <svg
                id="theme-toggle-dark-icon"
                className="hidden h-5 w-5 xl:h-6 xl:w-6 fill-mask-black"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
                id="theme-toggle-light-icon"
                className="hidden h-5 w-5 xl:h-6 xl:w-6 fill-custom-white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                ></path>
            </svg>


            <span className="sr-only">Toggle dark mode</span>
            <div
                id="tooltip-theme-toggle"
                role="tooltip"
                className={`tooltip absolute z-10 inline-block rounded-lg bg-cbg px-3 py-2 text-sm font-medium text-black shadow-sm transition-opacity duration-300 dark:bg-gray-700 dark:text-white ${isTooltipVisible ? 'visible opacity-100' : 'invisible opacity-0'}`}
            >
                {tooltipContent}
            </div>
        </button>
    );
};