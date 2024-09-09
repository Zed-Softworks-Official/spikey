#! /usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { createSpinner } from 'nanospinner'

import { init_spikey, compile_plugin, create_spikey_dirs } from '~/core'

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

		// Create Spikey directories
		create_spikey_dirs()

		// Compile the plugin
		const compiled_plugin = await compile_plugin(cwd)

		if (!compiled_plugin.success || compiled_plugin.plugin_data === undefined) {
			console.error(chalk.red('Failed to compile plugin'))
			spinner.stop()

			return
		}

		// Initialize the spikey folder structure and create the manifest.json file
		const spikey_plugin = init_spikey(cwd, compiled_plugin.plugin_data)

		// Stop the spinner
		spinner.stop()

		// Log that the plugin was compiled successfully
		console.log(chalk.bold('Plugin compiled successfully!'))
	})

program.parse()
