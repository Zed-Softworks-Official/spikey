import chalk from 'chalk'

import fs from 'fs'
import { create_spikey_sdplugin, create_spikey_dirs } from '~/f'
import { create_manifest } from '~/manifest'

import type { PluginData, SpikeyPlugin } from '~/types/core'

/**
 * Initializes the spikey folder structure and creates the manifest.json file
 * @param {PluginData} plugin_data - The plugin data object
 */
export const init_spikey = (cwd: string, plugin_data: PluginData) => {
	// Check all the fields are filled out correctly
	if (plugin_data.uuid?.includes(' ')) {
		console.error(chalk.red('The uuid cannot contain the word " "'))

		return
	}

	// Create .spikey for the plugin
	create_spikey_sdplugin(plugin_data)

	// Move the compiled plugin to the bin directory
	fs.renameSync(`${cwd}/.spikey/build/plugin.js`, `${cwd}/.spikey/${plugin_data.uuid}.sdPlugin/bin/plugin.js`)
}

import { compile_plugin } from '~/core/compile'
export { compile_plugin, create_spikey_dirs }
