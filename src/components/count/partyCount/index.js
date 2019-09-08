/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {observer,inject} from 'mobx-react';

@inject('appState') @observer
class partyCount extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
        data:[
            { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
            {
                key: '/app/count', title: '统计分析', icon: 'scan',
                subs: [
                    { key: '/app/count/studyCount', title: '学习统计', component: 'studyCount'},
                    { key: '/app/count/partyCount', title: '党员统计', component: 'partyCount'}
                ]
            },
            {
                key: '/app/studyManage', title: '学习管理', icon: 'scan',
                subs: [
                    { key: '/app/studyManage/onlineTest', title: '在线考试', component: 'onlineTest'}
                ]
            },
            {
                key: '/app/newsManage', title: '新闻管理', icon: 'scan',
                subs: [
                    { key: '/app/newsManage/notice', title: '新闻通知', component: 'notice'},
                    { key: '/app/newsManage/newsCenter', title: '新闻中心', component: 'newsCenter'}
                ]
            },
            {
                key: '/app/seetingManage', title: '系统管理', icon: 'scan',
                subs: [
                    { key: '/app/seetingManage/user', title: '用户管理', component: 'user'},
                    { key: '/app/seetingManage/role', title: '角色管理', component: 'role'}
                ]
            },
        ]
    };
    componentDidMount() {

    }

    render() {
        return (
            <div className="gutter-example button-demo">
                <p>党员统计</p>
            </div>
        )
    }
}

export default partyCount;
