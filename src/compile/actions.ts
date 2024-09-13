import fs from 'fs'

import { Lexer } from '~/compile/lexer'

/**
 * Parses the source code of the action and generates the action class for the streamdeck api
 *
 * @param action_data
 * @param filepath
 */
export const parse_action = async (action_data: ManifestAction, filepath: string) => {
	// Tokenize the source code
	let token: Token | null
	const lexer = new Lexer(fs.readFileSync(filepath, 'utf8'))

	const tokens: Token[] = []
	while ((token = lexer.nextToken()) !== null) {
		tokens.push(token)
	}

	// TODO: Remove this
	console.log(tokens)

	// Parse the import statements
	const imports = parse_import_statements(tokens)

	// TODO: Remove this
	console.log(imports)
}

/**
 * Looks for import statments in the tokens and returns an array of the imported modules
 *
 * @param {Token[]} tokens - The tokens to parse
 */
const parse_import_statements = (tokens: Token[]) => {
	const imports: string[] = []

	let current_import_statement = ''
	for (const token of tokens) {
		// Check if the current token is the keyword import and if it is
		// start collecting the imported module
		if (token.type === 'keyword' && token.value === 'import' && current_import_statement.length === 0) {
			current_import_statement += token.value + ' '
		}

		// Check if the current import statement is complete
		// if it isn't then continue collecting the imported module
		if (current_import_statement.length > 0 && token.value !== 'import' && token.type !== 'string') {
			current_import_statement += token.value + ' '
		}

		// Check if the current token is a string and if it is
		if (token.type === 'string' && current_import_statement.length > 0) {
			current_import_statement += "'" + token.value + "'"
			imports.push(current_import_statement)

			// Reset the current import statement
			current_import_statement = ''
		}
	}

	return imports
}
