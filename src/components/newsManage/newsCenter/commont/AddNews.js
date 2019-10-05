import React from 'react';
import {Input, Modal, Form} from 'antd';
import { connectAlita } from 'redux-alita';
import {observer,inject} from 'mobx-react';
import Wysiwyg from "../../../ui/Wysiwyg";
import {addNewslist} from '../../../../api/newsManage'

@inject('appState') @observer
class AddNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            remark:'',
            title:'',
            content:'',
            summary:''
        }
    }
    componentDidMount(){
        this.props.onRef(this);
        this.setState({
            visible:this.props.status
        })
    }

    myName=()=>{
        this.setState({
            visible:true
        });
    };

    ///点击确定
    handleOk=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
               let params ={
                   ...this.state,
                   createUserId:this.props.appState.userInfo.id
               };
                addNewslist(params).then(res=>{
                   debugger
                })
            }
        });
    };
    ///取消
    handleCancel=()=>{
        this.setState({
            visible:false
        })
    }
    ///标题
    getTitle=(data)=>{
        this.setState({
            title:data.nativeEvent.target.value
        })
    };
    ///摘要
    getSummary=(data)=>{
        this.setState({
            remark:data.nativeEvent.target.value
        })
    };

    getRemark=(data)=>{
        this.setState({
            summary:data.nativeEvent.target.value
        })
    };

    getContent=(data)=>{
      this.setState({
          content:data
      },()=>{
          console.log(this.state.content);
      })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                md: {
                    span:4
                }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
                md: {
                    span:20
                }
            },
        };
        return (
            <div>
                <Modal
                    width={'60%'}
                    title={'添加新闻'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        <Form {...formItemLayout}>
                            <Form.Item label='标题'>
                                {getFieldDecorator('title', {
                                    initialValue:this.state.title,
                                    rules: [
                                        {
                                            required: true,
                                            message: '标题',
                                        },
                                    ],
                                })(<Input.TextArea autosize placeholder="标题" onChange={value=>{this.getTitle(value)}}/>)}
                            </Form.Item>
                            <Form.Item label='摘要'>
                                {getFieldDecorator('summary', {
                                    initialValue:this.state.summary,
                                    rules: [
                                        {
                                            required: true,
                                            message: '摘要',
                                        },
                                    ],
                                })(<Input.TextArea autosize placeholder="摘要" onChange={value=>{this.getSummary(value)}}/>)}
                            </Form.Item>
                            <Form.Item label='内容'>
                                {getFieldDecorator('content', {
                                    initialValue:this.state.content,
                                    rules: [
                                        {
                                            required: true,
                                            message: '内容',
                                        },
                                    ],
                                })(<div style={{backgroundColor:'#ddd'}}>
                                   <Wysiwyg getContent={this.getContent}></Wysiwyg>
                                </div>)}
                            </Form.Item>
                            <Form.Item label='备注'>
                                {getFieldDecorator('remark', {
                                    initialValue:this.state.remark,
                                    rules: [
                                        {
                                            required: false,
                                            message: '备注',
                                        },
                                    ],
                                })(<Input.TextArea autosize placeholder="备注" onChange={value=>{this.getRemark(value)}}/>)}
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connectAlita(['AddNews'])(Form.create()(AddNews));
