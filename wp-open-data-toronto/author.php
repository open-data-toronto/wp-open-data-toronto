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
        <div class="col-md-12">
          <div class="banner" style="background-image:url(<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); echo $url ?>) !important">
            <div class="background">
              <h1>Posts by <?php the_author(); ?></h1>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <!-- Sidebar Content -->
          <?php $curauth = (isset($_GET['author_name'])) ? get_user_by('slug', $author_name) : get_userdata(intval($author)); ?>

          <!-- Author Box -->
          <h2>About the Author</h2>
          <div class="profile-photo">
            <?php echo(types_render_usermeta_field( "profile-photo", array( "alt" => "Author image", "width" => "300", "height" => "200", "proportional" => "true" ) )); ?>
          </div>
          <p class="biography"><?php echo $curauth->user_description; ?></p>

          <hr>

          <h2>Latest posts</h2>
          <ul class="post-list">
            <?php
            $query2 = new WP_Query( array( 'posts_per_page' => 5 ) );
            while ( $query2->have_posts() ) {
                $query2->the_post(); ?>
                <li>
                  <a href="<?php the_permalink(); ?>">
                    <?php the_title(); ?>
                  </a>
                </li>
            <?php
            }
            wp_reset_postdata();
            ?>
          </ul>
          <br/>
          <h2>Categories</h2>
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
          <h2>Complexity</h2>

          <ul class="post-list">
            <?php
            $tags = get_tags();
            $html = '';
            foreach ( $tags as $tag ) {
              $tag_link = get_tag_link( $tag->term_id );
              $html .= "<li><a href='{$tag_link}' aria-label='{$tag->name} Tag' class='{$tag->slug}'>";
              $html .= "{$tag->name}</a></li>";
            }
            $html .= '';
            echo $html;
            ?>
          </ul><br/>
          <h2>Author</h2>
          <ul class="post-list">
            <!-- List authors -->
            <?php wp_list_authors(); ?>
          </ul>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-12" id="content">
              <?php while ( have_posts() ) : the_post(); ?>
              <div class="single-long-post">
                <div class="row">
                  <div class="col-md-4">
                    <div class="showcase-thumbnail" style="background-image:url(<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); ?><?php echo $url ?>)">
                    </div>
                  </div>
                  <div class="col-md-8">
                    <a href="<?php the_permalink(); ?>">
                    <h4><?php the_title(); ?></h4></a>
                    <div class="excerpt"><?php the_excerpt(); ?></div>
                  </div>
                </div>
              </div>

              <?php endwhile; ?>
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
