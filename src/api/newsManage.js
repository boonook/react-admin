import axios from "../axios/axios_request";
import {makeQueryString} from "../libs/tools";
// import {makeQueryString} from '../libs/tools'

export const addNewslist = (params) => {
    return axios.request({
        url:'api/admin/news/insert',
        data:params,
        method:'post',
    },true,true)
};

export const getNewslist = (params) => {
    return axios.request({
        url:'api/admin/news/list'+makeQueryString(params),
        method:'get',
    },true,false)
};

export const getNewsDetail = (params) => {
    return axios.request({
        url:'api/admin/news/list/'+params,
        method:'get',
    },true,false)
};
