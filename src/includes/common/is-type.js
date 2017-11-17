const is = (type, obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1) === type;
}

export const isFunction = (obj) => {
    return is('Function', obj);
}

export const isObject = (obj) => {
    return is('Object', obj);
}

export const isArray = (obj) => {
    return is('Array', obj);
}

export const isUndefined = (obj) => {
    return is('Undefined', obj);
}

export const isNull = (obj) => {
    return is('Null', obj);
}