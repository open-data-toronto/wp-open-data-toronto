<?php /* Template Name: Homepage */ ?>
<?php get_header(); ?>

  <section class="content-area">
    <div class="container">
      <div class="hero" aria-label="Introduction">
        <!-- Jumbotron echoes featured image for Homepage -->
        <div class="jumbotron text-center" style="background-image:url('<?php the_post_thumbnail_url(); ?>');">
          <div class="heading">
            <h1 class="sr-only"><span id="introduction">Welcome to the City of Toronto's Open Data Portal</span></h1>
          </div>
          <div class="row">
            <div class="col-md-6 offset-md-3">
              <form class="form-inline" role="search">
                <div class="input-group">
                  <label for="search" class="sr-only">Search Dataset Catalogue</label>
                  <input type="text" class="form-control" name="search" id="search" placeholder="Search datasets"/>
                  <span class="input-group-btn">
                    <button class="btn btn-secondary" type="submit">Search</button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> 

      <section id="about" aria-label="About City of Toronto Open Data">
        <div id="content"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-5">
              <h2 class="heading">City of Toronto Open Data</h2>
              <p>This sandbox environment is intended to give the wider open data community the chance to not only test and experiment with the open data portal, but to innovate new ways that we can improve access to and delivery of open data within the City of Toronto. You’re welcome to explore this sandbox, give us feedback, and innovate ways to use this data with us.</p>
              <a class="btn btn-md" href="/about/">Learn more about Open Data</a>
            </div>

            <div class="col-md-6 offset-md-1">
              <h2>Recently Added Datasets</h2>
              <ul class="newsfeed"></ul>
              <a class="btn btn-md" href="/catalogue/">Explore the Catalogue</a>
            </div>
          </div>
        </div>
      </section>

      <!-- This query calls, in order, a single post that is categorized as both Data Story AND Featured. and was created most recently -->

      <?php global $post; 
      $args = array('category_name' => 'data-stories+featured', 'numberposts' => 1);
      $custom_posts = get_posts($args);
      foreach($custom_posts as $post) : setup_postdata($post);
        ?>

      <!-- Data Stories -->
      <section id="data-stories" aria-label="Data Stories" style="background-image:url('<?php the_post_thumbnail_url(); ?>')">
        <div class="jumbotron text-center" style="background: rgba(0, 0, 0, 0.67);">
          <h2 class="heading small">DATA STORY</h2>
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <h3><?php the_title(); ?></h3>
              <p><?php the_excerpt(); ?></p>
              <p><a class="btn btn-md" href="<?php the_permalink(); ?>">Read "<?php the_title(); ?>"</a></p>
            </div>
          </div>
        </div>
      </section>

      <?php
      endforeach;
      ?>
      <!-- Ends Data Story Query -->

      <!-- Pages -->
      <section id="pages" aria-label="Secondary Pages">
        <div class="row">

          <!-- This query calls, in order, 3 posts that are categorized as Featured that are NOT data stories. Ordered by last created. -->
           <?php global $post; 
          $args = array('category_name' => 'featured', 'numberposts' => 3);
          $custom_posts = get_posts($args);
          foreach($custom_posts as $post) : setup_postdata($post);
          ?>

          <div class="col-md-4">
           <h2> <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <img src="<?php the_post_thumbnail_url(); ?>" alt="" class="img-responsive"/><br/>
            <p><?php the_excerpt(); ?></p>
          </div>

          <?php
        endforeach;
          ?>
        </div>
      </section>
    </div>
  </section>
</div><!-- end row -->
</div><!-- ends container-->

<script type="text/javascript">
    jQuery(document).ready(function($) { init(); });
</script>

<?php get_footer(); ?>
