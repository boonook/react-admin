/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {Button,Progress} from 'antd';
import {uploadFenPian} from '../../../../api/onlineTest'

class UploadDaTiJi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files:[],
            percent:0,
            time:0
        }
    }

    getFile=(e)=>{
        this.setState({
            files:e[0]
        })
    };

    onSubmit=()=>{
        let vm = this;
        let file = document.getElementById("file").files[0];
        vm.setState({
            time:new Date().getTime()
        },()=>{
            vm.filesUpload(file,1)
        })
    };

    filesUpload=(file,num)=>{
        const vm = this;
        let formData = new FormData();
        let blockSize = 1024 * 1024; // 每个文件切片大小定为1MB .
        //计算文件切片总数
        let blockNum = Math.ceil(file.size / blockSize);
        let nextSize = Math.min(num * blockSize, file.size);
        let fileData = file.slice((num - 1) * blockSize, nextSize);
        formData.append("file", fileData);
        formData.append("fileName", file.name + vm.state.time);
        uploadFenPian(formData).then(res=>{
            vm.setState({
                percent:(num/blockNum)*100
            });
            if(file.size<=nextSize){
               alert('上传成功')
            }
            vm.filesUpload(file,++num)
        })
    }

    render() {
        return (
            <div>
                <input type="file" name="file" id="file"/>
                <Progress percent={this.state.percent} strokeWidth={14} status="active" />
                <Button onClick={this.onSubmit}>提交</Button>
            </div>
        )
    }
}
export default UploadDaTiJi;
