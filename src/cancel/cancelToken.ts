import { CancelExecutor, CancelTokenSource, Canceler } from "../index";
import Cancel from './cancel'
interface ResolvePromise {
    (reason?: Cancel): void
}

export default class CancelToken {
    promise: Promise<Cancel>
    reason?: Cancel
    constructor(executor: CancelExecutor) {
        let resolvePromise: ResolvePromise
        this.promise = new Promise<Cancel>(resolve => {
            resolvePromise = resolve//将resolve1方法赋值给resolvePromise方法,其实直接在里面电泳也可以
        })
        executor(message => {
            if (this.reason) return
            this.reason = new Cancel(message)
            resolvePromise(this.reason)//将内部的promise对象的pending装态变成resolve状态
        })

    }
    throwIfRequested(): void {

        if (this.reason) {
            console.log('reason', this.reason)
            throw this.reason
        }
    }
    static source(): CancelTokenSource {
        let cancel: Canceler = Object.create(null)
        const token = new CancelToken(c => {
            cancel = c
        })
        return {
            cancel,
            token
        }
    }

}