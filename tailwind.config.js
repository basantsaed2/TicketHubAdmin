/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        TextFontLight: ["Light"],
        TextFontRegular: ["Regular"],
        TextFontMedium: ["Medium"],
        TextFontSemiBold: ["SemiBold"],
        TextFontBold: ["Bold"],
      },
      colors: {
        mainColor: '#1E1E2F',
        secoundColor: '#F58220',
        thirdColor: "#6B6A6A",
        AddText: "#5E5E5E",
      },
      boxShadow: {
        '4xl': '0 10px 30px rgba(0, 0, 0, 0.5)', // Customize this as needed
      },
      backgroundColor: {
        mainColor: '#1E1E2F',
        secoundColor: '#F58220',
  			thirdColor: '#6B6A6A',
        fourthColor: '#565656',
        fifthColor: '#E8E8EA',
        AddText: '#5E5E5E',
      },
      screens: {
        sm: "320px",
        md: "640px",
        lg: "740px",
        xl: "1280px",
        // "2xl": "1536px",
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
  // Optional: Configure DaisyUI themes if needed
  daisyui: {
    themes: ["light", "dark"], // or your custom themes
  },
};
