import { getConfigValue } from 'config'
import initScript from 'init-script'
import loadCodeFromCdnjs from 'load-code-from-cdnjs'
import { addScript } from 'add-node'

addScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js')
    .then(() => { return loadCodeFromCdnjs(getConfigValue('code')) })
    .then(jsCode => { return initScript(jsCode) });
