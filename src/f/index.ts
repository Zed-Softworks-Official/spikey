import fs from 'fs'

export const create_spikey_folder_structure = () => {
	// Create base directory if it doesn't exist
	if (!fs.existsSync('.spikey')) {
		fs.mkdirSync('.spikey')
	}
}
