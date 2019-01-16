<!-- Plain Page Template -->

<!-- Hide Sidebar if User Picks Full Screen Layout -->
<?php if ( types_render_field( 'hide-sidebar-page', array( 'value'=>1 ) ) ) : ?>
<!-- Conditional Display for Sidebar on page.php // Do not remove -->
<style>
/** Device Specific Styles **/
.hide-full-length {
    display: none !important;
}

.show-full-length {
    width: 100%;
    flex: 0 0 100%;
    max-width: 100%;
}

#toc_container {
    background: #ffffff;
    border: 1px solid #aaa;
    padding: 10px;
    margin-bottom: 1em;
    width: auto;
    display: table;
    font-size: 95%;
    position: fixed;
    left: 0;
    top: 40vh;
    margin-left: 20px;
}
</style>
<?php endif; ?>
<?php get_header(); ?>

  <section class="content-area">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <!-- Breadcrumbs -->
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <a class="breadcrumb-item" href="<?php echo site_url(); ?>">Open Data Portal Home</a>
            <a class="breadcrumb-item"><?php the_title(); ?></a>
          </nav>
          <!-- End breadcrumbs -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="banner" style="background-image:url(<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); echo $url ?>) !important">
            <div class="background">
              <h1><?php the_title(); ?></h1>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <div class="hide-full-length">
            <!-- Call General Sidebar // sidebar.php -->
            <?php get_sidebar(); ?>
          </div>
        </div>

        <div class="col-md-9" id="content">
          <div class="show-full-length">
            <div class="main-content">
            <!-- Query page content-->
            <?php
            if ( have_posts() ) :
              while ( have_posts() ) :
                the_post();
                the_content();
              endwhile;
            endif;
            ?>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</div>
<?php get_footer(); ?>
