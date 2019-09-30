import React from 'react';
import { Input,Modal,Form } from 'antd';
import { connectAlita } from 'redux-alita';
import {addRolelist,getRolelistDetail,editRolelist} from '../../../../api/role'

class AddRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            title:'添加角色',
            status:'add',
            roleName:'',
            roleNice:''
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
            visible:true
        });
        if(status+''==='edit'){
            getRolelistDetail(data.Id||"").then(res=>{
                if(res && res.code+''==='200'){
                    let data = res.data||{};
                    this.setState({
                        ...data,
                        title:'编辑角色',
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
                    roleName:this.state.roleName,
                    roleNice:this.state.roleNice,
                };
                if(this.state.status==='edit'){
                    params.id = this.state.Id||'';
                    editRolelist(params).then(res=>{
                        if(res && res.code+''==='200'){
                            this.setState({
                                roleName:'',
                                roleNice:'',
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
                    addRolelist(params).then(res=>{
                        if(res && res.code+''==='200'){
                            this.setState({
                                roleName:'',
                                roleNice:'',
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
            roleName:'',
        },()=>{
            this.setState({
                visible:false
            })
        })
    }
    getRoleName=(data)=>{
        this.setState({
            roleName:data.nativeEvent.target.value
        })
    };
    getRoleNice=(data)=>{
        this.setState({
            roleNice:data.nativeEvent.target.value
        })
    };

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
                            <Form.Item label='角色名'>
                                {getFieldDecorator('userName', {
                                    initialValue:this.state.roleName,
                                    rules: [
                                        {
                                            required: true,
                                            message: '角色名',
                                        },
                                    ],
                                })(<Input allowClear placeholder="用户名" onChange={value=>{this.getRoleName(value)}}/>)}
                            </Form.Item>
                            <Form.Item label='角色昵称'>
                                {getFieldDecorator('password', {
                                    initialValue:this.state.roleNice,
                                    rules: [
                                        {
                                            required: true,
                                            message: '角色昵称',
                                        },
                                    ],
                                })(<Input allowClear placeholder="角色昵称"  onChange={value=>{this.getRoleNice(value)}}/>)}
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connectAlita(['AddRole'])(Form.create()(AddRole));
