<?php  /* Template Name: Dashboard Template */ ?>
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
        <div class="col-md-12" id="content">
          <div class="main-content">

            <h1><?php the_title(); ?></h1>
            <br/>
            <!-- Query page content-->
            <?php
            if ( have_posts() ) :
              while ( have_posts() ) :
                the_post();
                the_content();
              endwhile;
            endif;
            ?>
            </div>
        </div>
      </div>
    </div>
  </section>
</div>
</div>
<?php get_footer(); ?>
