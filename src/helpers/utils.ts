const toString = Object.prototype.toString
export function isDate(val: any): val is Date {
    return toString.call(val) == '[object Date]'
}

/* export function isObject(val: any): val is Object {
    return val !== null && typeof val === 'object'
} */

export function isPlainObject(value: any): value is Object {
    return toString.call(value) === "[object Object]"
}


export function extend<T, U>(to: T, from: U): T & U {
    for (let key in from) {
        (to as T & U)[key] = (from[key] as any)
    }
    return to as T & U
}
//因为参数不确定 所以用剩余参数
//生辰合并 且以后面的为主
export function deepMerge(...objs: any[]): any {
    const result = Object.create(null)

    objs.forEach(obj => {
        if (obj) {
            Object.keys(obj).forEach(key => {
                const val = obj[key]
                if (isPlainObject(val)) {
                    if (isPlainObject(result[key])) { // 可能key重复啦 必须以后面的为主所以要加这个
                        result[key] = deepMerge(result[key], val)
                    } else {
                        result[key] = deepMerge(val)
                    }
                } else {
                    result[key] = val
                }
            })
        }
    })
    return result
}


export function isFormData(val: any): val is FormData {
    return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
    return typeof val !== 'undefined' && val instanceof URLSearchParams
}