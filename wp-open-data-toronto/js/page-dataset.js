var $ = jQuery.noConflict();

$.extend(config, { 'isInitializing': true });

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
    var data = config['package'] = response['result'],
        resource = {};

    for (var i in data['resource']) {
        if (data['resource'][i]['id'] == data['primary_resource']) {
            resource = data['resource'][i];
        }
    }

    // Fill fields
    $('[data-field]').each(function(idx) {
        var field = $(this).data('field');
        data['image_url'] = data['image_url'] || 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

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
                        $(this).append('<a href="/catalogue/' +  + '">' + data[field][i]['display_name'] + '</a>');
                    }
                    break;
                case 'metadata_modified':
                    var date = resource['last_modified'] || data[field];
                    $(this).text(getFullDate(date.substring(0, 10).split('-')));
                    break
                case 'published_date':
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

function init(package_name) {
    getCKAN('package_show', { 'id': package_name }, buildDataset);
}
