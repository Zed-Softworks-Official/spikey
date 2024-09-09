#! /usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'

const program = new Command()

program.name('spikey').description('CLI for spikey').version('1.0.0')

program
	.command('compile')
	.description('Compiles the plugin')
	.action(() => {
		console.log(chalk.bold('Hello, World!'))
	})

program.parse()
