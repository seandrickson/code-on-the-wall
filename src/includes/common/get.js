import { isFunction } from 'is-type'

export default function (url, callback, asJSON = false) {
    if (!isFunction(callback)) return;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            asJSON ? callback(JSON.parse(this.response)) : callback(this.response);
        }
    };
    request.send();
}

