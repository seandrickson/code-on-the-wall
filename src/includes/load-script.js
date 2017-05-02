import getRootNode from 'get-root-node';

export default function (url, callback) {
    var rootNode = getRootNode();
    var script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    rootNode.appendChild(script);
}
