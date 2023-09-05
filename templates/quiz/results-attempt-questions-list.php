<?php
/**
 * List of attempt questions/answers for a single attempt
 *
 * @since 3.16.0
 * @since 3.17.8 Unknown.
 * @since 5.3.0 Display removed questions too.
 * @since [version] Hide answers if resumable attempt is incomplete and escaped output.
 * @version [version]
 *
 * @param LLMS_Quiz_Attempt $attempt LLMS_Quiz_Attempt instance.
 */

defined( 'ABSPATH' ) || exit;

?>

<ol class="llms-quiz-attempt-results">
<?php
if ( ! $attempt->can_be_resumed() ) {
	foreach ( $attempt->get_question_objects() as $attempt_question ) :
		$quiz_question = $attempt_question->get_question();
		if ( ! $quiz_question ) { // Question missing/deleted.
			?>
			<li class="llms-quiz-attempt-question type--removed status--<?php echo esc_attr( $attempt_question->get_status() ); ?> <?php echo $attempt_question->is_correct() ? 'correct' : 'incorrect'; ?>">
				<header class="llms-quiz-attempt-question-header">
					<span class="toggle-answer">
						<h3 class="llms-question-title"><?php esc_html_e( 'This question has been deleted', 'lifterlms' ); ?></h3>
						<span class="llms-points">
							<?php printf( esc_html__( '%1$d / %2$d points', 'lifterlms' ), $attempt_question->get( 'earned' ), $attempt_question->get( 'points' ) ); ?>
						</span>
						<?php echo $attempt_question->get_status_icon(); ?>
					</span>
				</header>
			</li>
			<?php
			continue;
		}
		?>

		<li class="llms-quiz-attempt-question type--<?php echo esc_attr( $quiz_question->get( 'question_type' ) ); ?> status--<?php echo esc_attr( $attempt_question->get_status() ); ?> <?php echo $attempt_question->is_correct() ? 'correct' : 'incorrect'; ?>"
			data-question-id="<?php echo $quiz_question->get( 'id' ); ?>"
			data-grading-manual="<?php echo $attempt_question->can_be_manually_graded() ? 'yes' : 'no'; ?>"
			data-points="<?php echo $attempt_question->get( 'points' ); ?>"
			data-points-curr="<?php echo $attempt_question->get( 'earned' ); ?>">
			<header class="llms-quiz-attempt-question-header">
				<a class="toggle-answer" href="#">

					<h3 class="llms-question-title"><?php echo $quiz_question->get_question( 'plain' ); ?></h3>

					<?php if ( $quiz_question->get( 'points' ) ) : ?>
						<span class="llms-points">
							<?php printf( esc_html__( '%1$d / %2$d points', 'lifterlms' ), $attempt_question->get( 'earned' ), $attempt_question->get( 'points' ) ); ?>
						</span>
					<?php endif; ?>

					<?php echo $attempt_question->get_status_icon(); ?>

				</a>
			</header>

			<section class="llms-quiz-attempt-question-main">

				<?php if ( apply_filters( 'llms_quiz_show_question_description', true, $attempt, $attempt_question, $quiz_question ) && $quiz_question->has_description() ) : ?>
					<div class="llms-quiz-attempt-answer-section llms-question-description">
						<?php echo $quiz_question->get_description(); ?>
					</div>
				<?php endif; ?>

				<?php if ( $attempt_question->get( 'answer' ) ) : ?>
					<div class="llms-quiz-attempt-answer-section llms-student-answer">
						<p class="llms-quiz-results-label student-answer"><?php esc_html_e( 'Selected answer: ', 'lifterlms' ); ?></p>
						<?php echo $attempt_question->get_answer(); ?>
					</div>
				<?php endif; ?>

				<?php if ( ! $attempt_question->is_correct() ) : ?>
					<?php if ( llms_parse_bool( $quiz_question->get_quiz()->get( 'show_correct_answer' ) ) ) : ?>
						<?php if ( in_array( $quiz_question->get_auto_grade_type(), array( 'choices', 'conditional' ) ) ) : ?>
							<div class="llms-quiz-attempt-answer-section llms-correct-answer">
								<p class="llms-quiz-results-label correct-answer"><?php esc_html_e( 'Correct answer: ', 'lifterlms' ); ?></p>
								<?php echo $attempt_question->get_correct_answer(); ?>
							</div>
						<?php endif; ?>
					<?php endif; ?>

					<?php if ( llms_parse_bool( $quiz_question->get( 'clarifications_enabled' ) ) ) : ?>
						<div class="llms-quiz-attempt-answer-section llms-clarifications">
							<p class="llms-quiz-results-label clarification"><?php esc_html_e( 'Clarification: ', 'lifterlms' ); ?></p>
							<?php echo $quiz_question->get( 'clarifications' ); ?>
						</div>
					<?php endif; ?>
				<?php endif; ?>

				<?php if ( $attempt_question->has_remarks() ) : ?>
					<div class="llms-quiz-attempt-answer-section llms-remarks">
						<p class="llms-quiz-results-label remarks"><?php esc_html_e( 'Instructor remarks: ', 'lifterlms' ); ?></p>
						<div class="llms-remarks"><?php echo wpautop( $attempt_question->get( 'remarks' ) ); ?></div>
					</div>
				<?php endif; ?>

			</section>

		</li>
<?php endforeach; ?>
<?php } else { ?>
	<p><?php esc_html_e( "The quiz is still ongoing. You can resume your attempt by clicking the 'Resume Quiz' button.", 'lifterlms' ); ?></p>
<?php } ?>
</ol>

<script>
( function( $ ) {
	$( '.llms-quiz-attempt-question-header a.toggle-answer' ).on( 'click', function( e ) {

		e.preventDefault();

		var $curr = $( this ).closest( 'header' ).next( '.llms-quiz-attempt-question-main' );

		$( this ).closest( 'li' ).siblings().find( '.llms-quiz-attempt-question-main' ).slideUp( 200 );

		if ( $curr.is( ':visible' ) ) {
			$curr.slideUp( 200 );
		}  else {
			$curr.slideDown( 200 );
		}

	} );
} )( jQuery );
</script>
