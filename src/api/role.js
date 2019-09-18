import axios from "../axios/axios_request";

export const getRolelist = () => {
    return axios.request({
        url:'api/admin/role/list',
        method:'get',
    },true,false)
};
