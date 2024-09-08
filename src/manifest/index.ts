import fs from 'fs'

export const create_manifest = (plugin_data: PluginData) => {
	const manifest: Manifest = {
		Actions: [
			{
				UUID: plugin_data.uuid,
				Icon: 'imgs/actionIcon.png',
				Name: plugin_data.name,
				States: [
					{
						Image: 'imgs/actionDefaultImage.png',
						TitleAlignment: 'middle',
						Name: plugin_data.name,
						Title: plugin_data.name,
						ShowTitle: true,
						TitleColor: '#FFFFFF',
						FontFamily: 'Arial',
						FontStyle: 'regular',
						FontSize: 12,
						FontUnderline: false,
					},
				],
			},
		],
		Author: plugin_data.author,
		CodePath: 'bin/index.js',
		Description: plugin_data.name,
		Icon: 'imgs/pluginIcon.png',
		Name: plugin_data.name,
		Version: '1.0.0',
		SDKVersion: 2,
		OS: {
			Platform: 'windows',
			MinimumVersion: '10',
		},
		Software: {
			MinimumVersion: '5.0',
		},
	}

	// Create manifest.json file if it doesn't exist
	if (!fs.existsSync(`.spikey/${plugin_data.uuid}.sdPlugin/manifest.json`)) {
		fs.writeFileSync(`.spikey/${plugin_data.uuid}.sdPlugin/manifest.json`, JSON.stringify(manifest, null, 2))
	}
}
