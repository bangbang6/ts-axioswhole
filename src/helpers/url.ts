import { isDate, isPlainObject, isURLSearchParams } from "./utils"
import { relative } from "path";

interface URLOrigin {
    protocol: string
    host: string

}
function encode(val: string): string {

    return encodeURIComponent(val).replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}
export function buildUrl(url: string, params?: any, paramsSerializer?: (params: any) => string) {
    if (!params) {
        return url
    }
    let serialParams

    if (paramsSerializer) {

        serialParams = paramsSerializer(params)
    } else if (isURLSearchParams(params)) {

        serialParams = params.toString()

    } else {
        const parts: string[] = []
        Object.keys(params).forEach(key => {
            const value = params[key]
            if (value === null || typeof value == 'undefined') {
                return // 跳到下一个循环因为是回调函数所以是return
            }
            let val = []
            if (Array.isArray(value)) {
                val = value;
                key += '[]'
            } else {
                val = [value] // 统一成数组
            }
            val.forEach((va) => {
                if (isDate(va)) {
                    va = va.toISOString()
                } else if (isPlainObject(va)) {
                    va = JSON.stringify(va)
                }
                parts.push(`${encode(key)}=${encode(va)}`)
            })

        });

        serialParams = parts.join("&")
    }

    if (serialParams) {
        const index = url.indexOf('#')
        if (index != -1) {
            url = url.slice(0, index)
        }
        url += (url.indexOf("?") == -1 ? "?" : "&") + serialParams
    }
    return url

}


export function isURLSameOrigin(requestURL: string): boolean {
    const parsedOrigin = resolveURL(requestURL)
    return parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
}


const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)
function resolveURL(url: string): URLOrigin {
    urlParsingNode.setAttribute('href', url)
    const { protocol, host } = urlParsingNode
    return { protocol, host }
}

export function isAbsoluteURL(url: string): boolean {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL: string): string {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}