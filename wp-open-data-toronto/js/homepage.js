$.extend(config, {
  datasetsShown: 5,
});

function init() {
  //var fields = ["fl=date_published", "fl=name", "fl=title"];
  //console.log("package_search?" + fields.join("&"))
  getCKAN(
    "package_search?",// + fields.join("&"),
    { rows: config["datasetsShown"], sort: "date_published desc" },
    function (response) {
      var data = response["result"];
      for (var i = 0; i < data["results"].length; i++) {
        var row = data["results"][i];

        $(".newsfeed").append(
          '<a href="/dataset/' +
            row["name"] +
            '/"  class="row">' +
            '<div class="col-md-9">' +
            row["title"] +
            "</div>" +
            '<div class="col-md-3">' +
            '<span class="sr-only">Published </span>' +
            '<div class="pull-right">' +
            getTimeSince(row["date_published"]) +
            "</div>" +
            "</div>" +
            "</a>"
        );
      }
    }
  );

  $("#dataset-search").on("submit", function (evt) {
    evt.preventDefault();

    var term = encodeURIComponent($("#search").val());
    window.location.href =
      "../catalogue?search=" +
      term +
      (term.length > 0 ? "&sort=score%20desc" : "");
  });
}
