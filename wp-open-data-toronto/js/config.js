const ckan = [
    'ckanadmin0.intra.dev-toronto.ca',                                          // dev
    'ckanadmin1.intra.dev-toronto.ca',                                          // qa
    '',                                                                         // pre-prod
    ''                                                                          // prod
]

const x = window.location.host.match(/\d/g);
const env = (x != null) ? parseInt(x.join('')) : 0;
const config = {
    'ckanAPI': 'https://' + ckan[env] + '/api/3/action/',
    'ckanURL': 'https://' + ckan[env]
}
