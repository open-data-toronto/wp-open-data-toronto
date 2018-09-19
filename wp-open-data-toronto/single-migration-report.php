<?php 
/* Template Name: Single Migration Report */
?>
<?php get_header(); ?>
<style>header#masthead{background: 0;}ul.status{padding:0;margin:15px 0 25px 0;list-style:none}ul.status li{padding:0;margin:0;list-style:none}

.progress-circle {
  width: 150px;
  height: 150px;
  line-height: 150px;
  background: none;
  margin: 0 auto;
  box-shadow: none;
  position: relative;
}
.progress-circle:after {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 7px solid #eee;
  position: absolute;
  top: 0;
  left: 0;
}
.progress-circle > span {
  width: 50%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: 1;
}
.progress-circle .progress-circle-left {
  left: 0;
}
.progress-circle .progress-circle-bar {
  width: 100%;
  height: 100%;
  background: none;
  border-width: 7px;
  border-style: solid;
  position: absolute;
  top: 0;
  border-color: #ffb43e;
}
.progress-circle .progress-circle-left .progress-circle-bar {
  left: 100%;
  border-top-right-radius: 75px;
  border-bottom-right-radius: 75px;
  border-left: 0;
  -webkit-transform-origin: center left;
  transform-origin: center left;
}
.progress-circle .progress-circle-right {
  right: 0;
}
.progress-circle .progress-circle-right .progress-circle-bar {
  left: -100%;
  border-top-left-radius: 75px;
  border-bottom-left-radius: 75px;
  border-right: 0;
  -webkit-transform-origin: center right;
  transform-origin: center right;
}
.progress-circle .progress-circle-value {
  display: flex;
  border-radius: 50%;
  font-size: 36px;
  text-align: center;
  line-height: 20px;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 300;
}
.progress-circle .progress-circle-value div {
  margin-top: 10px;
}
.progress-circle .progress-circle-value span {
  font-size: 12px;
  text-transform: uppercase;
}

/* This for loop creates the    necessary css animation names 
Due to the split circle of progress-circle-left and progress-circle right, we must use the animations on each side. 
*/
.progress-circle[data-percentage="10"] .progress-circle-right .progress-circle-bar {
  animation: loading-1 1.5s linear forwards;
}
.progress-circle[data-percentage="10"] .progress-circle-left .progress-circle-bar {
  animation: 0;
}

.progress-circle[data-percentage="20"] .progress-circle-right .progress-circle-bar {
  animation: loading-2 1.5s linear forwards;
}
.progress-circle[data-percentage="20"] .progress-circle-left .progress-circle-bar {
  animation: 0;
}

.progress-circle[data-percentage="25"] .progress-circle-right .progress-circle-bar {
  animation: loading-3 1.5s linear forwards;
}
.progress-circle[data-percentage="25"] .progress-circle-left .progress-circle-bar {
  animation: loading-0.5 1.5s linear forwards 1.5s;
}

.progress-circle[data-percentage="30"] .progress-circle-right .progress-circle-bar {
  animation: loading-3 1.5s linear forwards;
}
.progress-circle[data-percentage="30"] .progress-circle-left .progress-circle-bar {
  animation: 0;
}

.progress-circle[data-percentage="40"] .progress-circle-right .progress-circle-bar {
  animation: loading-4 1.5s linear forwards;
}
.progress-circle[data-percentage="40"] .progress-circle-left .progress-circle-bar {
  animation: 0;
}

.progress-circle[data-percentage="50"] .progress-circle-right .progress-circle-bar {
  animation: loading-5 1.5s linear forwards;
}
.progress-circle[data-percentage="50"] .progress-circle-left .progress-circle-bar {
  animation: 0;
}

.progress-circle[data-percentage="60"] .progress-circle-right .progress-circle-bar {
  animation: loading-5 1.5s linear forwards;
}
.progress-circle[data-percentage="60"] .progress-circle-left .progress-circle-bar {
  animation: loading-1 1.5s linear forwards 1.5s;
}

.progress-circle[data-percentage="70"] .progress-circle-right .progress-circle-bar {
  animation: loading-5 1.5s linear forwards;
}
.progress-circle[data-percentage="70"] .progress-circle-left .progress-circle-bar {
  animation: loading-2 1.5s linear forwards 1.5s;
}

.progress-circle[data-percentage="80"] .progress-circle-right .progress-circle-bar {
  animation: loading-5 1.5s linear forwards;
}
.progress-circle[data-percentage="80"] .progress-circle-left .progress-circle-bar {
  animation: loading-3 1.5s linear forwards 1.5s;
}

.progress-circle[data-percentage="90"] .progress-circle-right .progress-circle-bar {
  animation: loading-5 1.5s linear forwards;
}
.progress-circle[data-percentage="90"] .progress-circle-left .progress-circle-bar {
  animation: loading-4 1.5s linear forwards 1.5s;
}

.progress-circle[data-percentage="100"] .progress-circle-right .progress-circle-bar {
  animation: loading-5 1.5s linear forwards;
}
.progress-circle[data-percentage="100"] .progress-circle-left .progress-circle-bar {
  animation: loading-5 1.5s linear forwards 1.5s;
}

@keyframes loading-1 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(36);
    transform: rotate(36deg);
  }
}
@keyframes loading-2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(72);
    transform: rotate(72deg);
  }
}
@keyframes loading-3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(108);
    transform: rotate(108deg);
  }
}
@keyframes loading-4 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(144);
    transform: rotate(144deg);
  }
}
@keyframes loading-5 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(180);
    transform: rotate(180deg);
  }
}
.progress-circle[data-percentage="100"] .progress-circle-bar{border-color: #41c541 !important}

.progress-circle .progress-circle-value{width: 150px;}
.main-content h3{font-weight:strong; padding: 0 0 20px 0;}
.progress {
    height: 40px;
    margin: 5px 0 30px 0;
}
.progress-bar {
    height: 40px;
    padding: 11px 0 0 13px;
    font-size: 22px;
    font-weight: bold;
    text-align: left;
}
h3{
    font-size: 22px;
    font-weight: 400;
    padding: 0 0 20px 0;
}
h2.lead {
    font-size: 30px;
}
</style>


<section class="content-area">
    <div class="container">


        <div class="row" style="display: block !important">
            <div class="col-md-12">
                <div class="banner">
                    <div class="background">
                        <h1><strong>Migration Report</strong>: <?php the_title(); ?></h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3">
                    <b>Migration Status</b>
                    <ul class="status"><li><a href="#">311</a></li>
                    <li><a href="#">Transportation Services</a></li>
                    <li><a href="#">Parks, Forestry and Recreation</a></li></ul>
                    <b>Questions?</b>
                    <p>Contact [email@domain.com] with questions. We're here to help.</p>
            </div>
            
            <div class="col-md-9">
                <div class="main-content">

                <h2 class="lead">Overall Migration Progress</h2>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="<?php echo types_render_field("migration-status", array()); ?>" aria-valuemin="0" aria-valuemax="100" style="width: <?php echo types_render_field("migration-status", array()); ?>"><?php echo types_render_field("migration-status", array()); ?></div>
                    </div>
</div>
                    <h2 class="lead">Score Breakdown</h2>
                    <ul class="list-group row">
                        <li class="list-group-item">

                        <!-- Criteria 1-->
                        <h3>Criteria 1. Source System Connection</h3>

                        <div class="row">
                            <div class="col-md-8">
                                <p>
                                <b>Status:</b>
                                <?php echo types_render_field("source-system-connection", array()); ?>
                                </p>
                            </div>
                            <div class="col-md-4">

                                <div class="d-flex align-content-center flex-wrap">

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
                                            <span>completed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            </div>
                        </div>
                        </li>

                        <li class="list-group-item">


                            <!-- Criteria 2-->
                            <h3>Criteria 2. Open Data Readiness</h3>

                            <div class="row">
                                <div class="col-md-8">
                                    <p>
                                    <b>Status:</b>
                                    <?php echo types_render_field("open-data-readiness", array()); ?>
                                    </p>
                                </div>
                                <div class="col-md-4">
                                    <div class="progress-circle align-self-center" data-percentage="<?php echo types_render_field("open-data-readiness", array("output"=>"raw")); ?>">
                                        <span class="progress-circle-left">
                                            <span class="progress-circle-bar"></span>
                                        </span>
                                        <span class="progress-circle-right">
                                            <span class="progress-circle-bar"></span>
                                        </span>
                                        <div class="progress-circle-value">
                                            <div>
                                                <?php echo types_render_field("open-data-readiness", array("output"=>"raw")); ?>%<br>
                                                <span>completed</span>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </div>

                    </li>
                    <li class="list-group-item">

                    <!-- Criteria 3-->
                    <h3>Criteria 3. User Demand</h3>

                    <div class="row">
                        <div class="col-md-8">
                            <p>
                            <b>Status:</b>
                            <?php echo types_render_field("user-demand", array()); ?>
                            </p>
                        </div>
                        <div class="col-sm-4 ml-auto">
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
                                        <span>completed</span>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>

                    </li>
                    <li class="list-group-item">

                    <!-- Criteria 4-->
                    <h3>Criteria 4. Freshness</h3>

                    <div class="row">
                        <div class="col-md-8">
                            <p>
                            <b>Status:</b>
                            <?php echo types_render_field("freshness", array()); ?>
                            </p>
                        </div>
                        <div class="col-sm-4">
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
                                        <span>completed</span>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>

                </li>
                <li class="list-group-item">

                    <!-- Criteria 5-->
                    <h3>Criteria 5. Data Granularity</h3>

                    <div class="row">
                        <div class="col-md-8">
                            <p>
                            <b>Status:</b>
                            <?php echo types_render_field("data-granularity", array()); ?>
                            </p>
                        </div>
                        <div class="col-sm-4 ml-auto">
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
                                        <span>completed</span>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>

                    </li>
                    <li class="list-group-item">

                    <!-- Criteria 6-->
                    <h3>Criteria 6. Proprietary Formats</h3>

                    <div class="row">
                        <div class="col-md-8">
                            <p>
                            <b>Status:</b>
                            <?php echo types_render_field("proprietary-formats", array()); ?>
                            </p>
                        </div>
                        <div class="col-sm-4 ml-auto">
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
                                        <span>completed</span>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </li>
            </ul>
                    
                </div>
            </div>
        </div>
    </div>
</section>
</div> 
<?php get_footer();