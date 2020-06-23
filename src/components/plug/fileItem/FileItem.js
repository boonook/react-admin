import React from 'react';
import { connectAlita } from 'redux-alita';
import {observer,inject} from 'mobx-react';
import {Button, Icon, Upload} from "antd";
import './fileItem.less'

@inject('appState') @observer
class FileItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList:[],
            multiple:'',///是否是多文件上传为multiple是多文件上传
            disabled:'',///是否允许操作为disabled时不允许操作
        }
    }
    componentDidMount(){
        this.setState({
            multiple:this.props.multiple?this.props.multiple:'',
            disabled:this.props.disabled?this.props.disabled:'',
            fileList:this.props.fileList||[],
        })
    }

    handleChange = info => {
        ////说明是多文件上传
        if(this.state.multiple+''==='multiple'){
            let fileList = [...this.state.fileList,...info.fileList];
            this.setState({
                fileList:fileList
            },()=>{
                this.props.getFile(this.state.fileList);
            })
        }else{
            let fileList = info.fileList;
            this.setState({
                fileList:[fileList[fileList.length-1]]
            },()=>{
                this.props.getFile(this.state.fileList);
            })
        }

    };

    onDelete=(data)=>{
        this.state.fileList.forEach((item,index)=>{
            if(item.fileName===data.fileName||item.name===data.name){
                this.state.fileList.splice(index,1);
            }
        });
        this.setState({
            fileList:this.state.fileList
        },()=>{
            this.props.getFile(this.state.fileList);
        })
    };

    render() {
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: this.handleChange,
            headers: {
                authorization: 'authorization-text',
            }
        };
        return (
            <div>
                <div>
                    {this.state.disabled+''==='disabled'?null:<Upload {...props} showUploadList={false} multiple={this.state.multiple+''==='multiple'?true:false}>
                        <Button>
                            <Icon type="upload" />上传附件
                        </Button>
                    </Upload>}
                    <ul className={'file_list_box'}>
                        {this.state.fileList.map((item,index)=>{
                            return <li key={index}>
                                <div className={'file_item'}>
                                    <div className={'file_item_name'}>
                                        {item.fileName||item.name}
                                    </div>
                                    {this.state.disabled+''==='disabled'?<div className={'file_item_down'}>
                                        <Icon size={20} className={'file_item_del_icon_down'} type={'download'}></Icon>
                                    </div>:null}
                                    {this.state.disabled+''==='disabled'?null:<div onClick={()=>{
                                        this.onDelete(item);
                                    }} className={'file_item_del'}>
                                        <Icon size={20} className={'file_item_del_icon'} type={'close-circle'}></Icon>
                                    </div>}
                                </div>
                            </li>
                         })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default connectAlita(['FileItem'])(FileItem);
