<?php
register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );

function custom_flush_rewrites() {
    global $wp_rewrite;
    $wp_rewrite->flush_rules();
}
register_activation_hook( __FILE__, 'custom_flush_rewrites' );

function custom_url_rewrite() {
    add_rewrite_rule(
        '^dataset/([^/]+)([/]?)(.*)/?$',
        'index.php?pagename=dataset&dataset=$matches[1]',
        'top'
    );
}
add_action( 'init', 'custom_url_rewrite' );

function query_custom_vars( $vars ) {
    $vars[] = 'dataset';
    return $vars;
}
add_filter('query_vars', 'query_custom_vars');

function theme_enqueue_styles() {
    wp_enqueue_style( 'highlightjs-style', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/github-gist.min.css' );
    wp_enqueue_style( 'datatable-style', 'https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.19/css/dataTables.bootstrap4.min.css' );
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'font-style', get_stylesheet_directory_uri() . '/fonts/font-awesome.min.css');
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

function theme_enqueue_scripts() {
    $script_path = get_stylesheet_directory_uri() . '/js/';
    $page_name = basename(get_page_template());

    $site_url = get_site_url();
    if (strpos($site_url, 'dev') !== false) {
      wp_enqueue_script( 'webtrend', 'https://delivery0.cf.wp.inter.dev-toronto.ca/scripts/dev-webtrends-infinity.load.js', array('jquery') );
    } elseif (strpos($site_url, 'qa') !== false) {
      wp_enqueue_script( 'webtrend', 'https://delivery0.cf.wp.inter.qa-toronto.ca/scripts/qa-webtrends-infinity.load.js', array('jquery') );
    } else {
      wp_enqueue_script( 'webtrend', 'https://www.toronto.ca/scripts/webtrends-infinity.load.js', array('jquery') );
    }

    wp_enqueue_script( 'ckan_base', $script_path . 'utils.js', array('jquery') );
    if (in_array($page_name, ['homepage.php', 'page-catalogue.php', 'page-dataset.php'])):
        wp_enqueue_script( 'ckan_link', $script_path . 'config.js', array('ckan_base') );
        wp_enqueue_script( 'ckan_page', $script_path . str_replace('php', 'js', $page_name), array('ckan_base') );
    endif;

    wp_register_script( 'datatable', 'https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.js' );
    wp_enqueue_script( 'datatable' );
    wp_register_script( 'datatable_bootstrap', 'https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js' );
    wp_enqueue_script( 'datatable_bootstrap' );

    wp_register_script( 'showdown', 'https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.min.js' );
    wp_enqueue_script( 'showdown' );

    wp_register_script( 'highlightjs', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js' );
    wp_enqueue_script( 'highlightjs' );
    wp_register_script( 'highlightjs_lines', 'https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.5.0/highlightjs-line-numbers.min.js' );
    wp_enqueue_script( 'highlightjs_lines' );

    wp_register_script( 'copyjs', 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js' );
    wp_enqueue_script( 'copyjs' );

    wp_register_script( 'dompurify', 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/1.0.8/purify.min.js' );
    wp_enqueue_script( 'dompurify' );
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

// Adds Excerpts to Pages
add_post_type_support( 'page', 'excerpt' );

add_theme_support( 'post-thumbnails' );

function wpdocs_custom_excerpt_length( $length ) {
    return 20;
}
add_filter( 'excerpt_length', 'wpdocs_custom_excerpt_length', 999 );

function wpse_217847_list_terms_exclusions( $query, $args ) {
    if ( ! empty( $args['exclude_slugs'] ) ) {
        if ( ! is_array( $slugs = $args['exclude_slugs'] ) )
            $slugs = array_map( 'trim', explode( ',', $slugs ) );

        $slugs  = array_map( 'esc_sql', $slugs );
        $slugs  = implode( '","', $slugs );
        $query .= sprintf( ' AND t.slug NOT IN ("%s")', $slugs );
    }

    return $query;
}

add_filter( 'list_terms_exclusions', 'wpse_217847_list_terms_exclusions', 10, 2 );
?>
<?php remove_filter( 'the_content', 'wpautop' ); 
?>