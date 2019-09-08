/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Button } from 'antd';
import {observer,inject} from 'mobx-react';
import { PwaInstaller } from '../widget';
import {login,getMenu} from '../../api/auth'

@inject('appState') @observer
class Login extends React.Component {
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        if(this.props.appState.isLogin+''==='true'){
            const {history } = this.props;
            history.push('/');
        }
    }
    handleSubmits=()=>{
        let params={
            userName:'admin',
            userPwd:'admin'
        }
        login(params).then(res=>{
            if(res.code+''==='200'){
                if(res.rel){
                    let data = res.data||{};
                    this.props.appState.login(data);
                    ////获取用户的权限菜单树
                    getMenu().then(res=>{
                        if(res && res.code+''==='200'){
                            if(res.rel){
                                let data = res.data||[];
                                ///存储用户菜单到store中去
                                this.props.appState.changeUserMenu(data);
                                const { history } = this.props;
                                ////判断用户是否登陆
                                if(this.props.appState.isLogin){
                                    history.push('/');
                                }
                            }

                        }
                    });
                }
            }
        })

    }
    render() {
        // const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>React Admin</span>
                        <PwaInstaller />
                    </div>
                    <Form style={{maxWidth: '300px'}}>
                    {/*    <FormItem>*/}
                    {/*        {getFieldDecorator('userName', {*/}
                    {/*            rules: [{ required: true, message: '请输入用户名!' }],*/}
                    {/*        })(*/}
                    {/*            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入admin, 游客输入guest" />*/}
                    {/*        )}*/}
                    {/*    </FormItem>*/}
                    {/*    <FormItem>*/}
                    {/*        {getFieldDecorator('password', {*/}
                    {/*            rules: [{ required: true, message: '请输入密码!' }],*/}
                    {/*        })(*/}
                    {/*            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="管理员输入admin, 游客输入guest" />*/}
                    {/*        )}*/}
                    {/*    </FormItem>*/}
                    {/*    <FormItem>*/}
                    {/*        {getFieldDecorator('remember', {*/}
                    {/*            valuePropName: 'checked',*/}
                    {/*            initialValue: true,*/}
                    {/*        })(*/}
                    {/*            <Checkbox>记住我</Checkbox>*/}
                    {/*        )}*/}
                    {/*        <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>*/}
                    {/*        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}} onClick={()=>this.handleSubmits()}>*/}
                    {/*            登录*/}
                    {/*        </Button>*/}
                    {/*        <p style={{display: 'flex', justifyContent: 'space-between'}}>*/}
                    {/*            <span >或 现在就去注册!</span>*/}
                    {/*            <span onClick={this.gitHub} ><Icon type="github" />(第三方登录)</span>*/}
                    {/*        </p>*/}
                    {/*    </FormItem>*/}
                    </Form>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}} onClick={()=>this.handleSubmits()}>
                        登录
                    </Button>
                </div>
            </div>
        );
    }
}

export default Login;
