type TokenType =
	| 'number'
	| 'string'
	| 'identifier'
	| 'keyword'
	| 'operator'
	| 'symbol'
	| 'whitespace'
	| 'comment'
	| 'eof'

type Token = {
	type: TokenType
	value: string
	position: number
}

type FunctionDefinition = {
	name: string
	parameters: string[]
	body: string
	async: boolean
}

type ActionDefinition = {
	action_data: ManifestAction
	source: string
}
