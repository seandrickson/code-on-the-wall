const is = (type, obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1) === type;
}

export const isFunction = (obj) => {
    return is('Function', obj);
}

export const isArray = (obj) => {
    return is('Array', obj);
}