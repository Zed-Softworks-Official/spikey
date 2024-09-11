import fs from 'fs'

export const generate_action_class = (action_data: ManifestAction, source: string) => {
	// Generate the default imports for the action class
	const imports = `import { action, KeyDownEvent, SingletonAction } from '@elgato/streamdeck'`

	// Generate the action class decorator
	const decorator = `@action({ UUID: "${action_data.UUID}" })`

	// Format the action name to be PascalCase
	const action_name = action_data.Name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())

	// Generate the action class header
	const header = `export class ${action_name} extends SingletonAction {`

	// Parse the source code to find the onKeyDown function and put it inside of the action class
	source = `${imports}\n${decorator}\n${header}\n}\n`

	// Bundle the action using rollup

	fs.writeFileSync(`.spikey/build/actions/${action_data.Name}.ts`, source)
}
