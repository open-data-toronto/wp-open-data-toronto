var state = history.state || {
    'filters': {},
    'page': 0,
    'size': 0,
    'sort': 'metadata_modified desc'
};

var showMoreAt = 6;

$.extend(config, {
    'isInitializing': true,
    'cataloguePages': 0,                                                        // Total number of pages within the catalogue
    'datasetsPerPage': 10,                                                      // Number of datasets to display per page
    'filters': ['dataset_category', 'owner_division', 'vocab_formats', 'topic']
});

function buildCatalogue(response) {
    $('.table-list').empty();
    $('#nav-catalogue').hide();

    var data = response['result'];
    state['size'] = Math.ceil(data['count'] / config['datasetsPerPage']);

    if (data['results'].length == 0) {
        $('.table-list').append('<div class="row">' +
                                  '<div class="col-md-12 not-found">' +
                                    '<h2>No datasets found for "' + state['filters']['search'] + '"</h2>' +
                                    '<p>Please try again or <a href="#">request a dataset</a></p>' +
                                  '</div>' +
                                '</div>');
        return;
    } else {
        var foundPhrase = data['results'].length == 1 ? data['count'] + ' dataset found ' : data['count'] + ' datasets found ';

        if (state['filters']['search'] != null && state['filters']['search'].length) {
            foundPhrase += 'for "' + state['filters']['search'] + '"';
        }

        $('#results-count').html('<span>' + foundPhrase + '</span>');
    }

    // Iterrates over each of the results and build the HTML for each of the dataset
    for (var i = 0; i < data['results'].length; i++) {
        var row = data['results'][i];
        var datasetMetadata =
                '<div class="dataset row">' +
                    '<div class="row">' +
                        '<div class="col-md-12">' +
                            '<h2><a href="/package/' + row['name'] + '">' + row['title'] + '</a></h2>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-9">' +
                            '<p class="dataset-excerpt">' + row['excerpt'] + '</p>' +
                        '</div>' +
                        '<div class="col-md-3 text-left attributes">' +
                            '<div class="dataset-meta-label">Last Updated</div>' + getFullDate(row['metadata_modified'].split('-')) +
                            '<div class="dataset-meta-label">Division</div>' + row['owner_division'] +
                            '<div class="dataset-meta-label">Type</div>' + row['dataset_category'] +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-12 formats-available">' +
                        '<h3 class="sr-only">Category available for: ' + row['title'] + '</h3><span class="badge badge-secondary">' + row['topic'] + '</span>' +
                    '</div>' +
                '</div>';

        $('.table-list').append(datasetMetadata);
        if (row['formats'].length > 0) {
            $('.table-list attributes').append('<div class="dataset-meta-label">Formats</div>' + row['formats'].join(' '));
        }
    }

    // Build the catalogue page navigation
    // This needs to be built on every catalogue refresh because total number of pages changes based on searches and filters
    if (data['count'] > config['datasetsPerPage']) {
        $('#nav-catalogue .page-remove').remove();

        // Build the page buttons
        for (var i = 0; i < state['size']; i++) {
            var pageNumber = i + 1 + '';

            if (i == 0 || i == (state['size'] - 1) || Math.abs(state['page'] - i) <= 2) {
                $('#nav-catalogue li:last-child').before('<li class="page-item page-remove">' +
                                                           '<a class="page-link" href="#" aria-label="Go to page ' + pageNumber + '" data-page= '+ i + '>' +
                                                              pageNumber +
                                                           '</a>' +
                                                         '</li>');
            } else if (Math.abs(state['page'] - i) == 3) {
                $('#nav-catalogue li:last-child').before('<li class="page-item page-remove disabled">' +
                                                           '<a class="page-link" href="#" aria-label="...">' +
                                                              '...' +
                                                           '</a>' +
                                                         '</li>');
            }

            if (i == state['page']) $('.page-link[data-page=' + i + ']').parent('li').addClass('active');
        }

        $('#nav-catalogue .page-remove a').on('click', function(evt) {
            state['page'] = $(this).data('page');
            $(this).addClass('active');

            loadCatalogue();
        });

        $('#nav-catalogue').show();
    }
}

function buildSidebar(response) {
    $('[data-type="filter"] .filter-value').remove();

    var results = response['result'];

    for (var i in results['search_facets']) {
        var field = results['search_facets'][i],
            sidebar = field['items'];

        sidebar.sort(function(a, b) {
            if (b['count'] == a['count']) {
                return a['name'] < b['name'] ? 1 : -1;
            }
            return a['count'] - b['count'];
        });

        for (var i in sidebar) {
            var value = sidebar[i],
                selected = state['filters'][field['title']],
                checked = ' ',
                labelChecked = ' '
                closeIcon = ' ';

            if (selected != null && selected.indexOf(value['name']) !== -1) {
                checked += 'checked="true" ';
                labelChecked += 'class="checkbox-checked" '
                closeIcon += '<span class="float-right"><i class="fa fa-times"></i></span>';
            }

            $('#' + field['title'] + '-values').prepend(
                '<li class="list-group-item list-group-item-action checkbox checkbox-filter filter-value">' +
                  '<label' + labelChecked + '>' +
                    '<span><input type="checkbox"' + checked + 'data-field="' + field['title'] + '" value="' + value['name'] + '">' + value['name'] + '</span>' +
                    '<span class="badge float-right">' + value['count'] + '</span>' + closeIcon +
                  '</label>' +
                '</li>');
        }
        var valuesLength = $('#' + field['title'] + '-values li').length ;
        if (valuesLength > showMoreAt){
            $('#' + field['title'] + '-values li.filter-value:nth-child(n+' + showMoreAt +')').toggleClass('sr-only');
            $('#' + field['title'] + '-values li.show-more label').html('[+] ' + (valuesLength - 5) + ' more');
            $('#' + field['title'] + '-values li.show-more').show();
        } else {
            $('#' + field['title'] + '-values li.show-more').hide();
        }
    }


    if (state['filters']['search'] != null) {
        $('#input-search').val(state['filters']['search']);
    }

    if (config['isInitializing']) buildStaticUI();
    buildDynamicUI();
}

var buildStaticUI = function() {
    // Controls the previous and next navigation buttons for pagination
    $('#nav-catalogue .page-keep a').on('click', function() {
        switch($(this).data('page')) {
            case 'previous':
                state['page'] -= 1;
                break;
            case 'next':
                state['page'] += 1;
                break;
        }

        loadCatalogue();
    });

    $('#btn-search').on('click', function() {
        state['filters'] = {};
        state['filters']['search'] = $('#input-search').val();

        state['page'] = 0;
        loadCatalogue();
    });

    $('#input-search').on('keyup', function(evt) {
        if (evt.keyCode == 13) {
            state['filters'] = {};
            state['filters']['search'] = $('#input-search').val();

            state['page'] = 0;
            loadCatalogue();
        }
    });

    $('#sort-results-by').on('change', function() {
        state['page'] = 0;
        loadCatalogue();
    });

    $('.show-more').hover(
        function () {
            $('#' + $(this).data("field") + '-values .show-more label').toggleClass("on-hover");
        }, function () {
            $('#' + $(this).data("field") + '-values .show-more label').toggleClass("on-hover");
        });

    $('.show-more').on('click', function(){
        var name = $(this).data("field") ;
        if ($('#' + name + '-values li').length > showMoreAt){
            $('#' + name + '-values li.filter-value:nth-child(n+' + showMoreAt +')').toggleClass('sr-only');
            var valuesLength = $('#' + name + '-values li').length ;
            var hiddenValuesLength = $('#' + name + '-values li.sr-only').length ;
            if(hiddenValuesLength === 0 ){
                $('#' + name + '-values li.show-more label').html('[-] Show less');
            } else {
                $('#' + name + '-values li.show-more label').html('[+] ' + (valuesLength - 5) + ' more');
            }
            $('#' + name + '-values li.show-more').show();
        } else {
            $('#' + name + '-values li.show-more').hide();
        }
    });

    config['isInitializing'] = false;                                           // Set isInitializing to false to prevent duplication of events
    $('.block-hidden').fadeIn(250);
}

function buildDynamicUI() {
    switch(state['page']) {
        case 0:
            $('#nav-catalogue .page-keep').first().addClass('disabled');
            $('#nav-catalogue .page-keep').last().removeClass('disabled');
            break;
        case (state['size'] - 1):
            $('#nav-catalogue .page-keep').last().addClass('disabled');
            $('#nav-catalogue .page-keep').first().removeClass('disabled');
            break;
        default:
            $('#nav-catalogue .page-keep').removeClass('disabled');
    }

    $('[data-type="filter"] input').on('click', function() {
        $(this).parent('label').toggleClass('checkbox-checked');

        var field = $(this).data('field');
        state['filters'][field] = [];

        $.each($('[data-field="' + field + '"]:checked'), function(idx, element) {
            state['filters'][field].push($(element).val());
        });

        state['page'] = 0;
        loadCatalogue();
   });
}

function loadCatalogue() {
    if (config['isInitializing']) {
        var params = window.location.search.slice(1).split('&');
        for (var i in params) {
            var filter = params[i].split('=');
            if (filter[0] == 'n') {
                state['page'] = parseInt(filter[1]);
            } else if (filter[0].length > 0) {
                var content = decodeURIComponent(filter[1]);
                state['filters'][filter[0]] = ['search'].indexOf(filter[0]) !== -1 ? content : content.split('+');
            }
        }
    }

    getCKAN('catalogue_search', $.extend(true, {
        'type': 'full',
        'rows': config['datasetsPerPage'],
        'sort': state['sort'],
        'start': state['page'] * config['datasetsPerPage']
    }, state['filters']), buildCatalogue);

    getCKAN('catalogue_search', $.extend(true, {
        'type': 'facet',
        'rows': config['datasetsPerPage'],
        'facet_field': config['filters']
    }, state['filters']), buildSidebar);

    updateURL();
}

function updateURL() {
    var urlParam = [];

    for (var i in state['filters']) {
        if (state['filters'][i].length <= 0) continue;

        var filter = state['filters'][i];

        if (filter.constructor === Array) {
            urlParam.push(i + '=' + encodeURIComponent(filter.join('+')));
        } else if (typeof filter == 'string') {
            urlParam.push(i + '=' + encodeURIComponent(filter));
        }
    }

    if (state['page'] != 0) {
        urlParam.push('n=' + state['page']);
    }

    history.replaceState(null, '', '/catalogue/?' + urlParam.join('&'));
}

function init() {
    $('.block-hidden').hide();
    loadCatalogue();
}
