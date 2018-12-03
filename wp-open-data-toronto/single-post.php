
<?php get_header(); ?>

<!-- Hide sidebar in full-width layout // Do not remove -->
<?php if( types_render_field( 'hide-sidebar', array( 'value'=>1 ) ) ) : ?>
<style>
.hide-full-length {
    display: none !important;
}

.show-full-length {
    width: 100%;
    flex: 0 0 100%;
    max-width: 100%;
}

#toc_container {
    background: #ffffff;
    border: 1px solid #aaa;
    padding: 10px;
    margin-bottom: 1em;
    width: auto;
    display: table;
    font-size: 95%;
    position: fixed;
    left: 0;
    top: 40vh;
    margin-left: 20px;
}
</style>
<?php endif; ?>

  <section class="content-area" aria-label="Blog Post">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <!-- Breadcrumbs -->
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <a class="breadcrumb-item" href="<?php echo site_url(); ?>">Open Data Portal Home</a>
            <a class="breadcrumb-item" href="<?php echo site_url(); ?>/blog/">Open Data Blog</a>
            <a class="breadcrumb-item"><?php the_title(); ?></a>
          </nav>
          <!-- End breadcrumbs -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="banner" style="background-image:url(<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' ); echo $url ?>) !important">
            <div class="background">
              <h1><span class="sr-only">Blog article: </span><?php the_title(); ?></h1>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 hide-full-length">
          <!-- Sidebar Content -->
          <div class="blog-sidebar" role="complementary">
            <h2 class="sr-only">Explore Open Data Blog</h2>
            <h3>Latest posts</h3>
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
                'exclude'    => array( 10 ),
                'title_li'   => ''
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

        <div class="col-md-9 show-full-length" id="content">
          <h2 class="sr-only">Article text</h2>
          <?php
          while ( have_posts() ) :
            the_post();
            the_content();
          endwhile;
          ?>
        </div>
      </div>
    </div>
  </section>
</div>

<?php get_footer(); ?>
