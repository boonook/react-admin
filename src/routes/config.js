export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard',id:'0' },
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
                { key: '/app/seetingManage/role', title: '角色管理', component: 'role'},
                { key: '/app/seetingManage/menu', title: '菜单管理', component: 'menu'}
            ]
        },
        {
            key: '/app/SelfCenter', title: '个人中心', icon: 'scan',
            subs: [
                { key: '/app/SelfCenter/SelfInfo', title: '个人信息', component: 'SelfInfo'}
            ]
        }
    ],
    others: [
        { key: '/app/test/test', title: '测试菜单', icon: 'mobile', component: 'test' },
    ]
}
