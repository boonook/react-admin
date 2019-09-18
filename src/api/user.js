import axios from "../axios/axios_request";

export const getUserlist = () => {
    return axios.request({
        url:'api/admin/user/list',
        method:'get',
    },true,false)
};
