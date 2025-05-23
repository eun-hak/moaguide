import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx,html}',  
    './public/**/*.html',
    './utils/**/*.{js,ts}',
    './server/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontSize: {
        heading1: ['28px', { lineHeight: '160%', fontWeight: '700' }],
        heading2: ['24px', { lineHeight: '160%', fontWeight: '700' }],
        heading3: ['20px', { lineHeight: '160%', fontWeight: '700' }],
        heading4: ['18px', { lineHeight: 'normal', fontWeight: '700' }],
        title1: ['16px', { lineHeight: '160%', fontWeight: '700' }],
        title2: ['16px', { lineHeight: 'normal', fontWeight: '700' }],
        body1: ['16px', { lineHeight: 'normal', fontWeight: '600' }],
        body2: ['16px', { lineHeight: 'normal', fontWeight: '500' }],
        body3: ['16px', { lineHeight: '148%', fontWeight: '500' }],
        body4: ['15px', { lineHeight: '168%', fontWeight: '500' }],
        body5: ['14px', { lineHeight: 'normal', fontWeight: '700' }],
        mobileTitle: ['14px', { lineHeight: '160%', fontWeight: '700' }],
        body6: ['14px', { lineHeight: 'normal', fontWeight: '600' }],
        body7: ['14px', { lineHeight: 'normal', fontWeight: '500' }],
        body8: ['14px', { lineHeight: 'normal', fontWeight: '400' }],
        caption1: ['12px', { lineHeight: 'normal', fontWeight: '700' }],
        caption2: ['12px', { lineHeight: 'normal', fontWeight: '600' }],
        caption3: ['12px', { lineHeight: 'normal', fontWeight: '500' }],
        caption4: ['10px', { lineHeight: 'normal', fontWeight: '500' }]
      },
      colors: {
        white: '#FFFFFF',
        gray50: '#F8F8F8',
        bg: '#F7F8FB',
        gray100: '#ECEFF2',
        gray200: '#CCCFD3',
        gray300: '#A2A5AA',
        gray400: '#6E6F73',
        gray500: '#424345',
        gray600: '#343436',
        gray700: '#1E1E1E',
        black: '#000000',
        normal: '#6F36E8',
        light: '#01BA77',
        gradient: '#713CE2',
        gradient1: 'linear-gradient(180deg, #713CE2 10.45%, #5200FF 100%)',
        gradient2: 'linear-gradient(136deg, #713CE2 -0.72%, #5200FF 100.49%)',
        gradient3: 'linear-gradient(176deg, #9C6DFF 14.56%, #8000FF 98.72%)',
        gradient4: 'linear-gradient(180deg, #0A84FF 0%, rgba(10, 132, 255, 0.50) 100%)',
        error: '#FF453A',
        success: '#0A84FF'
      },
      backgroundImage: {
        gradient1: 'linear-gradient(180deg, #713CE2 10.45%, #5200FF 100%)',
        gradient2: 'linear-gradient(136deg, #713CE2 -0.72%, #5200FF 100.49%)',
        gradient3: 'linear-gradient(176deg, #9C6DFF 14.56%, #8000FF 98.72%)',
        gradient4: 'linear-gradient(180deg, #0A84FF 0%, rgba(10, 132, 255, 0.50) 100%)'
      },
      screens: {
        desk2: '540px',
        desk1: '450px',
        desk: '340px',
        sm: '640px',
        md: '768px',
        md2: '900px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      boxShadow: {
        'custom-light': '0px 2px 8px 0px rgba(95, 95, 95, 0.03)',
        'custom-normal': '0px 2px 12px 0px rgba(185, 191, 201, 0.25)'
      },
      borderColor: {
        gradient1: 'linear-gradient(180deg, #713CE2 10.45%, #5200FF 100%)',
        gradient2: 'linear-gradient(136deg, #713CE2 -0.72%, #5200FF 100.49%)',
        gradient3: 'linear-gradient(176deg, #9C6DFF 14.56%, #8000FF 98.72%)',
        gradient4: 'linear-gradient(180deg, #0A84FF 0%, rgba(10, 132, 255, 0.50) 100%)'
      },
      keyframes: {
        countdownAnimation: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '1' },
          '100%': { transform: 'scale(0.5)', opacity: '0' }
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateY(-20px) translateX(-50%)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateX(-50%)' }
        },
        'slide-out': {
          '0%': { opacity: '1', transform: 'translateY(0) translateX(-50%)' },
          '100%': { opacity: '0', transform: 'translateY(-20px) translateX(-50%)' }
        }
      },
      animation: {
        countdown: 'countdownAnimation 1s ease-in-out',
        'slide-in': 'slide-in 0.5s forwards',
        'slide-out': 'slide-out 0.5s forwards'
      },
      backgroundSize: {
        custom: '1107px 1069px',
      }
    }
  },
  plugins: []
};
export default config;
