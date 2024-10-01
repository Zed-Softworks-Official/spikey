import type { StreamDeckActionMetadata } from '~/types/action'
import type { UIItem, ActionUIConfig } from '~/types/ui'

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

export { PluginData, SpikeyPlugin, StreamDeckActionMetadata, UIItem, ActionUIConfig }
