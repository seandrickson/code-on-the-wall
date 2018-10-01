import 'highlight.js'
import { getConfigValue } from 'config'
import initScript from 'init-script'
import loadCodeFromCdnjs from 'load-code-from-cdnjs'

const jsCode = loadCodeFromCdnjs(getConfigValue('code'));
initScript(jsCode);
