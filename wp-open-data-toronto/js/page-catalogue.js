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
    'filters': ['dataset_category', 'owner_division', 'vocab_formats', 'vocab_topics'],
    'filterSize': 6 // Actual number of results shown is filterSize -1
});

/**
 * Builds the catalogue page HTML elements and the page navigation buttons
 *
 * @params {Object} response : Results from catalogue_search CKAN API call for
 *      the shown page.
 */

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
            '<div class="dataset card" id ="' + row['id'] + '">' +
              '<div class="row">' +
                '<div class="col-md-9">' +
                  '<div class="col-md-12">' +
                    '<h3><a href="/package/' + row['name'] + '/">' + row['title'] + '</a></h3>' +
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

        if ('formats' in row && row['formats'].length > 0) {
            $('#' + row['id'] + ' .attributes').append('<div class="dataset-meta-label">Formats</div><span>' + row['formats'].join(' | ') + '</span>');
        }

        if ('topics' in row && row['topics'].length > 0) {
            $('#' + row['id'] + ' .attributes').append('<div class="dataset-meta-label">Topics</div><span>' + row['topics'].join(' | ') + '</span>');
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
                                                           '<a class="page-link normal-text" href="#" aria-label="...">' +
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

            $('html, body').animate({
                scrollTop: $("#content").offset().top
            }, 1000);

            loadCatalogue();
        });

        $('#nav-catalogue').show();
    }
}

/**
 * Builds the search sidebar HTML elements
 *
 * @params {Object} response : Results from the faceted results of the
 *      catalogue_search CKAN API call for the shown page.
 */

function buildSidebar(response) {
    $('[data-type="filter"] .filter-value').remove();

    var results = response['result'];
    for (var i in results['search_facets']) {
        var field = results['search_facets'][i],
            sidebar = [[], []],
            selected = state['filters'][field['title']];

        field['items'].sort(function(a, b) {
            if (b['count'] == a['count']) {
                return a['name'] < b['name'] ? 1 : -1;
            }

            return a['count'] - b['count'];
        });

        for (var i in field['items']) {
            if (selected && selected.indexOf(field['items'][i]['name']) != -1) {
                sidebar[1].push(field['items'][i]);
            } else {
                sidebar[0].push(field['items'][i]);
            }
        }
        sidebar = sidebar[0].concat(sidebar[1]);

        var sidebarEle = $('#' + field['title'] + '-values'),
            showMoreButton = sidebarEle.find('li.show-more');

        for (var i in sidebar) {
            var value = sidebar[i],
                name = truncateString(value['name'], 27, true, false);

            sidebarEle.prepend(
                '<li class="list-group-item list-group-item-action filter filter-value" aria-hidden="false">' +
                  '<a href="#" role="button" title="' + value['name'] + '" data-field="' + field['title'] + '" data-value="' + value['name'] + '" data-trigger="hover" data-placement="right">' +
                    '<span>' + name + '</span>' +
                    '<span class="badge float-right">' + value['count'] + '<div class="sr-only"> datasets </div> </span>' +
                  '</a>' +
                '</li>');

            if (name != value['name']) {
                sidebarEle.find('a[title="' + value['name'] + '"]').attr('data-toggle', 'tooltip');
            }

            if (selected != null && selected.indexOf(value['name']) !== -1) {
                var elLabel = $('a[title="' + value['name'] + '"]');
                elLabel.parent('li').addClass('filter-selected');
                elLabel.append('<span class="float-right"><i class="fa fa-times"></i></span>');
            }
        }

        if (sidebar.length === 0) {
            $('#' + field['title'] + '-values').prepend(
                '<li class="list-group-item filter-value filter-no-results">' +
                  '<span class="no-matches">' + 'No ' + $('#' + field['title'] + '-filter h3').text().toLowerCase() + 's for this search' + '</span>' +
                '</li>')
        };

        var numFilters = sidebarEle.find('li').length - 1;
        if (numFilters > config['filterSize']) {
            sidebarEle.find('li.filter-value:nth-child(n+' + (config['filterSize']) + ')').toggleClass('hidden');
            sidebarEle.find('li.filter-value:nth-child(n+' + (config['filterSize']) + ')').attr('aria-hidden', 'true');

            showMoreButton.html('<a href="#">Show ' + (numFilters - config['filterSize']) + ' more ' + $(sidebarEle).parents('.card').find('.card-header').text().trim().toLowerCase() + 's' + '</a>');
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

/**
 * Creates the UI events for elements that are static across all catalogue pages
 */

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

        $('html, body').animate({
            scrollTop: $("#content").offset().top
        }, 1000);

        loadCatalogue();
    });

    $('#btn-search').on('click', function() {
        var value = $('#input-search').val();

        if ((value.length > 0 && value.toLowerCase().match(/^[0-9a-z\s]+$/) || (value.length === 0))) {
            state['filters'] = {};
            state['filters']['search'] = $('#input-search').val();

            if (state['sort'] != 'score desc') {
                $('#sort-results-by').val('score desc').change();
            }

            state['page'] = 0;
            loadCatalogue();
        }

        return false;
    });

    $('#input-search').on('keyup', function(evt) {
        var value = $(this).val();

        if (value.length > 0 && !value.toLowerCase().match(/^[0-9a-z\s]+$/)) {
            $(this).parents('.input-group').addClass('has-danger');
            $('#search-error').removeClass('hidden');

            return false;
        } else {
            $(this).parents('.input-group').removeClass('has-danger');
            $('#search-error').addClass('hidden');
        }
    });

    $('#sort-results-by').on('change', function() {
        state['sort'] = $(this).val();
        state['page'] = 0;

        $('#current-sort span').html($(this).children('option:selected').text());
        loadCatalogue();
    });

    $('.show-more').on('mouseenter mouseleave', function () {
        $(this).find('a').toggleClass('on-hover');
    }).on('click', function(evt) {
        evt.preventDefault();

        $(this).parent('ul').find('li.filter-value:nth-child(n+' + config['filterSize'] +')').toggleClass('hidden');
        $(this).siblings('li.hidden').attr('aria-hidden', 'true');
        $(this).siblings('li:not(.hidden)').attr('aria-hidden', 'false');

        var filterTerm = ' ' + $(this).parents('.card').find('.card-header').text().trim().toLowerCase() + 's';
        var labelText = $(this).siblings('li.hidden').length > 0 ? 'Show ' + ($(this).siblings('li').length - config['filterSize']) + ' more ' + filterTerm : 'Collapse<span class="sr-only">  expanded list of' + filterTerm + '</span>';
        $(this).find('a').html(labelText);
    });

    config['isInitializing'] = false;
    $('.block-hidden').css('visibility', 'visible');
}

/**
 * Creates the UI events for elements that are re-created per catalogue page
 */

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

    $('.filter a').on('click', function() {
        $(this).parent('li').toggleClass('filter-selected');

        $('.tooltip').remove();

        var field = $(this).data('field');
        state['filters'][field] = [];

        $.each($('.filter-selected a[data-field="' + field + '"]'), function(idx, element) {
            state['filters'][field].push($(element).data('value'));
        });

        state['page'] = 0;
        loadCatalogue();

        return false;
   });
}

/**
 * Parses the config settings from URL and load the catalogue with the settings
 */

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
                $('#current-sort span').html($('#sort-results-by option[value="' + content + '"]').text());
            } else if (filter[0].length > 0) {
                state['filters'][filter[0]] = ['search'].indexOf(filter[0]) !== -1 ? content.replace(/\+/g, ' ') : content.split('+');
            }
        }
    }

    if (state['filters'] && state['filters']['search']) {
        state['filters']['search'] = DOMPurify.sanitize(state['filters']['search']).replace(/[^a-zA-Z0-9]+/g,'');
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

/**
 * Updates the URL on input changes
 */

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

    urlParam = urlParam.length ? '?' + urlParam.join('&') : '';

    history.replaceState(null, '', '/catalogue/' + urlParam);
}

function init() {
    $('.block-hidden').css('visibility', 'hidden');
    if (isMobile()) {
        $('#filter-sidebar').addClass('mobile-hidden');
    }

    loadCatalogue();
}
