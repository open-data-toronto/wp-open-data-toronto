<?php /* Template Name: Catalogue Page */?>

<?php get_header();?>

  <section class="content-area">
    <div class="container">

      <div class="row">
        <div class="col-md-12">
          <!-- Breadcrumbs -->
          <nav class="breadcrumb" aria-label="breadcrumbs" role="navigation">
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

      <div class="row d-flex block-hidden" id="content">
        <!-- Sidebar -->

        <div class="col-md-3" id="filter-sidebar">
          <h2>Dataset Filters</h2>
          <a href="#input-search" class="sr-only sr-only-focusable">Skip dataset filters and go to search</a>
          <div class="dataset-sidebar">
            <div class="card" id="vocab_topics-filter">
              <div class="card-header filter-heading">
                <h3>Topic</h3>
              </div>
              <ul data-type="filter" data-field="vocab_topics" class="list-group list-group-flush" id="vocab_topics-values">
                <li class="show-more list-group-item list-group-item-action" data-field="vocab_topics"></li>
              </ul>
            </div>

            <div class="card" id="owner_division-filter">
              <div class="card-header filter-heading">
                <h3>Publisher</h3>
              </div>
              <ul data-type="filter" data-field="owner_division" class="list-group list-group-flush" id="owner_division-values">
                <li class="show-more list-group-item list-group-item-action" data-field="owner_division"></li>
              </ul>
            </div>

            <div class="card" id="dataset_category-filter">
              <div class="card-header filter-heading">
                <h3>Type</h3>
              </div>
              <ul data-type="filter" data-field="dataset_category" class="list-group list-group-flush" id="dataset_category-values">
                <li class="show-more list-group-item list-group-item-action" data-field="dataset_category"></li>
              </ul>
            </div>

            <div class="card" id="vocab_formats-filter">
              <div class="card-header filter-heading">
                <h3>Format</h3>
              </div>
              <ul data-type="filter" data-field="vocab_formats" class="list-group list-group-flush" id="vocab_formats-values">
                <li class="show-more list-group-item list-group-item-action" data-field="vocab_formats"></li>
              </ul>
            </div>
          </div>
        </div>
        <!-- End Sidebar -->
        <div class="col-md-9">
          <div class="container-fluid">
            <!-- Dataset Search Area -->
            <div class="row" id="dataset-search-box">
              <form class="dataset-filter" id="search-dataset" role="search" aria-label="Search the Open Data Catalogue">
              <div class="input-group">
                <label for="input-search" class="sr-only">Input for dataset search terms</label>
                <input type="text" class="form-control" name="search" id="input-search" placeholder="Search datasets"/>
                <span class="input-group-btn">
                  <button id="btn-search" class="btn btn-primary" type="submit">
                    <span class="sr-only">Search datasets</span>
                    <span class="fa fa-search"></span>
                  </button>
                </span>
              </div>
              </form>
              <small id="search-error" class="text-danger hidden"><strong>Only numbers, letters, and spaces are allowed</strong></small>
            </div>
            <div class="row" id="dataset-search-results">
              <div class="col-md-8 info count">
                <div role="alert" id="results-count"></div>
              </div>
              <div class="col-md-4 info sort">
                <form>
                  <div class="form-group row">
                    <label for="sort-results-by" class="col-sm-5 text-right col-form-label">Order by:</label>
                    <div class="col-sm-7">
                      <select class="form-control" id="sort-results-by" aria-label="Sorting method for catalogue search results">
                        <option value="metadata_modified desc">Last Updated</option>
                        <option value="score desc">Relevance</option>
                        <option value="name asc">Name</option>
                      </select>
                    </div>
                    <div role="alert" class="sr-only" id="current-sort">Results currently ordered by <span>Last Updated</span></div>
                  </div>
                </form>
              </div>
            </div>
            <!-- End Dataset Search Area -->

            <!-- Datasets -->
            <h2 class="sr-only">List of datasets available</h2>
            <div class="row table-list" aria-label="List of Datasets"></div>
            <div class="row">
              <nav id="nav-catalogue" aria-label="Page navigation for dataset search results" role="navigation">
                <ul class="pagination pagination-sm">
                  <li class="page-item page-keep">
                    <a class="page-link" href="#" aria-label="Go to previous page" data-page="previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Go to previous page</span>
                    </a>
                  </li>
                  <li class="page-item page-keep">
                    <a class="page-link" href="#" aria-label="Go to next page" data-page="next">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Go to next page</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div><!-- ends row -->
</div><!-- ends container -->

<script type="text/javascript">
  jQuery(document).ready(function($) { init(); });
  $("a, button").on('mouseup', function(){ this.blur() });
</script>

<?php get_footer();
