/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Button,Input,Icon } from 'antd';
import {observer,inject} from 'mobx-react';
import {connectAlita} from "redux-alita";
import { PwaInstaller } from '../widget';
import {login,getMenu} from '../../api/auth'
// import AuthComponent from '../../components/btnPromiss/AuthComponent'
// import UnStatusMobx from '../../components/pages/UnStatusMobx'

@inject('appState') @observer
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            userPwd:''
        };
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        if(this.props.appState.isLogin+''==='true'){
            // const {history } = this.props;
            this.props.history.push('/');
        }
    }
    handleSubmits=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                let params={
                    userName:this.state.userName,
                    userPwd:this.state.userPwd
                };

                login(params).then(res=>{
                    if(res.code+''==='200'){
                        if(res.rel){
                            let data = res.data||{};
                            this.props.appState.login(data,this);
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

                                }else{
                                    this.props.appState.loginOut();
                                }
                            });
                        }
                    }
                })

            }
        });
    };

    getUserName=(data)=>{
        this.setState({
            userName:data.nativeEvent.target.value
        })
    };

    getUserPwd=(data)=>{
        this.setState({
            userPwd:data.nativeEvent.target.value
        })
    }

    onCeshi=(e)=>{

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login" style={{backgroundColor:'#313653'}} key={'login'}>
                <div className="login-form" >
                    <div className="login-logo">
                        <span>登陆界面</span>
                        <PwaInstaller />
                    </div>
                    <Form style={{maxWidth: '300px'}}>
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                initialValue:this.state.userName,
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名"  onChange={value=>{this.getUserName(value)}}/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('userPwd', {
                                initialValue:this.state.userPwd,
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码"  onChange={value=>{this.getUserPwd(value)}}/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <span className="login-form-forgot" style={{float: 'left'}}>注册</span>
                            <span className="login-form-forgot" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}} onClick={(e)=>this.handleSubmits(e)}>
                                登录
                            </Button>
                            {/*控制按钮权限？主要传递两个参数一个是auth,另一个是title*/}
                            {/* <UnStatusMobx />
                            <p style={{color:'red'}}> 以下为按钮权限操作</p>
                            <AuthComponent auth={"user:add"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'新增'}/>
                            <AuthComponent auth={"menu:view"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'查看菜单按钮'}/> */}
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
export default connectAlita(['auth'])(Form.create()(Login));
