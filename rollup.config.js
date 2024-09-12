import typescript from '@rollup/plugin-typescript'

export default [
	{
		input: './src/index.ts',
		output: {
			dir: './dist',
			format: 'es',
		},
		external: ['chalk', 'fs', 'rollup', '@rollup/plugin-typescript'],
		plugins: [
			typescript({
				tsconfig: './tsconfig.json',
			}),
		],
	},
	{
		input: './src/cli/index.ts',
		output: {
			dir: './dist/cli',
			format: 'es',
		},
		external: ['chalk', 'commander', 'nanospinner', 'rollup', 'fs', '@rollup/plugin-typescript'],
		plugins: [
			typescript({
				tsconfig: './tsconfig.json',
			}),
		],
	},
]
