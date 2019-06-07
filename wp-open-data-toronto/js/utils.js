var $ = jQuery.noConflict();

function getCKAN(endpoint, data, callback, error) {
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: config['ckanAPI'] + endpoint,
        data: data,
    }).done(
        callback
    ).error(
        error
    );
}

function getFullDate(date) {
    var day = parseInt(date[2]),
        month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][(parseInt(date[1]) - 1)],
        year = date[0];

    return month + ' ' + day + ', ' + year;
}

function getDaysSince(date) {
    return days = Math.round((Date.now() - new Date(date).getTime())/(24*60*60*1000));
}

function getTimeSince(date) {
    var days = getDaysSince(date);

    if (days <= 1) {
        var timeSince = days == 0 ? 'today' : 'yesterday';
    } else if (days <= 60) {
        var timeSince = days + ' days ago';
    } else if (days <= 365) {
        var months = Math.round(days / 30.);
        var period = months > 1 ? ' months ago' : ' month ago';

        var timeSince = months + period;
    } else {
        var years = Math.round(days / 365.);
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
        return decodeURI(results[1]);
    }
}

function isMobile() {
    var check = false;
    (function (a) {
        // String to determine whether screen is mobile courtesy of: http://detectmobilebrowsers.com/
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
            check = true;
        }
    }) (navigator.userAgent||navigator.vendor||window.opera);

    return check;
}

function truncateString(original, size, clean, padding) {
    if (original == null) {
        return '';
    }

    var tokens = (original + '').split(' '),
        shorten;

    if (tokens[0].length > size) {
        shorten = tokens[0];
    } else {
        while (tokens.join(' ').length > size) {
            tokens.pop();
        }
        shorten = tokens.join(' ');
    }

    if (clean) {
        shorten = shorten.replace(/[^a-z\d]*$/gi, '');
    }

    if (shorten != original) {
        if (padding) {
            shorten += ' ';
        }
        shorten += '...';
    }

    return shorten;
}
