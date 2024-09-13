import fs from 'fs'

import { tokenize_source } from '~/compile/lexer'

/**
 * Parses the source code of the action and generates the action class for the streamdeck api
 *
 * @param action_data
 * @param filepath
 */
export const parse_action = async (action_data: ManifestAction, filepath: string) => {
	// Read the source code from the file
	await tokenize_source(fs.readFileSync(filepath, 'utf8'))

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
