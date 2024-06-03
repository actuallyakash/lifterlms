<?php
/**
 * Tests for LifterLMS Order Metabox.
 *
 * @package LifterLMS/Tests
 *
 * @group metabox_textarea_w_tags
 * @group admin
 * @group metaboxes
 * @group metaboxes_fields
 *
 * @since 6.0.0
 * @version 6.0.0
 */
class LLMS_Test_Metabox_Textarea_W_Tags_Field extends LLMS_Unit_Test_Case {


	/**
	 * Setup before class.
	 *
	 * @since 6.0.0
	 *
	 * @return void
	 */
	public static function set_up_before_class() {

		parent::set_up_before_class();

		require_once LLMS_PLUGIN_DIR . 'includes/admin/post-types/meta-boxes/fields/llms.interface.meta.box.field.php';
		require_once LLMS_PLUGIN_DIR . 'includes/admin/post-types/meta-boxes/fields/llms.class.meta.box.fields.php';
		require_once LLMS_PLUGIN_DIR . 'includes/admin/post-types/meta-boxes/fields/llms.class.meta.box.textarea.tags.php';

	}

	/**
	 * Test output when not passing a custom value.
	 *
	 * @since 6.0.0
	 *
	 * @return void
	 */
	public function test_output_without_custom_value() {

		// Set-up global post.
		global $post;
		$original_post = $post;

		$post = $this->factory->post->create_and_get();
		update_post_meta( $post->ID, 'without_custom_value', 'This should show' );

		$field = new LLMS_Metabox_Textarea_W_Tags_Field(
			array(
				'type'  => 'textarea_w_tags',
				'label' => __( 'Test', 'lifterlms' ),
				'id'    => 'without_custom_value',
				'class' => 'code input-full',
				'value' => '',
			),
		);

		$this->assertOutputContains(
			'>This should show</textarea>',
			array(
				$field,
				'output'
			)
		);

		delete_post_meta( $post->ID, 'without_custom_value' );

		$field = new LLMS_Metabox_Textarea_W_Tags_Field(
			array(
				'type'  => 'textarea_w_tags',
				'label' => __( 'Test', 'lifterlms' ),
				'id'    => 'without_custom_value',
				'class' => 'code input-full',
				'value' => '',
			),
		);
		$this->assertOutputContains(
			'></textarea>',
			array(
				$field,
				'output'
			)
		);

		// Reset global post.
		$post = $original_post;

	}

	/**
	 * Test output when passing a custom value.
	 *
	 * @since 6.0.0
	 *
	 * @return void
	 */
	public function test_output_with_custom_value() {

		// Set-up global post.
		global $post;
		$original_post = $post;

		$post = $this->factory->post->create_and_get();
		update_post_meta( $post->ID, 'with_custom_value', 'This should not show' );

		$field = new LLMS_Metabox_Textarea_W_Tags_Field(
			array(
				'type'  => 'textarea_w_tags',
				'label' => __( 'Test', 'lifterlms' ),
				'id'    => 'with_custom_value',
				'class' => 'code input-full',
				'value' => 'Custom Value',
			),
		);

		$this->assertOutputContains(
			'>Custom Value</textarea>',
			array(
				$field,
				'output'
			)
		);

		// Reset global post.
		$post = $original_post;

	}


	/**
	 * Test output when forcing a meta.
	 *
	 * @since 6.0.0
	 *
	 * @return void
	 */
	public function test_output_with_meta_forced() {

		// Set-up global post.
		global $post;
		$original_post = $post;

		$post = $this->factory->post->create_and_get();
		update_post_meta( $post->ID, 'with_custom_value', 'This should not show' );

		$field = new LLMS_Metabox_Textarea_W_Tags_Field(
			array(
				'type'  => 'textarea_w_tags',
				'label' => __( 'Test', 'lifterlms' ),
				'id'    => 'with_custom_value',
				'class' => 'code input-full',
				'meta'  => 'Custom Value',
			),
		);

		$this->assertOutputContains(
			'>Custom Value</textarea>',
			array(
				$field,
				'output'
			)
		);

		// Reset global post.
		$post = $original_post;

	}


	/**
	 * Test output with rows and columns.
	 *
	 * @since 6.0.0
	 *
	 * @return void
	 */
	public function test_output_rows_and_cols() {

		// Set-up global post.
		global $post;
		$original_post = $post;
		$post = $this->factory->post->create_and_get();

		$args = array(
			'type'  => 'textarea_w_tags',
			'label' => __( 'Test', 'lifterlms' ),
			'id'    => 'without_custom_value',
			'class' => 'code input-full',
		);

		// Use defaults.
		$field = new LLMS_Metabox_Textarea_W_Tags_Field( $args );
		$this->assertOutputContains( 'cols="60"', array( $field, 'output' ) );
		$this->assertOutputContains( 'rows="4"', array( $field, 'output' ) );

		// Custom values.
		$args['cols'] = 5;
		$args['rows'] = 20;

		$field = new LLMS_Metabox_Textarea_W_Tags_Field( $args );
		$this->assertOutputContains( 'cols="5"', array( $field, 'output' ) );
		$this->assertOutputContains( 'rows="20"', array( $field, 'output' ) );

		// Reset global post.
		$post = $original_post;

	}

}
