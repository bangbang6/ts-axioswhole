import { AxiosRequestConfig } from "../index";
import { isPlainObject, deepMerge } from "../helpers/utils";

const strats = Object.create(null)
function defaultStrat(val1: any, val2: any): any {
    return typeof val2 === 'undefined' ? val1 : val2
}

function fromVal2Strat(val1: any, val2: any): any {
    if (typeof val2 !== 'undefined') {
        return val2
    }
}
const keysFromValue2 = ['url', 'params', 'data']
keysFromValue2.forEach(key => {
    strats[key] = fromVal2Strat
})

function deepMergeStrat(val1: any, val2: any): any {
    if (isPlainObject(val2)) {
        return deepMerge(val1, val2)
    } else if (typeof val2 !== 'undefined') {
        return val2
    } else if (isPlainObject(val1)) { //val2是空的情况
        return deepMerge(val1)
    } else if (typeof val1 !== 'undefined') {
        return val1
    }
}
const deepMergeKeys = ['headers', 'auth']
deepMergeKeys.forEach(key => {
    strats[key] = deepMergeStrat
})
export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
    if (!config2) config2 = {}
    const config = Object.create(null) //null 和{} 是不一样的

    for (let key in config2) {
        mergeField(key)
    }
    for (let key in config1) {
        if (!config2[key]) {
            mergeField(key)
        }
    }
    // console.log("config", config)
    function mergeField(key: string): void {
        const strat = strats[key] || defaultStrat// 这里都是合并函数
        config[key] = strat(config1[key], config2![key])
    }
    return config
}