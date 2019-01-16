<?php /* Template Name: Team Members Page */ ?>
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
          <div class="banner" style="background-image:url('http://www.socialstrategi.com/wp-content/uploads/2016/04/leverage-social-data-for-insights.jpg')">
            <div class="background">
              <h1><?php the_title(); ?></h1>
            </div>
          </div>
        </div>
      </div>

      <section class="team-page" aria-label="About the Open Data Team">
        <div class="row">
          <div class="col-md-3">
            <?php get_sidebar(); ?>
          </div>

          <div class="col-md-9">
            <div class="main-content" id="content">
              <?php
              $allUsers = get_users('orderby=post_count&order=ASC&exclude=8'); $users = array();

              // Remove subscribers from the list as they won't write any articles
              foreach( $allUsers as $currentUser ) :
                if( !in_array( 'subscriber', $currentUser->roles ) ) :
                  $users[] = $currentUser;
                endif;
              endforeach;
              ?>

              <!-- Step 2. For each user... -->
              <?php foreach($users as $user): ?>
              <div class="row">
                <div class="col-md-8">
                  <h2><?php echo ( $user->display_name ); ?></h2>
                  <p class="position">
                    <strong><?php echo types_render_usermeta_field( "position-and-title", array( "user_id" => $user->ID ) ); ?></strong>
                  </p>
                  <p><?php echo get_user_meta($user->ID, 'description', true); ?></p>
                </div>
                <div class="col-md-4 profpic">
                  <?php echo(types_render_usermeta_field( "profile-photo", array( "alt" => "Author image", "width" => "300", "height" => "200", "proportional" => "true" , "user_id" => $user->ID ) )); ?>
                </div>
              </div>

              <br/>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</div>
</div>

<?php get_footer();
