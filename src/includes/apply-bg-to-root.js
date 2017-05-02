import getRootNode from 'get-root-node';
import getCodeNode from 'get-code-node';

export default function () {
    var rootNode = getRootNode();
    var codeNode = getCodeNode();
    var bgColor;

    if (codeNode)
        bgColor = codeNode.style.backgroundColor;    

    if (rootNode && bgColor)
        rootNode.style.backgroundColor = bgColor;
}
