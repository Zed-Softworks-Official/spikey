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
