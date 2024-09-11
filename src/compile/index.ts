import fs from 'fs'
import typescript from '@rollup/plugin-typescript'
import { rollup } from 'rollup'
import chalk from 'chalk'

import { create_manifest } from '~/manifest'
import { generate_action_class } from '~/compile/actions'
import type { PluginData, SpikeyCompiledResult } from '~/types/core'

/**
 * Main function to compile the plugin entrypoint and actions
 *
 * @param {string} cwd - The current working directory
 */
export const compile_plugin = async (cwd: string): Promise<SpikeyCompiledResult> => {
	if (!(await compile_entrypoint(cwd))) {
		return {
			success: false,
		}
	}

	// Get the exported plugin data from the plugin.ts file in the src directory using the current working directory
	const plugin_data = (await import(`file://${cwd}/.spikey/build/plugin.js`).then(
		(module) => module.metadata
	)) as PluginData

	if (!plugin_data) {
		console.error(chalk.red('Failed to get plugin data'))

		return {
			success: false,
		}
	}

	// Create manifest.json file
	const manifest = create_manifest(plugin_data)

	if (!(await compile_action(cwd, plugin_data))) {
		return {
			success: false,
		}
	}

	return {
		plugin_data,
		manifest,
		success: true,
	}
}

/**
 * Compiles the plugin actions in the src/actions directory
 * Also create the actions metadata for the manifest.json an adds it to the manifest.json file
 *
 * @param {string} cwd - The current working directory
 */
const compile_action = async (cwd: string, plugin_data: PluginData): Promise<boolean> => {
	//  Get all the files in the actions directory
	const files: string[] = []
	fs.readdirSync(`${cwd}/src/actions`).forEach((file) => files.push(file))

	// Bundle the actions using rollup
	const bundle = await rollup({
		input: Array.from(files).map((file) => `src/actions/${file}`),
		plugins: [
			typescript({
				tsconfig: `${cwd}/tsconfig.json`,
			}),
		],
	})

	if (!bundle) {
		console.error(chalk.red('Failed to bundle actions'))

		return false
	}

	const { output } = await bundle.generate({
		dir: '.spikey/build/actions',
		format: 'es',
		compact: true,
	})

	// Check if the onKeyDown function is being exported from the actions
	if (!output[0].exports.find((value) => value !== 'onKeyDown')) {
		console.error(chalk.red('onKeyDown function is not being exported from actions'))

		return false
	}

	// Create the actions metadata for the manifest.json an adds it to the manifest.json file
	const actions_metadata: ManifestAction[] = output.map(
		(action) =>
			({
				Name: action.name,
				UUID: `${plugin_data.uuid}.${action.name}`,
				Icon: 'imgs/icon.png',
				States: [],
			}) as ManifestAction
	)

	// Generate the action class files
	actions_metadata.forEach((action) => generate_action_class(action, output[0].code))

	// Add the actions metadata to the manifest.json file
	const manifest = JSON.parse(
		fs.readFileSync(`${cwd}/.spikey/${plugin_data.uuid}.sdPlugin/manifest.json`, 'utf8')
	) as Manifest
	manifest.Actions = manifest.Actions.concat(actions_metadata)

	fs.writeFileSync(`${cwd}/.spikey/${plugin_data.uuid}.sdPlugin/manifest.json`, JSON.stringify(manifest, null, 2))

	await bundle.close()

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
