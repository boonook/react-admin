/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import {observer,inject} from 'mobx-react';
import AllComponents from '../components';
import queryString from 'query-string';
import Login from '../components/pages/Login'
import history from '@/utils/history';
@inject('appState') @observer
class CRouter extends Component {
    requireLogin = (component) => {
        const isLogin = this.props.appState.isLogin||false;
        if (isLogin+''==='false') { // 线上环境判断是否登录
            return <Redirect to={'/login'} />;
        }
        return component;
    };
    
    render() {
        let userMenu = this.props.appState.userMenu?JSON.parse(this.props.appState.userMenu):[];
        if(this.props.appState.isLogin==undefined || !this.props.appState.isLogin){
            history.replace('/login')
        }
        return (
            <Switch>
                {Object.keys(userMenu).map(key =>
                    userMenu[key].map(r => {
                        const route = r => {
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
                                            params[key] =
                                                params[key] && params[key].replace(reg, '');
                                        });
                                        props.match.params = { ...params };
                                        const merge = {
                                            ...props,
                                            query: queryParams
                                                ? queryString.parse(queryParams[0])
                                                : {},
                                        };
                                        // 重新包装组件
                                        const wrappedComponent = (
                                            <DocumentTitle title={r.title}>
                                                <Component {...merge} />
                                            </DocumentTitle>
                                        );
                                        return r.login
                                            ? wrappedComponent
                                            : this.requireLogin(wrappedComponent, r.auth);
                                    }}
                                />
                            );
                        };
                        return r.component ? route(r) : r.subs.map(r => route(r));
                    })
                )}
                <Route render={() => <Redirect to="/404" />} />
                <Route path="/login" exact component={Login}/>
            </Switch>
        );
    }
}

export default CRouter;
