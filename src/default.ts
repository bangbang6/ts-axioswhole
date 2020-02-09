import { AxiosRequestConfig } from "./index";
import { transformRequest, transformResponseData } from "./helpers/data";

import { processHeaders } from './helpers/headers'

const defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json,text/plain,*/*'
        }
    },
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    validateStatus(status: number) {
        return (status >= 200 && status < 300) || status == 304
    },//自己定义一个状态码合法函数

    transformResponse: [
        function (data: any): any {

            return transformResponseData(data)
        }
    ],
    transformRequest: [
        function (data: any, headers: any): any {
            processHeaders(headers, data)
            return transformRequest(data)
        }
    ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
    defaults.headers[method] = ""
})

const methodWithData = ['post', 'put', 'patch']
methodWithData.forEach(method => {
    defaults.headers[method] = {
        'Content-type': "application/x-www-form-urlencoded"
    }
})


export default defaults