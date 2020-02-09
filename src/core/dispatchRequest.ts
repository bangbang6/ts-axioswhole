import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildUrl, isAbsoluteURL, combineURL } from '../helpers/url';
import { transformRequest } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers'
import { transformResponseData } from '../helpers/data'
import { transform } from './transform'

function processConfig(config: AxiosRequestConfig): void {
    //console.log('process', config)
    config.url = transformUrl(config)

    config.headers = transformHeaders(config)

    config.data = transform(config.data, config.headers, config.transformRequest)

    config.headers = flattenHeaders(config.headers, config.method!)

}
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    throwIfCancellationRequested(config)
    processConfig(config)
    return xhr(config).then((res: any) => {
        return transformNewData(res)
    })
}


//url
export function transformUrl(config: AxiosRequestConfig): string {
    let { url, params, paramsSerializer, baseUrl } = config
    if (baseUrl && !isAbsoluteURL(url!)) {
        url! = combineURL(baseUrl, url!)
    }
    return buildUrl(url!, params, paramsSerializer)
}
//body
function transformData(config: AxiosRequestConfig): any {
    return transformRequest(config.data)
}

//header
function transformHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config
    return processHeaders(headers, data)

}
//data

function transformNewData(res: AxiosResponse): AxiosResponse {
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    return res
}
export default dispatchRequest


function throwIfCancellationRequested(config: AxiosRequestConfig): void {
    console.log('throw', config)
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested()
    }

}