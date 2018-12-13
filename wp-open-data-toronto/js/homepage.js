$.extend(config, {
    'isInitializing': true,
    'datasetsShown': 5
});

function init() {
    var fields = ['fl=metadata_modified', 'fl=name', 'fl=title'];
    getCKAN('package_search?' + fields.join('&'), { 'rows': config['datasetsShown'], 'sort': 'metadata_modified desc' }, function() {
        var data = response['result'];
        for (var i = 0; i < data['results'].length; i++) {
            var row = data['results'][i];

            $('.newsfeed').append('<li>' +
                                    '<a href="/package/' + row['name'] + '">' +
                                      row['title'] +
                                      '<div class="float-right">' +
                                        '<span class="sr-only">Last updated:</span>' + getTimeSince(row['metadata_modified']) +
                                      '</div>' +
                                    '</a>' +
                                  '</li>')
        }
    });

    $('#search-dataset button').on('click', function() {
        var term = $('#search-dataset input').val();
        window.location.href = '../catalogue?search=' + $('#search-dataset input').val();
    });
}
