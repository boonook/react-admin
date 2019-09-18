import axios from 'axios';
import config from '../config/index';
import appState from '../app-state/index';
/**
 * 请求
 */
const baseURL = process.env.NODE_ENV+''==='development'?config.baseUrl.dev:config.baseUrl.pro;

class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }

    // /内置请求参数
    getInsideConfig() {
        ////说明是获取在线人数的接口
        const config = {
            baseURL: this.baseUrl,
            headers: {},
        };
        return config
    }

    handleError(error){
        const msg = ((error.message === 'Network Error')?'服务器内部错误!':error.message) || '服务器内部错误'
        if(!error.code) return msg
    }

    /**
     * 拦截器
     * @param {object} instance 请求实例
     * @param {string} url 请求路径
     * @param {boolean} withToken 请求是否需要携带token
     */
    interceptors(instance, url, withToken = true) {
        // 请求拦截
        instance.interceptors.request.use(function(config){
            if (withToken) {
                config.headers = {
                    ...config.headers,
                    'Authorization': appState.token||"",
                }
            }
            return config
        }, (error) => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(function(res){
            if (!res) throw new Error('服务器内部错误');
            let result = res.data || {}
            if (typeof result === 'string') {
                try {
                    // result = eval(`(${result})`)
                }catch (e) {
                    return {data:res.data, code :200, rel:true}
                }
            }

            if(res.data instanceof Blob){
                return {data:res.data, code :200, msg:"success", rel:true}
            }
            const {code, data, rel=true} = result;

            return {data, code, rel}
        }, (error) => {

            const errorMsg = error.message
            const response = (error.response || {}).data || {}
            const msg = response.msg || response.message ||errorMsg || '服务器内服错误'
            // this.destroy(url)
            return Promise.reject(new Error(msg))
        })
    }

    /**
     * 发起请求
     * @param {object} options 请求配置
     * @param {string} options.url 请求地址
     * @param {'GET'|'POST' |'DELETE'|'PUT'|'PATCH'} options.method 请求方法
     * @param {object} options.headers 请求头
     * @param {string} options.headers.Authorization
     * @param {Array<function>} options.transformRequest
     * @param {boolean} withToken
     * @param {boolean} showMsg
     * @return {Promise}
     */
    request(options, withToken = true, showMsg = true) {
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance, options.url, withToken)
        return instance(options)
            .then((res) => {
                return res
            })
            .catch(this.handleError)
    }
}

let baseUrl = baseURL;

export {
    baseUrl
}
export default new HttpRequest(baseUrl)
