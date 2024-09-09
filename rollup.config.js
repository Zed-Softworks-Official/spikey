import typescript from '@rollup/plugin-typescript'

export default [
	{
		input: './src/index.ts',
		output: {
			dir: './dist',
			format: 'es',
		},
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
		plugins: [
			typescript({
				tsconfig: './tsconfig.json',
			}),
		],
	},
]
