<?php
/**
 * Certificates & Related template functions
 *
 * @package LifterLMS/Functions
 *
 * @since unknown
 * @version unknown
 */

defined( 'ABSPATH' ) || exit;

/**
 * Loads the certificate content template.
 *
 * @since [version]
 *
 * @param LLMS_User_Certificate $certificate Certificate object.
 * @return void
 */
function llms_certificate_content( $certificate ) {
	$template = 1 === $certificate->get_template_version() ? 'content-legacy' : 'content';
	llms_get_template(
		"certificates/{$template}.php",
		compact( 'certificate' )
	);
}

/**
 * Outputs dynamic CSS for a single certificate template.
 *
 * Hooked to action `wp_head` at priority 10.
 *
 * @since [version]
 *
 * @return void
 */
function llms_certificate_styles() {

	$certificate = llms_get_certificate( get_the_ID(), true );
	if ( ! $certificate || 1 === $certificate->get_template_version() ) {
		return;
	}

	$image          = $certificate->get_background_image();
	$background_img = $image['src'];

	$background_color = $certificate->get( 'background' );

	$padding = implode( ' ', $certificate->get_margins( true ) );

	$dimensions = $certificate->get_dimensions_for_display();
	$width      = $dimensions['width'];
	$height     = $dimensions['height'];

	$fonts = $certificate->get_custom_fonts();

	llms_get_template(
		'certificates/dynamic-styles.php',
		compact( 'certificate', 'width', 'height', 'background_color', 'background_img', 'padding', 'fonts' )
	);
}

/**
 * Loads the certificate actions template.
 *
 * @since [version]
 *
 * @param LLMS_User_Certificate $certificate Certificate object.
 * @return void
 */
function llms_certificate_actions( $certificate ) {

	if ( ! $certificate->can_user_manage() ) {
		return;
	}

	$is_sharing_enabled = $certificate->is_sharing_enabled();
	llms_get_template(
		'certificates/actions.php',
		compact( 'certificate', 'is_sharing_enabled' )
	);

}

/**
 * Get the content of a single certificates
 *
 * @since 3.14.0
 *
 * @param LLMS_User_Certificate $certificate Instance of an LLMS_User_Certificate.
 * @return void
 */
function llms_get_certificate_preview( $certificate ) {

	ob_start();

	llms_get_template(
		'certificates/preview.php',
		array(
			'certificate' => $certificate,
		)
	);

	return ob_get_clean();

}
/**
 * Output the content of a single certificate
 *
 * @since 3.14.0
 *
 * @param LLMS_User_Certificate $certificate Instance of an LLMS_User_Certificate.
 * @return void
 */
function llms_the_certificate_preview( $certificate ) {
	echo llms_get_certificate_preview( $certificate );
}

/**
 * Retrieve the number of columns used in certificates loops
 *
 * @since 3.14.0
 *
 * @return int
 */
function llms_get_certificates_loop_columns() {
	/**
	 * Filters the number of columns used to display a list of certificate previews.
	 *
	 * @since 3.14.0
	 *
	 * @param integer $cols Number of columns.
	 */
	return apply_filters( 'llms_certificates_loop_columns', 5 );
}


/**
 * Get template for certificates loop
 *
 * @since 3.14.0
 *
 * @param LLMS_Student $student Optional. LLMS_Student (uses current if none supplied). Default is `null`.
 *                              The current student will be used if none supplied.
 * @param bool|int     $limit   Optional. Number of achievements to show (defaults to all). Default is `false`.
 * @return void
 */
if ( ! function_exists( 'lifterlms_template_certificates_loop' ) ) {
	function lifterlms_template_certificates_loop( $student = null, $limit = false ) {

		// Get the current student if none supplied.
		if ( ! $student ) {
			$student = llms_get_student();
		}

		// Don't proceed without a student.
		if ( ! $student ) {
			return;
		}

		$cols = llms_get_certificates_loop_columns();

		// Get certificates.
		$certificates = $student->get_certificates( 'updated_date', 'DESC', 'certificates' );
		if ( $limit && $certificates ) {
			$certificates = array_slice( $certificates, 0, $limit );
			if ( $limit < $cols ) {
				$cols = $limit;
			}
		}

		llms_get_template(
			'certificates/loop.php',
			array(
				'cols'         => $cols,
				'certificates' => $certificates,
			)
		);

	}
}
