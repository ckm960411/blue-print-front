import type { Config } from 'tailwindcss';

const px0_500 = Array.from(Array(501))
  .map((_, i) => `${i}px`)
  .reduce((a, b) => {
    return { [b]: b, ...a };
  }, {});

const fontSize0_50px = Array.from(Array(51))
  .map((_, i) => `${i}px`)
  .reduce((a, b) => {
    return { [b]: [b, { lineHeight: '1' }], ...a };
  }, {});

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        main: '#001487',
      },
      spacing: {
        ...px0_500,
      },
      fontSize: {
        ...fontSize0_50px,
      },
    },
  },
  plugins: [],
};
export default config;
