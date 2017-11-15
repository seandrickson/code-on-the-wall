import { isFunction } from 'is-type'

export default function (node, fn) {
    var treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    while(treeWalker.nextNode()) {
        if (isFunction(fn))
            fn(treeWalker.currentNode);
    }
}
