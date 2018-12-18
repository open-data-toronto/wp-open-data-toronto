<?php  /* Template Name: Dataset Page */ ?>

<?php get_header(); ?>

  <section class="content-area">
    <div class="container">
      <!-- Breadcrumbs -->
      <div class="row">
        <div class="col-md-12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <a class="breadcrumb-item" href="<?php echo site_url(); ?>">Open Data Portal Home</a>
            <a class="breadcrumb-item" href="<?php echo site_url(); ?>/catalogue/">Open Data Catalogue</a>
            <a class="breadcrumb-item"><?php the_title(); ?></a>
          </nav>
        </div>
      </div>
      <!-- Banner -->
      <div class="row block-hidden">
        <div class="col-md-12">
          <div class="banner" data-field="image_url">
            <div class="background">
              <h1 data-field='title'></h1>
            </div>
          </div>
        </div>
      </div>

      <section class="complete-post-list" aria-label="List of Datasets">
        <div class="row block-hidden">
          <!-- Dataset Sidebar -->
          <div class="col-md-3 dataset-sidebar">
            <div class="about-dataset">
              <div class="card">
                <h2 class="sr-only">Dataset Details</h2>
                <div class="card-header filter-heading">
                  <h3><span class="fa fa-database"></span>&nbsp; Details</h3>
                </div>
                <dl>
                  <dt>Last updated<span class="sr-only">: </span></dt>
                  <dd data-field="metadata_modified"></dd>
                  <dt>Published on<span class="sr-only">: </span></dt>
                  <dd data-field="published_date"></dd>
                  <dt>Refreshed<span class="sr-only">: </span></dt>
                  <dd data-field="refresh_rate"></dd>
                  <dt>Data type<span class="sr-only">: </span></dt>
                  <dd data-field="dataset_category"></dd>
                  <dt>More information<span class="sr-only">: </span></dt>
                  <dd data-field="information_url"></dd>
                  <dt>Tags<span class="sr-only">: </span></dt>
                  <dd data-field="tags"></dd>
                </dl>
              </div>
              <div class="card">
                <div class="card-header filter-heading">
                  <h3><span class="fa fa-user"></span>&nbsp; Publisher</h3>
                </div>
                <dl>
                  <dt>Published by<span class="sr-only">: </span></dt>
                  <dd data-field="owner_division"></dd>
                  <dt>Contact<span class="sr-only">: </span></dt>
                  <dd data-field="owner_email"></dd>
                </dl>
              </div>
            </div>
          </div>

            <!-- Main Content Area -->
          <div class="col-md-9" id="content">
            <div id="description-dataset">
              <div class="row">
                <div class="col-md-12">
                  <h2>About <span data-field="title"><span></h2>
                  <br/>
                  <p data-field="notes"></p>
                  <h3>Collection Method</h3>
                  <p data-field="collection_method"></p>
                  <h3>Limitations</h3>
                  <p data-field="limitations"></p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">

                  <!-- Collapse Area -->
                  <div id="dataset-accordion" aria-multiselectable="true">
                    <div class="card">
                      <div class="card-header" id="heading-preview">
                        <h3 class="mb-0">
                          <a class="collapsed" role="button" data-toggle="collapse" data-target="#collapse-preview" href="#" data-parent="dataset-accordion" aria-expanded="true" aria-controls="collapse-preview">
                            Data Preview
                            <span class="accordion-arrow">
                              <span class="fa fa-chevron-down"></span>
                            </span>
                          </a>
                        </h3>
                      </div>

                      <div id="collapse-preview" class="card-content collapse" role="tabpanel" aria-expanded="true" aria-labelledby="heading-preview">
                        <div class="row">
                          <div id="content-preview" class="col-md-12"></div>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" id="heading-features">
                        <h3 class="mb-0">
                          <a class="collapsed" role="button" data-toggle="collapse" data-target="#collapse-features" href="#" aria-controls="collapse-download">
                          Column Descriptions
                          <span class="accordion-arrow">
                            <span class="fa fa-chevron-down"></span>
                          </span>
                          </a>
                        </h3>
                      </div>

                      <div id="collapse-features" class="card-content collapse" role="tabpanel" aria-labelledby="heading-features">
                        <div class="row">
                          <div id="content-features" class="col-md-12"></div>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" id="heading-download">
                        <h3 class="mb-0">
                          <a class="collapsed" data-toggle="collapse" data-target="#collapse-download" href="#" data-parent="dataset-accordion" role="button" aria-expanded="true" aria-controls="collapse-download">
                          Download Data
                          <span class="accordion-arrow">
                            <span class="fa fa-chevron-down"></span>
                          </span>
                          </a>
                        </h3>
                      </div>

                      <div id="collapse-download" class="card-content collapse" aria-labelledby="heading-download">
                        <div class="row">
                          <div class="col-md-12">
                            <table id="table-resources" class="table table-striped">
                              <thead>
                                <tr>
                                  <th scope="col">File</th>
                                  <th scope="col">Format</th>
                                  <th scope="col">Data</th>
                                </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" id="heading-explore">
                        <h3 class="mb-0">
                          <a class="collapsed" role="button" data-toggle="collapse" data-target="#collapse-explore" href="#" data-parent="dataset-accordion" aria-expanded="true" aria-controls="collapse-explore">
                          Explore Data
                          <span class="accordion-arrow">
                            <span class="fa fa-chevron-down"></span>
                          </span>
                          </a>
                        </h3>
                      </div>

                      <div id="collapse-explore" class="card-content collapse" role="tabpanel" aria-labelledby="heading-explore">
                        <div class="row explore-line" id="explore-ckan">
                          <div class="col-md-2 explore-img">
                            <img src="https://upload.wikimedia.org/wikipedia/en/e/e2/CKAN_Logo_full_color.png" alt="CKAN logo">
                          </div>
                          <div class="col-md-7">
                            <h4 class="card-title">Visualize this data!</h4>
                            <p>Want to explore this data without having to download it? Try it here</p>
                          </div>
                          <div class="col-md-3 explore-column">
                            <a id="redirect-ckan" href="#" target="_blank">
                              <button class="btn btn-outline-primary" type="button">
                                <span class="fa fa-area-chart"></span>&nbsp;Visualize
                                <span class="sr-only"> Visualize data in new window</span>
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" id="heading-developers">
                        <h3 class="mb-0">
                          <a class="collapsed" role="button" data-toggle="collapse" data-target="#collapse-developers" href="#" data-parent="dataset-accordion" aria-expanded="true" aria-controls="collapse-developers">
                          For Developers
                          <span class="accordion-arrow">
                            <span class="fa fa-chevron-down"></span>
                          </span>
                          </a>
                        </h3>
                      </div>

                      <div id="collapse-developers" class="card-content collapse" role="tabpanel" aria-labelledby="heading-developers">
                        <div class="card-block">
                          <div class="row">
                            <div class="col-md-12">
                            <p>Below are sample code snippets for accessing a dataset via the API. Refer to the <a href="http://docs.ckan.org/en/latest/api/index.html" target="_blank">CKAN API documentation</a> for a complete list of endpoints.</p>
                              <dl>
                                <dt>Package ID</dt>
                                <dd data-field="id"></dd>
                              </dl>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <ul class="nav nav-tabs" id="devTabs" role="tablist">
                                <li class="nav-item"><a id="python-tab" class="nav-link active" data-toggle="tab" href="#python" role="tab" aria-controls="python" aria-selected="true">Python</a></li>
                                <li class="nav-item"><a id="javascript-tab" class="nav-link" data-toggle="tab" href="#javascript" role="tab" aria-controls="javascript" aria-selected="true">JavaScript</a></li>
                                <li class="nav-item"><a id="r-tab" class="nav-link" data-toggle="tab" href="#r" role="tab" aria-controls="r" aria-selected="true">R</a></li>
                              </ul>
                              <div class="tab-content" id="api-examples">
                                <div class="tab-pane fade show active" id="python" role="tabpanel" aria-labelledby="python-tab">
                                  <pre><code class="python" id="code-python"></code></pre>
                                </div>
                                <div class="tab-pane fade" id="javascript" role="tabpanel" aria-labelledby="javascript-tab">
                                  <pre><code class="javascript" id="code-javascript"></code></pre>
                                </div>
                                <div class="tab-pane fade" id="r" role="tabpanel" aria-labelledby="r-tab">
                                  <pre><code class="r" id="code-r"></code></pre>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <button id="code-copy" class="btn btn-outline-primary" data-toggle="popover" data-content="Copied to clipboard" type="button"><span class="fa fa-copy"></span>&nbsp; Copy<span class="sr-only"> code snippet</span></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</div>

<script type="text/javascript">
    jQuery(document).ready(function($) {
        var package_name = '<?php echo get_query_var( 'package' ) ?>';
        init(package_name);
        $("a, button").on('mouseup', function(){ this.blur() });
    });
</script>

<?php get_footer();
