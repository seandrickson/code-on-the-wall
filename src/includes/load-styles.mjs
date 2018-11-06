import loadGoogleFont from 'load-google-font'
import loadHighlightStyle from 'load-highlight-style'
import {
    codeNode
} from 'get-node'
import {
    getConfig,
    getConfigValue,
    hasConfigValue
} from 'config'

export default function () {
    if (hasConfigValue('googleFont'))
        loadGoogleFont(getConfigValue('googleFont'));

    loadHighlightStyle(getConfigValue('highlightStyle'));
    const styles = getConfig();
    Object.assign(codeNode().style, styles);
}