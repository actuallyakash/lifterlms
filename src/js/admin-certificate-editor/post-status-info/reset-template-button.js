import { __ } from '@wordpress/i18n';
import { Button, Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { dispatch, select } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { store as editorStore } from '@wordpress/editor';
import { synchronizeBlocksWithTemplate } from '@wordpress/blocks';
import { doAction } from '@wordpress/hooks';

import { ResetTemplateCheck } from './reset-template-check';
import { editCertificateTitle } from '../../util';

/**
 * Resets the post's default post type template and then triggers a save action.
 *
 * @since 6.0.0
 * @param {Function} onComplete  Callback function invoked when the reset and save actions are completed.
 * @param {boolean}  isPublished Determines if the current post is published.
 * @return {void}
 */
function resetTemplate( onComplete, isPublished ) {
	const { getBlocks, getTemplate } = select( blockEditorStore ),
		{ replaceBlocks, insertBlocks } = dispatch( blockEditorStore ),
		{ editPost, savePost } = dispatch( editorStore ),
		clientIds = getBlocks().map( ( { clientId } ) => clientId ),
		template = synchronizeBlocksWithTemplate( [], getTemplate() );

	editCertificateTitle( '' );
	if ( isPublished ) {
		editPost( { status: 'draft' } );
	}

	/**
	 * Action run before the default certificate post type template is reset.
	 *
	 * @since 6.0.0
	 *
	 * @param {Array} template Block template array.
	 */
	doAction( 'llms.resetCertificateTemplate.before', template );

	if ( clientIds.length ) {
		replaceBlocks( clientIds, template );
	} else {
		insertBlocks( template );
	}

	/**
	 * Action run after the default certificate post type template is reset.
	 *
	 * @since 6.0.0
	 *
	 * @param {Array} template Block template array.
	 */
	doAction( 'llms.resetCertificateTemplate.after', template );

	savePost();
	onComplete();
}

/**
 * Resets a certificate to the default block template defined during post type registration.
 *
 * Renders a "Reset template" button near the "Move to trash" button in the post status
 * area of the editor document settings sidebar.
 *
 * @since 6.0.0
 *
 * @param {Object}  props             Component properties.
 * @param {boolean} props.isSaving    Whether or not the post is currently being saved. The main button is disabled during saves.
 * @param {boolean} props.isPublished Whether or not the post is currently published. If the post is published, it will be switched to a draft during the reset.
 *
 * @return {?ResetTemplateCheck} Returns the child components to render or `null` if the button should not be displayed.
 */
export default function( { isSaving, isPublished } ) {
	const [ isOpen, setIsOpen ] = useState( false ),
		closeModal = () => setIsOpen( false ),
		openModal = () => setIsOpen( true );

	let msg = __( 'Are you sure you wish to replace the certificate content with the original default layout? This action cannot be undone!', 'lifterlms' );
	if ( isPublished ) {
		msg = __( "Are you sure you wish to unpublish the certificate and replace it's content with the original default layout? This action cannot be undone!", 'lifterlms' );
	}

	return (
		<ResetTemplateCheck>
			{ isOpen && (
				<Modal
					title={ __( 'Confirm template reset', 'lifterlms' ) }
					style={ { maxWidth: '360px' } }
					onRequestClose={ closeModal }
				>
					<p>{ msg }</p>
					<div style={ { textAlign: 'right' } }>
						<Button variant="tertiary" onClick={ closeModal }>
							{ __( 'Cancel', 'lifterlms' ) }
						</Button>
						&nbsp;
						<Button variant="primary" onClick={ () => resetTemplate( closeModal, isPublished ) }>
							{ __( 'Reset template', 'lifterlms' ) }
						</Button>
					</div>
				</Modal>
			) }
			<Button onClick={ openModal } disabled={ isSaving } isDestructive>{ __( 'Reset template', 'lifterlms' ) }</Button>
		</ResetTemplateCheck>
	);
}
