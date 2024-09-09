import typescript from '@rollup/plugin-typescript'

export default {
	input: 'src/plugin.ts',
	output: {
		dir: '.spikey/build',
		format: 'es',
		compact: true,
	},
	plugins: [
		typescript({
			tsconfig: './tsconfig.json',
		}),
	],
}
