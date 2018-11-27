$.extend(config, {
    'isInitializing': true,
    'package': {}
});

function buildDevelopers() {
    var snippets = {};
    snippets['python'] = 'import requests\n' +
                         'import json\n' +
                         '\n' +
                         'url = "' + config['ckanAPI'] + 'package_search"\n' +
                         'response = requests.get(url, data={ "q": "id:\'' + config['package']['id'] + '\'" })\n' +
                         'results = json.loads(response.content)\n' +
                         'print(results)';

    snippets['javascript'] = '$.ajax({\n' +
                             '    dataType: "json",\n' +
                             '    type: "GET",\n' +
                             '    url: "' + config['ckanAPI'] + 'package_search",\n' +
                             '    data: { "q": \'id:"' + config['package']['id'] + '"\' }\n' +
                             '}).done(function(response) {\n' +
                             '    console.log(response);\n' +
                             '});';

    snippets['r'] = 'package(httr)\n' +
                    '\n' +
                    'r <- GET(' + '"' + config['ckanAPI'] + 'package_search", query=list("id"="' + config['package']['id'] + '"))\n' +
                    'content(r, "text")';

    for (var lang in snippets) {
        $('#code-' + lang).text(snippets[lang]);
        $('#' + lang + '-tab').attr('copy', snippets[lang]);
    }

    $('code').each(function(i, block) {
        hljs.highlightBlock(block);
        hljs.lineNumbersBlock(block);
    });

    $('#code-copy').on('click', function() {
        $(this).attr('data-clipboard-text', $('#collapse-developers .nav-link.active').attr('copy'));
        $(this).popover({
            placement: 'bottom',
            animation: true,
            trigger: 'manual'
        }).popover('show');

        setTimeout(function () {
                $('#code-copy').popover('hide');
            },
            500
        );
    });
}

function buildDownloads() {
    $('#table-resources thead').append('<tr>' +
                                         '<th scope="col">File</th>' +
                                         '<th scope="col">Format</th>' +
                                         (config['package']['dataset_category'] == 'Map' ? '<th scope="col">Projection</th>' : '') +
                                         '<th scope="col">Data</th>' +
                                       '</tr>');

    for (var i in config['package']['resources']) {
        var resource = config['package']['resources'][i],
            link = config['ckanURL'] + '/download_resource/' + resource['id'];

        if (resource['datastore_active'] && config['package']['dataset_category'] == 'Table') {
            resource['format'] = '<span class="dropdown">' +
                                    '<button class="btn btn-outline-primary dropdown-toggle select-download-formats" type="button" id="formatDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-selection="csv">' +
                                        'CSV' +
                                    '</button>' +
                                    '<div class="dropdown-menu" aria-labelledby="formatDropdown">' +
                                        '<span class="dropdown-item selected" data-selection="csv">CSV</span>' +
                                        '<span class="dropdown-item" data-selection="json">JSON</span>' +
                                        '<span class="dropdown-item" data-selection="xml">XML</span>' +
                                    '</div>' +
                                '</span>';
        } else if (resource['datastore_active'] && config['package']['dataset_category'] == 'Map') {
            resource['format'] = '<span class="dropdown">' +
                                   '<button class="btn btn-outline-primary dropdown-toggle select-download-formats" type="button" id="formatDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-selection="geojson">' +
                                     'GeoJSON' +
                                   '</button>' +
                                   '<div class="dropdown-menu" aria-labelledby="formatDropdown">' +
                                     '<span class="dropdown-item selected" data-selection="geojson">GeoJSON</span>' +
                                     '<span class="dropdown-item" data-selection="csv">CSV</span>' +
                                     '<span class="dropdown-item" data-selection="shp">Shapefile</span>' +
                                   '</div>' +
                                 '</span>';
        } else {
            resource['format'] = resource['format'].toUpperCase();
        }

        var projection = '<span class="dropdown">' +
                           '<button class="btn btn-outline-primary dropdown-toggle select-download-projections" type="button" id="formatProjection" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-selection="4326">' +
                             'WGS84' +
                           '</button>' +
                           '<div class="dropdown-menu" aria-labelledby="formatProjection">' +
                             '<span class="dropdown-item selected" data-selection="4326">WGS84</span>' +
                             '<span class="dropdown-item" data-selection="2019">MTM3</span>' +
                           '</div>' +
                         '</span>',
            download = resource['format'] == 'HTML' ? '<span class="fa fa-desktop"></span>&nbsp; Visit page' : '<span class="fa fa-download"></span>&nbsp; Download';


        $('#table-resources tbody').append('<tr data-stored="' + resource['datastore_active'] + '">' +
                                             '<td>' + resource['name'] + '</td>' +
                                             '<td>' + resource['format'] + '</td>' +
                                             '<td>' + (config['package']['dataset_category'] == 'Map' ? projection : '') + '</td>' +
                                             '<td>' +
                                                '<a href="' + link + '">' +
                                                  '<button type="button" class="btn btn-outline-primary">' + download +  '</button>' +
                                                  '<span class="sr-only">' + resource['name'] + '</span>' +
                                                '</a>' +
                                             '</td>' +
                                           '</tr>');
    }

    $('#table-resources tbody a').on('click', function(evt) {
        evt.preventDefault();

        var link = $(this).attr('href');
        if ($(this).parents('tr').data('stored')) {
            var format = $(this).parents('tr').find('.select-download-formats').data('selection'),
                proj = $(this).parents('tr').find('.select-download-projections').data('selection');

            link += '?format=' + format + (proj != undefined ? '&projection=' + proj : '');
        }

        window.open(link, '_blank');
    });

    $('.dropdown-item').on('click', function(){
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected').parents().eq(1).find('button').data('selection', $(this).data('selection')).text($(this).text());
    });
}

function getResourceViews() {
    getCKAN('resource_view_list', { 'id': config['package']['preview_resource']['id'] }, function(response) {
        var results = response['result'];

        for (var i in results) {
            if (config['package']['dataset_category'] == 'Map' && results[i]['view_type'] == 'recline_map_view') {
                var viewURL = config['ckanURL'] + '/dataset/' + config['package']['name'] + '/resource/' + results[i]['resource_id'] + '/view/' + results[i]['id'],
                    w = $('#heading-preview').width(),
                    h = w * (0.647);

                $('#content-preview').append('<iframe width="' + w +  '" height="' + h + '" src="' + viewURL + '" frameBorder="0"></iframe>');
                break;
            } else if (config['package']['dataset_category'] == 'Table' && view['view_type'] == 'recline_view') {
                var viewURL = config['ckanURL'] + '/dataset/' + config['package']['name'] + '/resource/' + view['resource_id'] + '/view/' + view['id'];
                $('#btn-ckan').attr('href', viewURL);
                break;
            }
        }
    });
}

function getDatastoreSearch() {
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
            previewTable.find('thead').append('<th>' + fields[i]['id'] + '</th>');
            featuresTable.find('tbody').append('<tr><td>' + fields[i]['id'] + '</td><td></td></tr>');
        }

        for (var i in data) {
            var row = $('<tr></tr>');
            for (var j in fields) {
                row.append('<td>' + truncateString(data[i][fields[j]['id']], 30) + '</td>');
            }

            previewTable.find('tbody').append(row);
        }

        if (config['pacakge']['dataset_category'] == 'Table') $('#content-preview').append(previewTable);
        $('#content-features').append(featuresTable);

        if (fields.length > 10){
            $('#table-features').DataTable({
                'pagingType': 'numbers',
                'searching': false,
                'ordering': false,
                'lengthChange': false,
                'columnDefs': [
                    { 'width': '20%', 'targets': 0 }
                ]
            });

            $('.dataTables_wrapper div.row:first').remove();
        }
    });
}

function buildUI() {
    $('a.collapsed:first').click();

    if (config['package']['preview_resource'] != undefined) {
        getDatastoreSearch();
        getResourceViews();
    } else {
        $('#heading-preview, #heading-features, #heading-explore').parent('.card').find('.card-content')
            .addClass('inactive')
            .html('<div class=“not-available”>Not available for this dataset</div>');
    }

    buildDownloads();
    buildDevelopers();

    new ClipboardJS('#code-copy');

    config['isInitializing'] = false;
    $('.block-hidden').fadeIn(250);
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

    // Fill metadata content from CKAN package fields
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

    buildUI();
}

function init(package_name) {
    $('.block-hidden').hide();
    getCKAN('package_show', { 'id': package_name }, buildDataset);
}
