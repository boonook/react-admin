import axios from '../axios/axios_request';
import {makeFormData} from '../libs/tools'

export const uploadFenPian = (params) => {
    return axios.request({
        url:'/api/admin/file/uploadFenPian',
        method:'post',
        data:params,
        headers: {
            'Content-Type': 'application/json',
        },
    },false)
};
