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
        <div class="col-md-3">
          <div class="sidebar" style="border: 0" role="complementary">
            <div class="card">
              <div class="card-header card-filters" role="tab" id="heading-dataset_category">
                <h5 class="mb-0">
                  <a class="collapsed" data-toggle="collapse" data-parent=".sidebar" href="#collapse-dataset_category" aria-expanded="true" aria-controls="collapse-dataset_category">
                    Dataset Type
                    <span class="accordion-arrow">
                      <span class="fa fa-chevron-down"></span>
                    </span>
                  </a>
                </h5>
              </div>

              <div id="collapse-dataset_category" class="collapse" role="tabpanel" aria-labelledby="heading-dataset_category">
                <div class="row">
                  <div class="col-md-12">
                    <ul data-type="filter" data-field="dataset_category"></ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header card-filters" role="tab" id="heading-owner_division">
                <h5 class="mb-0">
                  <a class="collapsed" data-toggle="collapse" data-parent=".sidebar" href="#collapse-owner_division" aria-expanded="true" aria-controls="collapse-owner_division">
                    Divisions
                    <span class="accordion-arrow">
                      <span class="fa fa-chevron-down"></span>
                    </span>
                  </a>
                </h5>
              </div>

              <div id="collapse-owner_division" class="collapse" role="tabpanel" aria-labelledby="heading-owner_division">
                <div class="row">
                  <div class="col-md-12">
                    <ul data-type="filter" data-field="owner_division"></ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header card-filters" role="tab" id="heading-resource_formats">
                <h5 class="mb-0">
                  <a class="collapsed" data-toggle="collapse" data-parent=".sidebar" href="#collapse-resource_formats" aria-expanded="true" aria-controls="collapse-resource_formats">
                    Resource Formats
                    <span class="accordion-arrow">
                      <span class="fa fa-chevron-down"></span>
                    </span>
                  </a>
                </h5>
              </div>

              <div id="collapse-resource_formats" class="collapse" role="tabpanel" aria-labelledby="heading-resource_formats">
                <div class="row">
                  <div class="col-md-12">
                    <ul data-type="filter" data-field="resource_formats"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Sidebar -->
        </div>

        <div class="col-md-9">
          <!-- List of Datasets -->
          <div class="input-group" aria-label="Search the Open Data Catalogue">
            <label for="search" class="sr-only">Search Dataset</label>
            <input type="text" class="form-control" name="search" id="input-search" placeholder="Search datasets"/>
            <span class="input-group-btn">
              <button id="btn-search" class="btn btn-secondary" type="submit">Search Datasets</button>
            </span>
          </div>
          <div class="search-results" aria-label="Search Results"></div>
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
