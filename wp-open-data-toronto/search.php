<!-- Search Results Template for Regular Search (NOT Datasets) -->

<?php get_header(); ?>

  <div class="container">
    <!-- Breadcrumbs -->
    <div class="row">
      <div class="col-md-12">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <a class="breadcrumb-item" href="<?php echo site_url(); ?>">Open Data Portal Home</a>
          <a class="breadcrumb-item">Search Results for <?php echo esc_html( $s ); ?></a>
        </nav>
      </div>
    </div>
    <!-- End breadcrumbs -->
    <div id="content">
    <h1 class="sr-only">Search results</h1>
    <div class="row">
      <div class="col-md-12">
        <?php
        if ( have_posts() ) :
          while ( have_posts() ) :
            the_post();
        ?>

        <div class="search-results-content">
          <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
          <?php the_excerpt(); ?>
        </div>

        <?php
          endwhile;
        else :
        ?>

        <div class="no-result-found">
          <div class="alert alert-danger " role="alert">
            <strong>No search results found for '<?php echo esc_html( $s ); ?>'.</strong> Please try search again with a different keyword.
          </div>
        </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
</div>
</div>

<?php get_footer(); ?>
