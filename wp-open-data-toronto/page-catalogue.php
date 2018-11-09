<?php /* Template Name: Catalogue Page */?>

<?php get_header();?>

  <section class="content-area">
      <div class="container">
          <div class="row">
              <div class="col-md-12">
                  <!-- Breadcrumbs -->
                  <nav class="breadcrumb" aria-label="breadcrumbs">
                      <a class="breadcrumb-item" href="<?php echo site_url(); ?>">Open Data Portal Home</a>
                      <a class="breadcrumb-item">
                          <?php the_title();?></a>
                  </nav>
                  <!-- End breadcrumbs -->
              </div>
          </div>

          <div class="row block-hidden">
              <div class="col-md-12">
                  <!-- Banner -->
                  <div class="banner" style="background-image:url(<?php echo wp_get_attachment_url(get_post_thumbnail_id($post->ID), 'thumbnail'); ?>) !important">
                      <div class="background">
                          <h1>
                              <?php the_title();?>
                          </h1>
                      </div>
                  </div>
                  <!-- End Banner -->
              </div>
          </div>

          <div class="row block-hidden">
              <!-- Sidebar -->
              <div class="col-md-3" id="filter-sidebar">
                  <div class="sidebar-filters">
                      <div class="card" id="dataset_category-filter">
                          <div class="card-header filter-heading">
                              <h5>Type</h5>
                          </div>
                          <ul data-type="filter" data-field="dataset_category" class="list-group list-group-flush" id="dataset_category-values">
                              <li class="show-more list-group-item list-group-item-action" data-field="dataset_category"><label></label></li>
                          </ul>
                      </div>

                      <div class="card" id="owner_division-filter">
                          <div class="card-header filter-heading">
                              <h5>Division</h5>
                          </div>
                          <ul data-type="filter" data-field="owner_division" class="list-group list-group-flush" id="owner_division-values">
                              <li class="show-more list-group-item list-group-item-action" data-field="owner_division"><label></label></li>

                          </ul>
                      </div>

                      <div class="card" id="vocab_formats-filter">
                          <div class="card-header filter-heading">
                              <h5>File Format</h5>
                          </div>
                          <ul data-type="filter" data-field="vocab_formats" class="list-group list-group-flush" id="vocab_formats-values">
                              <li class="show-more list-group-item list-group-item-action" data-field="vocab_formats"><label></label></li>
                          </ul>
                      </div>
                  </div>
              </div>
              <!-- End Sidebar -->
              <div class="col-md-9" id="data-catalogue">
                  <div class="container-fluid">
                      <!-- Dataset Search Area -->
                      <div class="row" id="dataset-search-box">
                          <div class="input-group" aria-label="Search the Open Data Catalogue">
                              <label for="search" class="sr-only">Search Dataset</label>
                              <input type="text" class="form-control" name="search" id="input-search" placeholder="Search datasets" />
                              <span class="input-group-btn">
                                  <button id="btn-search" class="btn btn-secondary" type="submit"><i class="fa fa-search"></i></button>
                              </span>
                          </div>
                      </div>
                      <div class="row" id="dataset-search-results">
                          <div class="col-md-8 info count">
                              <div id="results-count" aria-label="Number of dataset search results"></div>
                          </div>
                          <div class="col-md-4 info sort">
                              <form>
                                  <div class="form-group row">
                                      <label for="sort-results-by" class="col-sm-5 text-right col-form-label">Order by:</label>
                                      <div class="col-sm-7">
                                          <select class="form-control" id="sort-results-by">
                                              <option value="metadata_modified desc">Last Updated</option>
                                              <option value="relevance asc">Relevance</option>
                                              <option value="name asc">Name</option>
                                          </select>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                      <!-- End Dataset Search Area -->

                      <!-- Datasets -->
                      <div class="row table-list" aria-label="List of Datasets"></div>
                      <div class="row">
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
          </div>
  </section>
</div>

<script type="text/javascript">
    jQuery(document).ready(function($) { init(); });
</script>

<?php get_footer();
