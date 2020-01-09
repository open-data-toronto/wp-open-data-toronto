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
            <a class="breadcrumb-item" data-field="title"><?php the_title(); ?></a>
          </nav>
        </div>
      </div>

<!--
      <div class="row block-hidden">
        <div class="col-md-12">
          <div class="banner" data-field="image_url">
            <div class="background">
              <h1 data-field='title'></h1>
            </div>
          </div>
        </div>
      </div>
 -->
      <section class="complete-post-list" aria-label="List of Datasets">
        <div class="row block-hidden">
          <!-- Dataset Sidebar -->
          <div class="col-md-3 dataset-sidebar">
            <div class="about-dataset">
              <div class="card">
                <div class="sr-only">Dataset Details</div>
                <div class="card-header filter-heading">
                  <h3><span class="fa fa-database"></span>&nbsp; Details</h3>
                </div>
                <dl>
                  <dt>Data quality score
                    <span class="badge badge-info">beta</span>
                    <span class="sr-only">: </span>
                  </dt>
                  <dd id="field-quality">Not available</dd>
                  <dt>Data last refreshed<span class="sr-only">: </span></dt>
                  <dd data-field="last_refreshed"></dd>
                  <dt>Published on<span class="sr-only">: </span></dt>
                  <dd data-field="published_date"></dd>
                  <dt>Refreshed<span class="sr-only">: </span></dt>
                  <dd data-field="refresh_rate"></dd>
                  <dt>Data type<span class="sr-only">: </span></dt>
                  <dd data-field="dataset_category"></dd>
                  <dt>Civic issues<span class="sr-only">: </span></dt>
                  <dd data-field="civic_issues"></dd>
                  <dt>Topics<span class="sr-only">: </span></dt>
                  <dd data-field="topics"></dd>
                  <dt>More information<span class="sr-only">: </span></dt>
                  <dd data-field="information_url"></dd>
                  <dt>License<span class="sr-only">: </span></dt>
                  <dd><a href="https://open.toronto.ca/open-data-license/" class="inline-link">Open Government License - Toronto</a></dd>
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
                  <h2>About <span data-field="title"></span></h2>
                  <div data-field="notes"></div>
                  <h3>Collection Method</h3>
                  <p data-field="collection_method"></p>
                  <h3>Limitations</h3>
                  <p data-field="limitations"></p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <!-- Accordion -->

                  <div class="accordion">
                    <div class="card accordion__section">
                      <div class="card-header accordion__header" id="header-dataPreview">
                        <div class="mb-0">
                          <button class="btn btn-block btn-link collapsed accordion__button" data-toggle="collapse" data-target="#body-dataPreview" aria-expanded="true">
                            Data Preview
                            <span class="accordion-arrow">
                              <span class="fa fa-chevron-down"></span>
                            </span>
                          </button>
                        </div>
                      </div>

                      <div data-key="0" id="body-dataPreview" class="collapse" aria-labelledby="header-dataPreview" data-parent="#js-accordion__su9l98td5">
                        <div class="card-body accordion__body">
                          <div id="content-preview" class="col-md-12"></div>
                        </div>
                      </div>
                    </div>

                    <div class="card accordion__section">
                      <div class="card-header accordion__header" id="header-dataFeatures">
                        <div class="mb-0">
                          <button class="btn btn-block btn-link collapsed accordion__button" data-toggle="collapse" data-target="#body-dataFeatures" aria-expanded="false">
                            Data Features
                            <span class="accordion-arrow">
                              <span class="fa fa-chevron-down"></span>
                            </span>
                          </button>
                        </div>
                      </div>

                      <div data-key="1" id="body-dataFeatures" class="collapse" aria-labelledby="header-dataFeatures" data-parent="#js-accordion__su9l98td5">
                        <div class="card-body accordion__body">
                          <div id="content-features" class="col-md-12"></div>
                        </div>
                      </div>
                    </div>

                    <div class="card accordion__section">
                      <div class="card-header accordion__header" id="header-Download">
                        <div class="mb-0">
                          <button class="btn btn-block btn-link collapsed accordion__button" data-toggle="collapse" data-target="#body-Download" aria-expanded="false">
                            Download Data
                            <span class="accordion-arrow">
                              <span class="fa fa-chevron-down"></span>
                            </span>
                          </button>
                        </div>
                      </div>

                      <div data-key="2" id="body-Download" class="collapse" aria-labelledby="header-Download" data-parent="#js-accordion__su9l98td5">
                        <div class="card-body accordion__body">
                          <table id="table-resources" class="table table-striped">
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

                    <div class="card accordion__section">
                      <div class="card-header accordion__header" id="header-Explore">
                        <div class="mb-0">
                          <button class="btn btn-block btn-link collapsed accordion__button" data-toggle="collapse" data-target="#body-Explore" aria-expanded="false">
                            Explore Data
                            <span class="accordion-arrow">
                              <span class="fa fa-chevron-down"></span>
                            </span>
                          </button>
                        </div>
                      </div>

                      <div data-key="3" id="body-Explore" class="collapse" aria-labelledby="header-Explore" data-parent="#js-accordion__su9l98td5">
                        <div class="card-body accordion__body">
                          <div class="row explore-line" id="explore-ckan">
                            <div class="col-md-2 explore-img">
                              <img src="/wp-content/themes/wp-open-data-toronto/img/ckan.png" alt="CKAN logo">
                            </div>
                            <div class="col-md-7">
                              <h4 class="card-title">Visualize this data</h4>
                              <p>Want to explore this data without having to download it? Try it here</p>
                            </div>
                          <div class="col-md-3 explore-column">
                          <a class="btn btn-outline-primary" id="redirect-ckan" href="#" target="_blank">
                            <span class="fa fa-area-chart"></span>Visualize
                            <span class="sr-only"> Visualize data in new window</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card accordion__section">
                  <div class="card-header accordion__header" id="header-Developers">
                    <div class="mb-0">
                      <button class="btn btn-block btn-link collapsed accordion__button" data-toggle="collapse" data-target="#body-Developers" aria-expanded="false">
                        For Developers
                        <span class="accordion-arrow">
                          <span class="fa fa-chevron-down"></span>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div data-key="4" id="body-Developers" class="collapse" aria-labelledby="header-Developers" data-parent="#js-accordion__su9l98td5">
                    <div class="card-body accordion__body">
                      <div class="card-block">
                        <div class="row">
                          <div class="col-md-12">
                            <p>Below are sample code snippets for accessing a dataset via the API. Refer to the <a href="http://docs.ckan.org/en/latest/api/index.html" target="_blank">CKAN API documentation</a> for a complete list of endpoints.</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <ul class="nav nav-tabs" id="devTabs" role="tablist">
                              <li class="nav-item"><a id="python-tab" class="nav-link active" data-toggle="tab" href="#python" role="tab" aria-controls="python" aria-selected="true">Python</a></li>
                              <li class="nav-item"><a id="nodejs-tab" class="nav-link" data-toggle="tab" href="#nodejs" role="tab" aria-controls="nodejs" aria-selected="true">Node.js</a></li>
                              <li class="nav-item"><a id="r-tab" class="nav-link" data-toggle="tab" href="#r" role="tab" aria-controls="r" aria-selected="true">R</a></li>
                            </ul>
                            <div class="tab-content" id="api-examples">
                              <div class="tab-pane fade show active" id="python" role="tabpanel" aria-labelledby="python-tab">
                                <pre><code class="python" id="code-python"></code></pre>
                                <button class="btn btn-outline-primary btn-copy" data-language="python" data-toggle="popover" data-content="Copied to clipboard" type="button"><span class="fa fa-copy"></span>&nbsp; Copy<span class="sr-only"> code snippet</span></button>
                              </div>
                              <div class="tab-pane fade" id="nodejs" role="tabpanel" aria-labelledby="nodejs-tab">
                                <pre><code class="nodejs" id="code-nodejs"></code></pre>
                                <button class="btn btn-outline-primary btn-copy" data-language="nodejs" data-toggle="popover" data-content="Copied to clipboard" type="button"><span class="fa fa-copy"></span>&nbsp; Copy<span class="sr-only"> code snippet</span></button>
                              </div>
                              <div class="tab-pane fade" id="r" role="tabpanel" aria-labelledby="r-tab">
                                <pre><code class="r" id="code-r"></code></pre>
                                <button class="btn btn-outline-primary btn-copy" data-language="r" data-toggle="popover" data-content="Copied to clipboard" type="button"><span class="fa fa-copy"></span>&nbsp; Copy<span class="sr-only"> code snippet</span></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div><!-- end accordion -->
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</div><!-- end row -->
</div><!-- end container -->

<script type="text/nodejs">
    jQuery(document).ready(function($) {
        var datasetName = '<?php echo get_query_var( 'dataset' ) ?>';
        init(datasetName);
    });
</script>

<?php get_footer();
