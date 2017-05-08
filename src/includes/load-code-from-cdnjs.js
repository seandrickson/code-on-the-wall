import get from 'get';
import stringFormat from 'string-format';

var CDNJS_SEARCH_API_FORMAT = 'https://api.cdnjs.com/libraries?search={0}';
var CODE_TO_DISPLAY = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js';

var parseResultFromResponse = function (response) {
    if (!response)
        return;

    var resObj = JSON.parse(String(response));
    var result;

    if (resObj && resObj.results) {
        var results = resObj.results;

        if (Array.isArray(results) && results[0].latest)
            result = results[0].latest;
    }

    return result;
};

export default function (codeName, callback) {
    if (codeName) {
        var cdnjsUrl = stringFormat(CDNJS_SEARCH_API_FORMAT, encodeURIComponent(codeName));
        get(cdnjsUrl, function (response) {
            var result = parseResultFromResponse(response) || CODE_TO_DISPLAY;
            callback(result);
        });
    } else {
        callback(CODE_TO_DISPLAY);
    }
}
