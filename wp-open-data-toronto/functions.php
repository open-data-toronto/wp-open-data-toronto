<?php
register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );

function custom_flush_rewrites() {
    global $wp_rewrite;
    $wp_rewrite->flush_rules();
}
register_activation_hook( __FILE__, 'custom_flush_rewrites' );

function custom_url_rewrite() {
    add_rewrite_rule(
        '^package/([^/]+)([/]?)(.*)/?$',
        'index.php?pagename=package&package=$matches[1]',
        'top'
    );
}
add_action( 'init', 'custom_url_rewrite' );

function query_custom_vars( $vars ) {
    $vars[] = 'package';
    return $vars;
}
add_filter('query_vars', 'query_custom_vars');

function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'font-style', get_stylesheet_directory_uri() . '/fonts/font-awesome.min.css');
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

function theme_enqueue_scripts() {
    $script_path = get_stylesheet_directory_uri() . '/js/';
    $page_name = basename(get_page_template());

    wp_enqueue_script( 'webtrend', $script_path . 'webtrends-infinity.load.js');

    wp_enqueue_script( 'ckan_base', $script_path . 'utils.js', array('jquery') );
    if (in_array($page_name, ['homepage.php', 'page-catalogue.php', 'page-dataset.php'])):
        wp_enqueue_script( 'ckan_page', $script_path . str_replace('php', 'js', $page_name), array('ckan_base') );
    endif;

    wp_register_script( 'showdown', 'https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.min.js' );
    wp_enqueue_script( 'showdown' );
}

add_action( 'wp_enqueue_scripts', 'theme_enqueue_scripts' );

function arphabet_widgets_init() {
    register_sidebar([
        'name'          => 'Home right sidebar',
        'id'            => 'left-sidebar',
        'before_widget' => '<div>',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="rounded">',
        'after_title'   => '</h2>',
    ]);
}
add_action( 'widgets_init', 'arphabet_widgets_init' );

add_theme_support( 'post-thumbnails' );

// function new_excerpt_more( $more ) {
//     return ' <a class="read-more" href="'. get_permalink( get_the_ID() ) . '">' . __('...', 'your-text-domain') . '</a>';
// }
// add_filter( 'excerpt_more', 'new_excerpt_more' );
?>
