<?php 
/* Template Name: Single Migration Report */
?>
<?php get_header(); ?>


<section class="content-area">
    <div class="container">


        <div class="row">
            <div class="col-md-12">
                <div class="banner">
                    <div class="background">
                        <h1><strong>Migration Report</strong></h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3" style="padding-top: 50px">
                    <p>
                      <b>Dataset:</b><br/> <a href="#"><?php the_title(); ?></a>
                    </p>
                    <p>
                      <b>Migration Readiness</b><br/>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" aria-valuenow="<?php echo types_render_field("migration-status", array()); ?>" aria-valuemin="0" aria-valuemax="100" style="width: <?php echo types_render_field("migration-status", array()); ?>"><?php echo types_render_field("migration-status", array()); ?></div>
                    </div>
                  </p>

                    <p>
                      <b>Division:</b><br/><a href="#">Parks, Forestry and Recreation</a>
                    </p>
                    <p>
                      <b>Batch:</b><br/>
                      You are in <strong>Batch 1</strong> and are scheduled for migration by <strong>April 4th 2018</strong>
                    </p>
                    <p>
                      <b>Need help?</b><br/>
                   Contact <a href="mailto:opendata@toronto.ca">opendata@toronto.ca</a> with questions. We're here to help.</p>
            </div>
            
            <div class="col-md-9">            

                    <h2 class="lead">Score Breakdown</h2>

                    <div class="col-container">
                      <div class="col">
                        <h3>1. Source System Connection</h3>
                        <div class="progress-circle" data-percentage="<?php echo types_render_field("source-system-connection", array("output"=>"raw")); ?>">
                                    <span class="progress-circle-left">
                                        <span class="progress-circle-bar"></span>
                                    </span>
                                    <span class="progress-circle-right">
                                        <span class="progress-circle-bar"></span>
                                    </span>
                                    <div class="progress-circle-value">
                                        <div>
                                            <?php echo types_render_field("source-system-connection", array("output"=>"raw")); ?>%<br>
                                            <span>ready</span>
                                        </div>
                                    </div>
                                </div>
                               <p>
                                <b>Status:</b>
                                <?php echo types_render_field("source-system-connection", array()); ?>
                                </p>
                                
                      </div>
                       <div class="col">
                        <h3>2. Open Data Readiness</h3>
                        <div class="progress-circle" data-percentage="<?php echo types_render_field("open-data-readiness", array("output"=>"raw")); ?>">
                                    <span class="progress-circle-left">
                                        <span class="progress-circle-bar"></span>
                                    </span>
                                    <span class="progress-circle-right">
                                        <span class="progress-circle-bar"></span>
                                    </span>
                                    <div class="progress-circle-value">
                                        <div>
                                            <?php echo types_render_field("open-data-readiness", array("output"=>"raw")); ?>%<br>
                                            <span>ready</span>
                                        </div>
                                    </div>
                                </div>
                        <p>
                                <b>Status:</b>
                                <?php echo types_render_field("open-data-readiness", array()); ?>
                                </p>
                                
                      </div>
                    </div>

                    <div class="col-container">
                      <div class="col">
                        <h3>3.  User Demand</h3>
                        <div class="progress-circle" data-percentage="<?php echo types_render_field("user-demand", array("output"=>"raw")); ?>">
                                    <span class="progress-circle-left">
                                        <span class="progress-circle-bar"></span>
                                    </span>
                                    <span class="progress-circle-right">
                                        <span class="progress-circle-bar"></span>
                                    </span>
                                    <div class="progress-circle-value">
                                        <div>
                                            <?php echo types_render_field("user-demand", array("output"=>"raw")); ?>%<br>
                                            <span>ready</span>
                                        </div>
                                    </div>
                                </div>
                               <p>
                                <b>Status:</b>
                                <?php echo types_render_field("user-demand", array()); ?>
                                </p>
                                
                      </div>
                       <div class="col">
                        <h3>4. Freshness</h3>
                        <div class="progress-circle" data-percentage="<?php echo types_render_field("freshness", array("output"=>"raw")); ?>">
                                    <span class="progress-circle-left">
                                        <span class="progress-circle-bar"></span>
                                    </span>
                                    <span class="progress-circle-right">
                                        <span class="progress-circle-bar"></span>
                                    </span>
                                    <div class="progress-circle-value">
                                        <div>
                                            <?php echo types_render_field("freshness", array("output"=>"raw")); ?>%<br>
                                            <span>ready</span>
                                        </div>
                                    </div>
                                </div>
                        <p>
                                <b>Status:</b>
                                <?php echo types_render_field("freshness", array()); ?>
                                </p>
                                
                      </div>
                    </div>

                    <div class="col-container">
                      <div class="col">
                        <h3>5. Data Granularity</h3>
                        <div class="progress-circle" data-percentage="<?php echo types_render_field("data-granularity", array("output"=>"raw")); ?>">
                                    <span class="progress-circle-left">
                                        <span class="progress-circle-bar"></span>
                                    </span>
                                    <span class="progress-circle-right">
                                        <span class="progress-circle-bar"></span>
                                    </span>
                                    <div class="progress-circle-value">
                                        <div>
                                            <?php echo types_render_field("data-granularity", array("output"=>"raw")); ?>%<br>
                                            <span>ready</span>
                                        </div>
                                    </div>
                                </div>
                               <p>
                                <b>Status:</b>
                                <?php echo types_render_field("data-granularity", array()); ?>
                                </p>
                                
                      </div>
                       <div class="col">
                        <h3>6. Proprietary Formats</h3>
                        <div class="progress-circle" data-percentage="<?php echo types_render_field("proprietary-formats", array("output"=>"raw")); ?>">
                                    <span class="progress-circle-left">
                                        <span class="progress-circle-bar"></span>
                                    </span>
                                    <span class="progress-circle-right">
                                        <span class="progress-circle-bar"></span>
                                    </span>
                                    <div class="progress-circle-value">
                                        <div>
                                            <?php echo types_render_field("proprietary-formats", array("output"=>"raw")); ?>%<br>
                                            <span>ready</span>
                                        </div>
                                    </div>
                                </div>
                        <p>
                                <b>Status:</b>
                                <?php echo types_render_field("proprietary-formats", array()); ?>
                                </p>
                                
                      </div>
                    </div>



                    
                </div>
            </div>
        </div>
    </div>
</section>
</div> 
<?php get_footer();