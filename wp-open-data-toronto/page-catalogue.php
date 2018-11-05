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

      <div class="row block-hidden">
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

      <div class="row block-hidden">
        <div class="col-md-6 offset-md-3">
          <div class="input-group" aria-label="Search the Open Data Catalogue">
            <label for="search" class="sr-only">Search Dataset</label>
            <input type="text" class="form-control" name="search" id="input-search" placeholder="Search datasets"/>
            <span class="input-group-btn">
              <button id="btn-search" class="btn btn-secondary" type="submit">Search Datasets</button>
            </span>
          </div>
        </div>
      </div>

      <div class="row block-hidden">
        <div class="col-md-3">
          <div class="sidebar" style="border: 0" role="complementary">
            <div class="filter filter-owner_division" aria-label="Filter datasets by division">
              <h2>Tags</h2>
              <select class="custom-select" id="select-division" data-type="filter" data-field="owner_division"></select>
            </div>
            <br/>

            <div class="filter filter-tags" aria-label="Filter datasets by tags">
              <h2>Tags</h2>
              <select class="custom-select" id="select-tags" data-type="filter" data-field="tags"></select>
            </div>
            <br/>

            <div class="filter filter-dataset_category" aria-label="Filter datasets by the category of dataset">
              <h2>Dataset Type</h2>
              <ul data-type="filter"></ul>
            </div>

            <div class="filter filter-resource_formats" aria-label="Filter datasets by the format of resources">
              <h2>Formats</h2>
              <ul data-type="filter"></ul>
            </div>
            <br/>

            <button id="btn-filter-clear" type="button" class="btn btn-danger">Reset Filters</button>
          </div>
          <!-- End Sidebar -->
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
