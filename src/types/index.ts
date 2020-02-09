
import { request } from "http";


export type Method = | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'

export interface AxiosRequestConfig {
    url?: string,
    method?: Method,
    data?: any,
    params?: any,
    headers?: any
    responseType?: XMLHttpRequestResponseType,
    timeout?: number
    transformResponse?: AxiosTransformer | AxiosTransformer[]
    transformRequest?: AxiosTransformer | AxiosTransformer[]
    cancelToken?: CancelToken
    xsrfCookieName?: string,
    xsrfHeaderName?: string,
    onDownLoadProgress?: (e: ProgressEvent) => void
    onUpLoadProgress?: (e: ProgressEvent) => void
    auth?: AxiosBasicCredentials,
    validateStatus?: (status: number) => boolean
    paramsSerializer?: (params: any) => string
    baseUrl?: string
    [propName: string]: any
}
export interface AxiosTransformer {
    (data: any, headers?: any): any
}
export interface AxiosStatic extends AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance
    CancelToken: CancelTokenStatic //CancelToken表示这个类不是这个实例
    Cancel: CancelStatic
    isCancel: (val: any) => boolean

    all<T>(promise: Array<T | Promise<T>>): Promise<T[]>
    spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R
    Axios: AxiosClassStatic

}

export interface AxiosClassStatic {
    new(config: AxiosRequestConfig): Axios
}
export interface AxiosResponse<T = any> {
    data: T
    status: number
    statusText: string
    headers: any
    config: AxiosRequestConfig
    request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

}

export interface AxiosError extends Error {
    config: AxiosRequestConfig
    code?: string | null
    request?: any
    response?: AxiosResponse
}
export interface Axios {
    defaults: AxiosRequestConfig
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>
        response: AxiosInterceptorManager<AxiosResponse>
    }
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>


    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    getUri(config?: AxiosRequestConfig): string
}
//混合接口 主要是函数 但是包括哦Axios的所有属性即上面的方法也在 这个接口用于等于一个函数instance()返回一个promise
export interface AxiosInstance extends Axios {
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T> // 一般这个就是axios()axios是一个函数 所以用函数接口,但是也有axiso.get 所以用混合类型并且创建一个对象合并这两个不同的用法
    <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
//这个一般用于一个类 满足自己是个函数(函数接口)同

export interface ResolvedFn<T> {
    (val: T): T | Promise<T>
}
export interface RejectedFn {
    (err: any): any
}
export interface AxiosInterceptorManager<T> {
    use(resolve: ResolvedFn<T>, rejected?: RejectedFn): number
    eject(id: number): void
}
//实例类型
export interface CancelToken {
    promise: Promise<Cancel>
    reason?: Cancel
    throwIfRequested(): void
}

export interface Canceler {
    (message?: string): void
}

export interface CancelExecutor {
    (cancle: Canceler): void
}

export interface CancelTokenSource {
    token: CancelToken
    cancel: Canceler
}
//类类型
export interface CancelTokenStatic {
    new(executor: CancelExecutor): CancelToken
    source(): CancelTokenSource
}

//实例类型一定区分开
export interface Cancel {
    message?: string
}
//类类型 一定会有new
export interface CancelStatic {
    new(message?: string): Cancel
}


export interface AxiosBasicCredentials {
    username: string
    password: string
}