type StreamDeckActionMetadata = {
	icon?: string
	states?: ManifestActionState[]
}

type ParsedFunctionData = {
	name: string
	parameters: string[]
	body: string
}

export { StreamDeckActionMetadata, ParsedFunctionData }
