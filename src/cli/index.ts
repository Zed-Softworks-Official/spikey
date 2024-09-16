#! /usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner'

import { compile_plugin, create_spikey_dirs } from '~/.'

const program = new Command()

program.name('spikey').description('CLI for spikey').version('1.0.0')

program
	.command('compile')
	.description('Compiles the plugin')
	.action(async () => {
		// Create a spinner to show the user that the plugin is compiling
		const spinner = createSpinner(chalk.bold('Compiling plugin...')).start()

		// Create Spikey directories
		create_spikey_dirs()

		// Compile the plugin
		const compiled_plugin = await compile_plugin()
		if (!compiled_plugin) {
			console.error(chalk.red('Failed to compile plugin'))
			spinner.stop()

			return
		}

		// Stop the spinner
		spinner.stop()

		// Log that the plugin was compiled successfully
		console.log(chalk.bold('Plugin compiled successfully!'))
	})

program
	.command('create')
	.description('Create a new spikey plugin')
	.action(async () => {
		console.log(chalk.green('Created plugin!'))
		const answers = await inquirer.prompt([
			{
				type: 'input',
				name: 'plugin_name',
				message: 'What is the name of your plugin?',
			},
		])

		console.log(answers)
	})

program.parse()
