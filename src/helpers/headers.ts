import { isPlainObject } from "./utils"
import { Method } from '../types'
import { deepMerge } from './utils'
function normalizeHeaderName(headers: any, normalizeName: string): void {
    if (!headers) return
    Object.keys(headers).forEach((name) => {
        if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
            headers[normalizeName] = headers[name]
            delete headers[name]
        }
    })
}

export function processHeaders(headers: any, data: any) {
    normalizeHeaderName(headers, "Content-type")
    if (isPlainObject(data)) {

        if (headers && !headers['Content-type']) {

            headers['Content-type'] = "application/json;charset=utf-8"

        }
    }
    return headers
}

export function parseHeaders(headers: string): any {
    let parsed = Object.create(null)
    if (!headers) return parsed
    headers.split('\r\n').forEach((item) => {
        let [key, ...value] = item.split(":")
        key = key.trim().toLowerCase()
        if (!key) return
        const val = value.join(":").trim()

        parsed[key] = val
    })
    return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
    if (!headers) {
        return headers
    }
    headers = deepMerge(headers.common, headers[method], headers)

    const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
    methodsToDelete.forEach(method => {
        delete headers[method]
    })
    return headers
}