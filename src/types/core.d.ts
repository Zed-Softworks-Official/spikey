import type { StreamDeckActionMetadata } from '~/types/action'

type PluginData = {
	name: string
	author: string
	uuid?: string
	icon: string
	version: string
	sdk_version?: number
	os?: ManifestOS
	software?: ManifestSoftware
}

type SpikeyPlugin = {
	plugin_data: PluginData
	manifest: Manifest
}

type SpikeyCompiledResult = {
	plugin_data?: PluginData
	manifest?: Manifest
}

export { PluginData, SpikeyPlugin, SpikeyCompiledResult, StreamDeckActionMetadata }
