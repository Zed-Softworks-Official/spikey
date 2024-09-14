import fs from 'fs'

import { Lexer } from '~/compile/lexer'
import { parse_functions, parse_imports } from '~/compile/parse'

/**
 * Parses the source code of the action and generates the action class for the streamdeck api
 *
 * @param action_data
 * @param filepath
 */
export const create_action = async (action_data: ManifestAction, filepath: string): Promise<ActionDefinition> => {
	// Tokenize the source code
	let token: Token | null
	const lexer = new Lexer(fs.readFileSync(filepath, 'utf8'))

	const tokens: Token[] = []
	while ((token = lexer.nextToken()) !== null) {
		tokens.push(token)
	}

	// Parse the import statements
	const imports = parse_imports(tokens)

	// Parse the functions
	const functions = parse_functions(tokens)

	// Create the default imports
	const default_action_imports = ["import { action, SingletonAction } from '@elgato/streamdeck'"]

	// Create the action class name from the action data and change it to PascalCase
	const class_name = action_data.Name.toLowerCase()
		.toLowerCase()
		.replace(new RegExp(/[-_]+/, 'g'), ' ')
		.replace(new RegExp(/[^\w\s]/, 'g'), '')
		.replace(new RegExp(/\s+(.)(\w*)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
		.replace(new RegExp(/\w/), (s) => s.toUpperCase())

	// Create the source
	const source = create_source(imports, default_action_imports, functions, action_data.UUID, class_name)

	return {
		action_data,
		source,
	}
}

/**
 * Creates the action method for the streamdeck api
 *
 * @param function_data
 * @returns
 */
const create_action_method = (function_data: FunctionDefinition) => {
	return `${function_data.async ? 'async' : ''} ${function_data.name}(${function_data.parameters.map((value) => value)}) {${function_data.body}}`
}

/**
 * Creates the source code for the action class
 *
 * @param {string[]} imports - The imported modules
 * @param {string[]} default_imports - The default imported modules
 * @param {FunctionDefinition[]} functions - The function definitions
 * @param {string} uuid - The action UUID
 * @param {string} class_name - The class name
 */
const create_source = (
	imports: string[],
	default_imports: string[],
	functions: FunctionDefinition[],
	uuid: string,
	class_name: string
) => {
	let raw_source: string = ''
	default_imports.forEach((value) => (raw_source += value + '\n'))
	imports.forEach((value) => (raw_source += value + '\n'))

	raw_source += `@action({UUID: '${uuid}'})\n`
	raw_source += `export class ${class_name} extends SingletonAction {\n`
	functions.forEach((value) => (raw_source += create_action_method(value) + '\n'))
	raw_source += `}\n`

	return raw_source
}
