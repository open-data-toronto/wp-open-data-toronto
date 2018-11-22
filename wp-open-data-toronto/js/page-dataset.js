$.extend(config, {
    'isInitializing': true,
    'package': {},
    'built': {}
});

function buildDevelopers() {
    if ($.isEmptyObject(config['package']) || config['built']['developer']) return;
    var snippets = {};
    snippets["python"] =    'import requests\n' +
                            'import json\n' +
                            '\n' +
                            'url = "' + config['ckanAPI'] + 'package_search"\n' +
                            'response = requests.get(url, data={ "q": "id:\'' + config['package']['id'] + '\'" })\n' +
                            'results = json.loads(response.content)\n' +
                            'print(results)';

    snippets["javascript"] =    '$.ajax({\n' +
                                '    dataType: "json",\n' +
                                '    type: "GET",\n' +
                                '    url: "' + config['ckanAPI'] + 'package_search",\n' +
                                '    data: { "q": \'id:"' + config['package']['id'] + '"\' }\n' +
                                '}).done(function(response) {\n' +
                                '    console.log(response);\n' +
                                '});';

    snippets["r"] = 'package(httr)\n' +
                    '\n' +
                    'r <- GET(' + '"' + config['ckanAPI'] + 'package_search", query=list("id"="' + config['package']['id'] + '"))\n' +
                    'content(r, "text")';

    for(var c in snippets){
        $('#code-' + c ).text(snippets[c]);
        $('#' + c + '-tab').attr('copy', snippets[c]);
    }

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    $('code.hljs').each(function(i, block) {
        hljs.lineNumbersBlock(block);
    });


    $('#code-copy').on('click', function () {
        $(this).attr('data-clipboard-text', $('#collapse-developers .nav-link.active').attr('copy'));
        $('#code-copy').popover({ placement: 'bottom',  animation: true, trigger: 'manual' }).popover('show');
        setTimeout(function () {
                $('#code-copy').popover('hide');
            },
            500
        );
    });

    config['built']['developer'] = true;
}

function buildDownloads() {
    if ($.isEmptyObject(config['package']) || config['built']['downloads']) return;

    if (config['package']['dataset_category'].toLowerCase() === 'map'){
        $('#table-resources thead').html('<th scope="col">File</th>' +
                                            '<th scope="col">Format</th>' +
                                            '<th scope="col">Projection</th>' +
                                            '<th scope="col">Data</th>'
                                            )
    }

    for (var i in config['package']['resources']) {
        var resource = config['package']['resources'][i],
            link = config['ckanURL'] + '/download_resource/' + resource['id'],
            btnText = resource['format'].toLowerCase() == 'html' ? '<button type="button" class="btn btn-outline-primary"><span class="fa fa-desktop"></span>&nbsp; Visit page</button>' : '<button type="button" class="btn btn-outline-primary"><span class="fa fa-download"></span>&nbsp; Download </button>';
        
        resource['format'] = resource['format'].toUpperCase()

        if (resource['datastore_active']) {
            if (['XML', 'JSON', 'CSV'].indexOf(resource['format'])  > -1 ){
                resource['format'] = '<select class="select-download-formats">' +
                                        (resource['format'] == 'CSV' ? '<option value="csv">CSV</option>' : '') +
                                        '<option value="json">JSON</option>' +
                                        '<option value="xml">XML</option>' +
                                    '</select>';
            } else {
                resource['format'] = '<span class="dropdown">' +
                                        '<button class="btn btn-outline-primary dropdown-toggle" type="button" id="formatDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                        'GeoJSON' +
                                        '</button>' +
                                        '<div class="dropdown-menu" aria-labelledby="formatDropdown">' +
                                        '<span class="dropdown-item">CSV</span>' +
                                        '<span class="dropdown-item">Shapefile</span>' +
                                        '</div>' +
                                    '</span></td>;' +
                                    '<td><span class="dropdown">' +
                                        '<button class="btn btn-outline-primary dropdown-toggle" type="button" id="formatProjection" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                        'WGS84' +
                                    '</button>' +
                                        '<div class="dropdown-menu" aria-labelledby="formatProjection">' +
                                        '<span class="dropdown-item">MTM3</span>' +
                                        '</div>' +
                                    '</span>';
            }
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
            var format = $(this).parents().eq(1).find('.select-download-formats').val(),
                proj = $(this).parents().eq(1).find('.select-download-projections').val();
            link += '?format=' + format + (proj != null ? '&projection=' + proj: '')
        }

        window.open(link, '_blank');
    });

    $('#table-resources').DataTable({
        'paging': false,
        'searching': false,
        'ordering': false,
        'lengthChange': false,
        'info': false,
    });
    $('#collapse-download .dataTables_wrapper div.row:first').remove()
    $('#collapse-download .dataTables_wrapper div.row:last-of-type').remove()

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
            fieldList = {};

        for (var i in fields) {
            fieldList[fields[i]['id']] = '<tr><td>' + fields[i]['id'] + '</td><td></td></tr>';
        }

        var ordered = Object.keys(fieldList).sort();
        for (var f in ordered) {
            $('#table-features tbody').append(fieldList[ordered[f]]);
        }

        config['built']['features'] = true;

        $('#table-features').DataTable({
            'pagingType': 'numbers',
            'searching': false,
            'ordering': false,
            'lengthChange': false,
            'columnDefs': [
                { 'width': '20%', 'targets': 0 }
            ]
        });

        $('#collapse-features .dataTables_wrapper div.row:first').remove()
    });
}

function buildPreview() {
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

                        var valueContent = data[i][fields[j]['id']] + '';
                        valueContent = valueContent.length > 25 ? valueContent.substring(0, 25) + '...' : valueContent;

                        body += '<td>' + valueContent + '</td>';
                    }
                    body += '</tr>';
                }

                head += '</thead>';
                body += '</tbody>';

                $('#content-preview').append('<table id="table-preview" class="table table-striped table-responsive">' + head + body + '</table>');

                config['built']['preview'] = true;
            });


            break;
        case 'Map':
            var preview = config['package']['preview_resource'];

            getCKAN('resource_view_list', { 'id': preview['id'] }, function(response) {
                var results = response['result'];

                for (var i in results) {
                    var view = results[i];
                    if (view['view_type'] == 'recline_map_view') {
                        var viewURL = config['ckanURL'] + '/dataset/' + config['package']['name'] + '/resource/' + view['resource_id'] + '/view/' + view['id'];
                        var w = $('#collapse-preview .col-md-12').width(),
                            h = w * 5.7/9;

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
    new ClipboardJS('#code-copy')
}
