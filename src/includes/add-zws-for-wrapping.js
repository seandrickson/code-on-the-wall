import getCodeNode from 'get-code-node';
import findTextNodes from 'find-text-nodes';

export default function () {
    var codeNode = getCodeNode();
    findTextNodes(codeNode, function (node) {
        node.nodeValue = node.nodeValue.replace(/(.)/g, '$1\u200B');
    });
}
