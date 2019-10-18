import React from 'react';
import {Input, Modal, Form} from 'antd';
import { connectAlita } from 'redux-alita';
import {observer,inject} from 'mobx-react';
import Wysiwyg from "../../../ui/Wysiwyg";
import {base64Upload} from "../../../../api/uploadFile";
import { addNewslist,getNewsDetail } from '../../../../api/newsManage';
import {getFilePath} from '../../../../libs/tools'
import Base64UploadModel from "../../../plug/base64UploadModel/Base64UploadModel";
@inject('appState') @observer
class AddNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            remark:'',
            title:'',
            content:'',
            summary:'',
            file:[],
            data:null,
            filePath:null,
            base64:null
        }
    }
    componentDidMount(){
        this.props.onRef(this);
        this.setState({
            visible:this.props.status
        })
    }

    myName=(status,data)=>{
        if(status+''==='edit'){
            this.setState({
                visible:true,
                status:'edit',
                data:data
            },()=>{
                this.getDetail(data.id||'');
            });
        }else{
            this.setState({
                visible:true,
                status:'add',
                data:data
            });
        }

    };

    getDetail=(id)=>{
        getNewsDetail(id).then(res=>{
            if(res && res.code+''==='200'){
                let data = res.data||{};
               this.setState({
                   remark:data.remark,
                   title:data.title,
                   content:data.content,
                   summary:data.summary,
                   filePath:getFilePath(data.filePath),
                   file:[{name:data.filePath}],
               },()=>{
                   console.log(this)
               })
            }
        })
    };

    ///点击确定
    handleOk=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let p={
                    file:this.state.base64
                };
                base64Upload(p).then(res=>{
                    if(res && res.code+''==='200'){
                        let data =res.data||{};
                        let p = {
                            ...this.state,
                            filePath:data.filePath||'',
                            createUserId:this.props.appState.userInfo.id
                        };
                        addNewslist(p).then(re=>{
                            if(re && re.code+'' ==='200'){

                            }
                        })
                    }
                });
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

    getFile=(data)=>{
        this.setState({
            file:data[0]
        })
    };

    onRef = (ref) => {//react新版本处理方式
        this.imgCorpUpload = ref
    };

    onUploadImage=()=>{
        this.imgCorpUpload.myName();
    };

    onSave=(data,base64)=>{
        this.setState({
            filePath:data,
            base64
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
                            <Form.Item label='封面图片'>
                                {getFieldDecorator('content', {
                                    initialValue:this.state.content,
                                    rules: [
                                        {
                                            required: true,
                                            message: '内容',
                                        },
                                    ],
                                })(<div>
                                    <div onClick={this.onUploadImage} style={{width:'200px',height:'100px',backgroundColor:'#f4f4f4'}}>
                                        <img src={this.state.filePath} width={200} height={100} alt=""/>
                                    </div>
                                </div>)}
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
                                   <Wysiwyg data={this.state.content} getContent={this.getContent}></Wysiwyg>
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
                    <Base64UploadModel onRef={this.onRef} scale={2} onSave={this.onSave}></Base64UploadModel>
                </Modal>
            </div>
        )
    }
}

export default connectAlita(['AddNews'])(Form.create()(AddNews));
