import axios from "../axios/axios_request";
import {makeQueryString} from '../libs/tools'

export const getUserlist = (params) => {
    return axios.request({
        url:'api/admin/user/list'+makeQueryString(params),
        method:'get',
    },true,false)
};

export const addUserlist = (params) => {
    return axios.request({
        url:'api/admin/user/insert',
        data:params,
        method:'post',
    },true,true)
};

///删除用户
export const delUserlist = (params) => {
    return axios.request({
        url:'api/admin/user/del/'+params,
        method:'delete',
    },true,true)
};

///获取用户详情
export const getUserlistDetail = (params) => {
    return axios.request({
        url:'api/admin/user/detail/'+params,
        method:'get',
    },true,false)
};

export const editUserlist = (params) => {
    return axios.request({
        url:'api/admin/user/update',
        data:params,
        method:'put',
    },true,true)
};

////获取所有菜单
export const getRoleList = () => {
    return axios.request({
        url:'api/admin/role/list',
        method:'get',
    },true,false)
};

export const getUserRoleList = (id) => {
    return axios.request({
        url:'api/admin/user/roleList/'+id,
        method:'get',
    },true,false)
};

export const editUserRole = (params) => {
    return axios.request({
        url:'api/admin/user/updateRole',
        data:params,
        method:'put',
    },true,true)
};
