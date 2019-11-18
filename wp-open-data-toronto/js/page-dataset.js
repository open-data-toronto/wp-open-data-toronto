$.extend(config, {
    'isInitializing': true,
    'formatOptions': {
        'geospatial': [['geojson', 'GeoJSON'], ['csv', 'CSV'], ['gpkg', 'GeoPackage'], ['shp', 'Shapefile']], // First element in CKAN format (converted to lowerCase), second is displayed in WP
        'tabular': {
            'default': [['json', 'JSON'], ['xml', 'XML']],
            'extended': ['csv', 'CSV']
        }
    },
    'projectionOptions': {
        'epsg': ['WGS84', 'MTM3'],
        'dropdown': [['4326', 'WGS84'], ['2019', 'MTM3']]
    },
    'package': {}
});

/**
 * Builds the dataset page HTML elements
 *
 * @params {Object} response : Results from the results of the package_show CKAN
 *      API call for the shown page.
 */

function buildDataset(response) {
    var data = config['package'] = response['result'];
    var isRealTime = data['refresh_rate'].toLowerCase() == 'real-time';

    queryQualityScore();

    data['preview_resource'] = {};
    data['datastore_active'] = false;
    data['is_geospatial'] = false;

    for (var i in data['resources']) {
        if (data['resources'][i]['is_preview'] && $.isEmptyObject(data['preview_resource'])) {
            data['preview_resource'] = data['resources'][i];
        }

        if (data['resources'][i]['datastore_active'] && !data['datastore_active']) {
            data['datastore_active'] = true;
        }

        if (['shp', 'geojson'].indexOf(config['package']['resources'][i]['format'].toLowerCase()) != -1 && !data['is_geospatial']) {
            data['is_geospatial'] = true;
        }
    }

    $('[data-field]').each(function(idx) {
        var field = $(this).data('field');

        if (field == 'image_url') {
            data[field] = data[field] || '/wp-content/themes/wp-open-data-toronto/img/skyline.jpg';
        }


        if (data[field] && data[field].length &&
          !(field == 'last_refreshed' && isRealTime)) {
            var converter = new showdown.Converter();

            switch(field) {
                case 'image_url':
                    $(this).css('background-image', 'url("' + data[field] + '")');
                    break;
                case 'information_url':
                    $(this).append('<a href="' + data[field] + '" class="inline-link">' + 'External Link' + '</a>');
                    break;
                case 'civic_issues':
                case 'topics':
                    var content = data[field].split(',');
                    for (var i in content) {
                        if (!$(this).is(':empty')) {
                            $(this).append(', ');
                        }
                        $(this).append('<a href="/catalogue?vocab_' + field + '=' + encodeURIComponent(content[i]) + '" class="inline-link">' + content[i] + '</a>');
                    }
                    break;
                case 'title':
                    $(this).html(data[field] + ($(this).is('title') ? ' - City of Toronto Open Data Portal' : ''));
                    break;
                case 'metadata_modified':
                case 'last_refreshed':
                    $(this).text(getFullDate(data[field].substring(0, 10).split('-')));
                    break;
                case 'limitations':
                case 'collection_method':
                case 'notes':
                    $(this).html(converter.makeHtml(data[field]));
                    break;
                default:
                    $(this).text(data[field]);
            }
        } else {
            $(this).prev().hide();
        }
    });

    // For Developers accordion
    var snippets = generateSnippets();
    for (var l in snippets) {
        $('#code-' + l).text(snippets[l]);
        $('#' + l + ' code').attr('data-text', snippets[l]);
        $('.btn-copy[data-language="' + l + '"]').attr('data-clipboard-text', snippets[l]);
    }

    // Download Data accordion
    if (data['is_geospatial']) {
        $('#table-resources thead th:nth-child(2)').after('<th scope="col">Projection</th>');
    }

    for (var i in config['package']['resources']) {
        var resource = config['package']['resources'][i],
            resourceLink = (config['ckanURL'] + '/download_resource/' + resource['id']);

        resource['format'] = resource['format'].toLowerCase();

        var format = '<div class="format">' + resource['format'] + '</div>',
            projection = '<div class="projection">' + 'Not Applicable' + '</div>';

        if (data['is_geospatial']) {
            if (resource['datastore_active'] && resource['format'] == 'geojson') {
                format = generateDropdowns('format', config['formatOptions']['geospatial']);
                projection = generateDropdowns('projection', config['projectionOptions']['dropdown']);

                resourceLink += '?format=geojson&projection=4326';
            } else {
                for (var f in config['projectionOptions']['epsg']) {
                    if (resource['name'].toUpperCase().indexOf(config['projectionOptions']['epsg'][f]) != -1) {
                        projection = '<div class="projection">' + config['projectionOptions']['epsg'][f] + '</div>';
                        break;
                    }
                }
            }
        } else if (resource['datastore_active']){
            format = config['formatOptions']['tabular']['default'].slice();
            if (resource['format'] == 'csv') {
                format.unshift(config['formatOptions']['tabular']['extended']);
            }
            format = generateDropdowns('format', format);
            resourceLink += '?format=' + (resource['format'] == 'csv' ? 'csv' : 'json');
        }

        $('#table-resources tbody').append(
            '<tr data-stored="' + resource['datastore_active'] + '">' +
              '<td>' + resource['name'] + '</td>' +
              '<td>' + format + '</td>' +
              (data['is_geospatial'] ? '<td>' + projection + '</td>' : '') +
              '<td>' +
                '<a href="' + resourceLink + '" target="_blank" class="btn btn-outline-primary">' +
                  'Download' +
                  '<span class="sr-only">Download ' + resource['name'] + '</span>' +
                  '<span class="fa fa-download"></span>' +
                '</a>' +
              '</td>' +
            '</tr>'
        );

        if (['html', 'web', 'jsp'].indexOf(resource['format']) != -1) {
            $('#table-resources tr:last-child td:last-child a').html(
                'Visit page' +
                '<span class="sr-only">Visit ' + resource['name'] + '</span>' +
                '<span class="fa fa-desktop"></span>'
            );
        }
    }

    buildUI();

    var previewResource = config['package']['preview_resource'];
    if (previewResource != undefined && previewResource['datastore_active'] && ['Map', 'Table'].indexOf(config['package']['dataset_category']) != -1) {
        queryContents();
        queryViews();
    } else {
        $('#body-dataPreview, #body-dataFeatures, #body-Explore').find('.card-body').html(
            '<div class="not-available">Not available for this dataset</div>'
        );
    }

    $('#header-dataPreview button').click();
}

/**
 * Calls resource_view_list CKAN API endpoint and builds the preview if the
 * dataset is Map or update the explore redirect URL if the dataset is Table.
 */

function queryViews() {
    getCKAN('resource_view_list', { 'id': config['package']['preview_resource']['id'] }, function(response) {
        var results = response['result'],
            exploreFound = false,
            previewFound = false;

        for (var i in results) {
            var viewURL = config['ckanURL'] + '/dataset/' + config['package']['name'] + '/resource/' + results[i]['resource_id'] + '/view/' + results[i]['id'];
            if (config['package']['dataset_category'] == 'Map' && results[i]['view_type'] == 'recline_map_view') {
                if (!$('#content-preview iframe').length) {
                    var w = $('#body-dataPreview').width();
                    $('#content-preview').append('<iframe width="' + w +  '" height="520" style="display: block;" src="' + viewURL + '" frameBorder="0"></iframe>');
                    previewFound = true;
                }
            } else if (results[i]['view_type'] == 'recline_view') {
                $('#redirect-ckan').attr('href', viewURL);
                exploreFound = true;
            }
        }

        if (!exploreFound) {
            $('#body-Explore .card-body').html('<div class="not-available">Not available for this dataset</div>');
        }

        if (config['package']['dataset_category'] == 'Map' && !previewFound) {
            $('#body-dataPreview .card-body').html('<div class="not-available">Not available for this dataset</div>');
        }
    });
}

/**
 * Calls the datastore_search CKAN API endpoint and builds the features
 * accordion and the preview accordion if the dataset is a Table
 */

function queryContents() {
    getCKAN('datastore_search', { 'resource_id': config['package']['preview_resource']['id'], 'limit': 3 }, function(response) {
        var data = response['result']['records'],
            fields = response['result']['fields'];

        var previewTable = $('<table id="table-preview" class="table table-striped table-responsive">' +
                               '<thead></thead>' +
                               '<tbody></tbody>' +
                             '</table>'),
            featuresTable = $('<table class="table table-striped" id="table-features">' +
                               '<thead><tr><th scope="col">Column</th><th scope="col">Description</th></tr></thead>' +
                               '<tbody></tbody>' +
                             '</table>');

        for (var i in fields) {
            var columnDesc = '<span aria-label="No value available"></span>';
            if (fields[i]['id'] == '_id') {
                columnDesc = 'Unique row identifier for Open Data database';
            } else if (fields[i]['info']) {
                columnDesc = fields[i]['info']['notes'];
            }

            previewTable.find('thead').append('<th>' + fields[i]['id'] + '</th>');
            featuresTable.find('tbody').append('<tr><td>' + fields[i]['id'] + '</td><td>' + columnDesc + '</td></tr>');
        }

        for (var i in data) {
            var row = $('<tr></tr>');
            for (var j in fields) {
                row.append('<td>' + truncateString(data[i][fields[j]['id']], 30, false, true) + '</td>');
            }

            previewTable.find('tbody').append(row);
        }

        if (config['package']['dataset_category'] == 'Table') {
            $('#content-preview').append(previewTable)
        }
        $('#content-features').append(featuresTable);
    });
}

function queryQualityScore() {
  getCKAN(
      'quality_show',
      { 'package_id': config['package']['name'] },
      function(response) {
          var result = response['result'];

          if (result.length > 0) {
              $('#field-quality').text(result[0]['grade_norm']);
          }
      }
  );
}


/**
 * Creates the HTML element events
 */

function buildUI() {
    $('a, button').on('mouseup', function() {
        $(this).blur();
    });

    $('code').each(function(i, block) {
        hljs.highlightBlock(block);
        hljs.lineNumbersBlock(block);
    });

    $('.btn-copy').on('click', function() {
        var el = $(this);

        el.popover({
            placement: 'bottom',
            animation: true,
            trigger: 'manual'
        }).popover('show');

        setTimeout(function() {
            el.popover('hide');
        }, 500);
    });

    $('.select-download-projection, .select-download-format').on('change', function(evt) {
        var row = $(this).parents('tr'),
            btn = row.find('a'),
            link = btn.attr('href').split('?')[0];

        if (row.data('stored')) {
            var format = row.find('.select-download-format').val(),
                proj = row.find('.select-download-projection').val();

            btn.attr('href', link + '?format=' + format + (proj != undefined ? '&projection=' + proj : ''));
        }
    });

    $(window).on('resize', function() {
        $('iframe').width($('#body-dataPreview').width());
    });

    new ClipboardJS('.btn-copy');

    config['isInitializing'] = false;
    $('.block-hidden').css('visibility', 'visible');
}

/**
 * Returns the code snippets with CKAN API endpoints.
 */

function generateSnippets() {
    var snippets = {};
    snippets['python'] = [
        'import urllib',
        'import json',
        'import pandas as pd',
        '',
        '# Get the dataset metadata by passing package_id to the package_search endpoint',
        '# For example, to retrieve the metadata for this dataset:',
        '',
        'url = "' + config['ckanAPI'] + 'package_show"',
        'params = { "id": "' + config['package']['id'] + '"}',
        'response = urllib.request.urlopen(url, data=bytes(json.dumps(params), encoding="utf-8"))',
        'package = json.loads(response.read())',
        'df = pd.DataFrame(package)',
        'print(df)',
        '',
        '# Get the data by passing the resource_id to the datastore_search endpoint',
        '# See https://docs.ckan.org/en/latest/maintaining/datastore.html for detailed parameters options',
        '# For example, to retrieve the data content for the first resource in the datastore:',
        '',
        'for idx, resource in enumerate(package["result"]["resources"]):',
            '    if resource["datastore_active"]:',
                '        url = "https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search"',
                '        p = { "id": resource["id"] }',
                '        r = urllib.request.urlopen(url, data=bytes(json.dumps(p), encoding="utf-8"))',
                '        data = json.loads(r.read())',
                '        df = pd.DataFrame(data)',
                '        print(df)',
                '        break',
    ]

    snippets['javascript'] = [
        '// Get the dataset metadata by passing package_id to the package_search endpoint',
        '// For example, to retrieve the metadata for this dataset:',
        '',
        'const' ,
        '    https = require("https"),',
        '    packageName = "' + config['package']['name']+ '";',
        '',
        'https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=${packageName}`, ',
        '(pkgResp) => {',
        '    let data = " " ;',
        '',
        '    // A chunk of data has been recieved.',
        '    pkgResp.on("data", (chunk) => {',
        '        data += chunk',
        '    });',
        '',
        '    pkgResp.on("end", () => {',
        '        const package = JSON.parse(data)["result"];',
        '        const resource = package["resources"][0]["id"];',

        '        https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?',
        '        id=${resource}`, (resResp) => {',
        '            data = " " ;',
        '',
        '            // A chunk of data has been recieved.',
        '            resResp.on("data", (chunk) => {',
        '                data += chunk;',
        '            });',
        '',
        '            resResp.on("end", () => {',
        '                const resource = JSON.parse(data)["result"];',
        '                console.log(resource["records"].slice(0, 5))',
        '            })',
        '',
        '        })',
        '',
        '    })',
        '',
        '}).on("error", (err) => {',
        '    console.log("Error: " + err.message);',
        '});'
    ]

    snippets['r'] = [
        'library(opendatatoronto)',
        'library(dplyr)',
        '',
        '# get all resources for this package',
        'resources <- list_package_resources("' + config['package']['id'] + '")',
        '',
        '# identify datastore resources; by default, Toronto Open Data sets datastore resource format to CSV for non-geospatial and GeoJSON for geospatial resources',
        'datastore_resources <- filter(resources, tolower(format) %in% c(\'csv\', \'geojson\'))',
        '',
        '# load the first datastore resource as a sample',
        'data <- filter(datastore_resources, row_number()==1) %>% get_resource()',
        'data'
    ]

    var previewResource = config['package']['preview_resource'];
    if (previewResource != undefined && previewResource['datastore_active']) {
        snippets['python'] = snippets['python'].concat([
            '',
            '# Get the data by passing the resource_id to the datastore_search endpoint',
            '# See https://docs.ckan.org/en/latest/maintaining/datastore.html for detailed parameters options',
            '# For example, to retrieve the data content for the first resource in the datastore:',
            '',
            'for idx, resource in enumerate(package["result"]["resources"]):',
            '    if resource["datastore_active"]:',
            '        url = "' + config['ckanAPI'] + 'datastore_search"',
            '        p = { "id": resource["id"] }',
            '        r = urllib.request.urlopen(url, data=bytes(json.dumps(p), encoding="utf-8"))',
            '        data = json.loads(r.read())',
            '        print(data)',
            '        break'
        ]);

        snippets['javascript'] = snippets['javascript'].concat([
            '',
            '// Get the data by passing the resource_id to the datastore_search endpoint',
            '// See https://docs.ckan.org/en/latest/maintaining/datastore.html for detailed parameters options',
            '// For example, to retrieve the data content for the first resource in the datastore:',
            '',
            'var resources = [];',
            '// setTimeout to wait for response from package_show call',
            '// This function can be included as a part of the callback instead',
            'setTimeout(function() {',
            '    for (var i in package["result"]["resources"]) {',
            '        var resource = package["result"]["resources"][i];',
            '        if (resource["datastore_active"]) {',
            '            $.ajax({',
            '                dataType: "json",',
            '                type: "GET",',
            '                url: "' + config['ckanAPI'] + 'datastore_search",',
            '                data: { "id": resource["id"] }',
            '            }).done(function(response) {',
            '                resources.push(response);',
            '                console.log(response);',
            '            });',
            '            break;',
            '        }',
            '    }',
            '}, 1000);'
        ]);

        snippets['r'] = snippets['r'].concat([
            '',
            '# Get the data by passing the resource_id to the datastore_search endpoint',
            '# See https://docs.ckan.org/en/latest/maintaining/datastore.html for detailed parameters options',
            '# For example, to retrieve the data content for the first resource in the datastore:',
            '',
            'for (resource in package$result$resources) {',
            '    if (resource$datastore_active){',
            '        r <- GET(' + '"' + config['ckanAPI'] + 'datastore_search", query=list("id"=resource$id))',
            '        data <- content(r, "parsed")',
            '        print(data)',
            '        break',
            '    }',
            '}',
        ])
    }

    for (var i in snippets) {
        snippets[i] = snippets[i].join('\n');
    }

    return snippets;
}

function generateDropdowns(type, options) {
    var dropdown = $('<form>' +
                       '<select class="select-download-' + type + '">' +
                       '</select>' +
                     '</form>');

    for (var i in options) {
        dropdown.find('select').append('<option value="' + options[i][0] + '">' + options[i][1] + '</option>');
    }

    return dropdown.html();
}

function init(package_name) {
    $('.block-hidden').css('visibility', 'hidden');
    getCKAN('package_show', { 'id': package_name }, buildDataset, function() {
        $('.content-area .container').children().not(':first').remove();
        $('.content-area .container').append(
            '<div class="page-content" id="content">' +
              '<div class="large heading" id="dataset-error-heading">Dataset not found.</div>' +
              '<div class="subtext" id="dataset-error-subtext">' +
                'Oops, we can\'t find that dataset. Please double-check that the web address you\'ve attempted to access is correct, or contact ' +
                '<a href="mailto:opendata@toronto.ca">opendata@toronto.ca</a> if you think you\'re seeing this in error.' +
              '</div>' +
            '</div>'
        );
    });
}
