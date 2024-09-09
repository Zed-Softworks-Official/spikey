#! /usr/bin/env node

import typescript from '@rollup/plugin-typescript'
import { rollup } from 'rollup'
import fs from 'fs'

import { Command } from 'commander'
import chalk from 'chalk'
import { createSpinner } from 'nanospinner'

import { init_spikey } from '~/core'

const program = new Command()

program.name('spikey').description('CLI for spikey').version('1.0.0')

program
	.command('compile')
	.description('Compiles the plugin')
	.action(async () => {
		// Create a spinner to show the user that the plugin is compiling
		const spinner = createSpinner(chalk.bold('Compiling plugin...')).start()

		// Get current working directory
		const cwd = process.cwd()

		// Bundle the plugin using rollup
		const bundle = await rollup({
			input: 'src/plugin.ts',
			plugins: [
				typescript({
					tsconfig: `${cwd}/tsconfig.json`,
				}),
			],
		})

		if (!bundle) {
			console.error(chalk.red('Failed to bundle plugin'))
			spinner.stop()

			return
		}

		const { output } = await bundle.generate({
			dir: '.spikey/build',
			format: 'es',
			compact: true,
		})

		// Write the plugin to the .spikey/build directory
		fs.writeFileSync(`${cwd}/.spikey/build/plugin.js`, output[0].code)

		// Get the exported plugin data from the plugin.ts file in the src directory using the current working directory
		//const plugin_data = await import(`file://${cwd}/.spikey/build/plugin.js`).then((module) => module.metadata)

		// Initialize the spikey folder structure and create the manifest.json file
		//const spikey_plugin = init_spikey(cwd, plugin_data)

		// Close the bundle
		await bundle.close()

		// Stop the spinner
		spinner.stop()

		// Log that the plugin was compiled successfully
		console.log(chalk.bold('Plugin compiled successfully!'))
	})

program.parse()
