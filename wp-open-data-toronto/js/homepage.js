$.extend(config, {
    'isInitializing': true,
    'datasetsShown': 5
});

function buildWidget(response) {
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
}

function init() {
    var fields = ['fl=metadata_modified', 'fl=name', 'fl=title'];
    getCKAN('package_search?' + fields.join('&'), { 'rows': config['datasetsShown'], 'sort': 'metadata_modified desc' }, buildWidget);

    $('#search-dataset button').on('click', function() {
        var term = $('#search-dataset input').val();
        window.location.href = '../catalogue?r=' + $('#search-dataset input').val();
    });
}
