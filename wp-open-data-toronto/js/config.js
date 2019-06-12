if (window.location.host.indexOf('intra') !== -1) {
    var envName = window.location.host.split('.').length >= 4 ? window.location.host.split('.')[2].split('-')[0] : 'dev',
        envNum = (window.location.host.match(/\d/g) != null) ? parseInt(window.location.host.match(/\d/g).join('')) : 1,
        ckan = 'ckanadmin' + envNum + '.intra.' + envName + '-toronto.ca';
} else {
    var ckan = window.location.host.replace('portal', 'ckan');
}

if (ckan.indexOf('toronto.ca') == -1) {
    ckan = 'http://localhost:5000';
}

var config = {
    'ckanAPI': window.location.protocol + '//' + ckan + '/api/3/action/',
    'ckanURL': window.location.protocol + '//' + ckan
}
