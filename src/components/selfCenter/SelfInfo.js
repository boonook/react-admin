/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {Button} from 'antd'
import './SelfInfo.less';
import {base64Upload} from '../../api/uploadFile'
import Base64UploadModel from "../plug/base64UploadModel/Base64UploadModel";
import {observer,inject} from 'mobx-react';
import { editUserlist } from '../../api/user'
import {getFilePath} from '../../libs/tools'

@inject('appState') @observer
class SelfInfo extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
        filePath:'',
        base64:null
    };

    onUploadImage=()=>{
        this.imgCorpUpload.myName();
    };

    onRef = (ref) => {//react新版本处理方式
        this.imgCorpUpload = ref
    };

    onSave=(data,base64)=>{
        this.setState({
            filePath:data,
            base64
        })
    };

    onBase64Upload=()=>{
        let params={
            file:this.state.base64
        };
        base64Upload(params).then(res=>{
          if(res && res.code+''==='200'){
              let data =res.data||{};
               let p = {
                   id:this.props.appState.userInfo.id,
                   filePath:data.filePath
               };
              editUserlist(p).then(res=>{

              })
          }
        })
    };

    componentDidMount() {
        let userInfo = this.props.appState.userInfo;
        this.setState({
            filePath:getFilePath(userInfo.filePath),
            userEmail:userInfo.userEmail,
            userName:userInfo.userName
        })
    }

    render() {
        return (
            <div className="selfInfo_box" key={'SelfInfo'}>
                <div className={'selfInfo_box_div_box'}>
                    <div className={'selfInfo_box_div'}>
                        {/*用户头像*/}
                        <div className={'auther'} onClick={this.onUploadImage}>
                            <img alt="头像" style={{ width:"100%" }} src={this.state.filePath} />
                        </div>
                        {/*用户姓名*/}
                        <div className={'selfInfo_username'}>
                            <p>大地瓜</p>
                        </div>
                        <div>
                            <div className={'userInfo_card'} style={{ width: 500 }}>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                       姓名
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        {this.state.userName}
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        邮箱
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        {this.state.userEmail}
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        性别
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        男
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        手机号
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        177******71
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        家庭住址
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        湖北省武汉市
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        单位
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        武汉大海
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        部门
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        研发部
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        职位
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        web前端开发工程师
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <Button style={{width:'100%'}} onClick={this.onBase64Upload}>上传头像</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Base64UploadModel onRef={this.onRef} scale={1} onSave={this.onSave}></Base64UploadModel>
                </div>
            </div>
        )
    }
}

export default SelfInfo;
