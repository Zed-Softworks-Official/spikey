import fs from 'fs'

import { Lexer } from '~/compile/lexer'
import { parse_functions, parse_imports } from '~/compile/parse'

/**
 * Parses the source code of the action and generates the action class for the streamdeck api
 *
 * @param action_data
 * @param filepath
 */
export const create_action = async (action_data: ManifestAction, filepath: string) => {
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
	const imports = parse_imports(tokens)
	console.log('Imports: ', imports)

	// Parse the functions
	const functions = parse_functions(tokens)
	console.log('Functions: ', functions)
}
