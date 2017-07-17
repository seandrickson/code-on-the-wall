import getRootNode from 'get-root-node';

const readyFn = function () {
    var rootNode = getRootNode();
    rootNode.classList.add('dom-complete');
};

export default function () {
    // execute this function at the end of all the function calls
    // it will also listen for any network calls and ensure that they finish
    if (document.readyState === 'complete') {
        readyFn();
    } else {
        window.addEventListener('load', readyFn);
    }
}
