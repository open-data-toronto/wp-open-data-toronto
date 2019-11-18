<?php /* Template Name: Archives */ ?>
<?php get_header(); ?>

  <section class="content-area">
    <div class="container">
      <?php if ( have_posts() ) : ?>
      <div class="row">
        <div class="col-md-12">
          <!-- Breadcrumbs -->
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <a class="breadcrumb-item" href="<?php echo site_url(); ?>">Open Data Portal Home</a>
            <a class="breadcrumb-item">Posts by <?php the_author(); ?></a>
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

            <h3>Latest Posts</h3>
            <ul class="post-list">
              <?php
              $query2 = new WP_Query( array( 'posts_per_page' => 5 ) );
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

            <h3>Categories</h3>
            <ul class="post-list">
              <?php
              wp_list_categories([
                'orderby'    => 'name',
                'show_count' => true,
                'exclude'    => array( 125, 126, 124, 123, 10 ),
                'title_li'   => ''
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

        <div class="col-md-9">


          <div class="row">
            <div class="col-md-12" id="content">

          <h1>Articles by <?php the_author(); ?></h1>
          <br/>
             <div class="row">           
            <?php while ( have_posts() ) : the_post(); ?>
                   <div class="col-md-6" style="margin: 0 0 20px 0">
          
            <div class="single-long-post">
                  <div class="row showcase-item">
                    <div class="col-md-12">
                      <a href="<?php the_permalink(); ?>"><div class="showcase-thumbnail" style="background-image:url(<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); echo $url ?>)"></div></a>
                    </div>
                    <div class="col-md-12">
                      <a href="<?php the_permalink(); ?>">
                        <h3><?php the_title() ;?></h3>
                      </a>
                      <p><?php the_excerpt(); ?></p>
                    </div>
                  </div>
                  </div>
            </div>
            <?php
            endwhile;
            ?>
          </div>
          </div>
        </div>
      <?php else : ?>
      No posts found for this category.
      <?php endif; ?>
    </div>
  </section>
</div>
<?php get_footer(); ?>
