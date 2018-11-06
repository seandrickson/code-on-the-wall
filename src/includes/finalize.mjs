import onload from 'onload'
import { htmlNode } from 'get-node'

export default () => {
    onload(() => {
        htmlNode().classList.add('dom-complete');
    });
}
