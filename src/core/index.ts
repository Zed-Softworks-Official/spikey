import { create_spikey_folder_structure } from '~/f'
import { create_manifest } from '~/manifest'

/**
 * Initializes the spikey folder structure and creates the manifest.json file
 * @param {PluginData} plugin_data - The plugin data object
 */
export const init_spikey = (plugin_data: PluginData) => {
	// Create .spikey for the plugin
	create_spikey_folder_structure(plugin_data)

	// Create the manifest.json file using the plugin data provided
	create_manifest(plugin_data)
}
