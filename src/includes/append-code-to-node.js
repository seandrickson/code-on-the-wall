import getCodeNode from 'get-code-node';

export default function (codeText) {
    var codeNode = getCodeNode();
    var codeTextNode = document.createTextNode(codeText);
    codeNode.appendChild(codeTextNode);
}
