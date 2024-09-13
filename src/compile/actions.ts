import fs from 'fs'

import { Lexer } from './lexer'

/**
 * Parses the source code of the action and generates the action class for the streamdeck api
 *
 * @param action_data
 * @param filepath
 */
export const parse_action = async (action_data: ManifestAction, filepath: string) => {
	// Read the source code from the file
	let token: Token | null
	const lexer = new Lexer(fs.readFileSync(filepath, 'utf8'))

	while ((token = lexer.nextToken()) !== null) {
		console.log(token)
	}
}
