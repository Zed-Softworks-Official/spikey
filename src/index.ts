import { create_manifest } from '~/manifest'
import { create_spikey_folder_structure } from '~/f'
import chalk from 'chalk'

console.log(chalk.bold('Starting Spikey!'))

create_spikey_folder_structure()
create_manifest()
