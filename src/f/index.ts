import fs from 'fs'

import { PluginData } from '~/types/core'

export const create_spikey_dirs = () => {
	// Create base directory if it doesn't exist
	if (!fs.existsSync('.spikey')) {
		fs.mkdirSync('.spikey')
	}

	// Create the build directory if it doesn't exist
	if (!fs.existsSync('.spikey/build')) {
		fs.mkdirSync('.spikey/build')
	}

	// Create the buid/actions directory if it doesn't exist
	if (!fs.existsSync('.spikey/build/actions')) {
		fs.mkdirSync('.spikey/build/actions')
	}
}

/**
 * Creates the spikey folder structure for the plugin
 *
 * @param {PluginData} plugin_data - The plugin data object
 */
export const create_spikey_sdplugin = (plugin_data: PluginData) => {
	// if the uuid is not provided, the create one from the plugin data
	if (!plugin_data.uuid) {
		plugin_data.uuid = `com.${plugin_data.author}.${plugin_data.name}`
	}

	// Create streamdeck plugin directory if it doesn't exist
	if (!fs.existsSync(`.spikey/${plugin_data.uuid}.sdPlugin`)) {
		fs.mkdirSync(`.spikey/${plugin_data.uuid}.sdPlugin`)
	}

	// Create the bin directory if it doesn't exist
	if (!fs.existsSync(`.spikey/${plugin_data.uuid}.sdPlugin/bin`)) {
		fs.mkdirSync(`.spikey/${plugin_data.uuid}.sdPlugin/bin`)
	}

	// Create the imgs directory if it doesn't exist
	if (!fs.existsSync(`.spikey/${plugin_data.uuid}.sdPlugin/imgs`)) {
		fs.mkdirSync(`.spikey/${plugin_data.uuid}.sdPlugin/imgs`)
	}

	// Create the logs directory if it doesn't exist
	if (!fs.existsSync(`.spikey/${plugin_data.uuid}.sdPlugin/logs`)) {
		fs.mkdirSync(`.spikey/${plugin_data.uuid}.sdPlugin/logs`)
	}

	// Create the ui directory if it doesn't exist
	if (!fs.existsSync(`.spikey/${plugin_data.uuid}.sdPlugin/ui`)) {
		fs.mkdirSync(`.spikey/${plugin_data.uuid}.sdPlugin/ui`)
	}
}
