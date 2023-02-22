import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	define: {
			'process.env': process.env,
	},
	esbuild: {
		keepNames: true, // typeorm migrations require timestamp in their names and this way it can be defined with name property
	},
	build: {
		commonjsOptions: {
			transformMixedEsModules: true, // https://github.com/rollup/plugins/tree/master/packages/commonjs#transformmixedesmodules
		},
	},
};

export default config;
