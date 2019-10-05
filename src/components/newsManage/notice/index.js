/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {Upload,Button,Icon} from 'antd';
import {upload} from '../../../api/uploadFile';

class notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            file:null
        };
    }

    componentDidMount(){

    }

    onUpload=()=>{
        let params={
            file:this.state.file
        };
        // let params={
        //     id:1,
        //     name:'boonook'
        // }
        upload(params).then(res=>{

        })
    };

    handleChange = info => {
        this.setState({
            file:info.file
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
            <div className="gutter-example button-demo">
                <p>通知公告</p>
                <Upload {...props} fileList={this.state.fileList}>
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
                <Button onClick={()=>{
                    this.onUpload()
                }}>上传文件</Button>
            </div>
        )
    }
}

export default notice;
