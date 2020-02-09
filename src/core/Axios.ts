import { AxiosRequestConfig, AxiosPromise, AxiosResponse, ResolvedFn, RejectedFn } from "../index";
import { Method } from '../types'
import { transformUrl } from './dispatchRequest'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from "./interceptorManager";
import defaults from '../default'
import mergeConfig from "./mergeConfig";
//这个拦截器是总的拦截器不是单个的 是包含req和res的 req是请求拦截器 res是返回拦截器 他们是不同是实例里面有拦截器数组这个属性
export interface interceptors {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosResponse>
}
interface PromiseChain<T> {
    resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
    rejected?: RejectedFn
}
export default class Axios {
    defaults: AxiosRequestConfig
    interceptors: interceptors
    constructor(initConfig: AxiosRequestConfig) {
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>()

        }
        this.defaults = initConfig
    }
    request(url: any, config?: any): AxiosPromise {
        if (typeof url === 'string') {
            if (!config) {
                config = {}
            }
            config.url = url
        } // 这个是axios(url,config)情况
        else {
            config = url
        }//这是axios(config)的情况
        config = mergeConfig(this.defaults, config)
        const chain: PromiseChain<any>[] = [{
            resolved: dispatchRequest,
            rejected: undefined
        }]
        //use 只是添加拦截器到interceptors中 这里是把它们遍历一遍然后保存到链中
        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor)
        })
        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor)
        })
        // console.log('config', config)
        let promise = Promise.resolve(config)
        while (chain.length) {
            const { resolved, rejected } = chain.shift()!
            promise = promise.then(resolved, rejected)//d调用use传递进来的方法在这里执行 默认参数是config对象
        }
        return promise

    }

    getUri(config?: AxiosRequestConfig): string {
        config = mergeConfig(this.defaults, config)
        return transformUrl(config)
    }
    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {

        return this.request(Object.assign(config || {}, { url, method }))
    }
    _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request(Object.assign(config || {}, { url, method, data }))
    }

    //get
    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config)
    }
    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config)
    }
    // post

    post(url: string, data?: any, config?: AxiosRequestConfig) {
        return this._requestMethodWithData('post', url, data, config)
    }
    put(url: string, data?: any, config?: AxiosRequestConfig) {
        return this._requestMethodWithData('put', url, data, config)
    }
    patch(url: string, data?: any, config?: AxiosRequestConfig) {
        return this._requestMethodWithData('patch', url, data, config)
    }
    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config)
    }

}