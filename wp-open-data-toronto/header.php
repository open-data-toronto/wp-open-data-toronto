<?php
/**
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 * @package WP_Bootstrap_Starter
 */
?>
<!DOCTYPE html>
<html lang="en">
  <head>
  	<title data-field="title"><?php the_title(); ?> - <?php echo get_bloginfo( 'name' ); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <link rel="profile" href="http://gmpg.org/xfn/11">

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:bold,bolditalic|Roboto:bold,italic"/>

    <!--Favicon-->
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo site_url(); ?>/wp-content/themes/wp-open-data-toronto/img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo site_url(); ?>/wp-content/themes/wp-open-data-toronto/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo site_url(); ?>/wp-content/themes/wp-open-data-toronto/img/favicon/favicon-16x16.png">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <!-- Open Graph Attributes -->
    <meta property="og:title" content="<?php the_title(); ?>" />
	<meta property="og:url" content="<?php the_permalink(); ?>" />

    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?>>
    <div id="page" class="site">

      <!-- Start COT Header -->
      <div id="super-header" role="navigation" aria-label="Utility links">
        <div class="container">
          <div class="row">
            <a class="skip-link screen-reader-text" href="#content">
        <?php esc_html_e( 'Skip to content', 'wp-bootstrap-starter' ); ?>
      </a>
    </div>
  </div>
        <div class="container">
          <div class="row">
            <div class="col-3">
              <a href="http://www.toronto.ca">
                <img src="/wp-content/themes/wp-open-data-toronto/img/logo.svg" alt="City of Toronto" />
              </a>
            </div>
            <div class="col-9">
              &nbsp;
            </div>
          </div>
        </div>
      </div>
      <!-- End COT Header -->

      <!-- Main Navigation -->
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <!-- Header -->
            <header id="masthead" class="site-header navbar-static-top">
              <!-- Fixed navbar -->
              <nav class="navbar navbar-toggleable-md navbar-light">
                <a class="navbar-brand" href="<?php echo home_url(); ?>">
                  Open Data
                </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <!-- Primary Navigation -->
                  <?php
                  wp_nav_menu([
                    'theme_location'  => 'primary',
                    'container'       => 'li',
                    'container_id'    => '',
                    'container_class' => 'collapse navbar-collapse',
                    'menu_id'         => false,
                    'menu_class'      => 'navbar-nav mr-auto',
                    'depth'           => 3,
                    'fallback_cb'     => 'wp_bootstrap_navwalker::fallback',
                    'walker'          => new wp_bootstrap_navwalker()
                  ]);
                  ?>

                  <!-- Search -->
                  <form class="form-inline my-2 my-lg-0" role="search" action="<?php echo site_url('/'); ?>" method="get">
                    <label class="sr-only" for="s">
                      Search Open Data Website
                    </label>
                    <input type="text" class="form-control mr-sm-2" placeholder="Search" name="s" id="s" value="<?php the_search_query() ?>">
                    <button class="btn btn-primary my-2 my-sm-0" type="submit">
                      Search
                    </button>
                  </form>
                  <!-- End Search -->
                </div>
              </nav>
            </header>
            <!-- End Header -->
          </div>
        </div>
      </div>

      <main class="site-content">
        <div class="container">
           <div class="row">
