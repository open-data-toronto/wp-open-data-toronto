<?php  /* Template Name: Catalogue Page */ ?>

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
          <!-- Banner -->
          <div class="banner" style="background-image:url(<?php echo wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); ?>) !important">
            <div class="background">
              <h1><?php the_title(); ?></h1>
            </div>
          </div>
          <!-- End Banner -->
        </div>
      </div>

      <div class="row">
        <!-- Sidebar for Catalogue Page -->
        <div class="col-md-3">
          <?php include ('sidebar-catalogue.php'); ?>
        </div>

        <div class="col-md-9">
          <!-- List of Datasets -->
          <div class="table-list" aria-label="List of Datasets"></div>
          <nav id="nav-catalogue" aria-label="Page Navigation">
            <ul class="pagination pagination-sm">
              <li class="page-item page-keep">
                <a class="page-link" href="#" aria-label="Go to previous page" data-page="previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li class="page-item page-keep">
                <a class="page-link" href="#" aria-label="Go to next page" data-page="next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</div>

<script type="text/javascript">
    jQuery(document).ready(function($) { init(); });
</script>

<?php get_footer();
