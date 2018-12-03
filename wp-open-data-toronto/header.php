<?php
/**
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 * @package WP_Bootstrap_Starter
 */
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta http-equiv="x-ua-compatible" content="IE=edge">

    <link rel="profile" href="http://gmpg.org/xfn/11">
    <title><?php echo get_bloginfo( 'name' ); ?> - <?php the_title(); ?></title>

    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?>>
    <div id="page" class="site">
      <a class="skip-link screen-reader-text" href="#content">
        <?php esc_html_e( 'Skip to content', 'wp-bootstrap-starter' ); ?>
      </a>

      <?php if ( is_page( 'Homepage' ) ) : ?>
      <div id="temporary-notice" class="alert alert-info" role="alert">
        <div class="container">
          <div class="col-md-12 text-center">
            Thank you for visiting the City of Toronto's Open Data Portal Beta. This website is currently in beta and under development. As such, it contains limited resources and is not a definitive source for Open Data at this time. To access the present Open Data Portal, please visit <a href="https://www1.toronto.ca/wps/portal/contentonly?vgnextoid=9e56e03bb8d1e310VgnVCM10000071d60f89RCRD">www.toronto.ca/open</a>.
          </div>
        </div>
      </div>
      <?php endif; ?>

      <!-- Start COT Header -->
      <div id="super-header">
        <div class="container">
          <div class="row">
            <div class="col-3">
              <a href="http://www.toronto.ca">
                <img src="/wp-content/themes/wp-open-data-toronto/img/logo.svg" alt="City of Toronto" />
              </a>
            </div>
            <div class="col-9">
              <div class="social-media float-right">
                <a href="https://twitter.com/Open_TO" target="_blank"><img src="/wp-content/themes/wp-open-data-toronto/img/tw.png" alt="Open Data on Twitter"></a>
              </div>
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
                  <form class="form-inline my-2 my-lg-0" role="search" action="<?php echo site_url('/'); ?>" method="get" aria-label="Search Open Data Website">
                    <label class="sr-only" for="s">
                      Search
                    </label>
                    <input type="text" class="form-control mr-sm-2" placeholder="Search" name="s" aria-label="Search site" id="s" value="<?php the_search_query() ?>">
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
