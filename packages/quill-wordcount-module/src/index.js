import wordCountModule from './module';

/**
 * Registers the Word Count module with Quill.
 *
 * @since 2.0.0
 *
 * @return {boolean} Returns `true` when registered and `false` if Quill is not available.
 */
export default function() {
	const { Quill } = window;
	if ( undefined === Quill ) {
		return false;
	}

	Quill.register( 'modules/wordcount', wordCountModule );
	return true;
}
