import fs from 'fs'

/**
 * Creates the entrypoint for the plugin
 *
 * @param {ActionDefinition[]} actions - The actions to register
 */
export const create_entrypoint = (actions: ActionDefinition[]) => {
	// Generate the imports
	const imports = [`import streamDeck from '@elgato/streamdeck'\n`]
	imports.push(...generate_action_imports(actions))

	// Generate the source code
	const source = generate_source(imports, actions)

	fs.writeFileSync('.spikey/build/plugin.ts', source)
}

/**
 * Creates the imports for the actions in the entrypoint
 *
 * @param {ActionDefinition[]} actions - The actions to create the imports for
 * @returns
 */
const generate_action_imports = (actions: ActionDefinition[]) => {
	const imports: string[] = []

	actions.forEach((action) => {
		imports.push(`import { ${action.classname} } from './actions/${action.filename}'\n`)
	})

	return imports
}

/**
 * Creates the source code for the entrypoint
 *
 * @param {string[]} imports - The imports to add to the source code
 * @param {ActionDefinition[]} actions - The actions to register
 */
const generate_source = (imports: string[], actions: ActionDefinition[]) => {
	let raw_source = ''

	raw_source += imports.join('')

	actions.forEach((action) => {
		raw_source += `streamDeck.actions.registerAction(new ${action.classname}())\n`
	})

	raw_source += 'streamDeck.connect()'

	return raw_source
}
