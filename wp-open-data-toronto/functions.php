<?php
add_action( 'init', 'custom_url_rewrite' );
function custom_url_rewrite() {
    add_rewrite_rule(
        '^package/([^/]+)([/]?)(.*)/?$',
        'index.php?pagename=package&package=$matches[1]',
        'top'
    );
}

add_filter('query_vars', function( $vars ){
    $vars[] = 'package';
    return $vars;
});

function custom_flush_rewrites() {
    global $wp_rewrite;
    $wp_rewrite->flush_rules();
}
register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );
register_activation_hook( __FILE__, 'custom_flush_rewrites' );

function my_theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

add_theme_support( 'post-thumbnails' );

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

function new_excerpt_more( $more ) {
    return ' <a class="read-more" href="'. get_permalink( get_the_ID() ) . '">' . __('...', 'your-text-domain') . '</a>';
}
add_filter( 'excerpt_more', 'new_excerpt_more' );

?>
