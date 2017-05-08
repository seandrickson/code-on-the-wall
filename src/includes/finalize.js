import getRootNode from 'get-root-node';

export default function () {
    // execute this function at the end of all the function calls
    // it will also listen for any network calls and ensure that they finish
    window.addEventListener('load', function () {
        var rootNode = getRootNode();
        if (rootNode)
            rootNode.classList.add('dom-ready');
    });
}
