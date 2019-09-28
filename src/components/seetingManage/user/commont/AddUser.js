import React from 'react';
import { Input,Modal,Form } from 'antd';
import { connectAlita } from 'redux-alita';
import {addUserlist,getUserlistDetail,editUserlist} from '../../../../api/user'

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            userName:'',
            userPwd:'',
            userPwdAgain:'',
            userEmail:'',
            code:'',
            title:'添加用户',
            status:'add'
        }
    }
    componentDidMount(){
        this.props.onRef(this);
        this.setState({
            visible:this.props.status
        })
    }

    myName=(status,data)=>{
        this.setState({
            visible:true,
            userName:'',
            userPwd:'',
            userPwdAgain:'',
            userEmail:'',
            code:'',
        });
        if(status+''==='edit'){
            getUserlistDetail(data).then(res=>{
                if(res && res.code+''==='200'){
                    let data = res.data||{};
                    this.setState({
                        ...data,
                        title:'编辑用户',
                        status:'edit'
                    })
                }
            })
        }else{
            this.setState({
                title:'添加用户',
                status:'add'
            })
        }
    };

    ///点击确定
    handleOk=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let params={
                    userName:this.state.userName,
                    userPwd:this.state.userPwd,
                    userPwdAgain:this.state.userPwdAgain,
                    userEmail:this.state.userEmail,
                    code:this.state.code,
                };
                if(this.state.status==='edit'){
                    params.id = this.state.id||'';
                    editUserlist(params).then(res=>{
                        if(res && res.code+''==='200'){
                            this.setState({
                                userName:'',
                                userPwd:'',
                                userPwdAgain:'',
                                userEmail:'',
                                code:'',
                            },()=>{
                                this.setState({
                                    visible:false
                                },()=>{
                                    this.props.RefreshTable()
                                })
                            })
                        }
                    })
                }else{
                    addUserlist(params).then(res=>{
                        if(res && res.code+''==='200'){
                            this.setState({
                                userName:'',
                                userPwd:'',
                                userPwdAgain:'',
                                userEmail:'',
                                code:'',
                            },()=>{
                                this.setState({
                                    visible:false
                                },()=>{
                                    this.props.RefreshTable()
                                })
                            })
                        }
                    })
                }
            }
        });
    };
    ///取消
    handleCancel=()=>{
        this.setState({
            userName:'',
            userPwd:'',
            userPwdAgain:'',
            userEmail:'',
            code:'',
        },()=>{
            this.setState({
                visible:false
            })
        })
    }
    getUserName=(data)=>{
        this.setState({
            userName:data.nativeEvent.target.value
        })
    };
    getUserPwd=(data)=>{
        this.setState({
            userPwd:data.nativeEvent.target.value
        })
    };
    getUserPwdAgain=(data)=>{
        this.setState({
            userPwdAgain:data.nativeEvent.target.value
        })
    }
    getEmail=(data)=>{
        this.setState({
            userEmail:data.nativeEvent.target.value
        })
    }

    getCode=(data)=>{
        this.setState({
            code:data.nativeEvent.target.value
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                md: {
                    span:6
                }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
                md: {
                    span:18
                }
            },
        };
        return (
            <div>
                <Modal
                    width={'40%'}
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        <Form {...formItemLayout}>
                            <Form.Item label='用户名'>
                                {getFieldDecorator('userName', {
                                    initialValue:this.state.userName,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入用户名',
                                        },
                                    ],
                                })(<Input allowClear placeholder="用户名" onChange={value=>{this.getUserName(value)}}/>)}
                            </Form.Item>
                            <Form.Item label='密码'>
                                {getFieldDecorator('password', {
                                    initialValue:this.state.userPwd,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码',
                                        },
                                    ],
                                })(<Input allowClear placeholder="密码"  onChange={value=>{this.getUserPwd(value)}}/>)}
                            </Form.Item>
                            <Form.Item label='重新输入'>
                                {getFieldDecorator('againPassword', {
                                    initialValue:this.state.userPwdAgain,
                                    rules: [
                                        {
                                            required: true,
                                            message: '再次输入密码',
                                        },
                                    ],
                                })(<Input allowClear placeholder="再次输入密码"  onChange={value=>{this.getUserPwdAgain(value)}}/>)}
                            </Form.Item>
                            <Form.Item label="邮箱">
                                {getFieldDecorator('email', {
                                    initialValue:this.state.userEmail,
                                    rules: [
                                        {
                                            type: 'email',
                                            message: '邮箱格式不正确',
                                        },
                                        {
                                            required: true,
                                            message: '请输入邮箱',
                                        },
                                    ],
                                })(<Input  allowClear placeholder="邮箱"  onChange={value=>{this.getEmail(value)}}/>)}
                            </Form.Item>
                            <Form.Item label="验证码"  style={{display:"flex",flexDirection:'row',alignItems:'center'}}>
                                <div style={{display:"flex",flexDirection:'row',alignItems:'center'}}>
                                    <div style={{flex:1}}>
                                        {getFieldDecorator('code', {
                                            initialValue:this.state.code,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入验证码',
                                                }
                                            ],
                                        })( <Input allowClear placeholder="验证码"  onChange={value=>{this.getCode(value)}}/>)}
                                    </div>
                                    <div style={{marginLeft:'10px',marginTop:'15px',width:'80px'}}>
                                        <p style={{color:'#fff',backgroundColor:'#444',lineHeight:'32px',paddingLeft:'5px',paddingRight:'5px'}}>获取验证码</p>
                                    </div>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connectAlita(['AddUser'])(Form.create()(AddUser));
