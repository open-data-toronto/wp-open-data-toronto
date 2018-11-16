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
                <div class="card-header filter-heading">
                  <h5><i class="fa fa-database"></i>&nbsp; About this Dataset</h5>
                </div>
                <dl>
                  <dt>Last updated<span class="sr-only">: </span></dt>
                  <dd data-field="metadata_modified"></dd>
                  <dt>Published on<span class="sr-only">: </span></dt>
                  <dd data-field="published_date"></dd>
                  <dt>Refreshed<span class="sr-only">: </span></dt>
                  <dd data-field="refresh_rate"></dd>
                </dl>
              </div>
              <div class="card">
                <div class="card-header filter-heading">
                  <h5><i class="fa fa-table"></i>&nbsp; Data Attributes</h5>
                </div>
                <dl>
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
                  <h5><i class="fa fa-user"></i>&nbsp; Data Owner</h5>
                </div>
                  <dl>
                    <dt>Owner type<span class="sr-only">: </span></dt>
                    <dd data-field="owner_type"></dd>
                    <dt>Published by<span class="sr-only">: </span></dt>
                    <dd data-field="owner_division"></dd>
                    <dt>Contact<span class="sr-only">: </span></dt>
                    <dd data-field="owner_email"></dd>
                  </dl>
                </div>
                  <!-- <h2><span class="fa fa-book"></span>&nbsp; Additional Info</h2>
                  <dl>
                    <dt>Pageviews<span class="sr-only">: </span></dt>
                    <dd data-field="pageviews"></dd>
                    <dt>Downloads<span class="sr-only">: </span></dt>
                    <dd data-field="downloads"></dd>
                  </dl> -->
            </div>
          </div>

            <!-- Main Content Area -->
          <div class="col-md-9">
            <div id="description-dataset">
              <div class="row">
                <div class="col-md-12">
                  <h3>About <span data-field="title"><span></h3>
                  <br/>
                  <h2>Collection Method</h2>
                  <p data-field="collection_method"></p>
                  <h2>Description</h2>
                  <p data-field="notes"></p>
                  <h2>Limitations</h2>
                  <p data-field="limitations"></p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <!-- Collapse Area -->
                  <div id="dataset-accordion" role="tablist" aria-multiselectable="true">
                    <div class="card">
                      <div class="card-header" role="tab" id="heading-preview">
                        <h4 class="mb-0">
                          <a class="collapsed" data-toggle="collapse" data-parent="#dataset-accordion" href="#collapse-preview" aria-expanded="true" aria-controls="collapse-preview">
                            Preview Data
                            <span class="accordion-arrow">
                              <span class="fa fa-chevron-down"></span>
                            </span>
                          </a>
                        </h4>
                      </div>

                      <div id="collapse-preview" class="collapse card-content" role="tabpanel" aria-labelledby="heading-preview">
                        <div class="row">
                          <div id="content-preview" class="col-md-12"></div>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" role="tab" id="heading-features">
                        <h4 class="mb-0">
                          <a class="collapsed" data-toggle="collapse" data-parent="#dataset-accordion" href="#collapse-features" aria-expanded="true" aria-controls="collapse-download">
                            Dataset Features
                            <span class="accordion-arrow">
                              <span class="fa fa-chevron-down"></span>
                            </span>
                          </a>
                        </h4>
                      </div>

                      <div id="collapse-features" class="collapse card-content" role="tabpanel" aria-labelledby="heading-features">
                        <div class="row">
                          <div class="col-md-12">
                            <table class="table table-striped" id="table-features">
                              <thead>
                                <tr>
                                  <th scope="col">Column</th>
                                  <th scope="col">Description</th>
                                </tr>
                              </thead>
                              <tbody></tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" role="tab" id="heading-download">
                        <h4 class="mb-0">
                          <a class="collapsed" data-toggle="collapse" data-parent="#dataset-accordion" href="#collapse-download" aria-expanded="true" aria-controls="collapse-download">
                            Get Data
                            <span class="accordion-arrow">
                              <span class="fa fa-chevron-down"></span>
                            </span>
                          </a>
                        </h4>
                      </div>

                      <div id="collapse-download" class="collapse card-content" role="tabpanel" aria-labelledby="heading-download">
                        <div class="row">
                          <div class="col-md-12">
                            <table class="table table-striped" id="table-resources">
                              <thead>
                                <tr>
                                  <th scope="col">File</th>
                                  <th scope="col">Format</th>
                                  <th scope="col">Data</th>
                                </tr>
                              </thead>
                              <tbody></tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" role="tab" id="heading-explore">
                        <h4 class="mb-0">
                          <a class="collapsed" data-toggle="collapse" data-parent="#dataset-accordion" href="#collapse-explore" aria-expanded="false" aria-controls="collapse-explore">
                            Explore Data
                            <span class="accordion-arrow">
                              <span class="fa fa-chevron-down"></span>
                            </span>
                          </a>
                        </h4>
                      </div>

                      <div id="collapse-explore" class="collapse card-content" role="tabpanel" aria-labelledby="heading-explore">
                        <div class="row explore-line" id="explore-ckan">
                          <div class="col-md-2 explore-img">
                            <img src="https://upload.wikimedia.org/wikipedia/en/e/e2/CKAN_Logo_full_color.png">
                          </div>
                          <div class="col-md-7">
                            <h4 class="card-title">Visualize this data!</h4>
                            <p>Want to explore this data without having to download it? Try it here</p>
                          </div>
                          <div class="col-md-3 explore-column">
                            <a href="#" id="redirect-ckan"><button href="#" class="btn btn-primary" type="button" target="_blank"><span class="fa fa-area-chart"></span>&nbsp;Visualize <span class="sr-only"> Visualize data in new window</span></button></a>
                          </div>
                        </div>
                        <div class="row explore-line" id="explore-esri">
                          <div class="col-md-2 explore-img">
                            <img src="https://i1.wp.com/geoawesomeness.com/wp-content/uploads/2016/09/Esri-logo.jpg?fit=754%2C754">
                          </div>
                          <div class="col-md-7">
                            <h4 class="card-title">Visualize with advanced mapping features</h4>
                            <p>Want to explore this geospatial data further? Try ArcGIS, where you could create and share maps like the one in "Preview Data" or combine it with other geospatial data!</p>
                          </div>
                          <div class="col-md-3 explore-column">
                            <a href="#" id="redirect-esri"><button href="#" class="btn btn-primary" type="button" target="_blank"><span class="fa fa-map"></span>&nbsp;Visualize <span class="sr-only"> Visualize data in new window</span></button></a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" role="tab" id="heading-developers">
                        <h4 class="mb-0">
                          <a class="collapsed" data-toggle="collapse" data-parent="#dataset-accordion" href="#collapse-developers" aria-expanded="false" aria-controls="collapse-developers">
                            For Developers
                            <span class="accordion-arrow">
                              <span class="fa fa-chevron-down"></span>
                            </span>
                          </a>
                        </h4>
                      </div>

                      <div id="collapse-developers" class="collapse card-content" role="tabpanel" aria-labelledby="heading-developers">
                        <div class="card-block">
                          <div class="row">
                            <div class="col-md-12">
                            <h5>Accessing data through an API</h5>
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
                              <button id="code-copy" class="btn btn-primary" data-toggle="popover" data-content="Copied" type="button"><span class="fa fa-copy"></span>&nbsp; Copy<span class="sr-only"> code snippet</span></button>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <br>
                            <p>Refer to the <a href="http://docs.ckan.org/en/latest/api/index.html" target="_blank">CKAN API documentation</a> for a complete list of API endpoints.</p>
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
