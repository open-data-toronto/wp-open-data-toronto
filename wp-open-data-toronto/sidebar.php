<div class="sidebar" role="navigation" aria-label="Secondary Navigation">
  <nav>
    <ul class="page-list">
      <li>          
  <?php
  // Parent-level page 
    if ( $post->post_parent ) { ?>
      <a href="<?php echo get_permalink( $post->post_parent ); ?>" >
      <?php echo get_the_title( $post->post_parent ); ?>
      </a>
    <?php } 
    else { ?>
      <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
    <?php }

     // Display second-level if this parent-level page has children 
    if ($post->post_parent) {
       $page = $post->post_parent;
    }
    else {
      $page = $post->ID;
    }

    $children = wp_list_pages(array(
      'child_of' => $page,
      'echo' => '0',
      'title_li' => ''
     ));

    if ($children) {
      echo "<ul>\n".$children."</ul>\n";
    } 
    ?>
      </li>
    </ul>
  </nav>
</div>

<!-- <?php if ( is_active_sidebar( 'left-sidebar' ) ) : ?>
  <div id="primary-sidebar" class="primary-sidebar widget-area" role="complementary">
    <?php dynamic_sidebar( 'left-sidebar' ); ?>
  </div>
<?php endif; ?> -->
