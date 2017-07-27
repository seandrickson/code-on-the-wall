import isFunction from 'lodash/isfunction'

export default function (node, fn) {
    var walker = document.createTreeWalker(
        node, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );

    var node;
    while(node = walker.nextNode()) {
        if (isFunction(fn)) fn(node.nodeValue);
    }
}
