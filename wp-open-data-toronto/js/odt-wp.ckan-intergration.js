var $ = jQuery.noConflict();
$.extend(config, { 'isInitializing': true });

/* ========= Utility functions ========= */

// Retrieve parameters from URL
function getURLParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return decodeURI(results[1]) || 0;
    }
}

function getFullDate(date) {
    var day = parseInt(date[2]),
        month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][(parseInt(date[1]) - 1)],
        year = date[0];

    return month + ' ' + day + ', ' + year;
}

function getCKAN(endpoint, data, callback) {
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: config['ckanAPI'] + endpoint,
        data: data,
    }).done(callback).fail(function( jqXHR, textStatus, errorThrown ) {console.log(jqXHR)});
}

var Catalogue = (function() {
    'use strict';

    /* ========= Global variables ========= */

    $.extend(config, {
        'cataloguePages': 0,                  // Total number of pages within the catalogue
        'currentPage': 0,                     // Current page number displayed by the catalogue page
        'datasetsPerPage': 15                 // Number of datasets to display per page
    });

    /* ========= Private methods ========= */

    function buildCatalogue(response) {
        var data = response['result'];
        config['cataloguePages'] = Math.ceil(data['count'] / config['datasetsPerPage']);

        // If no datasets are returned (due to searches/filters)
        if (data['results'].length == 0) {
            $('.table-list').append('<div class="row">' +
                                      '<div class="col-md-12">' +
                                        '<h2>No datasets found </h2>' +
                                      '</div>' +
                                    '</div>');
            return
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
                          '<h2><a href="/package#' + row['name'] + '">' + row['title'] + '</a></h2>' +
                          row['excerpt'] +
                          '<div class="formats-available">' +
                            '<h3 class="sr-only">Formats Available for ' + row['title'] + '</h3>' +
                            '<ul class="tag-list">' + formatEle + '</ul>' +
                          '</div>' +
                        '</div>' +
                        '<div class="col-md-4 text-right attributes">' +
                          '<p>' +
                            '<span class="sr-only">Last Updated: </span>' +
                            row['published_date'] + '&nbsp; ' +
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
            for (var i = 0; i < config['cataloguePages']; i++) {
                var pageNumber = i + 1 + '';
                $('#nav-catalogue li:last-child').before('<li class="page-item page-remove">' +
                                                           '<a class="page-link" href="#" aria-label="Go to page ' + pageNumber + '" data-page=' + i + '>' +
                                                              pageNumber +
                                                           '</a>' +
                                                         '</li>');
            }

            // Disable/enable the previous/next page buttons on either sides of the page navigation based on current page
            switch(config['currentPage']) {
                case 0:
                    $('#nav-catalogue .page-keep').first().addClass('disabled');
                    $('#nav-catalogue .page-keep').last().removeClass('disabled');
                    break;
                case (config['cataloguePages'] - 1):
                    $('#nav-catalogue .page-keep').last().addClass('disabled');
                    $('#nav-catalogue .page-keep').first().removeClass('disabled');
                    break;
                default:
                    $('#nav-catalogue .page-keep').removeClass('disabled');
            }

            // Create/remove highlight on the selected page number button
            // +2 because index starts at 1 and +1 for the previous page button
            $('#nav-catalogue li:nth-child(' + (config['currentPage'] + 2) + ')').addClass('active');

            // Event function needs to be re-created as the page number buttons are recreated each time the catalogue is loaded
            $('#nav-catalogue .page-remove a').on('click', function() {
                loadCatalogue($(this).data('page'))
            });

            $('#nav-catalogue').show();
        }

        if (config['isInitializing']) buildUI();
    }

    function buildCatalogueSidebar(response) {
        var data = {};

        for (var i in response['result']['search_facets']) {
            var field = response['result']['search_facets'][i];

            for (var j in field['items']) {
                data[field['title']] = data[field['title']] || [];

                if (['resource_formats'].indexOf(field['title']) !== -1) { // Convert array fields stored on CKAN
                    var splits = field['items'][j]['name'].split(' ');

                    for (var k in splits) {
                        if (data[field['title']].indexOf(splits[k]) == -1) {
                            data[field['title']].push(splits[k]);
                        }
                    }
                } else {
                    data[field['title']].push(field['items'][j]['name']);
                }
            }
        }

        for (var field in data) {
            for (var i = 0; i < data[field].length; i++) {
                if (['owner_division', 'tags'].indexOf(field) !== -1) {
                    // Select2 dropdown filters
                    var el = $('.filter-' + field + ' select');
                    el.prepend('<option data-field="' + field + '" value="' + data[field][i] + '">' + data[field][i] + '</option>');
                } else {
                    // Checkboxes filters
                    var el = $('.filter-' + field + ' ul');
                    el.prepend('<div class="checkbox checkbox-filter">' +
                                '<label><input type="checkbox" data-field="' + field + '" value="' + data[field][i] + '">&nbsp;' + data[field][i] + '</label>' +
                              '</div>');
                }
            }
        }

        buildUISidebar();
    }

    var buildUI = function() {
        // Controls the previous and next navigation buttons for pagination
        $('#nav-catalogue .page-keep a').on('click', function() {
            var control = $(this).data('page') + '';

            switch($(this).data('page') + '') {
                case '+1':
                    var page = config['currentPage'] + 1;
                    break;
                case '-1':
                    var page = config['currentPage'] - 1;
                    break;
                default:
                    var page = $(this).data('page');
            }

            // Refresh catalogue if page number is valid
            if (page >= 0 && page < config['cataloguePages']) loadCatalogue(page);
        });

        // Set isInitializing to false to prevent duplication of events
        config['isInitializing'] = false;
    }

    function buildUISidebar() {
        var select2Settings = {
            language: {
                noResults: function() {
                    return 'Start typing search term...';
                }
            },
            width: '100%'
        }

        $('#select-divisions').select2($.extend({}, select2Settings, { 'maximumSelectionLength': 1 }));
        $('#select-search').select2($.extend({}, select2Settings, { 'tags': true }));
        $('#select-tags').select2(select2Settings);

        $('.select-select2').on('change.select2', loadCatalogue);

        $('.checkbox-filter input').on('click', function() {
            if ($(this).is(':checked')) {
                $(this).parent('label').addClass('checkbox-checked');
            } else {
                $(this).parent('label').removeClass('checkbox-checked');
            }

            loadCatalogue();
       });
    }

    function loadCatalogue(pageNumber) {
        if (typeof(pageNumber) != 'number' || isNaN(pageNumber)) pageNumber = 0;

        $('.table-list').empty();
        $('#nav-catalogue').hide();

        config['currentPage'] = pageNumber;
        if (config['isInitializing']) {
            var search = getURLParam('search'),
                tags = getURLParam('tags');

            // If redirected from home page search box
            if (!!search) $('#select-search').append('<option selected="selected" data-select2-tag="true">' + search + '</option>');

            // If redirected from dataset page tags selects
            if (!!tags) $('#select-tags').append('<option selected="selected" data-select2-tag="true">' + tags + '</option>');
        }

        var filter = {};

        $.each($('.checkbox-filter input:checked'), function(idx, ele) {
            var f = $(ele).data('field');
            filter[f] = filter[f] || [];
            filter[f].push(f + ':*' + $(ele).val() + '*');
        });

        $.each($('#select-divisions').val(), function(idx, val) {
            filter['owner_division'] = filter[val] || [];
            filter['owner_division'].push('owner_division:"' + val + '"');
        });

        $.each($('#select-search').val(), function(idx, val) {
            filter[val] = filter[val] || [];
            filter[val].push('title:"' + val + '"');

            var tokens = val.split(' ');
            for (var i = 0; i < tokens.length; i++) {
                tokens[i] = '*' + tokens[i] + '*';
            }
            filter[val].push('excerpt:(' + tokens.join(' AND ') + ')');
        });

        $.each($('#select-tags').val(), function(idx, val) {
            filter['tags'] = filter['tags'] || [];
            filter['tags'].push('tags:"' + val + '"');
        });

        // Merge searches with multiple values per field searched by OR
        var q = [];
        for (var i in filter) {
            q.push('(' + filter[i].join(' OR ') + ')');
        }

        $.ajax({
            dataType: 'json',
            type: 'GET',
            url: config['ckanAPI'] + 'package_search',
            data: {
                'q': q.join(' AND '), // Merge searches with multiple fields by AND
                'rows': config['datasetsPerPage'],
                'sort': 'name asc',
                'start': pageNumber * config['datasetsPerPage']
            }
        }).done(buildCatalogue);
    }

    function loadCatalogueSidebar() {
        var params = {
            'q': [''],
            'rows': [0],
            'facet': ['on'],
            'facet.field': ['dataset_category', 'owner_division', 'resource_formats', 'tags']
        }

        var query = []
        for (var key in params) {
            for (var i in params[key]) {
                query.push(key + '=' + params[key][i])
            }
        }

        $.ajax({
            dataType: 'json',
            type: 'GET',
            url: config['ckanAPI'] + 'package_search?' + query.join('&'),
        }).done(buildCatalogueSidebar);
    }

    /* ========= Public methods ========= */

    function init() {
        loadCatalogue();
        loadCatalogueSidebar();
    }

    return {
        init: init
    }
} ());

var Dataset = (function() {
    'use strict';

    $.extend(config, { 'package': {} });

    /* ========= Private methods ========= */

    function buildDevelopers() {
        if (!config['package']) return;

        if ($('#code-javascript').is(':empty')) {
            var jsSnippet = '$.ajax({\n' +
                            '    dataType: "json",\n' +
                            '    type: "GET",\n' +
                            '    url: "' + config['ckanAPI'] + 'package_search",\n' +
                            '    data: { "q": \'title:"' + config['package']['title'] + '"\' }\n' +
                            '}).done(function(response) {\n' +
                            '    console.log(response);\n' +
                            '});';
            $('#code-javascript').text(jsSnippet);
        }

        if ($('#code-python').is(':empty')) {
            var pySnippet = 'import requests\n' +
                            'import json\n' +
                            '\n' +
                            'url = "' + config['ckanAPI'] + 'package_search"\n' +
                            'response = requests.get(url, data={ "q": "title:\'' + config['package']['title'] + '\'" })\n' +
                            'results = json.loads(response.content)\n' +
                            'print(results)';
            $('#code-python').text(pySnippet);
        }
    }

    function buildDownloads() {
        if (!config['package'] || !$('#table-resources tbody').is(':empty')) return;

        for (var i = 0; i < config['package']['resources'].length; i++) {
            var resource = config['package']['resources'][i];

            if (resource['datastore_active']) {
                resource['format'] = '<select class="select-download-formats">' +
                                       (resource['format'].toUpperCase() == 'CSV' ? '<option value="csv">CSV</option>' : '') +
                                       '<option value="json">JSON</option>' +
                                       '<option value="xml">XML</option>' +
                                     '</select>';
            }

            $('#table-resources tbody').append('<tr data-resource="' + resource['id'] + '" data-stored="' + resource['datastore_active'] + '">' +
                                                 '<td>' + resource['format'] + '</td>' +
                                                 '<td>' + resource['name'] + '</td>' +
                                                 '<td>' +
                                                   '<a href="#">Download <span class="sr-only">' + resource['name'] + '</span></a>' +
                                                 '</td>' +
                                               '</tr>');
        }

        $('#table-resources tbody a').on('click', function(evt) {
            evt.preventDefault();
            var link = config['ckanURL'] + '/download_resource/' + $(this).parents('tr').data('resource');

            if ($(this).parents('tr').data('stored')) {
                link += '?format=' + $(this).parents().eq(1).find('select').val()
            }

            window.open(link, '_blank');
        });
    }

    function buildExplore() {
        if (!config['package']) return;

        var dataset = config['package'];

        switch (dataset['dataset_category']) {
            case 'Tabular':
                $('#explore-esri').hide();
                getCKAN('resource_view_list', { 'id': config['package']['primary_resource'] }, function(response) {
                    var results = response['result'];

                    for (var i = 0; i < results.length; i++) {
                        var view = results[i];
                        if (view['view_type'] == 'recline_view') {
                            var viewURL = config['ckanURL'] + '/dataset/' + config['package']['name'] + '/resource/' + view['resource_id'] + '/view/' + view['id'];
                            break;
                        }
                    }
                });
                $('#redirect-ckan').attr('href', viewURL);
                break;
            case 'Geospatial':
                $('#explore-ckan').hide();
                $('#redirect-ckan').attr('href', config['package']['explore_url']);
                break;
        }
    }

    function buildFeatures() {
        if (!config['package'] || !$('#table-features tbody').is(':empty')) return;

        getCKAN('datastore_search', { 'resource_id': config['package']['primary_resource'] }, function(response) {
            var fields = response['result']['fields'],
                ele = '';

            for (var i = 0; i < fields.length; i++) {
                ele += '<tr><td>' + fields[i]['id'] + '</td><td>' + fields[i]['type'] + '</td><td></td></tr>';
            }

            $('#table-features tbody').append(ele);
        });
    }

    function buildPreview() {
        if (!config['package'] || !$('#collapse-preview .col-md-12').is(':empty')) return;
        var dataset = config['package'];

        switch (dataset['dataset_category']) {
            case 'Tabular':
                getCKAN('datastore_search', { 'resource_id': dataset['primary_resource'], 'limit': 3 }, function(response) {
                    var fields = response['result']['fields'],
                        data = response['result']['records'];

                    var head = '<thead>',
                        body = '<tbody>';

                    for (var i = 0; i < data.length; i++) {
                        body += '<tr>';
                        for (var j in fields) {
                            if (i == 0) head += '<th>' + fields[j]['id'] + '</th>';
                            body += '<td>' + data[i][fields[j]['id']] + '</td>';
                        }
                    }

                    $('#collapse-preview .col-md-12').append('<table class="table table-striped table-responsive">' + head + body + '</table>');
                });
                break;
            case 'Geospatial':
                getCKAN('resource_view_list', { 'id': config['package']['primary_resource'] }, function(response) {
                    var results = response['result'];

                    for (var i = 0; i < results.length; i++) {
                        var view = results[i];
                        if (view['view_type'] == 'geojson_view') {
                            var viewURL = config['ckanURL'] + '/dataset/' + config['package']['name'] + '/resource/' + view['resource_id'] + '/view/' + view['id'];
                            var w = $('#collapse-preview .col-md-12').width(),
                                h = w / 2;

                            $('#collapse-preview .col-md-12').append('<iframe width="' + w +  '" height="' + h + '" src="' + viewURL + '" frameBorder="0"></iframe>');
                            break;
                        }
                    }
                });
                break;
        }
    }

    function buildUI() {
        $('#heading-developers').on('click', buildDevelopers);
        $('#heading-download').on('click', buildDownloads);
        $('#heading-explore').on('click', buildExplore);
        $('#heading-features').on('click', buildFeatures);
        $('#heading-preview').on('click', buildPreview);

        config['isInitializing'] = false;
    }

    function buildDataset(response) {
        var data = config['package'] = response['result'];

        // Fill fields
        $('[data-field]').each(function(idx) {
            var field = $(this).data('field');
            if (!!data[field]) {
                switch(field) {
                    case 'image_url':
                        $(this).css('background-image', 'url("' + data[field] + '")');
                        break;
                    case 'information_url':
                        $(this).append('<a href="' + data[field] + '">' + 'External Link' + '</a>');
                        break;
                    case 'tags':
                        for (var i = 0; i < data[field].length; i++) {
                            if (!$(this).is(':empty')) $(this).append(', ');
                            $(this).append('<a href="/catalogue/?tags=' + data[field][i]['display_name'] + '">' + data[field][i]['display_name'] + '</a>');
                        }
                        break;
                    case 'metadata_modified':
                        $(this).text(getFullDate(data[field].substring(0, 10).split('-')));
                        break
                    case 'notes':
                        var converter = new showdown.Converter();
                        $(this).html(converter.makeHtml(data[field]));
                        break;
                    default:
                        $(this).text(data[field]);
                }
            } else {
                $(this).prev().hide();
            }
        });

        var inDatastore = false;
        for (var i = 0; i < data['resources'].length; i++) {
            if (data['resources'][i]['id'] == data['primary_resource']) {
                inDatastore = data['resources'][i]['datastore_active'];
            }
        }

        if (data['dataset_category'] == 'Archived') {
           $('#heading-preview, #heading-features, #heading-explore').hide();
        } else if (!data['primary_resource'] || (data['dataset_category'] == 'Tabular' && !inDatastore)) {
            $('#heading-preview, #heading-features').hide();
        } else if (data['dataset_category'] == 'Geospatial') {
            $('#heading-features').hide();
        }

        buildUI();
    }

    /* ========= Public methods ========= */

    function init() {
        getCKAN('package_show', { 'id': window.location.hash.substr(1) }, buildDataset);
    }

    return {
        init: init
    }
} ());

var Homepage = (function() {
    'use strict';

    /* ========= Global variables ========= */

    $.extend(config, { 'datasetsShown': 5 });

    /* ========= Private methods ========= */

    function buildWidget(response) {
        var data = response['result'];
        for (var i =0; i < data['results'].length; i++) {
            var row = data['results'][i];
            var days = Math.round((Date.now() - new Date(row['metadata_modified']).getTime())/(24*60*60*1000));

            if (days <= 1) {
                var timeSince = days == 0 ? 'today' : 'yesterday';
            } else if (days <= 60) {
                var timeSince = days + ' days ago';
            } else if (days <= 365) {
                var months = Math.round(days / 30.);
                var period = months > 1 ? ' months ago' : ' month ago';

                var timeSince = months + period;
            } else {
                var years = Math.round(days / 30.);
                var period = years > 1 ? ' years ago' : ' year ago';

                var timeSince = years + period;
            }

            $('.newsfeed').append('<li>' +
                                    '<a href="/package#' + row['name'] + '">' +
                                      row['title'] +
                                      '<div class="float-right">' +
                                        '<span class="sr-only">Last updated:</span>' + timeSince +
                                      '</div>' +
                                    '</a>' +
                                  '</li>')
        }
    }

    /* ========= Private methods ========= */

    function init() {
        getCKAN('package_search?fl=name&fl=title&fl=metadata_modified', { 'rows': config['datasetsShown'], 'sort': 'metadata_modified desc' }, buildWidget);
    }

    return {
        init: init
    }
} ());
