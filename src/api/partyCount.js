import axios from "../axios/axios_request";
import {makeQueryString} from "../libs/tools";

export const getFlowChart = (params) => {
    return axios.request({
        url:'api/admin/flowChart/flowChart'+makeQueryString(params),
        method:'get',
    },true,false)
};
