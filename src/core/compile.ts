import fs from 'fs'
import typescript from '@rollup/plugin-typescript'
import { rollup } from 'rollup'
import chalk from 'chalk'

/**
 * Main function to compile the plugin entrypoint and actions
 *
 * @param {string} cwd - The current working directory
 */
export const compile_plugin = async (cwd: string): Promise<boolean> => {
	if (!(await compile_entrypoint(cwd))) {
		return false
	}

	if (!(await compile_action(cwd))) {
		return false
	}

	return true
}

/**
 * Compiles the plugin actions in the src/actions directory
 * Also create the actions metadata for the manifest.json an adds it to the manifest.json file
 *
 * @param {string} cwd - The current working directory
 */
const compile_action = async (cwd: string): Promise<boolean> => {
	return true
}

/**
 * Compiles the plugin entrypoint (src/plugin.ts)
 *
 * @param {string} cwd - The current working directory
 */
const compile_entrypoint = async (cwd: string): Promise<boolean> => {
	// Bundle the plugin using rollup
	const bundle = await rollup({
		input: 'src/plugin.ts',
		plugins: [
			typescript({
				tsconfig: `${cwd}/tsconfig.json`,
			}),
		],
	})

	if (!bundle) {
		console.error(chalk.red('Failed to bundle plugin'))

		return false
	}

	const { output } = await bundle.generate({
		dir: '.spikey/build',
		format: 'es',
		compact: true,
	})

	// Write the plugin to the .spikey/build directory
	fs.writeFileSync(`${cwd}/.spikey/build/plugin.js`, output[0].code)

	return true
}
