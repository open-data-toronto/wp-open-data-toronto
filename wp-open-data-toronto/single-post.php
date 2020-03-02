
<?php get_header(); ?>

  <section class="content-area" aria-label="Blog Post">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <!-- Breadcrumbs -->
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <a class="breadcrumb-item" href="<?php echo site_url(); ?>">Open Data Portal Home</a>
            <a class="breadcrumb-item" href="<?php echo site_url(); ?>/blog/">Knowledge Centre</a>
            <a class="breadcrumb-item"><?php the_title(); ?></a>
          </nav>
          <!-- End breadcrumbs -->
        </div>
      </div>

      <div class="row">
       <div class="col-md-3 hide-full-length">
          <!-- Sidebar Content -->
          <div class="blog-sidebar" role="complementary">
            <h2 class="sr-only">Explore Open Data Blog</h2>

            <h3>Knowledge Centre</h3>
            <p>Whether you're a seasoned data scientist, or a beginner - Toronto Open Data has you covered! We publish new content biweekly.</p>
            <br/>

            <div class="hidden-sm-down">
            <h3>Latest Posts</h3>
            <ul class="post-list">
              <?php
              $query2 = new WP_Query( array( 'posts_per_page' => 10 ) );
              while ( $query2->have_posts() ) :
                $query2->the_post(); ?>
                <li>
                  <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </li>
              <?php
              endwhile;

              wp_reset_postdata(); ?>
            </ul>
            <br/>

            <h3>Category</h3>
            <ul class="post-list">
              <?php
              wp_list_categories([
                'orderby'    => 'name',
                'show_count' => true,
                'title_li'   => '',
                'exclude_slugs' => [ 'feature-1', 'feature-2', 'feature-3', 'featured-data-story', 'uncategorized']
              ]);
              ?>
            </ul>
            <br/>

            <h3>Civic Issues</h3>
            <ul class="post-list">
              <?php
              $tags = get_tags();
              $html = '';
              foreach ( $tags as $tag ) :
                $tag_link = get_tag_link( $tag->term_id );

                $html .= "<li><a href='{$tag_link}' title='{$tag->name} Tag' class='{$tag->slug}'>";
                $html .= "{$tag->name}</a></li>";
              endforeach;

              $html .= '';
              echo $html;
              ?>
            </ul>
            <br/>

            <h3>Author</h3>
            <ul class="post-list">
              <!-- List authors -->
              <?php wp_list_authors(); ?>
            </ul>
          </div>
        </div>
      </div>
      

        <div class="col-md-9 post-content" id="content">

              <h1><span class="sr-only">Blog article: </span><?php the_title(); ?></h1>

              <div class="byline">
                        Published on <?php the_date(); ?> by <?php echo get_post_meta($post->ID, 'byline', true); ?>
                      </div>
          <img class="img-responsive" src="<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); echo $url ?>" alt="<?php the_title(); ?>"/>

          <h2 class="sr-only">Article text</h2>
          <?php
          while ( have_posts() ) :
            the_post();
            the_content();
          endwhile;
          ?>

          <?php comments_template(); ?> 
        </div>
      </div>
    </div>
  </section>
</div>
</div>

<?php get_footer(); ?>
