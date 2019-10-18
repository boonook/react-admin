import React from 'react';
import {Modal, Form} from 'antd';
import { connectAlita } from 'redux-alita';
import {observer,inject} from 'mobx-react';
import FileItem from "../../../plug/fileItem/FileItem";
import {uploadMore} from "../../../../api/uploadFile";
@inject('appState') @observer
class AddFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            files:[],
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

    };

    ///取消
    handleCancel=()=>{
        this.setState({
            visible:false
        })
    };

    getFile=(data)=>{
        this.setState({
            files:data
        })
    };

    handleOk=()=>{
        let params={
            files:this.state.files
        };
        uploadMore(params).then(res=>{

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
                            <Form.Item label='上传文件'>
                                {getFieldDecorator('files', {
                                    initialValue:this.state.files,
                                    rules: [
                                        {
                                            required: true,
                                            message: '上传文件',
                                        },
                                    ],
                                })(<div>
                                    <FileItem getFile={this.getFile} fileList={this.state.file}></FileItem>
                                </div>)}
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connectAlita(['AddFile'])(Form.create()(AddFile));
