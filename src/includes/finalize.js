import getRootNode from 'get-root-node';

export default function () {
    var rootNode = getRootNode();
    if (rootNode)
        rootNode.classList.add('dom-ready');
}
