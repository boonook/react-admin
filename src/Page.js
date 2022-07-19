import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from '@/components/pages/NotFound';
import Login from '@/components/pages/Login';
import App from './App';
import history from './utils/history'
////需要出离当用户登陆后我们将login重定向到首页，放置用户在登陆状态下，通过修改url直接跳转到登陆界面中去
////在404界面我们也要做相应的处理判断用户是否登陆，如果登陆将其重定向到主页，如果没有登陆重定向到登陆界面中去
export default () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)
