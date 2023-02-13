/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}', 
    require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
  ],
  theme: {
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      'bottomline': '100% 1px',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
  ],
}
