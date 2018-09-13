<!-- Sidebar for Dataset Catalogue Page -->
<div class="sidebar" style="border: 0" role="complementary">

  <!-- Start Dataset Search -->
  <div class="filter filter-dataset">
    <h2>Search Catalogue</h2>
    <select id="select-search" multiple="multiple"></select>
  </div>
  <br/>
  <!-- End Dataset Search -->

  <!-- Filter by Category -->
  <!-- <div class="category-filter" aria-label="Filter datasets by category">
    <h2>Categories</h2>
    <ul></ul>
  </div> -->
  <!-- End Filter by Category -->

  <!-- Filter by File Format -->
  <!-- <div class="filter format-filter" aria-label="Filter datasets by format">
    <h2>Formats</h2>
      <li><a href="/catalogue?format=csv">CSV</a></li>
      <li><a href="/catalogue?format=json">JSON</a></li>
      <li><a href="/catalogue?format=shp">Shapefile</a></li>
    <ul></ul>
  </div> -->
  <!-- End Filter by File Format -->

  <!-- Filter by Division -->
  <div class="filter filter-owner_division" aria-label="Filter datasets by division">
    <h2>Division</h2>
    <!-- <ul></ul>
    <button type="button" class="btn btn-primary btn-show-more" data-field="owner_division">Show more..</button> -->
    <select id="select-division" multiple="multiple"></select>
  </div>
  <br/>
  <!-- End Filter by Division -->

  <!-- Filter by Data Type -->
  <div class="filter filter-dataset_category" aria-label="Filter datasets by type of data">
    <h2>Dataset Type</h2>
    <ul></ul>
  </div>
  <!-- End Filter by Division -->

</div>
<!-- End Sidebar -->
