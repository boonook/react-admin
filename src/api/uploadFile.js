import axios from '../axios/axios_request';
import {makeFormData} from '../libs/tools'

export const upload = (params) => {
    return axios.request({
        url:'/api/admin/file/upload',
        method:'post',
        data:makeFormData(params),
        headers: {
            'Content-Type': 'application/json',
        },
    },false)
};

export const uploadMore = (params) => {
    return axios.request({
        url:'/api/admin/file/uploadMore',
        method:'post',
        data:makeFormData(params),
        headers: {
            'Content-Type': 'application/json',
        },
    },false)
};

export const base64Upload = (params) => {
    return axios.request({
        url:'/api/admin/file/base64Upload',
        method:'post',
        data:params,
        headers: {
            'Content-Type': 'application/json',
        },
    },false)
};
