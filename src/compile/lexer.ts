export class Lexer {
	private input: string
	private position: number = 0
	private currentChar: string | null = null

	constructor(input: string) {
		this.input = input
		this.currentChar = this.input[this.position]
	}

	private advance(): void {
		this.position++
		if (this.position >= this.input.length) {
			this.currentChar = null
		} else {
			this.currentChar = this.input[this.position]
		}
	}

	private skipWhitespace(): void {
		while (this.currentChar !== null && /\s/.test(this.currentChar)) {
			this.advance()
		}
	}

	private isDigit(char: string): boolean {
		return /\d/.test(char)
	}

	private isLetter(char: string): boolean {
		return /[a-zA-Z_]/.test(char)
	}

	private number(): Token {
		let value = ''
		let hasDecimal = false
		while (this.currentChar !== null && (this.isDigit(this.currentChar) || this.currentChar === '.')) {
			if (this.currentChar === '.') {
				if (hasDecimal) {
					throw new Error(`Unexpected character '.' at position ${this.position}`)
				}
				hasDecimal = true
			}
			value += this.currentChar
			this.advance()
		}
		return { type: 'number', value, position: this.position }
	}

	private identifier(): Token {
		let value = ''
		while (
			this.currentChar !== null &&
			(this.isLetter(this.currentChar) || this.isDigit(this.currentChar) || this.currentChar === '.')
		) {
			value += this.currentChar
			this.advance()
		}
		return { type: 'identifier', value, position: this.position }
	}

	private keyword(): Token {
		const keywords = ['let', 'const', 'function', 'return', 'import', 'from', 'type', 'export', 'async']
		let value = ''
		while (this.currentChar !== null && this.isLetter(this.currentChar)) {
			value += this.currentChar
			this.advance()
		}
		if (keywords.includes(value)) {
			return { type: 'keyword', value, position: this.position }
		}
		// If not a keyword, treat as identifier
		return { type: 'identifier', value, position: this.position }
	}

	private operator(): Token {
		const operators = ['+', '-', '*', '/', '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=']
		for (const op of operators) {
			if (this.input.substr(this.position, op.length) === op) {
				this.position += op.length
				this.currentChar = this.input[this.position]
				return { type: 'operator', value: op, position: this.position }
			}
		}
		throw new Error(`Unknown operator at position ${this.position}`)
	}

	private symbol(): Token {
		const symbols = ['(', ')', '{', '}', ',', ';', ':', '.']
		if (!this.currentChar) {
			throw new Error(`Unexpected end of input`)
		}
		if (symbols.includes(this.currentChar)) {
			const value = this.currentChar
			this.advance()
			return { type: 'symbol', value, position: this.position }
		}
		throw new Error(`Unknown symbol at position ${this.position}`)
	}

	private string(): Token {
		let value = ''
		const quote = this.currentChar // Single or double quote
		this.advance() // skip the opening quote

		while (this.currentChar !== null && this.currentChar !== quote) {
			value += this.currentChar
			this.advance()
		}

		if (this.currentChar === quote) {
			this.advance() // skip the closing quote
			return { type: 'string', value, position: this.position }
		}

		throw new Error(`Unterminated string literal at position ${this.position}`)
	}

	public nextToken(): Token | null {
		while (this.currentChar !== null) {
			if (/\s/.test(this.currentChar)) {
				this.skipWhitespace()
				continue
			}

			if (this.currentChar === "'" || this.currentChar === '"') {
				return this.string()
			}

			if (this.isDigit(this.currentChar)) {
				return this.number()
			}

			if (this.isLetter(this.currentChar)) {
				return this.keyword()
			}

			if (['+', '-', '*', '/', '=', '<', '>', '!', '&', '|'].includes(this.currentChar)) {
				return this.operator()
			}

			if (['(', ')', '{', '}', ',', ';', ':', '.'].includes(this.currentChar)) {
				return this.symbol()
			}

			throw new Error(`Unexpected character: ${this.currentChar}`)
		}

		return null // End of input
	}
}
