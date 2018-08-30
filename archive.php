<?php /* Template Name: Archives */ ?>
<?php get_header(); ?>

  <section class="content-area">
    <div class="container">

    <?php if ( have_posts() ) : ?>
    <div class="row">
      <div class="col-md-12">
        <!-- Breadcrumbs -->
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <a class="breadcrumb-item" href="<?php echo site_url(); ?>">Open Data Portal home</a>
          <a class="breadcrumb-item" href="<?php echo site_url(); ?>/blog">Open Data Blog</a>
          <a class="breadcrumb-item">Posts labeled with '<?php printf( __( '%s', 'twentyfourteen' ), single_cat_title( '', false ) ); ?>'</a>
        </nav>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="banner" style="background-image:url(<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); echo $url ?>) !important">
          <div class="background">
            <h1><?php printf( __( 'Category Archives: %s', 'twentyfourteen' ), single_cat_title( '', false ) ); ?></h1>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3">
        <!-- Sidebar Content -->
        <h2>Recent Posts</h2>
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
        <h2>Tags</h2>
        <ul class="post-list">
          <?php
          $tags = get_tags();
          $html = '<div class="post_tags">';
          foreach ( $tags as $tag ) {
            $tag_link = get_tag_link( $tag->term_id );
            $html .= "<li><a href='{$tag_link}' title='{$tag->name} Tag' class='{$tag->slug}'>";
            $html .= "{$tag->name}</a></li>";
          }
          $html .= '</div>';
          echo $html;
          ?>
        </ul>
      </div>

      <div class="col-md-9">
        <div class="row">
          <div class="col-md-12">
            <?php while ( have_posts() ) : the_post(); ?>
            <div class="single-long-post">
              <div class="row">
                <div class="col-md-4">
                  <div class="showcase-thumbnail" style="background-image:url(<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); ?><?php echo $url ?>)"></div>
                </div>
                <div class="col-md-8">
                  <a href="<?php the_permalink(); ?>">
                  <h4><?php the_title(); ?></h4></a>
                  <div class="excerpt"><?php the_excerpt(); ?></div>
                </div>
              </div>
            </div>
            <?php
            endwhile;
            ?>
          </div>
        </div>
      </div>
    <?php> else : ?>
    No posts found for this category.
    <?php endif; ?>
    </div>
  </section>
</div>
<?php get_footer(); ?>
