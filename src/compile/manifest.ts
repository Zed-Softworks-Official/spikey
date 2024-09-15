import { PluginData } from '~/types/core'

/**
 * Creates the manifest.json file for the plugin so Stream Deck can load it properly
 *
 * @param {PluginData} plugin_data - The plugin data object
 */
export const create_manifest = (plugin_data: PluginData) => {
	const manifest: Manifest = {
		Actions: [],
		Author: plugin_data.author,
		CodePath: 'bin/plugin.js',
		Description: plugin_data.name,
		Icon: `imgs/${plugin_data.icon}`,
		Name: plugin_data.name,
		Version: plugin_data.version,
		SDKVersion: plugin_data.sdk_version ?? 2,
		OS: plugin_data.os ?? {
			Platform: 'windows',
			MinimumVersion: '10',
		},
		Software: plugin_data.software ?? {
			MinimumVersion: '6.1',
		},
		Nodejs: {
			Version: '20',
			Debug: 'enabled',
		},
	}

	// // Create manifest.json file if it doesn't exist
	// if (!fs.existsSync(`.spikey/${plugin_data.uuid}.sdPlugin/manifest.json`)) {
	// 	fs.writeFileSync(`.spikey/${plugin_data.uuid}.sdPlugin/manifest.json`, JSON.stringify(manifest, null, 2))
	// } else {
	// 	fs.writeFileSync(`.spikey/${plugin_data.uuid}.sdPlugin/manifest.json`, JSON.stringify(manifest, null, 2))
	// }

	return manifest
}
