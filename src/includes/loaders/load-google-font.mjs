import { codeNode } from 'get-node'
import { addStyle } from 'add-node'

const GOOGLE_FONT_DEFAULT = 'Source Code Pro';
export default function (fontFamily) {
    const fontFamilyName = fontFamily || GOOGLE_FONT_DEFAULT;
    const fontFamilyUrl = encodeURIComponent(fontFamilyName).replace(/%20/g, '+');
    addStyle(`https://fonts.googleapis.com/css?family=${fontFamilyUrl}`);
    codeNode().style.fontFamily = fontFamilyName;
}
