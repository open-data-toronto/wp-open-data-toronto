<?php
/**
 * WP Bootstrap Starter Theme Customizer
 *
 * @package WP_Bootstrap_Starter
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function wp_bootstrap_starter_customize_register( $wp_customize ) {

    $wp_customize->add_section( 'header_section' , array(
        'title'      => __( 'Header Content', 'wp-bootstrap-starter' ),
        'priority'   => 50,
        'panel' => 'header_panel'
    ) );

    $wp_customize->add_setting( 'header_banner_title_setting', array(
        'default' => __( 'WP Bootstrap Framework', 'wp-bootstrap-starter' ),
        'sanitize_callback' => 'wp_filter_nohtml_kses',
    ) );
    $wp_customize->add_control( new WP_Customize_Control($wp_customize, 'header_banner_title_setting', array(
        'label' => __( 'Banner Title', 'wp-bootstrap-starter' ),
        'section'    => 'header_section',
        'settings'   => 'header_banner_title_setting',
        'type' => 'text'
    ) ) );
    $wp_customize->add_setting( 'header_banner_tagline_setting', array(
        'default' => __( 'A versatile and responsive Bootstrap WordPress starter theme for developers based on Twitter Botstrap.', 'wp-bootstrap-starter' ),
        'sanitize_callback' => 'wp_filter_nohtml_kses',
    ) );
    $wp_customize->add_control( new WP_Customize_Control($wp_customize, 'header_banner_tagline_setting', array(
        'label' => __( 'Banner Tagline', 'wp-bootstrap-starter' ),
        'section'    => 'header_section',
        'settings'   => 'header_banner_tagline_setting',
        'type' => 'text'
    ) ) );
    //Header Panel
    $wp_customize->add_panel(
        'header_panel',
        array(
            'priority' => 10,
            'capability' => 'edit_theme_options',
            'theme_supports' => '',
            'title' => __( 'Header', 'wp-bootstrap-starter' ),
            'description' => __( 'Description of what this panel does.', 'wp-bootstrap-starter' ),
        )
    );

    $wp_customize->add_section(
        'header_image',
        array(
            'title' => __( 'Header Image', 'wp-bootstrap-starter' ),
            'description' => __( 'This is a section for the header banner Image.', 'wp-bootstrap-starter' ),
            'priority' => 10,
            'panel' => 'header_panel',
        )
    );
    $wp_customize->add_control(
        'example_text',
        array(
            'label' => __( 'Header Image', 'wp-bootstrap-starter' ),
            'section' => 'header_image',
            'type' => 'text',
            'panel' => 'header_panel'
        )
    );

    //Style Preset

    $wp_customize->add_section(
        'typography',
        array(
            'title' => __( 'Typography', 'wp-bootstrap-starter' ),
            'description' => __( 'This is a section for the typography', 'wp-bootstrap-starter' ),
            'priority' => 30,
        )
    );

    $wp_customize->add_setting( 'preset_style_setting', array(
        'default'   => 'default',
        'type'       => 'theme_mod',
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'wp_filter_nohtml_kses',
    ) );
    $wp_customize->add_control( new WP_Customize_Control($wp_customize, 'preset_style_setting', array(
        'label' => __( 'Preset Style', 'wp-bootstrap-starter' ),
        'section'    => 'typography',
        'settings'   => 'preset_style_setting',
        'type'    => 'select',
        'choices' => array(
            'default' => 'Default',
            'preset1' => 'Poppins / Lora',
            'preset2' => 'Montserrat / Merriweather',
        )
    ) ) );



	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

    // Add control for logo uploader
	$wp_customize->add_setting( 'wp_bootstrap_starter_logo', array(
        //'default' => __( '', 'wp-bootstrap-starter' ),
        'sanitize_callback' => 'esc_url',
    ) );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'wp_bootstrap_starter_logo', array(
        'label'    => __( 'Upload Logo (replaces text)', 'wp-bootstrap-starter' ),
        'section'  => 'title_tagline',
        'settings' => 'wp_bootstrap_starter_logo',
    ) ) );

}
add_action( 'customize_register', 'wp_bootstrap_starter_customize_register' );


/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function wp_bootstrap_starter_customize_preview_js() {
	wp_enqueue_script( 'wp_bootstrap_starter_customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'wp_bootstrap_starter_customize_preview_js' );
