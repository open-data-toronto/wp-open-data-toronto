<?php /* Template Name: Blog Page Template */ ?>
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

      <div class="row">
        <div class="col-md-12">
          <div class="banner" style="background-image:url(<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); echo $url ?>) !important">
            <div class="background">
              <h1><?php the_title(); ?></h1>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <!-- Sidebar Content -->
          <section class="single-sidebar" aria-label="Blog Content Sidebar">
            <div class="blog-sidebar">
              <h2>Explore posts</h2>
              <h3>Latest posts</h3>
              <ul class="post-list">
                <?php
                $query2 = new WP_Query( array( 'posts_per_page' => 5 ) );
                while ( $query2->have_posts() ) :
                  $query2->the_post();
                ?>
                <li>
                  <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </li>
                <?php
                endwhile;
                wp_reset_postdata();
                ?>
               </ul>
              <br/>

              <h3>Categories</h3>
              <ul class="post-list">
                <?php
                wp_list_categories([
                  'orderby'    => 'name',
                  'show_count' => true,
                  'exclude'    => array( 10 ),
                  'title_li'    => ''
                ]);
                ?>
               </ul>
              <br/>

              <h3>Complexity</h3>
              <ul class="post-list">
                <?php
                $tags = get_tags();
                $html = '';

                foreach ( $tags as $tag ) :
                  $tag_link = get_tag_link( $tag->term_id );
                  $html .= "<li><a href='{$tag_link}' aria-label='{$tag->name} Tag' class='{$tag->slug}'>";
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
          </section>
        </div>

        <!-- Main Post Listing -->
        <div class="col-md-9">
          <section class="main-post-listing"  aria-label="Blog Posts" id="content">
            <?php
            $the_query = new WP_Query( array( 'posts_per_page' => 1, 'category_name' => 'featured') );

            if ( $the_query->have_posts() ) :
              while ( $the_query->have_posts() ) :
                $the_query->the_post();
            ?>

            <!-- Section 1. Featured Story -->
            <div class="featured-story">
              <div class="featured-banner">
                <h2>Featured Post</h2>
                <img src="<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); ?><?php echo $url ?>" alt="" class="img-responsive img-thumbnail"/>
              </div>
              <div class="featured-content">
                <a href="<?php the_permalink(); ?>">
                  <h3><?php the_title() ;?></h3>
                </a>
                <div class="attributes">
                  Posted on <?php the_date(); ?> by <?php the_author(); ?>
                </div>
                <div class="excerpt">
                  <?php the_excerpt(); ?>
                </div>
              </div>
            </div>
            <?php
              endwhile;
            wp_reset_postdata();
            else :
            ?>
            <p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
            <?php endif; ?>
            <hr>

            <!-- Section 2. Showcase -->
            <div class="blog-post-list" aria-label="Data Stories">
              <h2>Data Stories</h2>
              <?php
              $the_query = new WP_Query( array( 'posts_per_page' => 20, 'category_name' => 'data-stories' ) );
              if ( $the_query->have_posts() ) :
                while ( $the_query->have_posts() ) :
                  $the_query->the_post();
              ?>

              <div class="single-long-post">
                <div class="row">
                  <div class="col-md-4">
                    <div class="showcase-thumbnail" style="background-image:url(<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); echo $url ?>)"></div>
                  </div>
                  <div class="col-md-8">
                    <a href="<?php the_permalink(); ?>">
                      <h3><?php the_title() ;?></h3>
                    </a>
                    <div class="attributes">
                      <?php the_date(); ?> by <?php the_author(); ?>
                    </div>
                    <p><?php the_excerpt(); ?></p>
                  </div>
                </div>
              </div>
              <?php
                endwhile;
              wp_reset_postdata();
              else :
              ?>
              <p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
              <?php endif; ?>
            </div>
            <!-- End Section 3 -->

            <!-- Showcase -->
            <div class="row">
              <div class="col-md-12" aria-label="Showcase of Community Projects">
                <h2>Showcase</h2>
                <p>As a bustling technology hub, Toronto's tech community steps up to build innovative apps and products using City of Toronto Open Data.</p>
                <?php
                $the_query = new WP_Query( array( 'posts_per_page' => 20, 'category_name' => 'showcase' ) );
                if ( $the_query->have_posts() ) :
                  while ( $the_query->have_posts() ) :
                    $the_query->the_post();
                ?>

                <div class="single-long-post">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="showcase-thumbnail" style="background-image:url(<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); echo $url ?>)"></div>
                    </div>
                    <div class="col-md-8">
                      <a href="<?php the_permalink(); ?>">
                        <h3><?php the_title() ;?></h3>
                      </a>
                      <div class="attributes">
                        <?php the_date(); ?> by <?php the_author(); ?>
                      </div>
                      <p><?php the_excerpt(); ?></p>
                    </div>
                  </div>
                </div>
                <?php
                  endwhile;
                endif;
                wp_reset_postdata();
                ?>
              </div>
            </div>

          </section>
        </div>
      </div>
    </div>
  </section>
</div>
</div>

<?php get_footer(); ?>
