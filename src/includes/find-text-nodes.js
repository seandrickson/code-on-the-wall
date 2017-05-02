var findTextNodes = function (node, fn) {
    for (node = node.firstChild; node; node = node.nextSibling) {
        if (node.nodeType === Node.TEXT_NODE) {
            fn(node);
        } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT') {
            findTextNodes(node, fn);
        }
    }
};

export default findTextNodes;
