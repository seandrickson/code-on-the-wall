import crel from 'crel'
import isFunction from 'lodash/isfunction'
import getHeadNode from 'get-head-node';

export default function (url, callback) {
    var attr = { rel: 'stylesheet', href: url };
    if (isFunction(callback))
        attr.onload = callback;
    
    return crel(getHeadNode(),
        crel('link', attr)
    );
}
