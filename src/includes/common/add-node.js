import crel from 'crel'
import { headNode } from 'get-node'

export const addScript = (src) => {
    return new Promise((resolve, reject) => {
        crel(headNode(), crel('script', {
            src: src,
            onload: resolve,
            onerror: reject
        }));
    });
}

export const addStyle = (href) => {
    return new Promise((resolve, reject) => {
        crel(headNode(), crel('link', {
            rel: 'stylesheet',
            href: href,
            onload: resolve,
            onerror: reject
        }));
    });    
}
