import getRootNode from 'get-root-node';

export default function (styleUrl, callback) {
    var rootNode = getRootNode();
    var styleElement = document.createElement('link');
    styleElement.rel = 'stylesheet';
    styleElement.href = styleUrl;
    styleElement.onload = callback;
    rootNode.appendChild(styleElement);
}
