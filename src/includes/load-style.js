import getHeadNode from 'get-head-node';

export default function (styleUrl, callback) {
    var headNode = getHeadNode();
    var styleElement = document.createElement('link');
    styleElement.rel = 'stylesheet';
    styleElement.href = styleUrl;
    styleElement.onload = callback;
    headNode.appendChild(styleElement);
}
