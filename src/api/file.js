import axios from "../axios/axios_request";
import {makeQueryString} from '../libs/tools'

export const getFilelist = (params) => {
    return axios.request({
        url:'api/admin/file/list'+makeQueryString(params),
        method:'get',
    },true,false)
};

///删除用户
export const delFilelist = (params) => {
    return axios.request({
        url:'api/admin/file/del/'+params,
        method:'delete',
    },true,true)
};
