import windowOnload from 'window-onload'
import getRootNode from 'get-root-node'

export default function () {
    windowOnload(function () {
        var rootNode = getRootNode();
        rootNode.classList.add('dom-complete');
    });
}
