import getRootNode from 'get-root-node'
import getCodeNode from 'get-code-node'

export default function () {
    var rootNode = getRootNode();
    var codeNode = getCodeNode();
    rootNode.style.backgroundColor = codeNode.style.backgroundColor;
}
