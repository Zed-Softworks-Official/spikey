import fs from 'fs'

/**
 * Creates the spikey folder structure for the plugin
 *
 * @param {PluginData} plugin_data - The plugin data object
 */
export const create_spikey_folder_structure = (plugin_data: PluginData) => {
	// Create base directory if it doesn't exist
	if (!fs.existsSync('.spikey')) {
		fs.mkdirSync('.spikey')
	}

	// Create streamdeck plugin directory if it doesn't exist
	if (!fs.existsSync(`.spikey/${plugin_data.uuid}.sdPlugin`)) {
		fs.mkdirSync(`.spikey/${plugin_data.uuid}.sdPlugin`)
		fs.mkdirSync(`.spikey/${plugin_data.uuid}.sdPlugin/bin`)
		fs.mkdirSync(`.spikey/${plugin_data.uuid}.sdPlugin/imgs`)
		fs.mkdirSync(`.spikey/${plugin_data.uuid}.sdPlugin/logs`)
		fs.mkdirSync(`.spikey/${plugin_data.uuid}.sdPlugin/ui`)
	}
}
