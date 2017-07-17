import getHeadNode from 'get-head-node';

export default function (url, callback) {
    var headNode = getHeadNode();
    var script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    headNode.appendChild(script);
}
