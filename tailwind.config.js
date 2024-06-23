/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './pages/**/*.{html,js,tsx,ts}',
    // './components/**/*.{html,js,tsx,ts}',
    './src/**/*.{html,js,tsx,ts}',
  ],
  theme:{
    extend:{
      colors: {
        'blue-custom': '#C6D4D8',
        'gold': '#ddb354',
      },
      spacing: {
        '1': '5px', 
      },
      backgroundImage: theme => ({
        'picMain': "url('/backgroundMain.png')",
        'picLogin': "url('/backgroundLogin.png')",
      }),
    },
  },
  plugins:[],
}