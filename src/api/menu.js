import axios from '../axios/axios_request'

export const getMenu = (params) => {
    return axios.request({
        url:'api/admin/menu/menulist',
        method:'get',
    },true,false)
};
