import React from 'react';
import { Input,Modal,Form } from 'antd';
import { connectAlita } from 'redux-alita';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false
        }
    }
    componentDidMount(){
        this.props.onRef(this)
        this.setState({
            visible:this.props.status
        })
    }

    myName=()=>{
        debugger
        this.setState({
            visible:true
        })
    };

    ///点击确定
    handleOk=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        // this.setState({
        //     visible:false
        // },()=>{
        //     this.props.RefreshTable('新增成功之后的会调');
        // })
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
                    width={400}
                    title="新增用户"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        <Form {...formItemLayout}>
                            <Form.Item label='用户名'>
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input allowClear placeholder="用户名" />)}
                            </Form.Item>
                            <Form.Item label='密码'>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input allowClear placeholder="密码" />)}
                            </Form.Item>
                            <Form.Item label='重新输入'>
                                {getFieldDecorator('againPassword', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input allowClear placeholder="再次输入密码" />)}
                            </Form.Item>
                            <Form.Item label="邮箱">
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input  allowClear placeholder="邮箱"/>)}
                            </Form.Item>
                            <Form.Item label="验证码">
                                <div style={{display:"flex",flexDirection:'row',alignItems:'center'}}>
                                    <div style={{flex:1}}>
                                        {getFieldDecorator('code', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your E-mail!',
                                                }
                                            ],
                                        })( <Input allowClear placeholder="验证码"/>)}
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
