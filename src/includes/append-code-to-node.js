import crel from 'crel'
import { codeNode } from 'get-node'

export default function (codeText) {
    crel(codeNode(), codeText);
}
