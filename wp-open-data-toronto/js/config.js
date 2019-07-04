if (window.location.host.indexOf('intra') !== -1) {
    var ckan = window.location.host.replace('odadmin', 'ckanadmin');
} else if (window.location.host.indexOf('inter') !== -1) {
    var ckan = window.location.host.replace('portal', 'ckan');
} else {
    var ckan = 'ckan.cf.opendata.inter.prod-toronto.ca'
}

var config = {
    'ckanAPI': window.location.protocol + '//' + ckan + '/api/3/action/',
    'ckanURL': window.location.protocol + '//' + ckan
}
