import windowOnload from './common/window-onload'

export default function () {
    windowOnload(function () {
        var rootNode = getRootNode();
        rootNode.classList.add('dom-complete');
    });
}
