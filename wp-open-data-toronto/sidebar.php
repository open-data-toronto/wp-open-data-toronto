<div class="sidebar" role="navigation" aria-label="Secondary Navigation">
  <nav>
    <ul class="page-list">
      <!-- Parent-level page -->
      <li>
        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        <!-- Display second-level if this parent-level page has children -->
        <?php
        $children = wp_list_pages( 'title_li=&child_of='.$post->ID.'&echo=0' );
        if ( $children) :
        ?>
        <ul>
          <?php echo $children; ?>
        </ul>
        <?php endif; ?>
      </li>
    </ul>
  </nav>
</div>

<!-- <?php if ( is_active_sidebar( 'left-sidebar' ) ) : ?>
  <div id="primary-sidebar" class="primary-sidebar widget-area" role="complementary">
    <?php dynamic_sidebar( 'left-sidebar' ); ?>
  </div>
<?php endif; ?> -->
