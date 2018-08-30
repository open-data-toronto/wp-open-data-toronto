<?php /* Template Name: Homepage */ ?>
<?php get_header(); ?>

  <section class="content-area">
    <div class="container">
      <div class="hero" aria-label="Introduction">
        <div class="jumbotron text-center">
          <div class="heading">
            <h1 class="sr-only"><span id="introduction">Welcome to the City of Toronto's Open Data Portal</span></h1>
          </div>
          <div class="row">
            <div class="col-md-6 offset-md-3">
                <!-- Start Dataset Search TO DO MAKE THIS WORK-->
              <div class="dataset-filter" id="search-dataset" aria-label="Search the Open Data Catalogue">
                <form role="search" action="<?php echo site_url('/catalogue/'); ?>" method="get" aria-label="Search the Open Data Catalogue">
                  <div class="input-group">
                    <label for="search" class="sr-only">Search Dataset</label>
                    <input type="text" class="form-control" name="search" id="search" placeholder="Search datasets"/>
                    <span class="input-group-btn">
                      <button class="btn btn-secondary" type="submit">Search Datasets</button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="about" aria-label="About City of Toronto Open Data">
        <div class="container">
          <div class="row">
            <div class="col-md-5">
              <h2 class="heading">About City of Toronto Open Data</h2>
              <p>Open Government is about improving the delivery of services, making information more accessible and supporting initiatives that build public trust in government. It is guided by four principles of transparency, participation, accountability, and accessibility and supported by three pillars of Open Data, Open Information, and Open Engagement.</p>
              <a class="btn btn-md" href="/about/">Learn more about Open Data</a>
            </div>

            <div class="col-md-6 offset-md-1">
              <h2>Latest Datasets</h2>
              <?php
              query_posts([
                'post_type' => 'dataset',
                'showposts' => 5 ,
                'orderby'   => 'modified'
              ]);
              ?>

              <ul class="newsfeed">
                <?php while (have_posts()) : the_post(); ?>
                <li>
                  <a href="<?php the_permalink() ?>">
                    <?php the_title(); ?>
                    <div class="float-right">
                      <span class="sr-only">Last updated:</span>
                      <?php echo human_time_diff( get_the_modified_time('U'), current_time('timestamp') ) . ' ago'; ?>
                    </div>
                  </a>
                </li>
                <?php endwhile;?>
              </ul>
              <a class="btn btn-md" href="/catalogue/">Explore the Catalogue</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Data Stories -->
      <section id="data-stories" style="background-image:url(/wp-content/uploads/2017/08/pexels-photo-392031.jpeg); background-size: cover; background-position: 50% 50%" aria-label="Data Stories">
        <div class="jumbotron text-center" style="background: rgba(0, 0, 0, 0.67);">
          <h2 class="heading small">Data Stories</h2>
          <div class="row">
            <div class="col-md-6 offset-md-3">
              <h3>Exploring Cleared Permits Data</h3>
              <p>How can we use Cleared Building Permits data to learn about our city and improve service provisioning? Learn about including data preparation scripts and visualization tools to make meaning from data.</p>
              <p><a class="btn btn-md" href="/exploring-cleared-building-permits/">Read this Data Story</a></p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pages -->
      <section id="pages" aria-label="Featured Pages">
        <div class="row">
          <div class="col-md-4">
            <a href="/about/city-of-toronto-open-data-team/"><h2>About the Open Data Team</h2></a>
            <img src="/wp-content/uploads/2018/03/team.jpg" alt="" class="img-responsive"/><br/>
            <p>The City of Toronto's Open Data Team spans a wide range of skills, interests and experience. Despite our differences, we all have one thing in common: we see the unlimited potential of open data and the ways it can transform cities.</p>
          </div>
          <div class="col-md-4">
            <a href="/about/tools-and-tips/"><h2>Tools &amp; Tips</h2></a>
            <img src="/wp-content/uploads/2017/08/graphs.jpg" class="img-responsive" alt=""/><br/>
            <p>New to working with data? Not sure what the difference is between a CSV and a Shapefile? This short primer was designed to help beginners to Open Data learn about the basics of how to understand and interact with data sets on the Open Data Portal.</p>
          </div>
          <div class="col-md-4">
            <a href="/budgetpedia-humanizing-city-budgets/">
            <h2>Showcase: Budgetpedia</h2></a>
            <img src="/wp-content/uploads/2018/03/calculator.jpg" class="img-responsive" alt=""/>
            <br/>
            <p>Our debut community showcase tells the story of a project that is regarded as a pioneer in Toronto's Civic Tech space, and a powerful example of how Open Data empowers citizens to participate in government decision-making; Budgetpedia.</p>
          </div>
        </div>
      </section>
    </div>
  </section>
</div>

<script type="text/javascript">
    jQuery(document).ready(function($) {

    });
</script>

<?php get_footer(); ?>
