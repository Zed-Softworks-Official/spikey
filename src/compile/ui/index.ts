import { dir_scan } from '~/f'
import { UIItem } from '~/types/ui'
import * as ui_elements from '~/compile/ui/elements'

type UILayoutDefinition = {
	action_name: string
	elements: UIItem
}

/**
 * Finds all the action files in the src/actions directory
 * and creates a *.html file for each action based on the
 * ui layout defined inside that specified action
 */
export const create_ui = () => {
	// Get all the action files in the src/actions directory
	const files = dir_scan('src/actions')

	for (const file of files) {
		// Check if the file is a .ts file
		if (file.endsWith('.ts')) {
			// Get the action name from the file name
			const action_name = file.split('.')[0]

			console.log(action_name)
		}
	}

	// Create a UI Layout for each action file
	const ui_layouts: UILayoutDefinition[] = []

	ui_elements.create_ui_button_element({ type: 'button', label: 'Test', action: () => {} })

	generate_streamdeck_ui(ui_layouts)
}

const generate_boilerplate = () => {
	return ''
}

const generate_streamdeck_ui = (ui_layouts: UILayoutDefinition[]) => {
	const boilerplate = generate_boilerplate()

	console.log(boilerplate)
}
