<?php

// function custom_rewrite_basic() {
//     add_rewrite_rule('^dataset/([a-zA-Z0-9-]+)/?', 'index.php?post_type=page&name=dataset&dataset=$matches[1]', 'top');
// }
// add_action('init', 'custom_rewrite_basic');

function my_theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

// function template_chooser($template) {
//     global $wp_query;
//     $post_type = get_query_var('post_type');
//     if ( $wp_query->is_search && $post_type == 'dataset' ) {
//         return locate_template('dataset-search.php');  //  redirect to archive-search.php
//     }
//     return $template;
// }
// add_filter('template_include', 'template_chooser');

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
