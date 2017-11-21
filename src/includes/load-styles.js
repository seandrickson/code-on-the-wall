import loadGoogleFont from 'load-google-font'
import loadHighlightStyle from 'load-highlight-style'
import { codeNode } from 'get-node'
import { getConfig, getConfigValue, hasConfigValue } from 'config'

export default function () {
    if (hasConfigValue('googleFont'))
        loadGoogleFont(getConfigValue('googleFont'));
    
    loadHighlightStyle(getConfigValue('highlightStyle'));
    const styles = getConfig();
    const $code = codeNode();
    Object.keys(styles).forEach(key => {
        $code.style[key] = styles[key];
    });
}
