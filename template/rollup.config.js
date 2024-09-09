import typescript from '@rollup/plugin-typescript'

export default {
	input: 'src/plugin.ts',
	output: {
		dir: '.spikey/dev.zedsoftworks-llc.spikey-counter.sdPlugin/bin',
		format: 'es',
	},
	plugins: [
		typescript({
			tsconfig: './tsconfig.json',
		}),
	],
}
