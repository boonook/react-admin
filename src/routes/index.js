/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import AllComponents from '../components';
import routesConfig from './config';
import queryString from 'query-string';
import {observer,inject} from 'mobx-react';
import {construct} from "@aximario/json-tree";
let menuArr=[];

@inject('appState') @observer
class CRouter extends Component {
    componentDidMount() {

    }

    spread=(menus)=>{
        for (let i=0; i < menus.length; i++ ) {
            let menu = menus[i];
            if (menu.subs) {
                this.spread(menu.subs)
                delete menu.subs
            }
            menuArr.push(menu)
        }
    }

    requireAuth = (permission, component) => {
        const auth = {
            permissions:["auth", "auth/testPage", "auth/authPage", "auth/authPage/edit", "auth/authPage/visit"],
            role: "系统管理员",
            roleType: 1,
            uid: 1,
            userName: "系统管理员",
            isFetching: false,
            timeStamp: 1567878122869
        };
        const { permissions } = auth.permissions;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    uniqueArray=(array, key)=>{
        if(array.length>0){
            let result = [array[0]];
            for(let i = 1; i < array.length; i++){
                let item = array[i];
                let repeat = false;
                for (let j = 0; j < result.length; j++) {
                    if (item[key] === result[j][key]) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    result.push(item);
                }
            }
            return result || [];
        }else{
            return [];
        }
    };
    requireLogin = (component, permission) => {
        const isLogin = this.props.appState.isLogin||false;
        if (isLogin+''==='false') { // 线上环境判断是否登录
            return <Redirect to={'/login'} />;
        }
        this.spread(routesConfig.menus);
        let menus =[];
        let userMenu = JSON.parse(this.props.appState.userMenu);
        let menuArrs =this.uniqueArray(menuArr,'key')||[];
        for (let i = 0;i<menuArrs.length;i++) {
            for(let j =0;j<userMenu.length;j++){
                if(menuArrs[i].key === userMenu[j].path){
                    menuArrs[i].id = userMenu[j].Id||'';
                    menuArrs[i].title = userMenu[j].menuName||'';
                    menuArrs[i].menuParentId = userMenu[j].menuParentId||'';
                    menus.push(menuArrs[i]);
                }
            }
        }
        routesConfig.menus = construct(menus, {
            id: 'id',
            pid: 'menuParentId',
            children: 'subs'
        });
        routesConfig.menus.unshift({key: "/app/dashboard/index", title: "首页", icon: "mobile", component: "Dashboard",id:'0',menuParentId:'0'});
        return component;
    };
    render() {
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key =>
                        routesConfig[key].map(r => {
                            const route = r => {
                                ////这里是获取所有的本地菜单
                                const Component = AllComponents[r.component];
                                return (
                                    <Route
                                        key={r.route || r.key}
                                        exact
                                        path={r.route || r.key}
                                        render={props => {
                                            const reg = /\?\S*/g;
                                            // 匹配?及其以后字符串
                                            const queryParams = window.location.hash.match(reg);
                                            // 去除?的参数
                                            const { params } = props.match;
                                            Object.keys(params).forEach(key => {
                                                params[key] = params[key] && params[key].replace(reg, '');
                                            });
                                            props.match.params = { ...params };
                                            const merge = { ...props, query: queryParams ? queryString.parse(queryParams[0]) : {} };
                                            // 重新包装组件
                                            const wrappedComponent = (
                                                <DocumentTitle title={r.title}>
                                                    <Component {...merge} />
                                                </DocumentTitle>
                                            );
                                            return r.login
                                                ? wrappedComponent
                                                : this.requireLogin(wrappedComponent, r.auth)
                                        }}
                                    />
                                )
                            }
                            return r.component ? route(r) : r.subs.map(r => route(r));
                        })
                    )
                }

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}

export default CRouter;
