import { AxiosInstance } from './types'
import { extend } from './helpers/utils'
import Axios from './core/Axios'
import { AxiosRequestConfig, AxiosStatic, AxiosClassStatic } from './index';
import defaults from './default'
import mergeConfig from './core/mergeConfig';
import CancelToken from './cancel/cancelToken'
import Cancel, { isCancel } from './cancel/cancel'
function createInstance(config: AxiosRequestConfig): AxiosStatic {
    let context = new Axios(config)//实例属性
    //instances是一个函数 是request方法这里一般是要写一个函数的但是发现request功能和这个函数一样所以用request代替
    let instance = Axios.prototype.request.bind(context)
    extend(instance, context)
    return instance as AxiosStatic
}

const axios = createInstance(defaults)
axios.create = function (config) {
    return createInstance(mergeConfig(defaults, config))
}
axios.Cancel = Cancel //这里传的是类 不是实例 所以AxiosStatic的接口必须有类类型
axios.isCancel = isCancel
axios.CancelToken = CancelToken
axios.all = function all(promises) {
    return Promise.all(promises)
}
axios.spread = function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr)
    }
}

axios.Axios = Axios
export default axios