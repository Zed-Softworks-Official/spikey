import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import tsup from 'tsup'

import { create_manifest } from '~/compile/manifest'
import { create_spikey_sdplugin } from '~/f'
// import { create_action } from '~/compile/actions'
// import { create_entrypoint } from '~/compile/entrypoint'

import type { PluginData, SpikeyCompiledResult } from '~/types/core'

/**
 * Main function to compile the plugin entrypoint and actions
 *
 */
export const compile_plugin = async (): Promise<SpikeyCompiledResult | null> => {
	// Get the source files in the src directory
	const src_files = scan_files()

	// Get the exported plugin data from the plugin.ts file in the src directory
	const plugin_data = await generate_plugin_data()

	if (!plugin_data) {
		console.error(chalk.red('Failed fetching manifest data'))

		return null
	}

	// Create Stream Deck plugin directory
	create_spikey_sdplugin(plugin_data)

	// Create manifest.json file
	const manifest = create_manifest(plugin_data)

	// Compile the actions

	// Create the entrypoint

	return {
		plugin_data,
		manifest,
	}
	// if (!(await compile_entrypoint(cwd))) {
	// 	return {
	// 		success: false,
	// 	}
	// }
	// // Get the exported plugin data from the plugin.ts file in the src directory using the current working directory
	// const plugin_data = (await import(`file://${cwd}/.spikey/build/plugin.js`).then(
	// 	(module) => module.metadata
	// )) as PluginData
	// if (!plugin_data) {
	// 	console.error(chalk.red('Failed to get plugin data'))
	// 	return {
	// 		success: false,
	// 	}
	// }
	// // Create manifest.json file
	// const manifest = create_manifest(plugin_data)
	// if (!(await compile_action(cwd, plugin_data))) {
	// 	return {
	// 		success: false,
	// 	}
	// }
	// return {
	// 	plugin_data,
	// 	manifest,
	// 	success: true,
	// }
}

const generate_plugin_data = async (): Promise<PluginData | null> => {
	await tsup.build({
		entry: ['./spikey.config.ts'],
		format: 'esm',
		outDir: '.spikey/build',
		minify: true,
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

/**
 * Compiles the plugin actions in the src/actions directory
 * Also create the actions metadata for the manifest.json an adds it to the manifest.json file
 *
 * @param {string} cwd - The current working directory
 */
// const compile_action = async (cwd: string, plugin_data: PluginData): Promise<boolean> => {
//  Get all the files in the actions directory
// const files: string[] = []
// fs.readdirSync(`${cwd}/src/actions`).forEach((file) => files.push(file))

// // Bundle the actions using rollup
// const bundle = await rollup({
// 	input: Array.from(files).map((file) => `src/actions/${file}`),
// 	plugins: [
// 		typescript({
// 			tsconfig: `${cwd}/tsconfig.json`,
// 		}),
// 	],
// })

// if (!bundle) {
// 	console.error(chalk.red('Failed to bundle actions'))

// 	return false
// }

// const { output } = await bundle.generate({
// 	dir: '.spikey/build/actions',
// 	format: 'es',
// 	compact: true,
// })

// // Check if the onKeyDown function is being exported from the actions
// if (!output[0].exports.find((value) => value !== 'onKeyDown')) {
// 	console.error(chalk.red('onKeyDown function is not being exported from actions'))

// 	return false
// }

// // Create the actions metadata for the manifest.json an adds it to the manifest.json file
// const actions_metadata: ManifestAction[] = output.map(
// 	(action) =>
// 		({
// 			Name: action.name,
// 			UUID: `${plugin_data.uuid}.${action.name}`,
// 			Icon: 'imgs/icon.png',
// 			States: [],
// 		}) as ManifestAction
// )

// // Generate the action class files
// for (const action of actions_metadata) {
// 	await create_action(action, `src/actions/${action.Name}.ts`)
// }

// // Add the actions metadata to the manifest.json file
// const manifest = JSON.parse(
// 	fs.readFileSync(`${cwd}/.spikey/${plugin_data.uuid}.sdPlugin/manifest.json`, 'utf8')
// ) as Manifest
// manifest.Actions = manifest.Actions.concat(actions_metadata)

// fs.writeFileSync(`${cwd}/.spikey/${plugin_data.uuid}.sdPlugin/manifest.json`, JSON.stringify(manifest, null, 2))

// await bundle.close()

// return true
// }

/**
 * Compiles the plugin entrypoint (src/plugin.ts)
 *
 * @param {string} cwd - The current working directory
 */
// const compile_entrypoint = async (cwd: string): Promise<boolean> => {
// // Bundle the plugin using rollup
// const bundle = await rollup({
// 	input: 'src/plugin.ts',
// 	plugins: [
// 		typescript({
// 			tsconfig: `${cwd}/tsconfig.json`,
// 		}),
// 	],
// })

// if (!bundle) {
// 	console.error(chalk.red('Failed to bundle plugin'))

// 	return false
// }

// const { output } = await bundle.generate({
// 	dir: '.spikey/build',
// 	format: 'es',
// 	compact: true,
// })

// // Write the plugin to the .spikey/build directory
// fs.writeFileSync(`${cwd}/.spikey/build/plugin.js`, output[0].code)

// return true
// }
