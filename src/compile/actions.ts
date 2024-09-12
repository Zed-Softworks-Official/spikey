import fs from 'fs'
import { ParsedFunctionData } from '~/types/action'

/**
 * Parses the source code of the action and generates the action class for the streamdeck api
 *
 * @param action_data
 * @param filepath
 */
export const parse_action = async (action_data: ManifestAction, filepath: string) => {
	// Read the source code from the file
	const source = await parse_source(fs.readFileSync(filepath, 'utf8'))

	// Generate the default imports for the action class
	const new_imports = `import { action, KeyDownEvent, SingletonAction } from '@elgato/streamdeck'`

	// Generate the action class decorator
	const decorator = `@action({ UUID: "${action_data.UUID}" })`

	// Format the action name to be PascalCase
	const action_name = action_data.Name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())

	// Generate the action class header
	const header = `export class ${action_name} extends SingletonAction {`

	const generated_source = `${new_imports}\n${decorator}\n${header}\n\n}`

	// Compile the action using tsup

	fs.writeFileSync(`.spikey/build/actions/${action_data.Name}.ts`, generated_source)
}

/**
 * Parses the source code and converts it to a format that can be used by the streamdeck api
 *
 * @param source - The source code to parse
 */
const parse_source = async (source: string) => {
	// Get the imports from the source code
	const imports = await parse_imports(source)

	// Get the functions from the source code
	const functions = await parse_functions(source)

	console.log(functions)

	return ''
}

/**
 * Gets all the imports that were used in the source code
 *
 * @param source - The source code to parse
 */
const parse_imports = async (source: string) => {
	// Get all the lines that start with import
	const imports = source.split('\n').filter((line) => line.startsWith('import'))

	return imports
}

/**
 * Parses the source code to find all the functions and converts them to function declarations for classes instead of functional declarations
 *
 * @param source - The source code to parse
 */
const parse_functions = async (source: string) => {
	const functions: ParsedFunctionData[] = []
	for (const line of source.split('\n')) {
		const function_data: ParsedFunctionData = {
			name: '',
			parameters: [],
			body: '',
		}

		// Check if the line contains the word function or the => operator
		// If it does, then it's a function declaration
		// And since it doesn't then the continue since
		// it's not what we're looking for
		if (!line.includes('=>') && !line.includes('function')) {
			continue
		}

		// Get the function name
		if (line.includes('function')) {
			const function_name = line.split('function')[1].split('(')[0].trim()

			function_data.name = function_name
		} else {
			const function_name = line.split('const')[1].split('=')[0].trim()

			function_data.name = function_name
		}

		// Get the parameters
		const parameters = line.split('(')[1].split(')')[0].split(',')

		function_data.parameters = parameters

		// TODO: Get the function body

		functions.push(function_data)
	}

	return functions
}
