var state = history.state || {
        'filters': {},
        'search': [],
        'page': 0,
        'size': 0
    };

$.extend(config, {
    'isInitializing': true,
    'cataloguePages': 0,                                                        // Total number of pages within the catalogue
    'datasetsPerPage': 10,                                                      // Number of datasets to display per page
    'filters': ['dataset_category', 'owner_division', 'resource_formats']
});

function buildCatalogue(response) {
    $('.table-list').empty();
    $('#nav-catalogue').hide();

    var data = response['result'];
    state['size'] = Math.ceil(data['count'] / config['datasetsPerPage']);
    
    $('#results-count').replaceWith(
        `<span>` + data["count"] + ` datasets found</span>`
    );

    if (data['results'].length == 0) {
        $('.table-list').append(`<div class="row"> 
                                  <div class="col-md-12"> 
                                    <h2>No datasets found </h2> 
                                  </div> 
                                </div>`);
        return;
    }

    var iconClassMap = {
        'Document': 'fa-newspaper-o',
        'Map': 'fa-map-o',
        'Table': 'fa-area-chart',
        'Website': 'fa-desktop'
    }

    // Iterrates over each of the results and build the HTML for each of the dataset
    for (var i = 0; i < data['results'].length; i++) {
        var row = data['results'][i];

        // Build the format tags
        var formats = row['resource_formats'].split(' '),
            formatEle = '';

        for (var j = 0; j < formats.length; j++) {
            formatEle += '<li class="file-format">' + formats[j] + '</li>';
        }


        // Build the dataset card with field values
        var ele = `<div class="dataset row"> 
                    <div class="col-md-8 half">
                      <h2><a href="/package/` + row['name'] + `">` + row['title'] + `</a></h2> 
                      <p class="dataset-excerpt"> `+ row['excerpt'] + `</p> 
                      <div class="formats-available"> 
                        <h3 class="sr-only">Formats Available for`  + row['title'] + `</h3> 
                        <ul class="tag-list">` + formatEle + `</ul> 
                      </div> 
                    </div> 
                    <div class="col-md-4 text-right attributes half"> 
                      <p> 
                        <span class="dataset-meta-label">Updated: </span>` +
                        getFullDate(row['metadata_modified'].split('-')) + `&nbsp; 
                      </p> 
                      <p> 
                        <span class="dataset-meta-label">Division: </span>` +
                        row['owner_division'] + `&nbsp; 
                      </p> 
                      <p>
                        <span class="dataset-meta-label">Type: </span>` +
                        row['dataset_category'] + `&nbsp; 
                      </p> 
                    </div> 
                  </div>`;

        $('.table-list').append(ele);
    }

    // Build the catalogue page navigation
    // This needs to be built on every catalogue refresh because total number of pages changes based on searches and filters
    if (data['count'] > config['datasetsPerPage']) {
        $('#nav-catalogue .page-remove').remove();

        // Build the page buttons
        for (var i = 0; i < state['size']; i++) {
            var pageNumber = i + 1 + '',
                additionalClass = i == state['page'] ? ' active' : '';

            if (i == 0 || i == (state['size'] - 1) || Math.abs(state['page'] - i) <= 2) {
                $('#nav-catalogue li:last-child').before(`<li class="page-item page-remove` +  additionalClass + `"> 
                                                           <a class="page-link" href="#" aria-label="Go to page`  + pageNumber + `" data-page=` + i + `>` +
                                                              pageNumber +
                                                           `</a> 
                                                         </li>`);
            } else if (Math.abs(state['page'] - i) == 3) {
                $('#nav-catalogue li:last-child').before(`<li class="page-item page-remove disabled"> 
                                                           <a class="page-link" href="#" aria-label="..."> 
                                                              ... 
                                                           </a> 
                                                         </li>`);
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
    $('[data-type="filter"]').empty();

    var results = response['result'];

    for (var i in results['search_facets']) {
        var field = results['search_facets'][i],
            sidebar = {};

        for (var j in field['items']) {
            var item = field['items'][j];

            if (['resource_formats'].indexOf(field['title']) !== -1) {
                var splits = item['name'].split(' ');

                for (var k in splits) {
                    if (sidebar[splits[k]] === undefined) {
                        sidebar[splits[k]] = {
                            'count': item['count'],
                            'name': splits[k]
                        };
                    } else {
                        sidebar[splits[k]]['count'] += item['count'];
                    }
                }
            } else {
                sidebar[item['name']] = {
                    'count': item['count'],
                    'name': item['name']
                };
            }
        }

        sidebar =  Object.keys(sidebar).map(function(x) { return sidebar[x] });
        sidebar.sort(function(a, b) {
            if (b['count'] == a['count']) {
                return a['name'] < b['name'] ? -1 : 1;
            }
            return b['count'] - a['count'];
        });

        for (var i in sidebar) {
            var value = sidebar[i],
                selected = state['filters'][field['title']],
                checked = ' ',
                labelChecked = ' ';

            if (selected != null && selected.indexOf(value['name']) !== -1) {
                checked += 'checked="true" ';
                labelChecked += 'class="checkbox-checked" ';
            }

            $('#collapse-' + field['title'] + ' ul').append(
                `<li class="checkbox checkbox-filter"> 
                  <label` + labelChecked + `> 
                    <input type="checkbox"` + checked + `data-field="` + field['title'] + `" value="` + value['name'] + `">` + `&nbsp;` + value['name'] +
                      `&nbsp;<small>(` + value['count'] + `)</small> 
                  </label> 
                </li>`);
        }
    }

    if (state['search'].length > 0) {
        for (var i in state['search']) {
            var value = state['search'][i],
                selectedValues = $('.filter-search select').val();

            if (selectedValues == null || selectedValues.indexOf(value) == -1) {
                $('#input-search').val(value);
            }
        }
    }

    if (config['isInitializing']) buildStaticUI();
    buildDynamicUI();
}

var buildStaticUI = function() {
    // Controls the previous and next navigation buttons for pagination
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
        state['filter']['search'] = $('#input-search').val();
        state['page'] = 0;
        loadCatalogue();
    });

    $('#input-search').on('keyup', function(evt) {
        if (evt.keyCode == 13) {
            state['filter']['search'] = $('#input-search').val();
            state['page'] = 0;
            loadCatalogue();
        }
    });

    config['isInitializing'] = false;                                           // Set isInitializing to false to prevent duplication of events
    $('.block-hidden').fadeIn(250);
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

    $(`[data-type="filter"] input`).on('click', function() {
        $(this).parent('label').toggleClass('checkbox-checked');

        var field = $(this).data('field');
        state['filters'][field] = [];

        $.each($(`[data-field="` + field + `"]:checked`), function(idx, element) {
            state['filters'][field].push($(element).val());
        });

        state['page'] = 0;
        loadCatalogue();
   });
}

function loadCatalogue() {
    if (config['isInitializing']) parseParams();

    var params = {
        'type': 'full',
        'filters': state['filters'],
        'rows': config['datasetsPerPage'],
        'sort': $("#sort-results-by").val(),
        'start': state['page'] * config['datasetsPerPage']
    }
    //
    var urlParam = [];
    if (state['page'] != 0) {
        urlParam.push('n=' + state['page'])
    }

    // if (q.length > 0) {
    //     urlParam.push('q=' + encodeURI(q));
    // }
    //
    // if (state['search'].length > 0) {
    //     urlParam.push('r=' + encodeURI(state['search'].join('+')));
    // }

    loadSidebar();
    getCKAN('catalogue_search', params, buildCatalogue);
    history.replaceState(null, '', '/catalogue/?' + urlParam.join('&'));
}

function loadSidebar(query) {
    var params = {
        'type': 'facet',
        'filters': state['filters'],
        'facet_field': config['filters']
    }

    getCKAN('catalogue_search', params, buildSidebar);
}

function parseParams() {
    var redirectFilters = ['n', 'q'];

    for (var i in redirectFilters) {
        var value = getURLParam(redirectFilters[i]);
        if (value == null) continue;

        switch (redirectFilters[i]) {
            case 'n':
                state['page'] = parseInt(value);
                break;
            case 'q':
                value = value.split(' AND ').map(function(x) { return x.substring(1, x.length - 1).split(':'); });
                $.each(value, function(idx, content) {
                    if (config['filters'].indexOf(content[0]) !== -1) {
                        state['filters'][content[0]] = content[1].replace(/[*/(/)""]/g, '').split(' OR ');
                    }
                });
                break;
        }
    }
}

function init() {
    $('.block-hidden').hide();
    loadCatalogue();
}
