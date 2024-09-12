type StreamDeckActionMetadata = {
	name?: string
	states?: ManifestActionState[]
}

type ParsedFunctionData = {
	name: string
	parameters: string[]
	body: string
}

export { StreamDeckActionMetadata, ParsedFunctionData }
