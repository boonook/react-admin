/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {Button} from "antd";
import UploadDaTiJi from './commont/UploadDaTiJi'

class onlineTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            files:[],
        }
    }

    onUploadDaTiJi=()=>{
        debugger
    }


    render() {
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
            <div className="gutter-example button-demo" key={'onlineTest'}>
                <p style={{backgroundColor:'orange',padding:'15px',color:'#fff'}}>在线考试</p>
                <div style={{textAlign:'right',marginBottom:'10px'}}>
                    <Button onClick={this.onUploadDaTiJi} type="primary">大文件上传</Button>
                </div>
                <UploadDaTiJi/>
            </div>
        )
    }
}

export default onlineTest;
