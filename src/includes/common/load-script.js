import crel from 'crel'
import { isFunction } from 'is-type'
import getHeadNode from 'get-head-node'

export default function (url, callback) {
    var attr = { src: url };
    if (isFunction(callback))
        attr.onload = callback;

    return crel(getHeadNode(),
        crel('script', attr)
    );
}
