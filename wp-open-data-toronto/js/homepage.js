$.extend(config, {
    'datasetsShown': 5
});

function init() {
    var fields = ['fl=metadata_created', 'fl=name', 'fl=title'];
    getCKAN('package_search?' + fields.join('&'), { 'rows': config['datasetsShown'], 'sort': 'metadata_created desc' }, function(response) {
        var data = response['result'];
        for (var i = 0; i < data['results'].length; i++) {
            var row = data['results'][i];

            $('.newsfeed').append('<li>' +
                                    '<a href="/dataset/' + row['name'] + '/">' +
                                      row['title'] +
                                      '<div class="float-right">' +
                                        '<span class="sr-only">Published on:</span>' + getTimeSince(row['metadata_created']) +
                                      '</div>' +
                                    '</a>' +
                                  '</li>')
        }
    });

    $('#dataset-search').on('submit', function(evt) {
        evt.preventDefault();

        var term = encodeURIComponent($('#search').val());
        window.location.href = '../catalogue?search=' + term + (term.length > 0 ? '&sort=score%20desc' : '');
    });
}
