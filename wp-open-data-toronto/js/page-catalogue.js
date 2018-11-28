var state = history.state || {
    'filters': {},
    'page': 0,
    'size': 0,
    'sort': 'metadata_modified desc'
};

$.extend(config, {
    'isInitializing': true,
    'cataloguePages': 0,
    'datasetsPerPage': 10,
    'filters': ['dataset_category', 'owner_division', 'vocab_formats', 'topic'],
    'filterSize': 5
});

function buildCatalogue(response) {
    $('.table-list').empty();
    $('#nav-catalogue').hide();

    var data = response['result'];
    state['size'] = Math.ceil(data['count'] / config['datasetsPerPage']);

    if (data['results'].length == 0) {
        $('#results-count').html('No datasets found for "' + state['filters']['search'] + '"');
        $('.table-list').append('<div class="row">' +
                                  '<div class="col-md-12 not-found">' +
                                    '<p>Please try again or <a href="mailto:opendata@toronto.ca?' +
                                                                'subject=Open Data Portal - Request for Data' +'&' +
                                                                'body=Give us some context first, such as what do you need? How can we help?"</a>let us know what data you want to see in the catalogue</p>' +
                                  '</div>' +
                                '</div>');
        return;
    } else {
        var foundPhrase = data['results'].length == 1 ? data['count'] + ' dataset found ' : data['count'] + ' datasets found ';

        if (state['filters']['search'] != null && state['filters']['search'].length) {
            foundPhrase += 'for "' + state['filters']['search'] + '"';
        }

        $('#results-count').html(foundPhrase);
    }

    for (var i = 0; i < data['results'].length; i++) {
        var row = data['results'][i];

        $('.table-list').append(
            '<div class="dataset row" id ="' + row['id'] + '">' +
              '<div class="row">' +
                '<div class="col-md-9">' +
                  '<div class="col-md-12">' +
                    '<h2><a href="/package/' + row['name'] + '">' + row['title'] + '</a></h2>' +
                    '<p class="dataset-excerpt">' + row['excerpt'] + '</p>' +
                  '</div>' +
                '</div>' +
                '<div class="col-md-3 text-left attributes">' +
                  '<div class="dataset-meta-label">Last Updated</div><span>' + getFullDate(row['metadata_modified'].split('-')) + '</span>' +
                  '<div class="dataset-meta-label">Publisher</div><span>' + row['owner_division'] + '</span>' +
                  '<div class="dataset-meta-label">Type</div><span>' + row['dataset_category'] + '</span>' +
                '</div>' +
              '</div>' +
            '</div>');

        if (row['formats'].length > 0) {
            $('#' + row['id'] + ' .attributes').append('<div class="dataset-meta-label">Formats</div><span>' + row['formats'].join(' | ') + '</span>');
        }

        if (row['topic'].length > 0) {
            $('#' + row['id'] + ' .attributes').append('<div class="dataset-meta-label">Topic</div><span>' + row['topic'] + '</span>');
        }
    }

    if (data['count'] > config['datasetsPerPage']) {
        $('#nav-catalogue .page-remove').remove();

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

            if (i == state['page']) {
                $('.page-link[data-page=' + i + ']').parent('li').addClass('active');
            }
        }

        $('#nav-catalogue .page-remove a').on('click', function(evt) {
            evt.preventDefault();

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

        var sidebarEle = $('#' + field['title'] + '-values'),
            showMoreButton = sidebarEle.find('li.show-more');

        for (var i in sidebar) {
            var value = sidebar[i],
                selected = state['filters'][field['title']],
                name = truncateString(value['name'], 30, true);

            sidebarEle.prepend(
                '<li class="list-group-item list-group-item-action checkbox checkbox-filter filter-value">' +
                  '<label data-trigger="hover" data-placement="right" title="' + value['name'] + '">' +
                    '<span>' +
                      '<input type="checkbox"' + 'data-field="' + field['title'] + '" value="' + value['name'] + '">' + name +
                    '</span>' +
                    '<span class="badge float-right">' + value['count'] + '</span>' +
                  '</label>' +
                '</li>');

            if (name != value['name']) {
                sidebarEle.find('label[title="' + value['name'] + '"]').attr('data-toggle', 'tooltip');
            }

            if (selected != null && selected.indexOf(value['name']) !== -1) {
                $('input[value="' + value['name'] + '"]').prop('checked', true);
                $('input[value="' + value['name'] + '"]').closest('label').addClass('checkbox-checked').append('<span class="float-right"><i class="fa fa-times"></i></span>');
            }
        }

        if (sidebar.length === 0){
            $('#' + field['title'] + '-values').prepend(
                '<li class="list-group-item filter-value">' +
                  '<label>' +
                    '<span class="no-matches">' + 'No ' + $('#' + field['title'] + '-filter h5').text().toLowerCase() + 's for this search' + '</span>' +
                  '</label>' +
                '</li>')
        };

        var numFilters = sidebarEle.find('li').length - 1;
        if (numFilters > config['filterSize']){
            sidebarEle.find('li.filter-value:nth-child(n+' + (config['filterSize']) + ')').toggleClass('sr-only');
            showMoreButton.find('label').html('[+] ' + (numFilters - config['filterSize']) + ' more');
            showMoreButton.show();
        } else {
            showMoreButton.hide();
        }
    }


    $('#sort-results-by').val(state['sort']);
    if (state['filters']['search'] != null) {
        $('#input-search').val(state['filters']['search']);
    }

    $('[data-toggle="tooltip"]').tooltip();

    if (config['isInitializing']) buildStaticUI();
    buildDynamicUI();
}

function buildStaticUI() {
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
        state['sort'] = $(this).val();

        state['page'] = 0;
        loadCatalogue();
    });

    $('.show-more').on('mouseenter mouseleave', function () {
        $(this).find('label').toggleClass('on-hover');
    }).on('click', function() {
        $(this).parent('ul').find('li.filter-value:nth-child(n+' + config['filterSize'] +')').toggleClass('sr-only');

        var labelText = $(this).siblings('li.sr-only').length ? '[+] ' + ($(this).siblings('li').length - config['filterSize']) + ' more' : '[-] Show less';
        $(this).find('label').html(labelText);
    });

    config['isInitializing'] = false;
    $('.block-hidden').css('visibility', 'visible');
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
            var filter = params[i].split('='),
                content = decodeURIComponent(filter[1]);

            if (filter[0] == 'n') {
                state['page'] = parseInt(content);
            } else if (filter[0] == 'sort') {
                state['sort'] = content;
            } else if (filter[0].length > 0) {
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

    if (state['sort'] != 'metadata_modified desc') {
        urlParam.push('sort=' + state['sort']);
    }

    history.replaceState(null, '', '/catalogue/?' + urlParam.join('&'));
}

function init() {
    $('.block-hidden').css('visibility', 'hidden');
    loadCatalogue();
}
