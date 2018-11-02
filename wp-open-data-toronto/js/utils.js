var $ = jQuery.noConflict();

function getCKAN(endpoint, data, callback) {
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: config['ckanAPI'] + endpoint,
        data: data,
    }).done(callback);
}

function getFullDate(date) {
    var day = parseInt(date[2]),
        month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][(parseInt(date[1]) - 1)],
        year = date[0];

    return month + ' ' + day + ', ' + year;
}

function getTimeSince(date) {
    var days = Math.round((Date.now() - new Date(date).getTime())/(24*60*60*1000));

    if (days <= 1) {
        var timeSince = days == 0 ? 'today' : 'yesterday';
    } else if (days <= 60) {
        var timeSince = days + ' days ago';
    } else if (days <= 365) {
        var months = Math.round(days / 30.);
        var period = months > 1 ? ' months ago' : ' month ago';

        var timeSince = months + period;
    } else {
        var years = Math.round(days / 30.);
        var period = years > 1 ? ' years ago' : ' year ago';

        var timeSince = years + period;
    }

    return timeSince;
}

function getURLParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return decodeURI(results[1]) || 0;
    }
}
