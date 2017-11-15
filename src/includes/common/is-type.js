const is = (type, obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1) === type;
}

export function isFunction(obj) {
    return is('Function', obj);
}

export function isArray(obj) {
    return is('Array', obj);
}