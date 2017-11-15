import { isFunction } from 'is-type'

export default function (fn) {
    if (!isFunction(fn)) return;

    // execute this function at the end of all the function calls
    // it will also listen for any network calls and ensure that they finish
    if (document.readyState === 'complete') {
        fn();
    } else {
        window.addEventListener('load', fn);
    }
}
