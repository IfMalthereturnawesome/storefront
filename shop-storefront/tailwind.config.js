import {nextui} from "@nextui-org/react";
import plugin from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const { blackA, violet, mauve } = require('@radix-ui/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/modules/**/*.{js,ts,jsx,tsx}",
      "/node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: 'class',
    theme: {
      screens: {
        '3xs': '320px',
        '2xs': '375px',
        'xs': '475px',
        '3xl': '1920px',
        ...defaultTheme.screens,
        '2xsmall': '320px',
        'xsmall': '512px',
        'small': '1024px',
        'medium': '1280px',
        'large': '1440px',
        'xlarge': '1680px',
        'xxlarge': '1760px',
        '2xlarge': '1920px',
      },
      extend: {
        drawCard: 'drawCard ',
        colors: {
          caction: {
            50: '#edf9ff',
            100: '#def4ff',
            200: '#c4eaff',
            300: '#a0d9ff',
            400: '#7ac0ff',
            500: '#5aa2fa',
            600: '#3c7fef',
            700: '#2f6ad3',
            800: '#2959aa',
            900: '#294e86',
            950: '#0c1627',
            DEFAULT: '#0c1627',
          },
          csecondary: {
            50: '#eefdfb',
            100: '#d3faf9',
            200: '#adf4f4',
            300: '#74ebec',
            400: '#34d8dc',
            500: '#18bbc2',
            600: '#1797a3',
            700: '#197985',
            800: '#1d626d',
            900: '#1d525c',
            950: '#0c3139',
            DEFAULT: '#0c3139',
          },
          cpink: {
            50: '#fef2f2',
            100: '#ffe1e2',
            200: '#ffc8ca',
            300: '#ffa8ab',
            400: '#fd6c71',
            500: '#f53e44',
            600: '#e22027',
            700: '#be171d',
            800: '#9d171c',
            900: '#821a1e',
            950: '#47080a',
            DEFAULT: '#ffa8ab',
          },
          cbg: {
            50: '#f9f7f7',
            100: '#f5f1f1',
            200: '#e9dfdf',
            300: '#d8c9c9',
            400: '#c1a8a8',
            500: '#a98a8a',
            600: '#917171',
            700: '#795c5c',
            800: '#654f4f',
            900: '#574545',
            950: '#2d2222',
            DEFAULT: '#f5f1f1',
          },
          cgreen: {
            50: '#eefce9',
            100: '#daf8cf',
            200: '#aaf094',
            300: '#89e86e',
            400: '#62d942',
            500: '#41bf23',
            600: '#2e9818',
            700: '#267417',
            800: '#225c18',
            900: '#204e19',
            950: '#0c2b08',
            DEFAULT: '#aaf094',
          },
          gray: {
            100: '#EBF1F5',
            200: '#D9E3EA',
            300: '#C5D2DC',
            400: '#9BA9B4',
            500: '#707D86',
            600: '#55595F',
            700: '#33363A',
            800: '#25282C',
            900: '#151719',
          },
          purple: {
            100: '#F4F4FF',
            200: '#E2E1FF',
            300: '#CBCCFF',
            400: '#ABABFF',
            500: '#8D8DFF',
            600: '#5D5DFF',
            700: '#4B4ACF',
            800: '#38379C',
            900: '#262668',
          },
          about:{
            1:  '#FFA8AB',
            2:  '#AAF094',
            3:  '#FFBDEA',
            4:  '#ef233c',
            5:  '#26532b',

          },
          mask:{
            black: '#030203',
          },
          custom:{
            white: '#faf7f7',
          },
          ...blackA,
          ...violet,
          ...mauve,

        },

        spacing: {
          '9/16': '56.25%',
          '3/4': '75%',
          '1/1': '100%',
        },
        fontFamily: {
          inter: ['var(--font-inter)', 'sans-serif'],
          'architects-daughter': [
            'var(--font-architects-daughter)',
            'sans-serif',
          ],'poppins': ['var(--font-poppins)', 'sans-serif'],

        },
        fontSize: {
          '2xs': '0.625rem',
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '2rem',
          '4xl': '2.5rem',
          '5xl': '3.25rem',
          '6xl': '4rem',
        },
        inset: {
          full: '100%',
        },
        letterSpacing: {
          tighter: '-0.02em',
          tight: '-0.01em',
          normal: '0',
          wide: '0.01em',
          wider: '0.02em',
          widest: '0.4em',
        },
        minWidth: {
          10: '2.5rem',
        },
        maxWidth: {
          '8xl': '100rem',
        },
        scale: {
          98: '.98',
        },
        transitionProperty: {
          "width": "width",
          "spacing": 'margin, padding',
        },

      },
      keyframes: {
        slideUpAndFade: {
          '0%': {opacity: 0, transform: 'translateY(2px)'},
          '100%': {opacity: 1, transform: 'translateY(0)'},
        },
        slideRightAndFade: {
          '0%': {opacity: 0, transform: 'translateX(-2px)'},
          '100%': {opacity: 1, transform: 'translateX(0)'},
        },
        slideDownAndFade: {
          '0%': {opacity: 0, transform: 'translateY(-2px)'},
          '100%': {opacity: 1, transform: 'translateY(0)'},
        },
        slideLeftAndFade: {
          '0%': {opacity: 0, transform: 'translateX(2px)'},
          '100%': {opacity: 1, transform: 'translateX(0)'},
        },
        slideUpEnter: {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: 100,
            transform: "translateY(0px)",
          },
        },
        slideUpLeave: {
          "0%": {
            opacity: 100,
            transform: "translateY(0)",
          },
          "100%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
        },
        enterFromRight: {
          from: { opacity: 0, transform: 'translateX(200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: 0, transform: 'translateX(-200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: 0, transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      animation: {
        slideUpAndFade: 'slideUpAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)',
        slideDownAndFade: 'slideDownAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)',
        slideRightAndFade:
            'slideRightAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)',
        slideLeftAndFade: 'slideLeftAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)',
        slideUpEnter: "slideUpEnter .3s ease-in-out",
        slideUpLeave: "slideUpLeave .3s ease-in-out",
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromLeft: 'enterFromLeft 350ms ease-in-out',
        enterFromRight: 'enterFromRight 350ms ease-in-out',
        exitToLeft: 'exitToLeft 350ms ease-in-out',
        exitToRight: 'exitToRight 350ms ease-in-out',


      },
    },

  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      });
    }),
    nextui(),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('flowbite/plugin'),
    require('flowbite-typography'),
    require('windy-radix-palette'),
    require('windy-radix-typography'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-fluid-spacing'),
    require('tailwindcss-fluid-type')({
      settings: {
        fontSizeMin: 1.125 * 0.85, // 0.75375
        fontSizeMax: 1.25 * 0.85,  // 0.8375
        ratioMin: 1.125,
        ratioMax: 1.2,
        screenMin: 20,
        screenMax: 96,
        unit: 'rem',
        prefix: ''
      },
      values: {
        'xs': [-2 * 1, 1.6],   // -1.34
        'sm': [-1 * 1, 1.6],   // -0.75
        'md': [-0.5, 1.6],        // 0
        'base': [0, 1.8],
        'lg': [1 * 0.75, 1.6],    // 0.75
        'xl': [2 * 0.75, 1.6],    // 1.34
        '2xl': [3 * 0.75, 1.2],   // 2.01
        '3xl': [4 * 0.75, 1.2],   // 2.68
        '4xl': [5 * 0.75, 1.1],   // 3.35
        '5xl': [6 * 0.75, 1.1],   // 4.02
        '6xl': [7 * 0.75, 1.1],   // 4.69
        '7xl': [8 * 0.75, 1],     // 5.36
        '8xl': [9 * 0.75, 1],     // 6.03
        '9xl': [10 * 0.75, 1],    // 6.7
      },
    }),

  ],

};
