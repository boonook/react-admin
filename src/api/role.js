import axios from "../axios/axios_request";

export const getRolelist = () => {
    return axios.request({
        url:'api/admin/role/list',
        method:'get',
    },true,false)
};

export const addRolelist = (params) => {
    return axios.request({
        url:'api/admin/role/insert',
        data:params,
        method:'post',
    },true,true)
};

///获取用户详情
export const getRolelistDetail = (params) => {
    return axios.request({
        url:'api/admin/role/detail/'+params,
        method:'get',
    },true,false)
};

export const editRolelist = (params) => {
    return axios.request({
        url:'api/admin/role/update',
        data:params,
        method:'put',
    },true,true)
};

///删除用户
export const delRolelist = (params) => {
    return axios.request({
        url:'api/admin/role/del/'+params,
        method:'delete',
    },true,true)
};
