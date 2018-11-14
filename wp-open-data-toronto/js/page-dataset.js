$.extend(config, {
    'isInitializing': true,
    'package': {},
    'built': {}
});

function buildDevelopers() {
    if ($.isEmptyObject(config['package']) || config['built']['developer']) return;

    $('#code-javascript').text('$.ajax({\n' +
                               '    dataType: "json",\n' +
                               '    type: "GET",\n' +
                               '    url: "' + config['ckanAPI'] + 'package_search",\n' +
                               '    data: { "q": \'title:"' + config['package']['title'] + '"\' }\n' +
                               '}).done(function(response) {\n' +
                               '    console.log(response);\n' +
                               '});');

    $('#code-python').text('import requests\n' +
                           'import json\n' +
                           '\n' +
                           'url = "' + config['ckanAPI'] + 'package_search"\n' +
                           'response = requests.get(url, data={ "q": "title:\'' + config['package']['title'] + '\'" })\n' +
                           'results = json.loads(response.content)\n' +
                           'print(results)');

    config['built']['developer'] = true;
}

function buildDownloads() {
    if ($.isEmptyObject(config['package']) || config['built']['downloads']) return;

    for (var i in config['package']['resources']) {
        if (config['package']['resources'][i]['file_type'] == 'Preview data') continue;

        var resource = config['package']['resources'][i],
            link = config['ckanURL'] + '/download_resource/' + resource['id'],
            btnText = resource['format'].toLowerCase() == 'html' ? '<button type="button" class="btn btn-primary"><span class="fa fa-desktop"></span>&nbsp; Visit page</button>' : '<button type="button" class="btn btn-primary"><span class="fa fa-download"></span>&nbsp; Download </button>';

        if (resource['datastore_active']) {
            resource['format'] = '<select class="select-download-formats">' +
                                   (resource['format'].toUpperCase() == 'CSV' ? '<option value="csv">CSV</option>' : '') +
                                   '<option value="json">JSON</option>' +
                                   '<option value="xml">XML</option>' +
                                 '</select>';
        }

        $('#table-resources tbody').append('<tr data-stored="' + resource['datastore_active'] + '">' +
                                            '<td>' + resource['name'] + '</td>' +
                                            '<td>' + resource['format'] + '</td>' +
                                            '<td>' +
                                               '<a href="' + link + '">' + btnText +  ' <span class="sr-only">' + resource['name'] + '</span></a>' +
                                            '</td>' +
                                           '</tr>');
    }

    $('#table-resources tbody a').on('click', function(evt) {
        evt.preventDefault();

        var link = $(this).attr('href');
        if ($(this).parents('tr').data('stored')) {
            link += '?format=' + $(this).parents().eq(1).find('select').val()
        }

        window.open(link, '_blank');
    });

    config['built']['downloads'] = true;
}

function buildExplore() {
    if ($.isEmptyObject(config['package']) || config['built']['explore']) return;

    switch (config['package']['dataset_category']) {
        case 'Table':
            $('#explore-esri').hide();

            getCKAN('resource_view_list', { 'id': config['package']['preview_resource']['id'] }, function(response) {
                var results = response['result'],
                    viewURL = '#';

                for (var i in results) {
                    var view = results[i];
                    if (view['view_type'] == 'recline_view') {
                        viewURL = config['ckanURL'] + '/dataset/' + config['package']['name'] + '/resource/' + view['resource_id'] + '/view/' + view['id'];
                        break;
                    }
                }

                $('#redirect-ckan').attr('href', viewURL);

                config['built']['explore'] = true;
            });
            break;
        case 'Map':
            $('#explore-ckan').hide();
            $('#redirect-esri').attr('href', config['package']['explore_url']);

            config['built']['explore'] = true;
            break;
    }
}

function buildFeatures() {
    if ($.isEmptyObject(config['package']) || config['built']['features']) return;

    getCKAN('datastore_search', { 'resource_id': config['package']['preview_resource']['id'] }, function(response) {
        var fields = response['result']['fields'],
            row = '';

        for (var i in fields) {
            row += '<tr><td>' + fields[i]['id'] + '</td><td>' + fields[i]['type'] + '</td><td></td></tr>';
        }

        $('#table-features tbody').append(row);

        config['built']['features'] = true;
    });
}

function buildPreview(evt) {
    if ($.isEmptyObject(config['package']) || config['built']['preview']) return;

    switch (config['package']['dataset_category']) {
        case 'Table':
            getCKAN('datastore_search', { 'resource_id': config['package']['preview_resource']['id'], 'limit': 3 }, function(response) {
                var data = response['result']['records'],
                    fields = response['result']['fields'],
                    head = '<thead>',
                    body = '<tbody>';

                for (var i in data) {
                    body += '<tr>';
                    for (var j in fields) {
                        if (i == 0) {
                            head += '<th>' + fields[j]['id'] + '</th>';
                        }

                        body += '<td>' + data[i][fields[j]['id']] + '</td>';
                    }
                    body += '</tr>';
                }

                head += '</thead>';
                body += '</tbody>';

                $('#content-preview').append('<table class="table table-striped table-responsive">' + head + body + '</table>');

                config['built']['preview'] = true;
            });
            break;
        case 'Map':
            var preview = config['package']['preview_resource'];

            getCKAN('resource_view_list', { 'id': preview['id'] }, function(response) {
                var results = response['result'];

                for (var i in results) {
                    var view = results[i];
                    if (view['view_type'] == 'geojson_view') {
                        var viewURL = config['ckanURL'] + '/dataset/' + config['package']['name'] + '/resource/' + view['resource_id'] + '/view/' + view['id'];
                        var w = $('#collapse-preview .col-md-12').width(),
                            h = w / 2;

                        $('#content-preview').append('<iframe width="' + w +  '" height="' + h + '" src="' + viewURL + '" frameBorder="0"></iframe>');

                        config['built']['preview'] = true;
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
    $('.block-hidden').fadeIn(250);

    $('#dataset-accordion .card:first a').click();
}

function buildDataset(response) {
    var data = config['package'] = response['result'];
    data['preview_resource'] = {};

    for (var i in data['resources']) {
        if (data['resources'][i]['is_preview'] == 'true') {
            data['preview_resource'] = data['resources'][i];
            break;
        }
    }

    // Fill fields
    $('[data-field]').each(function(idx) {
        var field = $(this).data('field');
        data['image_url'] = data['image_url'] || 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

        if (data[field]) {
            switch(field) {
                case 'image_url':
                    $(this).css('background-image', 'url("' + data[field] + '")');
                    break;
                case 'information_url':
                    $(this).append('<a href="' + data[field] + '">' + 'External Link' + '</a>');
                    break;
                case 'tags':
                    for (var i in data[field]) {
                        if (!$(this).is(':empty')) $(this).append(', ');
                        // $(this).append('<a href="/catalogue?q=(tags:&quot;' + data[field][i]['display_name'] + '&quot;)">' + data[field][i]['display_name'] + '</a>');
                        $(this).append(data[field][i]['display_name']);
                    }
                    break;
                case 'metadata_modified':
                    var date = data[field];
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

    if ((['Map', 'Table'].indexOf(data['dataset_category']) == -1) || data['is_archive'] == 'true' || $.isEmptyObject(data['preview_resource'])) {
        $('#heading-preview, #heading-features, #heading-explore').parent('.card').remove();
    } else if (data['dataset_category'] == 'Map') {
        $('#heading-features').parent('.card').remove();
    }

    buildUI();
}

function init(package_name) {
    $('.block-hidden').hide();
    getCKAN('package_show', { 'id': package_name }, buildDataset);
}
