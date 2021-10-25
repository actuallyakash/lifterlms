const
	chalk = require( 'chalk' ),
	path = require( 'path' ),
	YAML = require( 'yaml' ),
	{ getChangelogEntries, getChangelogValidationIssues } = require( '../../utils' );

/**
 * Retrieve a symbol describing the status type.
 *
 * @since [version]
 *
 * @param {string} type Status type.
 * @return {string} The UTF8 symbol for the requested status.
 */
function getSymbol( type ) {
	let symbol = '';
	switch ( type ) {
		case 'error':
			symbol = chalk.red( '✘' );
			break;
		case 'success':
			symbol = chalk.green( '✔' );
			break;
		case 'warning':
			symbol = chalk.yellow( '▲' );
			break;
	}
	return symbol;
}

/**
 * Log a message with a status symbol prefix.
 *
 * @since [version]
 *
 * @param {string} msg  The message to log.
 * @param {string} type The status type.
 * @return {void}
 */
function logWithSymbol( msg, type ) {
	console.log( chalk.italic( ` ${ getSymbol( type ) } ${ msg }` ) );
}

/**
 * Determine the overall status for a given changelog entry
 *
 * @since [version]
 *
 * @param {string[]} errors   Array of encountered error messages.
 * @param {string[]} warnings Array of encountered warning messages.
 * @return {string} The overall status as a string.
 */
function determineOverallStatus( errors, warnings ) {
	if ( errors.length ) {
		return 'error';
	}

	if ( warnings.length ) {
		return 'warning';
	}

	return 'success';
}

module.exports = {
	command: 'validate',
	description: 'Validate existing changelog entries.',
	args: [
		[ '[entries...]', 'Optionally specify a list of changelog entries to validate. If omitted will validate all existing entries.' ],
	],
	options: [
		[ '-f, --format [format]', 'Output format. Accepts: list, json, yaml.', 'list' ],
		[ '-s, --silent', 'Skip validation output and communicate validation status only through the exit status of the command.' ],
	],
	action: ( entries, { dir, silent, format } ) => {
		let all = getChangelogEntries( dir );

		// Reduce the list to only the requested entries.
		if ( entries.length ) {
			all = all.filter( ( { title } ) => entries.includes( path.parse( title ).name ) );
		}

		const res = {};

		let exitStatus = 0;

		all.forEach( ( log ) => {
			const validation = getChangelogValidationIssues( log, 'list' === format ),
				{ errors, warnings } = validation,
				overallStatus = determineOverallStatus( errors, warnings );

			if ( ! silent && 'list' === format ) {
				console.log( '' );
				console.log( `${ getSymbol( overallStatus ) } ${ chalk.bold( log.title ) }` );
				console.log( chalk.dim( '-'.repeat( log.title.length + 2 ) ) );

				if ( 'success' === overallStatus ) {
					console.log( '  No issues.' );
				}

				errors.forEach( ( err ) => logWithSymbol( err, 'error' ) );
				warnings.forEach( ( warn ) => logWithSymbol( warn, 'warning' ) );
			}

			if ( 'error' === overallStatus ) {
				exitStatus = 1;
			}

			res[ log.title ] = validation;
		} );

		if ( ! silent ) {
			if ( 'json' === format ) {
				console.log( JSON.stringify( res ) );
			} else if ( 'yaml' === format ) {
				console.log( YAML.stringify( res ) );
			}
		}

		process.exit( exitStatus );
	},
};
