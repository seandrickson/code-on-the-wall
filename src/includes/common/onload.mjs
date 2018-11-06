import { isFunction } from 'is-type'

export default (fn, ...args) => {
    if (!isFunction(fn)) return;
    document.readyState === 'complete' ? fn.call(this, args) : window.addEventListener('load', fn.bind(this, args));
}
