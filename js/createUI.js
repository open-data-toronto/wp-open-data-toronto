var DEFAULT = {
    ckan: 'https://ckanadmin1.intra.dev-toronto.ca/api/3/action/',
    isInitializing: true
}

var Catalogue = (function() {
    'use strict';

    /* ========= Global variables ========= */

    var $ = jQuery.noConflict();
    var config = $.extend({}, DEFAULT, {
        cataloguePages: 0,
        currentPage: 0,
        datasetsPerPage: 5,
        filterSize: 5,
        package: {}
    });

    /* ========= Private methods ========= */

    function buildCatalogue(response) {
        var data = response['result'];
        config['cataloguePages'] = Math.ceil(data['count'] / config['datasetsPerPage']);

        // Iterate over each of the datasets within the returned results
        for (var i = 0; i < data['results'].length; i++) {
            var row = data['results'][i];

            // Iterrate over each of the resources within the dataset and determine the available file formats
            var formats = [], formatEle = '';
            for (var j = 0; j < row['resources'].length; j++) {
                if ($.inArray(row['resources'][j]['format'], formats)==-1) {
                    if (!row['resources'][j]['format']) continue;
                    formatEle += '<li class=' + row['resources'][j]['format'].toLowerCase() + '>' +
                                   '<a href="#">' + row['resources'][j]['format'] + '</a>' +
                                 '</li>';
                    formats.push(row['resources'][j]['format']);
                }
            }

            // Build the HTML for each of the datasets and append to the table
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
                            '<span class="sr-only">Division: </span>' +
                            row['organization']['title'] + '&nbsp; ' +
                            '<span class="fa fa-home" aria-hidden="true"></span>' +
                          '</p>' +
                          '<p>' +
                            '<span class="sr-only">Data Type: </span>' +
                            row['dataset_category'] + '&nbsp; ' +
                            '<span class="fa fa-bar-chart" aria-hidden="true"></span>' +
                          '</p>' +
                        '</div>' +
                      '</div>';

            // Append the dataset to the catalogue
            $('.table-list').append(ele);
        }

        // Build pagination nav if number of datasets in the catalogue is more than the datasetsPerPage limit
        if (data['count'] > config['datasetsPerPage']) {
            $('#nav-catalogue .page-remove').remove();

            // Build the pages navs
            for (var i = 0; i < config['cataloguePages']; i++) {
                var pageNumber = i + 1 + '';
                $('#nav-catalogue li:last-child').before('<li class="page-item page-remove">' +
                                                           '<a class="page-link" href="#" aria-label="Go to page ' + pageNumber + '" data-page=' + i + '>' +
                                                             pageNumber +
                                                           '</a>' +
                                                         '</li>');
            }

            // Controls the css for the pagination nav buttons
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

            $('#nav-catalogue li:nth-child(' + (config['currentPage'] + 2) + ')').addClass('active'); // +1 for index starting at 1 and +1 for the previous page element

            // Event function needs to be re-created as the page number nav buttons are recreated each time the catalogue is loaded
            $('#nav-catalogue .page-remove a').on('click', function() {
                loadCatalogue($(this).data('page'))
            });

            $('#nav-catalogue').show();
        }

        if (config['isInitializing']) buildUI();
    }

    var buildUI = function() {
        // Initialize the select2 element for catalogue search
        $('#select-search').select2({
            language: {
                noResults: function() {
                    return 'Start typing search term...';
                }
            },
            tags: true,
            width: '100%'
        }).on('change.select2', function() {
            loadCatalogue();
        });

        // Controls the checkbox filters
        $('.checkbox-filter input').on('click', function() { loadCatalogue() });

        // Controls the previous and next nav buttons for pagination
        $('#nav-catalogue .page-keep a').on('click', function() {
            switch($(this).data('page')) {
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

    function loadCatalogue(pageNumber=0) {
        // Default empty catalogue page and no pagination
        $('.table-list').empty();
        $('#nav-catalogue').hide();

        config['currentPage'] = pageNumber;

        var filter = {};

        if (config['isInitializing']) {
            var search = new URLSearchParams(window.location.search).get('search');
            if (!!search) {
                filter['search'] = ['title:"' + search + '"', 'notes:"' + search + '"'];
                $('#select-search').append('<option selected="selected" data-select2-tag="true">' + search + '</option>');
            }
        }

        // Logic for checkbox filters
        $.each($('.checkbox-filter input:checked'), function(idx, ele) {
            var f = $(ele).data('field');
            filter[f] = filter[f] || [];
            filter[f].push(f + ':"' + $(ele).val() + '"');
        });

        // Logic for search (search for dataset name and description)
        $.each($('#select-search').val(), function(idx, val) {
            filter[val] = filter[val] || [];
            filter[val].push('title:"' + val + '"');
            filter[val].push('notes:"' + val + '"');
        });

        // Merge searches with multiple values per field searched by OR
        var q = [];
        for (var i in filter) {
            q.push('(' + filter[i].join(' OR ') + ')');
        }

        $.ajax({
            dataType: 'json',
            type: 'GET',
            url: config['ckan'] + 'package_search',
            data: {
                'q': q.join(' AND '), // Merge searches with multiple fields by AND
                'rows': config['datasetsPerPage'],
                'sort': 'name asc',
                'start': pageNumber * config['datasetsPerPage']
            }
        }).done(buildCatalogue);
    }

    function loadCatalogueSidebar() {
        var ownerDivison = "311 Toronto, Accounting Services, Children's Services, City Clerk's Office, City Manager's Office, City Planning, Corporate Finance, Court Services, Economic Development and Culture, Employment and Social Services, Engineering and Construction Services, Environment and Energy, Equity, Diversity and Human Rights, Facilities Management, Financial Planning, Fire Services, Fleet Services, Human Resources, Information and Technology, Lobbyist Registrar, Long-Term Care Home and Services, Municipal Licensing and Standards, Paramedic Services, Parks, Forestry and Recreation, Public Health, Purchasing and Materials Management, Revenue Services, Shelter, Support and Housing Administration, Social Development, Finance and Administration, Solid Waste Management Services, Strategic and Corporate Policy, Toronto Building, Toronto Parking Authority, Toronto Police Services, Toronto Public Library, Toronto School District School Board, Toronto Transit Commission, Toronto Water, Transportation Services".split(', ')

        for (var i in ownerDivison) {
            // if (i > config['filterSize']) break;
            if (i != 35 && i != 27) continue; // tmp code for testing
            $('.filter-division ul').before('<div class="checkbox checkbox-filter">' +
                                              '<label><input type="checkbox" data-field="owner_division" value="' + ownerDivison[i] + '">&nbsp;' + ownerDivison[i] + '</label>' +
                                            '</div>');
        }
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

    /* ========= Global variables ========= */

    var $ = jQuery.noConflict();
    var config = $.extend({}, DEFAULT);

    /* ========= Private methods ========= */

    function buildFeatures() {
        if (!config['package'] || !$('#table-features tbody').is(':empty')) return;

        $.ajax({
            dataType: 'json',
            type: 'GET',
            url: config['ckan'] + 'datastore_search',
            data: { 'resource_id': config['package']['primary_resource'] }
        }).done(function(response) {
            var fields = response['result']['fields'],
                ele = '';

            for (var i = 0; i < fields.length; i++) {
                ele += '<tr><td>' + fields[i]['id'] + '</td><td>' + fields[i]['type'] + '</td><td></td></tr>';
            }

            $('#table-features tbody').append(ele);
        });
    }

    function buildDevelopers() {
        if (!config['package']) return;

        if ($('#code-javascript').is(':empty')) {
            var jsSnippet = '$.ajax({\n' +
                            '    dataType: "json",\n' +
                            '    type: "GET",\n' +
                            '    url: "' + config['ckan'] + 'package_search",\n' +
                            '    data: { "q": \'title:"' + config['package']['title'] + '"\' }\n' +
                            '}).done(function(response) {\n' +
                            '   console.log(response);\n' +
                            '});';
            $('#code-javascript').text(jsSnippet);
        }

        if ($('#code-python').is(':empty')) {
            var pySnippet = 'import requests\n' +
                            'import json\n' +
                            '\n' +
                            'url = "' + config['ckan'] + 'package_search"\n' +
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
            $('#table-resources tbody').append('<tr>' +
                                                 '<td>' + resource['format'] + '</td>' +
                                                 '<td>' + resource['name'] + '</td>' +
                                                 '<td>' + (resource['size'] / 1000000.).toFixed(2) + ' MB </td>' +
                                                 '<td>' +
                                                   '<a href="' + resource['url'] + '" target="_blank" rel="noopener">Download <span class="sr-only">' + resource['name'] + '</span></a>' +
                                                 '</td>' +
                                               '</tr>');
        }
    }

    function buildPreview() {
        if (!config['package'] || !$('#table-preview tbody').is(':empty')) return;

        var preview = config['package']['preview_data'].split('\\n');
        for (var i = 0; i < preview.length; i++) {
            var row = preview[i].split(','),
                element = '<tr>';

            for (var j = 0; j < row.length; j++) {
                element += '<' + (i == 0 ? 'th' : 'td') + '>' + row[j].trim() + '</' + (i == 0 ? 'th' : 'td') + '>';
            }

            $('#table-preview ' + (i == 0 ? 'thead' : 'tbody')).append(element + '</tr>');
        }
    }

    function buildUI() {
        $('#heading-preview').on('click', buildPreview);
        $('#heading-features').on('click', buildFeatures);
        $('#heading-download').on('click', buildDownloads);
        $('#heading-developers').on('click', buildDevelopers);
        config['isInitializing'] = false;
    }

    function buildDataset(response) {
        var data = response['result'];

        // Fill fields
        $('[data-field]').each(function(idx) {
            switch($(this).data('field')) {
                case 'image_url':
                    $(this).css('background-image', 'url("' + data[$(this).data('field')] + '")');
                    break;
                case 'tags':
                    for (var i = 0; i < data[$(this).data('field')].length; i++) {
                        if (!$(this).is(':empty')) $(this).append(', ');
                        $(this).append('<a href="/catalogue/?tags=' + data[$(this).data('field')][i]['display_name'] + '">' + data[$(this).data('field')][i]['display_name'] + '</a>');
                    }
                    break;
                case 'dataset_category':
                    if (data[$(this).data('field')] != 'Tabular') {
                        $('[data-field="shape_rows"').hide();
                        $('[data-field="shape_rows"').prev().hide();

                        $('[data-field="shape_columns"]').hide();
                        $('[data-field="shape_columns"]').prev().hide();
                    }
                default:
                    $(this).text(data[$(this).data('field')]);
            }
        });

        if (!config['package']['preview_data']) $('#heading-preview').hide();
        if (!config['package']['primary_resource']) $('#heading-features').hide();

        if (config['isInitializing']) buildUI();
    }

    function loadDataset() {
        var data = { 'id': window.location.hash.substr(1) };

        $.ajax({
            dataType: 'json',
            type: 'GET',
            url: config['ckan'] + 'package_show',
            data: data
        }).done(function(response) {
            config['package'] = response['result'];
            buildDataset(response);
        });
    }

    /* ========= Public methods ========= */

    function init() {
        loadDataset();
    }

    return {
        init: init
    }
} ());

var Homepage = (function() {
    'use strict';

    /* ========= Global variables ========= */

    var $ = jQuery.noConflict();
    var config = $.extend({}, DEFAULT, {
        datasetsShown: 5
    });

    /* ========= Private methods ========= */

    function buildWidget(response) {
        var data = response['result'];
        for (var i =0; i < data['results'].length; i++) {
            var row = data['results'][i];
            var days = Math.round((Date.now() - new Date(row['metadata_modified']).getTime())/(24*60*60*1000));

            var timeSince = 'yesterday';
            if (days > 1 && days <= 60) {
                var timeSince = days + ' days ago';
            } else if (days <= 365) {
                var timeSince = Math.round(days / 30.) + ' months ago';
            } else {
                var timeSince = Math.round(days / 365.) + ' years ago';
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

    function loadDatasetList() {
        $.ajax({
            dataType: 'json',
            type: 'GET',
            url: config['ckan'] + 'package_search?fl=name&fl=title&fl=metadata_modified',
            data: {
                'rows': config['datasetsShown'],
                'sort': 'metadata_created desc'
            }
        }).done(buildWidget);
    }

    /* ========= Private methods ========= */

    function init() {
        loadDatasetList();
    }

    return {
        init: init
    }
} ());
