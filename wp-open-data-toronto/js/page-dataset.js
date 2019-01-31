$.extend(config, {
    'isInitializing': true,
    'formatOptions': {
        'geospatial': ['GeoJSON', 'CSV', 'SHP'],
        'tabular': ['CSV', 'JSON', 'XML']
    },
    'package': {}
});

function buildDataset(response) {
    var data = config['package'] = response['result'];
    data['preview_resource'] = {};

    for (var i in data['resources']) {
        if (data['resources'][i]['is_preview'] == 'true') {
            data['preview_resource'] = data['resources'][i];
            break;
        }
    }

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

    var snippets = generateSnippets();
    for (var lang in snippets) {
        $('#code-' + lang).text(snippets[lang]);
        $('#' + lang + '-tab').attr('copy', snippets[lang]);
    }

    for (var i in config['package']['resources']) {
        var resource = config['package']['resources'][i];

        if (resource['datastore_active']) {
            if (config['package']['dataset_category'] == 'Map' && ['SHP', 'GeoJSON'].indexOf(resource['format']) != -1) {
                resource['format'] = generateFormatDropdowns(config['formatOptions']['geospatial']);
            } else {
                resource['format'] = generateFormatDropdowns(config['formatOptions']['tabular']);
            }
        }

        $('#table-resources tbody').append('<tr data-stored="' + resource['datastore_active'] + '">' +
                                             '<td>' + resource['name'] + '</td>' +
                                             '<td>' + resource['format'] + '</td>' +
                                             '<td>' +
                                                '<a href="' + (config['ckanURL'] + '/download_resource/' + resource['id']) + '">' +
                                                  '<button type="button" class="btn btn-outline-primary">' +
                                                    '<span class="fa fa-download"></span>&nbsp; Download' +
                                                  '</button>' +
                                                  '<span class="sr-only">' + resource['name'] + '</span>' +
                                                '</a>' +
                                             '</td>' +
                                           '</tr>');

        if (['HTML', 'Web', 'JSP'].indexOf(resource['format']) > -1 ) {
            $('#table-resources tbody tr:last-child').find('td:nth-child(3) button').html('<span class="fa fa-desktop"></span>&nbsp; Visit page');
        }

        if (config['package']['dataset_category'] == 'Map') {
            if (i == 0) {
                $('#table-resources thead th:nth-child(2)').after('<th>Projection</th>');
            }

            $('#table-resources tbody tr:last-child').find('td:nth-child(2)').after(
                '<td>' +
                  '<span class="dropdown">' +
                    '<button class="btn btn-outline-primary dropdown-toggle select-download-projection" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-selection="4326">' +
                      'WGS84' +
                    '</button>' +
                    '<div class="dropdown-menu" aria-labelledby="select-download-projection">' +
                      '<span class="dropdown-item selected" data-selection="4326">WGS84</span>' +
                      '<span class="dropdown-item" data-selection="2019">MTM3</span>' +
                    '</div>' +
                  '</span>' +
                '</td>');
        }
    }

    buildUI();

    if (config['package']['preview_resource'] != undefined && !$.isEmptyObject(config['package']['preview_resource'])) {
        queryContents();
        queryViews();
    } else {
        $('#collapse-preview, #collapse-features, #collapse-explore')
            .addClass('inactive')
            .html('<div class="not-available">Not available for this dataset</div>');
    }
}

function queryViews() {
    getCKAN('resource_view_list', { 'id': config['package']['preview_resource']['id'] }, function(response) {
        var results = response['result'],
            exploreFound = false;

        for (var i in results) {
            var isMapView = config['package']['dataset_category'] == 'Map' && results[i]['view_type'] == 'recline_map_view',
                isTableView = config['package']['dataset_category'] == 'Table' && results[i]['view_type'] == 'recline_view';

            if (isMapView || isTableView) {
                var viewURL = config['ckanURL'] + '/dataset/' + config['package']['name'] + '/resource/' + results[i]['resource_id'] + '/view/' + results[i]['id'];

                if (isMapView) {
                    var w = $('#heading-preview').width(),
                        h = 0.647*w;

                    $('#content-preview').append('<iframe width="' + w +  '" height="' + h + '" src="' + viewURL + '" frameBorder="0"></iframe>');
                } else {
                    $('#redirect-ckan').attr('href', viewURL);
                    exploreFound = true;
                }

                break;
            }
        }

        if (!exploreFound) {
            $('#collapse-explore').addClass('inactive').html('<div class="not-available">Not available for this dataset</div>');
        }
    });
}

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
            var columnDesc = ('info' in fields[i]) ? fields[i]['info']['notes'] : '<span aria-label="No values"></span>';

            previewTable.find('thead').append('<th>' + fields[i]['id'] + '</th>');
            featuresTable.find('tbody').append('<tr><td>' + fields[i]['id'] + '</td><td>' + columnDesc + '</td></tr>');
        }

        for (var i in data) {
            var row = $('<tr></tr>');
            for (var j in fields) {
                row.append('<td>' + truncateString(data[i][fields[j]['id']], 30) + '</td>');
            }

            previewTable.find('tbody').append(row);
        }

        if (config['package']['dataset_category'] == 'Table') $('#content-preview').append(previewTable);
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

        setTimeout(function() { $('#code-copy').popover('hide'); }, 500);
    });

    $('#table-resources tbody a').on('click', function(evt) {
        evt.preventDefault();

        var link = $(this).attr('href');
        if ($(this).parents('tr').data('stored')) {
            var format = $(this).parents('tr').find('.select-download-format').attr('data-selection'),
                proj = $(this).parents('tr').find('.select-download-projection').attr('data-selection');

            link += '?format=' + format + (proj != undefined ? '&projection=' + proj : '');
        }

        window.open(link, '_blank');
    });

    $('.dropdown-item').on('click', function(){
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected').parents().eq(1).find('button').attr('data-selection', $(this).attr('data-selection')).text($(this).text());
    });

    $(window).on('resize', function() {
        var w = $('#heading-preview').width();
        $('iframe').width(w).height(0.647*w);
    });

    $('a.collapsed:first').click();
    new ClipboardJS('#code-copy');

    config['isInitializing'] = false;
    $('.block-hidden').css('visibility', 'visible');
}

function generateSnippets() {
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

    snippets['r'] = 'library(httr)\n' +
                    '\n' +
                    'r <- GET(' + '"' + config['ckanAPI'] + 'package_show", query=list("id"="' + config['package']['id'] + '"))\n' +
                    'content(r, "text")';

    return snippets;
}

function generateFormatDropdowns(options) {
    var dropdown = $('<div class="placeholder">' +
                       '<span class="dropdown">' +
                         '<button class="btn btn-outline-primary dropdown-toggle select-download-format" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                         '</button>' +
                         '<div class="dropdown-menu" aria-labelledby="dropdown-format">' +
                         '</div>' +
                       '</span>' +
                     '</div>');

    for (var i in options) {
        dropdown.find('.dropdown-menu').append('<span class="dropdown-item" data-selection="' + options[i].toLowerCase() + '">' + options[i] + '</span>');
    }

    dropdown.find('button').attr('data-selection', options[0].toLowerCase()).html(options[0]);
    dropdown.find('span:first').addClass('selected');

    return dropdown.html();
}

function init(package_name) {
    $('.block-hidden').css('visibility', 'hidden');
    getCKAN('package_show', { 'id': package_name }, buildDataset);
}
