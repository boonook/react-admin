import React from 'react';
import {Modal,Checkbox,Row,Col } from 'antd';
import {getRoleList,getUserRoleList,editUserRole} from '../../../../api/user';
import './style.less';

class AssignPermissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            title:'权限分配',
            orgRoleList:[],
            roleList:[],
            selfRoleList:[],
            defaultValue:[],
            data:{},
            dataLeft:[],
            dataRight:[]
        }
    }
    componentDidMount(){
        this.props.onRef(this);
        this.setState({
            data:this.props.data,
            orgRoleList:[],
            roleList:[],
            selfRoleList:[],
            defaultValue:[],
            dataLeft:[],
            dataRight:[]
        },()=>{
            this.getRoleList();
        })
    }

    myName=(data)=>{
        this.setState({
            visible:data
        });
    };

    onChangeLeft=(data)=>{
        this.setState({
            dataLeft:data
        })
    };
    onChangeRight=(data)=>{
        this.setState({
            dataRight:data
        })
    };

    getRoleList=()=>{
        getRoleList().then(res=>{
            if(res && res.code+''==='200'){
                let data = res.data||[];
                this.setState({
                    orgRoleList:data,
                },()=>{
                    this.getUserRoleList();
                })
            }
        })
    };

    ///数组去重
    uniqueArray=(array, key)=>{
        if(array.length>0){
            let result = [array[0]];
            for(let i = 1; i < array.length; i++){
                let item = array[i];
                let repeat = false;
                for (let j = 0; j < result.length; j++) {
                    if (item[key] === result[j][key]) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat && item[key]!==null) {
                    result.push(item);
                }
            }
            return result || [];
        }else{
            return [];
        }
    }

    deleteArray=(parentArray,childrenArray,key)=>{
        if (childrenArray.length===0){
            return parentArray;
        }else{
            let arr_null=[];
            for(let arr_1=0;arr_1<parentArray.length;arr_1++){
                let ss=true;
                let aa=true;
                for(let arr_2=0;arr_2<childrenArray.length;arr_2++){
                    if(parentArray[arr_1].Id!==childrenArray[arr_2].Id && aa===true){
                        ss=false;
                    }
                    else{
                        ss=true;
                        aa=false;
                    }
                }
                if(ss===false){
                    let pro_sum=parentArray[arr_1];
                    arr_null.push(pro_sum);
                }
            }
            return arr_null;
        }
    }

    getUserRoleList=()=>{
        let id = this.state.data?(this.state.data.id?this.state.data.id:''):'';
        getUserRoleList(id).then(res=>{
            if(res && res.code+''==='200'){
               let data = res.data||[];
               let list = this.deleteArray(this.state.orgRoleList,data,'Id');
               this.setState({
                   selfRoleList:data,
                   roleList:list
               })
            }
        })
    }

    handleCancel=()=>{
        this.props.onCancel()
    };

    onDel=()=>{
        ////添加到右侧
       console.log(this.state.dataLeft);
        this.state.orgRoleList.forEach(item=>{
            this.state.dataLeft.forEach(it=>{
                if(item.Id+''===(it+'')){
                    this.state.roleList.push(item);
                    this.state.selfRoleList.forEach((i,index)=>{
                        if(i.Id===item.Id){
                            this.state.selfRoleList.splice(index,1);
                        }
                    });
                    this.setState({
                        selfRoleList: this.uniqueArray(this.state.selfRoleList,'Id'),
                        roleList: this.uniqueArray(this.state.roleList,'Id')
                    })
                }})
        })
    };

    onAdd=()=>{
        ///添加到左侧
        this.state.orgRoleList.forEach(item=>{
            this.state.dataRight.forEach(it=>{
                if(item.Id+''===(it+'')){
                    this.state.selfRoleList.push(item);
                    this.state.roleList.forEach((i,index)=>{
                        if(i.Id===item.Id){
                            this.state.roleList.splice(index,1);
                        }
                    });
                    this.setState({
                        selfRoleList: this.uniqueArray(this.state.selfRoleList,'Id'),
                        roleList: this.uniqueArray(this.state.roleList,'Id')
                    });
                }
            })
        })
    };

    ////点击去定保存数据
    handleOk=()=>{
        let id = this.state.data?(this.state.data.id?this.state.data.id:''):'';
        let roleId = [];
        console.log('---------------------------',this.state.selfRoleList)
        this.state.selfRoleList.forEach(item=>{
            if(item.Id){
                roleId.push(item.Id);
            }
        });
        let params ={
            id:id,
            roleId:roleId.toString()
        }
        console.log('params----------',params);
        editUserRole(params).then(res=>{
            if(res && res.code+''==='200'){
                this.setState({
                    visible:false
                },()=>{
                    this.props.RefreshTable()
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Modal
                    width={'50%'}
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        <div className="assignPermissionsContent">
                            <div className="assignPermissionsContent_item">
                                <p>当前用户角色</p>
                                <Checkbox.Group style={{ width: '100%' }} onChange={this.onChangeLeft}>
                                    <Row>
                                        {this.state.selfRoleList.map((item,index)=>{
                                            if(item.Id){
                                                return ( <Col span={24} key={index}>
                                                    <Checkbox value={item.Id}>{item.roleName}</Checkbox>
                                                </Col>)
                                            }else{
                                                return null
                                            }
                                        })}
                                    </Row>
                                </Checkbox.Group>
                            </div>
                            <div className="assignPermissionsContent_item assignPermissionsContent_item_btn">
                                <div onClick={this.onAdd}>添加</div>
                                <div onClick={this.onDel}>删除</div>
                            </div>
                            <div className="assignPermissionsContent_item">
                                <p>所有剩余角色</p>
                                <Checkbox.Group style={{ width: '100%' }}  onChange={this.onChangeRight}>
                                    <Row>
                                        {this.state.roleList.map((item,index)=>{
                                            if(item.Id){
                                                return ( <Col span={24} key={index}>
                                                    <Checkbox value={item.Id}>{item.roleName}</Checkbox>
                                                </Col>)
                                            }else{
                                                return null
                                            }
                                        })}
                                    </Row>
                                </Checkbox.Group>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default AssignPermissions;
