/**
 * Looks for import statments in the tokens and returns an array of the imported modules
 *
 * @param {Token[]} tokens - The tokens to parse
 */
export const parse_imports = (tokens: Token[]) => {
	const imports: string[] = []

	let current_import_statement = ''
	for (const token of tokens) {
		// Check if the current token is the keyword import and if it is
		// start collecting the imported module
		if (token.type === 'keyword' && token.value === 'import' && current_import_statement.length === 0) {
			current_import_statement += token.value + ' '
		}

		// Check if the current import statement is complete
		// if it isn't then continue collecting the imported module
		if (current_import_statement.length > 0 && token.value !== 'import' && token.type !== 'string') {
			current_import_statement += token.value + ' '
		}

		// Check if the current token is a string and if it is
		if (token.type === 'string' && current_import_statement.length > 0) {
			current_import_statement += "'" + token.value + "'"
			imports.push(current_import_statement)

			// Reset the current import statement
			current_import_statement = ''
		}
	}

	return imports
}

/**
 * Looks for function definitions in the tokens and returns an array of the function definitions
 * Works with 'function' keyword as well as arrow function definitions
 *
 * NOTE: This could be way more optimized
 *
 * @param {Token[]} tokens - The tokens to parse
 */
export const parse_functions = (tokens: Token[]) => {
	const functions: FunctionDefinition[] = []

	let current_function: FunctionDefinition | null = null
	let current_parameter: string | null = null
	let identifer_count = 0
	let scope_count = 0
	let fetching_parameters = false
	let fetching_body = false

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i]
		// Check if the current token is the keyword function and if it is
		// start collecting the function information
		if (token.type === 'keyword' && token.value === 'function' && current_function === null) {
			current_function = {
				name: '',
				parameters: [],
				body: '',
				async: tokens[i - 1].value === 'async',
			}
		}

		// If we're fetching the function body and the current function exists
		// Then we want to create the function body object
		if (current_function !== null && fetching_body) {
			// If we run into a curly brace then we want to increase the scope
			if (token.type === 'symbol' && token.value === '{') {
				scope_count++
			}

			// If we run into a closing curly brace then we want to decrease the scope
			if (token.type === 'symbol' && token.value === '}') {
				scope_count--
			}

			// Add the current token to the function body
			if (scope_count !== 0) {
				// Add the quotes around the string if it's a string
				// otherwise just add the token to the body
				if (token.type === 'string') {
					current_function.body += "'" + token.value + "'"
				} else {
					current_function.body += token.value
				}

				// If next token is an identifier and the current token is not a symbol
				// then add a space between the two identifiers
				if (tokens[i + 1].type === 'identifier' && token.type !== 'symbol') {
					current_function.body += ' '
				}
			}

			// If our scope count is 0 then we're done fetching the function body
			if (scope_count === 0) {
				fetching_body = false
				functions.push(current_function)
				current_function = null
			}
		}

		// If we're not fetching the function body and the current function doesn't exist
		// Then we're creating the function header
		if (current_function !== null && !fetching_body) {
			// Check if the current token is an identifier and also check if it is the first identifier
			// if it is then this is going to be the function name
			if (token.type === 'identifier' && identifer_count === 0) {
				current_function.name += token.value
				identifer_count++
			}

			// Check if the current token is a parenthesis and if it is
			// then we're fetching function parameters
			if (token.type === 'symbol' && token.value === '(') {
				fetching_parameters = true
				current_parameter = ''
			}

			// Check if we're fetching function parameters and if the current token is not a parenthesis or a closing parenthesis
			if (fetching_parameters && current_parameter !== null && token.value !== '(' && token.value !== ')') {
				current_parameter += token.value
			}

			// Check if the current token is a closing parentesis or a comma
			// if it is then we're done fetching function parameters or
			// current function parameter
			if (token.type === 'symbol' && (token.value === ')' || token.value === ',')) {
				current_function.parameters.push(current_parameter!)

				fetching_parameters = false
				current_parameter = null
			}

			// Check to see if the current token is a opening curly brace
			// if it is then we're fetching the function body
			if (token.type === 'symbol' && token.value === '{') {
				fetching_body = true
				scope_count++
			}
		}
	}

	return functions
}
