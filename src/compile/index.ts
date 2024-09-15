import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import tsup from 'tsup'

import { create_manifest } from '~/compile/manifest'
import { create_spikey_sdplugin } from '~/f'
import { create_action } from '~/compile/actions'
// import { create_entrypoint } from '~/compile/entrypoint'

import type { PluginData } from '~/types/core'

/**
 * Main function to compile the plugin entrypoint and actions
 *
 */
export const compile_plugin = async (): Promise<boolean> => {
	// Get the source files in the src directory
	const src_files = scan_files()

	// Get the exported plugin data from the plugin.ts file in the src directory
	const plugin_data = await generate_plugin_data()

	if (!plugin_data) {
		console.error(chalk.red('Failed fetching config file'))

		return false
	}

	// Create Stream Deck plugin directory
	create_spikey_sdplugin(plugin_data)

	// Create manifest.json file
	const manifest = create_manifest(plugin_data)

	// Compile the actions
	const actions: ActionDefinition[] = []
	for (const action_src of src_files) {
		// if the source file is not an action then skip it
		if (action_src.type !== 'action') {
			continue
		}

		actions.push(await create_action(action_src.path, plugin_data))
	}

	// Create the entrypoint

	return true
}

const generate_plugin_data = async (): Promise<PluginData | null> => {
	await tsup.build({
		entry: ['./spikey.config.ts'],
		format: 'esm',
		outDir: '.spikey/build',
		minify: true,
		dts: false,
		tsconfig: 'tsconfig.json',
	})

	const plugin_data = await import(`file://${path.resolve('.spikey/build/spikey.config.js')}`).then(
		(module) => module.default
	)

	if (!plugin_data) {
		return null
	}

	return plugin_data
}

const scan_files = () => {
	const files = dir_scan('src/')
	const src_files: SourceFile[] = []

	files.forEach((file) => {
		let type: 'action' | 'user' = 'user'

		if (file.includes(path.parse('src/actions').name)) {
			type = 'action'
		}

		src_files.push({
			path: file,
			type: type,
		})
	})

	return src_files
}

const dir_scan = (dir: string) => {
	let results: string[] = []

	const list = fs.readdirSync(dir)
	list.forEach((file) => {
		file = path.resolve(dir, file)
		const stat = fs.statSync(file)
		if (stat && stat.isDirectory()) {
			// Recursively scan subdirectories
			results = results.concat(dir_scan(file))
		} else {
			// is a file
			results.push(file)
		}
	})

	return results
}
