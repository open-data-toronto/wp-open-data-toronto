var $ = jQuery.noConflict(),
    state = history.state || {
        'filters': {},
        'search': [],
        'page': 0,
        'size': 1
    };

$.extend(config, {
    'isInitializing': true,
    'cataloguePages': 0,                                                        // Total number of pages within the catalogue
    'datasetsPerPage': 10,                                                      // Number of datasets to display per page
    'filters': {
        'checkboxes': ['dataset_category', 'resource_formats'],
        'dropdowns': ['owner_division', 'vocab_tags'],
        'filters': ['dataset_category', 'owner_division', 'resource_formats', 'vocab_tags']
    },
    'select2': {
        'language': {
            'noResults': function() {
                return 'Start typing search term...';
            }
        },
        'width': '100%'
    }
});

function buildCatalogue(response) {
    $('.table-list').empty();
    $('#nav-catalogue').hide();

    var data = response['result'];
    state['size'] = Math.ceil(data['count'] / config['datasetsPerPage']);

    if (data['results'].length == 0) {
        $('.table-list').append('<div class="row">' +
                                  '<div class="col-md-12">' +
                                    '<h2>No datasets found </h2>' +
                                  '</div>' +
                                '</div>');
        return;
    }

    // Iterrates over each of the results and build the HTML for each of the dataset
    for (var i = 0; i < data['results'].length; i++) {
        var row = data['results'][i];

        // Build the format tags
        var formats = row['resource_formats'].split(' '),
            formatEle = '';

        for (var j = 0; j < formats.length; j++) {
            formatEle += '<li class=' + formats[j].toLowerCase() + '>' + formats[j] + '</li>';
        }

        // Build the dataset card with field values
        var ele = '<div class="row">' +
                    '<div class="col-md-8">' +
                      '<h2><a href="/package/' + row['name'] + '">' + row['title'] + '</a></h2>' +
                      row['excerpt'] +
                      '<div class="formats-available">' +
                        '<h3 class="sr-only">Formats Available for ' + row['title'] + '</h3>' +
                        '<ul class="tag-list">' + formatEle + '</ul>' +
                      '</div>' +
                    '</div>' +
                    '<div class="col-md-4 text-right attributes">' +
                      '<p>' +
                        '<span class="sr-only">Last Updated: </span>' +
                        getFullDate(row['published_date'].split('-')) + '&nbsp; ' +
                        '<span class="fa fa-clock-o" aria-hidden="true"></span>' +
                      '</p>' +
                      '<p>' +
                        '<span class="sr-only">Data Type: </span>' +
                        row['dataset_category'] + '&nbsp; ' +
                        '<span class="fa fa-bar-chart" aria-hidden="true"></span>' +
                      '</p>' +
                    '</div>' +
                  '</div>';

        $('.table-list').append(ele);
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
                                                           '<a class="page-link" href="#" aria-label="Go to page ' + pageNumber + '" data-page=' + i + '>' +
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
        }

        $('#nav-catalogue').show();
    }
}

function buildCatalogueSidebar(response) {
    $('.filter ul, .filter select').empty();

    var results = response['result'],
        data = {};

    for (var i in results['search_facets']) {
        var field = results['search_facets'][i],
            sidebar = {};

        for (var j in field['items']) {
            var item = field['items'][j];

            if (['resource_formats'].indexOf(field['title']) !== -1) {
                var splits = item['name'].split(' ');

                for (var k in splits) {
                    if (sidebar[splits[k]] === undefined) {
                        sidebar[splits[k]] = {
                            'count': item['count'],
                            'name': splits[k]
                        };
                    } else {
                        sidebar[splits[k]]['count'] += item['count'];
                    }
                }
            } else {
                sidebar[item['name']] = {
                    'count': item['count'],
                    'name': item['name']
                };
            }
        }

        sidebar =  Object.keys(sidebar).map(function(x) { return sidebar[x] });
        sidebar.sort(function(a, b) {
            if (b['count'] == a['count']) {
                return a['name'] < b['name'] ? -1 : 1;
            }
            return b['count'] - a['count'];
        });

        for (var i = 0; i < sidebar.length; i++) {
            var value = sidebar[i],
                selected = state['filters'][field['title']],
                checked = ' ',
                labelChecked = ' ';

            if (config['filters']['dropdowns'].indexOf(field['title']) !== -1) {         // Select2 dropdowns filters
                if (selected != null && selected.indexOf(value['name']) !== -1) {
                    checked += 'selected="selected" ';
                }

                $('.filter-' + field['title'] + ' select').append(
                    '<option' + checked + 'data-field="' + field['title'] + '" value="' + value['name'] + '">' +
                      value['name'] +
                    '</option>');
            } else if (config['filters']['checkboxes'].indexOf(field['title']) !== -1) { // Checkboxes filters
                if (selected != null && selected.indexOf(value['name']) !== -1) {
                    checked += 'checked="true" ';
                    labelChecked += 'class="checkbox-checked" ';
                }

                $('.filter-' + field['title'] + ' ul').append(
                    '<li class="checkbox checkbox-filter">' +
                      '<label' + labelChecked + '>' +
                        '<input type="checkbox"' + checked + 'data-field="' + field['title'] + '" value="' + value['name'] + '">' + '&nbsp;' + value['name'] +
                          '&nbsp;<small>(' + value['count'] + ')</small>' +
                      '</label>' +
                    '</li>');
            }
        }
    }

    if (state['search'].length > 0) {
        for (var i in state['search']) {
            var value = state['search'][i];

            $('.filter-search select').prepend('<option selected="selected" value="' + value + '">' + value + '</option>');
        }
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

    $('#select-division, #select-vocab_tags').select2(config['select2']);
    $('#select-search').select2($.extend({}, config['select2'], { 'tags': true }));

    config['isInitializing'] = false;                                           // Set isInitializing to false to prevent duplication of events
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

    $('[data-page="' + state['page'] + '"]').parent('li').addClass('active');

    $('#nav-catalogue .page-remove a').on('click', function(evt) {
        evt.preventDefault();

        state['page'] = $(this).data('page');
        $(this).addClass('active');

        loadCatalogue();
    });

    $('.select-select2').on('change.select2', function() {
        var value = $(this).val();

        if ($(this).is('#select-search')) {
            state['search'] = value || [];
        } else {
            state['filters'][$(this).data('field')] = value;
        }

        state['page'] = 0;
        loadCatalogue();
    });

    $('.checkbox-filter input').on('click', function() {
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
    if (!config['isInitializing'] && (state['page'] < 0 || state['page'] >= state['size'])) return;

    var q = config['isInitializing'] ? parseParams() : parseFilters();
    var params = {
        'q': q,
        'rows': config['datasetsPerPage'],
        'sort': 'name asc',
        'start': state['page'] * config['datasetsPerPage']
    }

    var urlParam = [];
    if (state['page'] != 0) {
        urlParam.push('n=' + state['page'])
    }

    if (q.length > 0) {
        urlParam.push('q=' + encodeURI(q));
    }

    if (state['search'].length > 0) {
        urlParam.push('r=' + encodeURI(state['search'].join('+')));
    }

    loadCatalogueSidebar(q);
    getCKAN('package_search', params, buildCatalogue);
    history.replaceState(null, '', '/catalogue/?' + urlParam.join('&'));
}

function loadCatalogueSidebar(query) {
    var params = {
        'q': query,
        'rows': 0,
        'facet': 'on',
        'facet.limit': -1,
        'facet.field': JSON.stringify(config['filters']['filters'])
    }

    getCKAN('package_search', params, buildCatalogueSidebar);
}

function parseFilters() {
    var q = [];

    for (var field in state['filters']) {
        if (state['filters'][field] == null || !state['filters'][field].length) continue;

        var filter = {};
        if (config['filters']['checkboxes'].indexOf(field) !== -1) {            // Filter from checkboxes
            var checks = [];
            for (var idx in state['filters'][field]) {
                checks.push('*' + state['filters'][field][idx] + '*');
            }

            filter[field] = [field + ':(' + checks.join(' OR ') + ')'];
        } else if (config['filters']['dropdowns'].indexOf(field) !== -1) {      // Filter for CKAN field
            filter[field] = [];
            $.each(state['filters'][field], function(idx, val) {
                filter[field].push(field + ':"' + val + '"');
            });
        }

        for (var name in filter) {
            q.push('(' + filter[name].join(' OR ') + ')');
        }
    }

    if (state['search'] != null && state['search'].length > 0) {
        var tokens = [];
        for (var i in state['search']) {
            tokens = tokens.concat(state['search'][i].split(' '));
        }
        tokens = tokens.map(function(x) { return '*' + x + '*' }).join(' AND ');

        q.push('(excerpt: (' + tokens + ')) OR (title: (' + tokens + '))');
    }

    return q.join(' AND ');
}

function parseParams() {
    var redirectFilters = ['n', 'q', 'r'];

    for (var i in redirectFilters) {
        var value = getURLParam(redirectFilters[i]);
        if (value == null) continue;

        switch (redirectFilters[i]) {
            case 'n':
                state['page'] = parseInt(value);
                break;
            case 'q':
                value = value.split(' AND ').map(function(x) { return x.substring(1, x.length - 1).split(':'); });
                $.each(value, function(idx, content) {
                    if (config['filters']['filters'].indexOf(content[0]) !== -1) {
                        state['filters'][content[0]] = content[1].replace(/[*/(/)""]/g, '').split(' OR ');
                    }
                });
                break;
            case 'r':
                state['search'] = value.split('+');
                break
        }
    }

    return getURLParam('q') || '';
}

function init() {
    loadCatalogue();
}
