import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { resolve } from 'url';
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/err'
import { isURLSameOrigin } from '../helpers/url';
import cookie from '../helpers/cookie';
import { isFormData } from '../helpers/utils';
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    const { data = null, url, method = "get", headers, responseType, timeout, cancelToken, withCredentials, xsrfCookieName, xsrfHeaderName, onDownLoadProgress, validateStatus, onUpLoadProgress, auth } = config

    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()
        if (responseType) {
            request.responseType = responseType
        }
        if (timeout) {
            request.timeout = timeout
        }
        if (withCredentials) {
            request.withCredentials = withCredentials
        }
        request.onreadystatechange = function handleLoad() {

            if (request.readyState !== 4) {
                return
            }
            if (request.status === 0) {
                return
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType !== 'text' ? request.response : request.responseText
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            handleResponse(response)
        }
        request.onerror = function handleError() {
            reject(createError('Network error', config, null, request))
        }
        request.ontimeout = function handleTimeout() {
            reject(createError(`timeout of ${timeout} ms exceed`, config, "ECONNABORTED", request))
        }
        if (onDownLoadProgress) {
            request.onprogress = onDownLoadProgress
        }
        if (onUpLoadProgress) {
            request.upload.onprogress = onUpLoadProgress
        }
        if (isFormData(data)) {
            delete headers['Content-type']
        }
        if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
            const xsrfValue = cookie.read(xsrfCookieName)
            if (xsrfValue) {
                headers[xsrfCookieName] = xsrfValue
            }
        }
        if (auth) {//btoa转成base64
            headers['Authorization'] = 'Basic ' + btoa(auth.username + ":" + auth.password)
        }
        request.open(method.toUpperCase(), url!, true)
        Object.keys(headers).forEach((name) => {
            if (data == null && name.toLowerCase() == 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }

        })

        if (cancelToken) {
            cancelToken.promise.then(reason => {
                request.abort()
                reject(reason)
            })
        }
        request.send(data)

        function handleResponse(response: AxiosResponse): void {
            if (!validateStatus || validateStatus(response.status)) {
                resolve(response)
            } else {
                reject(createError(`Request failed with code${response.status}`, config, null, request, response))
            }
        }
    })


}