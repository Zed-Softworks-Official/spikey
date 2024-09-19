import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import tsup from 'tsup'

import { create_spikey_sdplugin } from '~/f'

import { create_manifest } from '~/compile/manifest'
import { create_action } from '~/compile/actions'

import { create_entrypoint } from '~/compile/entrypoint'

import type { PluginData } from '~/types/core'

/**
 * Main function to compile the plugin entrypoint and actions
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
	for (let i = 0; i < src_files.length; i++) {
		const action_src = src_files[i]
		// if the source file is not an action then skip it
		if (action_src.type !== 'action') {
			continue
		}

		actions.push(await create_action(action_src.path, plugin_data))

		// Update the manifest
		manifest.Actions.push(actions[i].action_data)
	}

	// Create the entrypoint
	create_entrypoint(actions)

	// Create the manifest.json file
	fs.writeFileSync(`.spikey/${plugin_data.uuid}.sdPlugin/manifest.json`, JSON.stringify(manifest, null, 2))

	// Bundle the plugin
	await tsup.build({
		entry: ['.spikey/build/plugin.ts'],
		format: 'esm',
		outDir: `.spikey/${plugin_data.uuid}.sdPlugin/bin`,
		minify: false,
		bundle: true,
		dts: false,
		silent: true,
	})

	// Move the assets to the .spikey/{sdplugin_uuid}/imgs directory
	move_assets(plugin_data, manifest)

	return true
}

/**
 * Generates the plugin data from the spikey.config.ts file
 */
const generate_plugin_data = async (): Promise<PluginData | null> => {
	await tsup.build({
		entry: ['./spikey.config.ts'],
		format: 'esm',
		outDir: '.spikey/build',
		minify: true,
		dts: false,
		tsconfig: 'tsconfig.json',
		silent: true,
	})

	const plugin_data = await import(`file://${path.resolve('.spikey/build/spikey.config.js')}`).then(
		(module) => module.default
	)

	if (!plugin_data) {
		return null
	}

	return plugin_data
}

/**
 * Recursively scans the src directory for files and labels each tile
 * as an action or a user file
 */
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

/**
 * Recursively scans a directory and returns an array of files
 *
 * @param {string} dir - The directory to scan
 */
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

/**
 * Uses the manifest to move the assets to the .spikey/{sdplugin_uuid}/imgs directory
 *
 * @param {PluginData} plugin_data - The plugin data object
 * @param {Manifest} manifest - The manifest object
 */
const move_assets = (plugin_data: PluginData, manifest: Manifest) => {
	// Look for the imgs in the manifest and move them to the .spikey/{sdplugin_uuid}/imgs directory
	fs.copyFileSync(`assets/${manifest.Icon}`, `.spikey/${plugin_data.uuid}.sdPlugin/imgs/${manifest.Icon}`)
}
