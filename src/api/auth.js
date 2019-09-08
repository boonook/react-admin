import axios from '../axios/axios_request'

export const login = (params) => {
    return axios.request({
        url:'/api/admin/auth/login',
        method:'post',
        data:JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
        },
    },false)
};

export const getMenu = (params) => {
    return axios.request({
        url:'api/admin/menu/list',
        method:'get',
    },true,false)
};
