import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts', 'src/cli/index.ts'],
	clean: true,
	minify: true,
	format: 'esm',
	bundle: true,
	external: ['chalk', 'fs', 'commander', 'nanospinner', 'tsup', 'inquirer'],
	tsconfig: 'tsconfig.json',
	dts: true,
})
