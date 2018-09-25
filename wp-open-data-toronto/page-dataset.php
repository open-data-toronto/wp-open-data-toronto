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
      <div class="row">
        <div class="col-md-12">
          <div class="banner" data-field="image_url">
            <div class="background">
              <h1 data-field='title'></h1>
            </div>
          </div>
        </div>
      </div>

      <section class="complete-post-list" aria-label="List of Datasets">
        <div class="row">
          <!-- Dataset Sidebar -->
          <div class="col-md-3">
            <div class="about-dataset">
              <div class="row">
                <div class="col-sm-12">
                  <h2><span class="fa fa-database"></span>&nbsp; About this Dataset</h2>
                  <dl>
                    <dt>Last updated<span class="sr-only">: </span></dt>
                    <dd data-field="metadata_modified"></dd>
                    <dt>Published on<span class="sr-only">: </span></dt>
                    <dd data-field="published_date"></dd>
                    <dt>Refreshed<span class="sr-only">: </span></dt>
                    <dd data-field="refresh_rate"></dd>
                  </dl>
                  <h2><span class="fa fa-table"></span>&nbsp; Data Attributes</h2>
                  <dl>
                    <dt>Dataset type<span class="sr-only">: </span></dt>
                    <dd data-field="dataset_category"></dd>
                    <dt>Columns<span class="sr-only">: </span></dt>
                    <dd data-field="shape_columns"></dd>
                    <dt>Rows<span class="sr-only">: </span></dt>
                    <dd data-field="shape_rows"></dd>
                    <dt>More information<span class="sr-only">: </span></dt>
                    <dd data-field="information_url"></dd>
                  </dl>
                  <h2><span class="fa fa-user"></span>&nbsp; Data Owner</h2>
                  <dl>
                    <dt>Owner type<span class="sr-only">: </span></dt>
                    <dd data-field="owner_type"></dd>
                    <dt>Published by<span class="sr-only">: </span></dt>
                    <dd data-field="owner_division"></dd>
                    <dt>Contact<span class="sr-only">: </span></dt>
                    <dd data-field="owner_email"></dd>
                  </dl>
                  <h2><span class="fa fa-book"></span>&nbsp; Additional Info</h2>
                  <dl>
                    <!-- <dt>Categories<span class="sr-only">: </span></dt>
                    <dd>[categories]</dd> -->
                    <dt>Tags<span class="sr-only">: </span></dt>
                    <dd data-field="tags"></dd>
                  <!-- </dl>
                  <h2><span class="fa fa-bar-chart"></span>&nbsp;  Analytics</h2>
                  <dl> -->
                      <dt>Pageviews<span class="sr-only">: </span></dt>
                      <dd></dd>
                      <dt>Downloads<span class="sr-only">: </span></dt>
                      <dd></dd>
                    </dl>
                </div>
              </div>
            </div>
          </div>

            <!-- Main Content Area -->
          <div class="col-md-9">
            <div id="description-dataset">
              <div class="row">
                <div class="col-md-12">
                  <h3>About <span data-field="title"><span></h3>
                  <br/>
                  <!-- <h2>Purpose</h2>
                  <p>[dataset-purpose]</p> -->
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
                  <div id="data-attributes">
                    <div id="accordion" role="tablist" aria-multiselectable="true">
                      <div class="card">
                        <div class="card-header" role="tab" id="heading-preview">
                          <h4 class="mb-0">
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse-preview" aria-expanded="true" aria-controls="collapse-preview">
                              Preview Data
                              <span class="accordion-arrow">
                                <span class="fa fa-chevron-down"></span>
                              </span>
                            </a>
                          </h4>
                        </div>

                        <div id="collapse-preview" class="collapse" role="tabpanel" aria-labelledby="heading-preview">
                          <div class="row">
                            <div class="col-md-12">
                              <table class="table table-striped table-responsive" id="table-preview">
                                <thead></thead>
                                <tbody></tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="card">
                        <div class="card-header" role="tab" id="heading-features">
                          <h4 class="mb-0">
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse-features" aria-expanded="true" aria-controls="collapse-download">
                              Features of Dataset
                              <span class="accordion-arrow">
                                <span class="fa fa-chevron-down"></span>
                              </span>
                            </a>
                          </h4>
                        </div>

                        <div id="collapse-features" class="collapse" role="tabpanel" aria-labelledby="heading-features">
                          <div class="row">
                            <div class="col-md-12">
                              <table class="table table-striped" id="table-features">
                                <thead>
                                  <tr>
                                    <th scope="col">Column</th>
                                    <th scope="col">Type</th>
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
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse-download" aria-expanded="true" aria-controls="collapse-download">
                              Download Data
                              <span class="accordion-arrow">
                                <span class="fa fa-chevron-down"></span>
                              </span>
                            </a>
                          </h4>
                        </div>

                        <div id="collapse-download" class="collapse" role="tabpanel" aria-labelledby="heading-download">
                          <div class="row">
                            <div class="col-md-12">
                              <table class="table table-striped" id="table-resources">
                                <thead>
                                  <tr>
                                    <th scope="col">Format</th>
                                    <th scope="col">File Name</th>
                                    <th scope="col">Download</th>
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
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse-explore" aria-expanded="false" aria-controls="collapse-explore">
                              Explore Data
                              <span class="accordion-arrow">
                                <span class="fa fa-chevron-down"></span>
                              </span>
                            </a>
                          </h4>
                        </div>

                        <div id="collapse-explore" class="collapse" role="tabpanel" aria-labelledby="heading-explore">
                          <div class="row explore-line">
                            <div class="col-md-3">
                            </div>
                            <div class="col-md-5">
                              <h4 class="card-title"></h4>
                              <p></p>
                            </div>
                            <div class="col-md-4">
                              <a href="" class="btn btn-md" target="_blank">Open <span class="sr-only"> Visualization</span> in a New Window</a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="card">
                        <div class="card-header" role="tab" id="heading-developers">
                          <h4 class="mb-0">
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse-developers" aria-expanded="false" aria-controls="collapse-developers">
                              For Developers
                              <span class="accordion-arrow">
                                <span class="fa fa-chevron-down"></span>
                              </span>
                            </a>
                          </h4>
                        </div>

                        <div id="collapse-developers" class="collapse" role="tabpanel" aria-labelledby="heading-developers">
                          <div class="card-block">
                            <div class="row">
                              <div class="col-md-6">
                                <dl>
                                  <dt>Package ID</dt>
                                  <dd data-field="id"></dd>
                                </dl>
                              </div>
                              <div class="col-md-6">
                                <dl>
                                  <dt>Revision ID</dt>
                                  <dd data-field="revision_id"></dd>
                                </dl>
                              </div>
                            </div>
                            <br/>
                            <p>See <a href="http://docs.ckan.org/en/latest/api/index.html" target="_blank">CKAN API documentation</a> for full list of API endpoints.</p>
                            <h4>Example: Javascript</h4>
                            <div class="code" id='code-javascript'></div>
                            <br/>
                            <h4>Example: Python</h4>
                            <div class="code" id='code-python'></div>
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
        Dataset.init();
    });
</script>

<?php get_footer();
