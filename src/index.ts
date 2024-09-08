import { create_manifest } from '~/manifest'
import { create_spikey_folder_structure } from '~/f'

export const create_spikey = (plugin_data: PluginData) => {
	create_spikey_folder_structure(plugin_data)
	create_manifest(plugin_data)
}

create_spikey({
	name: 'Test Plugin',
	author: 'Zed Softworks LLC',
	uuid: 'dev.zedsoftworks.test',
})
