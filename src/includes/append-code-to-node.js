import crel from 'crel'
import getCodeNode from 'get-code-node'

export default function (codeText) {
    crel(getCodeNode(), codeText);
}
