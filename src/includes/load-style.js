import getRootNode from 'get-root-node';

export default function (styleUrl) {
    var rootNode = getRootNode();
    var styleElement = document.createElement('link');
    styleElement.rel = 'stylesheet';
    styleElement.href = styleUrl;
    rootNode.appendChild(styleElement);
}
