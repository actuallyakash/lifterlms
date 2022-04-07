<?php
/**
 * LLMS_Order_Generator class file.
 *
 * @package LifterLMS/Classes
 *
 * @since [version]
 * @version [version]
 */

defined( 'ABSPATH' ) || exit;

/**
 * Validate and create LLMS_Order posts.
 *
 * @since [version]
 */
class LLMS_Order_Generator {

	/**
	 * Error code: invalid coupon code submitted.
	 *
	 * @var string
	 */
	const E_COUPON_INVALID = 'llms-order-gen-coupon-invalid';

	/**
	 * Error code: coupon code not found.
	 *
	 * @var string
	 */
	const E_COUPON_NOT_FOUND = 'llms-order-gen-coupon-not-found';

	/**
	 * Error code: issue encountered during order post creation.
	 *
	 * @var string
	 */
	const E_CREATE_ORDER = 'llms-order-gen-create-order';

	/**
	 * Error code: payment gateway id not submitted.
	 *
	 * @var string
	 */
	const E_GATEWAY_REQUIRED = 'llms-order-gen-gateway-required';

	/**
	 * Error code: required plan ID not submitted.
	 *
	 * @var string
	 */
	const E_PLAN_REQUIRED = 'llms-order-gen-plan-required';

	/**
	 * Error code: access plan not found.
	 *
	 * @var string
	 */
	const E_PLAN_NOT_FOUND = 'llms-order-gen-plan-not-found';

	/**
	 * Error code: invalid coupon code submitted.
	 *
	 * @var string
	 */
	const E_SITE_TERMS = 'llms-order-gen-site-terms';

	/**
	 * Error code: user already enrolled.
	 *
	 * @var string
	 */
	const E_USER_ENROLLED = 'llms-order-gen-user-enrolled';

	/**
	 * User Action: validate and then commit (register or update) the user.
	 *
	 * @var string
	 */
	const UA_COMMIT = 'commit';

	/**
	 * User Action: perform user validation only.
	 *
	 * @var string
	 */
	const UA_VALIDATE = 'validate';

	/**
	 * The coupon used to discount the order.
	 *
	 * Derived from `$this->data['llms_coupon_code']`.
	 *
	 * Will be empty until the coupon is validated.
	 *
	 * @var LLMS_Coupon|null
	 */
	protected $coupon = null;

	/**
	 * Associative array of input data.
	 *
	 * Usually the $_POST superglobal.
	 *
	 * @var array
	 */
	protected $data = array();

	/**
	 * The payment gateway used to process the order.
	 *
	 * Derived from `$this->data['llms_payment_gateway']` .
	 *
	 * Will be empty until the gateway is validated.
	 *
	 * @var LLMS_Payment_Gateway|null
	 */
	protected $gateway = null;

	/**
	 * The access plan used to generate the order.
	 *
	 * Derived from `$this->data['llms_plan_id']`.
	 *
	 * Will be empty until the plan is validated.
	 *
	 * @var LLMS_Access_Plan|null
	 */
	protected $plan = null;

	/**
	 * The student used to generate the order.
	 *
	 * Will be empty until the user is created / update following all validations.
	 *
	 * If `$this->user_action` is `validate` then the student will not be set and will
	 * remain empty.
	 *
	 * @var LLMS_Student|null
	 */
	protected $student = null;

	/**
	 * The user action.
	 *
	 * Accepts `validate` or `commit`.
	 *
	 * The `validate` action will validate the user extracting the relevant data from
	 * `$this->data` and store the data on the order (without creating the user).
	 *
	 * The "commit" action will perform the `validate` action and then persist the user
	 * to the database via either a user registration or user update.
	 *
	 * @var string
	 */
	protected $user_action = 'commit';

	/**
	 * Constructor.
	 *
	 * @since [version]
	 *
	 * @param array $data {
	 *     An associative array of input data used to generate the order, usually from $_POST.
	 *
	 *     @type integer $llms_plan_id         An LLMS_Access_Plan ID.
	 *     @type string  $llms_agree_to_terms  A yes/no value determining whether or not the user has agreed to the site's terms.
	 *     @type string  $llms_payment_gateway The ID of the payment gateway used to process the order.
	 *     @type string  $llms_coupon_code     Optional. The coupon code string being used.
	 *     @type string  $llms_order_key       Optional. An `LLMS_Order` key used to modify an existing pending order rather than creating a new one.
	 *     @type array   ...$user_data         All remaining data is passed to the user creation functions.
	 * }
	 * @param string $user_action The user action, accepts `LLMS_Order_Generator::UA_COMMIT` or `LLMS_Order_Generator::UA_VALIDATE`.
	 */
	public function __construct( $data, $user_action = self::UA_COMMIT ) {

		$this->data        = $data;
		$this->user_action = $user_action;

	}

	/**
	 * Creates a new order.
	 *
	 * @since [version]
	 *
	 * @return WP_Error|LLMS_Order
	 */
	protected function create() {

		$order = new LLMS_Order( $this->get_order_id() );

		// If there's no id we can't proceed, return an error.
		if ( ! $order->get( 'id' ) ) {
			return $this->error(
				self::E_CREATE_ORDER,
				__( 'There was an error creating your order, please try again.', 'lifterlms' )
			);
		}

		$order->init( $this->get_user_data(), $this->plan, $this->gateway, $this->coupon );

		return $order;

	}

	/**
	 * Registers or updates the user from the submitted data.
	 *
	 * @since [version]
	 *
	 * @return integer|WP_Error Returns the `WP_User` ID on success or an error object.
	 */
	protected function commit_user() {

		$args = array(
			'plan' => $this->plan,
		);

		if ( get_current_user_id() ) {
			return llms_update_user( $this->data, 'checkout', $args );
		}

		return llms_register_user( $this->data, 'checkout', true, $args );

	}

	/**
	 * Returns an error object.
	 *
	 * This method accepts an error code and message and passes them directly to `WP_Error` and
	 * adds all class variables to the error objects `$data` parameter.
	 *
	 * @since [version]
	 *
	 * @param string $code       Error code.
	 * @param string $message    Error message.
	 * @param array  $extra_data Additional data to pass to WP_Error's 3rd parameter.
	 * @return WP_Error
	 */
	protected function error( $code, $message, $extra_data = array() ) {

		$data = get_class_vars( __CLASS__ );
		foreach ( $data as $key => &$val ) {
			$val = $this->{$key};
		}

		return new WP_Error( $code, $message, array_merge( $data, $extra_data ) );

	}

	/**
	 * Generates an order.
	 *
	 * Uses data submitted during class construction and performs all necessary
	 * validations. If validations pass, creates the order.
	 *
	 * @since [version]
	 *
	 * @return WP_Error|LLMS_Order
	 */
	public function generate() {

		$validate = $this->validate();
		if ( is_wp_error( $validate ) ) {
			return $validate;
		}

		if ( self::UA_COMMIT === $this->user_action ) {
			$user = $this->commit_user();
			if ( is_wp_error( $user ) ) {
				return $user;
			}
			$this->student = llms_get_student( $user );
		}

		return $this->create();

	}

	/**
	 * Retrieves the coupon object for the order.
	 *
	 * @since [version]
	 *
	 * @return LLMS_Coupon|null
	 */
	public function get_coupon() {
		return $this->coupon;
	}

	/**
	 * Retrieves the payment gateway instance for the order.
	 *
	 * @since [version]
	 *
	 * @return LLMS_Payment_Gateway|null
	 */
	public function get_gateway() {
		return $this->gateway;
	}

	/**
	 * Retrieves the order id to use for the order.
	 *
	 * Attempts to locate an existing pending order by order key if it was submitted,
	 * otherwise returns `new` which denotes a new order should be created.
	 *
	 * @since [version]
	 *
	 * @return integer|string
	 */
	protected function get_order_id() {

		$key      = $this->data['llms_order_key'] ?? null;
		$order_id = null;

		if ( $key ) {
			$locate   = llms_get_order_by_key( $key, 'id' );
			$order_id = $locate;
		}

		return $order_id ? $order_id : 'new';

	}

	/**
	 * Retrieves the access plan for the order.
	 *
	 * @since [version]
	 *
	 * @return LLMS_Access_Plan|null
	 */
	public function get_plan() {
		return $this->plan;
	}

	/**
	 * Retrieves the student for the order.
	 *
	 * @since [version]
	 *
	 * @return LLMS_Student|null
	 */
	public function get_student() {
		return $this->student;
	}

	/**
	 * Retrieves an array of data representing the student.
	 *
	 * The resulting array is intended to be used for setting up the `LLMS_Order` post's
	 * user metadata, ideally passed to `LLMS_Order::init()`.
	 *
	 * @since [version]
	 *
	 * @return array
	 */
	public function get_user_data() {

		$map = array(
			'billing_email'      => 'email_address',
			'billing_first_name' => 'first_name',
			'billing_last_name'  => 'last_name',
			'billing_phone'      => 'llms_phone',
		);

		$data = array(
			'billing_email'      => '',
			'billing_first_name' => '',
			'billing_last_name'  => '',
			'billing_address_1'  => '',
			'billing_address_2'  => '',
			'billing_city'       => '',
			'billing_state'      => '',
			'billing_zip'        => '',
			'billing_country'    => '',
			'billing_phone'      => '',
		);

		foreach ( $data as $key => &$val ) {
			$data_key = $map[ $key ] ?? "llms_{$key}";
			$val = $this->data[ $data_key ] ?? '';
		}

		$data['user_id'] = $this->student ? $this->student->get( 'id' ) : '';

		return $data;


	}

	/**
	 * Performs all required data validations necessary to create the order.
	 *
	 * @since [version]
	 *
	 * @return boolean|WP_Errors Returns `true` if all validations pass or an error object.
	 */
	protected function validate() {

		/**
		 * Allows 3rd party validation prior to generation of an order.
		 *
		 * This validation hooks runs prior to all default validation.
		 *
		 * @since [version]
		 *
		 * @param null|WP_Error $validation_errors Halts checkout and returns the supplied error.
		 */
		$before_validation = apply_filters( 'llms_before_generate_order_validation', null );
		if ( is_wp_error( $before_validation) ) {
			return $before_validation;
		}

		$validations = array(
			'validate_plan',
			'validate_coupon',
			'validate_gateway',
			'validate_terms',
			'validate_user',
		);

		foreach ( $validations as $func ) {
			$res = $this->{$func}();
			if ( is_wp_error( $res ) ) {
				return $res;
			}
		}

		/**
		 * Allows 3rd party prior to generation of an order.
		 *
		 * This validation hooks runs after to all default validation passes.
		 *
		 * @since [version]
		 *
		 * @param boolean|WP_Error $validation_errors Halts checkout and returns the supplied error.
		 */
		return apply_filters( 'llms_after_generate_order_validation', true );

	}

	/**
	 * Validates the coupon.
	 *
	 * @since [version]
	 *
	 * @return boolean|WP_Error Returns `true` on success or an error object.
	 */
	protected function validate_coupon() {

		// If a coupon is being used, validate it.
		if ( ! empty( $this->data['llms_coupon_code'] ) ) {

			$code = sanitize_text_field( $this->data['llms_coupon_code'] );

			// Locate the coupon post ID.
			$coupon_id = llms_find_coupon( $code );
			if ( ! $coupon_id ) {
				return $this->error(
					self::E_COUPON_NOT_FOUND,
					sprintf(
						// Translators: %s = The user-submitted coupon code.
						__( 'Coupon code "%s" not found.', 'lifterlms' ),
						$code
					)
				);
			}

			// Validate the coupon for the current plan.
			$coupon = llms_get_post( $coupon_id );
			$valid  = $coupon->is_valid( $this->plan->get( 'id' ) );
			if ( is_wp_error( $valid ) ) {
				return $this->error( self::E_COUPON_INVALID, $valid->get_error_message() );
			}

			$this->coupon = $coupon;

		}

		return true;
	}

	/**
	 * Validates the payment gateway.
	 *
	 * @since [version]
	 *
	 * @return boolean|WP_Error Returns `true` on success or an error object.
	 */
	protected function validate_gateway() {

		$coupon_id = $this->coupon ? $this->coupon->get( 'id' ) : null;

		/**
		 * If payment is required, verify we have a gateway.
		 *
		 * For free plans the manual gateway is automatically used, whether or not it's enabled.
		 */
		if ( $this->plan->requires_payment( $coupon_id ) && empty( $this->data['llms_payment_gateway'] ) ) {
			return $this->error( self::E_GATEWAY_REQUIRED, __( 'No payment method selected.', 'lifterlms' ) );
		}

		$gateway_id = $this->data['llms_payment_gateway'] ?? 'manual';
		$is_valid   = llms_can_gateway_be_used_for_plan( $gateway_id, $this->plan );
		if ( is_wp_error( $is_valid ) ) {
			return $is_valid;
		}

		$this->gateway = llms()->payment_gateways()->get_gateway_by_id( $gateway_id );
		return true;

	}

	/**
	 * Validates the access plan.
	 *
	 * Ensures the access plan data was submitted and that it's a valid plan.
	 *
	 * @since [version]
	 *
	 * @return boolean|WP_Error Returns `true` on success or an error object.
	 */
	protected function validate_plan() {

		$plan_id = $this->data['llms_plan_id'] ?? null;
		if ( ! $plan_id ) {
			return $this->error( self::E_PLAN_REQUIRED, __( 'Missing access plan ID.', 'lifterlms' ) );
		}

		$plan = llms_get_post( $plan_id );
		if ( ! $plan || 'llms_access_plan' !== $plan->get( 'type' ) ) {
			return $this->error( self::E_PLAN_NOT_FOUND, __( 'Access plan not found.', 'lifterlms' ) );
		}

		$this->plan = $plan;
		return true;

	}

	/**
	 * Validates the site's terms and conditions were submitted.
	 *
	 * @since [version]
	 *
	 * @return boolean|WP_Error Returns `true` on success or an error object.
	 */
	protected function validate_terms() {

		if ( llms_are_terms_and_conditions_required() && ! llms_parse_bool( $this->data['llms_agree_to_terms'] ?? 'no' ) ) {
			return $this->error(
				self::E_SITE_TERMS,
				sprintf(
					// Translators: %s = The title of the site's LifterLMS Terms and Conditions page.
					__( 'You must agree to the %s.', 'lifterlms' ),
					get_the_title( get_option( 'lifterlms_terms_page_id' ) )
				)
			);
		}

		return true;

	}

	/**
	 * Validates the submitted user data.
	 *
	 * @since [version]
	 *
	 * @return boolean|WP_Error Returns `true` on success or an error object.
	 */
	protected function validate_user() {

		$validate = llms_validate_user( $this->data );
		if ( is_wp_error( $validate ) ) {
			return $validate;
		}

		// If validation passes, determine if the user already exists and, if they do, validate their enrollment.
		$email = $this->data['email_address'] ?? null;
		$user  = $email ? get_user_by( 'email', $email ) : false;
		if ( $user && llms_is_user_enrolled( $user->ID, $this->plan->get( 'product_id' ) ) ) {
			return $this->error(
				self::E_USER_ENROLLED,
				sprintf(
					// Translators: %s = The title of the course or membership.
					__( 'You already have access to %s.', 'lifterlms' ),
					get_the_title( $this->plan->get( 'product_id' ) )
				)
			);
		}

		return true;
	}

}
