export default function (url, callback) {
    var client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            callback.call(this, client.responseText);
        }
    }
    client.send();
}
