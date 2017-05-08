import getRootNode from 'get-root-node';
import loadStyle from 'load-style';
import stringFormat from 'string-format';

var GOOGLE_FONT_URL_PATTERN = 'https://fonts.googleapis.com/css?family={0}';
var GOOGLE_FONT_DEFAULT = 'Source Code Pro';

export default function (fontFamily) {
    var rootNode = getRootNode();
    var fontFamilyName = fontFamily || GOOGLE_FONT_DEFAULT;
    var fontFamilyUrl = String(encodeURIComponent(fontFamilyName)).replace(/%20/g, "+");
    var googleUrl = stringFormat(GOOGLE_FONT_URL_PATTERN, fontFamilyUrl);
    loadStyle(googleUrl);
    rootNode.style.fontFamily = fontFamilyName;
}