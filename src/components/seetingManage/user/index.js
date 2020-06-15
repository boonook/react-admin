/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {Table, Button,Popconfirm,Pagination} from 'antd';
import moment from "moment";
import {getUserlist,delUserlist} from '../../../api/user';
import AddUser from './commont/AddUser'
import AssignPermissions from "./commont/AssignPermissions";

class user extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'default',
            loading: false,
            iconLoading: false,
            dataSource:[],
            columns:[
                {
                    title:'序号',
                    key: 'index',
                    render:(text,record,index)=>{
                        return(
                            <span>{index+1}</span>
                        )
                    },
                },
                {
                    title: '用户名',
                    dataIndex: 'userName',
                    key: 'userName',
                    align:'center',
                    render: (row) => (
                        <div style={{textAlign:'left'}}>
                            {row}
                        </div>
                    )
                },
                {
                    title: '用户邮箱',
                    dataIndex: 'userEmail',
                    key: 'userEmail',
                    align:'center'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createDate',
                    key: 'createDate',
                    align:'center',
                    render: (row) => (
                        <div style={{textAlign:'center'}}>
                            {moment(row).format('YYYY-MM-DD')}
                        </div>
                    )
                },
                {
                    title: '操作',
                    dataIndex: '',
                    key: 'x',
                    align:'center',
                    render: (text, record) =>
                        <div>
                            <Popconfirm
                                title="你确定要删除吗?"
                                okText="确定"
                                cancelText="取消"
                                onConfirm={() => this.handleDelete(record)}>
                                <span  style={{cursor:'pointer'}}>删除</span>
                            </Popconfirm>
                            <span style={{marginLeft:'5px',cursor:'pointer'}} onClick={()=>this.onEditor(record)}>编辑</span>
                            <span style={{marginLeft:'5px',cursor:'pointer'}} onClick={()=>this.onAssignPermissions(record)}>分配权限</span>
                        </div>
                },
            ],
            status:false,
            page:1,
            rowData:{},
            assignPermissionShow:false,
        };
    }

    componentDidMount(){
        this.getUserData();
    }

    ///获取用户列表
    getUserData=()=>{
        let params={
            page:this.state.page,
            pageSize:10
        };
        getUserlist(params).then(res=>{
            if(res && res.code+''==='200'){
                if(res.rel){
                    let data = res.data||{};
                    this.setState({
                        dataSource:data
                    });
                }
            }
        })
    };

    ///新增用户
    onAddUser=()=>{
        this.child.myName('add',null)
    };


    RefreshTable=(data)=>{
        alert(data);
    };

    onRef = (ref) => {//react新版本处理方式
        this.child = ref
    };

    onRefs=(ref)=>{
        this.childs = ref
    };

    ///删除用户
    handleDelete=(data)=>{
        let id = data.id||'';
        delUserlist(id).then(res=>{
          if(res && res.code+''==='200'){
              this.setState({
                  page:1
              },()=>{
                  this.getUserData();
              });
          }
        })
    };

    onChange=(data)=>{
      this.setState({
          page:data
      },()=>{
          this.getUserData()
      })
    };

    ////编辑
    onEditor=(data)=>{
        this.child.myName('edit',data.id||'')
    };

    ///编辑成功之后的会调
    RefreshTable=()=>{
        this.getUserData();
        this.setState({
            assignPermissionShow:false
        })
    };

    onAssignPermissions=(data)=>{
        ////分配权限
        this.setState({
            assignPermissionShow:true,
            rowData:data||{}
        },()=>{
            this.childs.myName(true);
        })
    };

    onCancel=()=>{
        this.setState({
            assignPermissionShow:false
        })
    }

    render() {
        return (
            <div className="gutter-example button-demo" key={'user'}>
                <p style={{backgroundColor:'orange',padding:'15px',color:'#fff'}}>用户管理</p>
                <div style={{textAlign:'right',marginBottom:'10px'}}>
                    <Button onClick={this.onAddUser} type="primary">新增</Button>
                </div>
                <Table pagination={false} dataSource={this.state.dataSource} columns={this.state.columns} />
                <div style={{marginTop:'20px',textAlign:'right'}}>
                    <Pagination onChange={this.onChange} defaultCurrent={1} total={11} />
                </div>
                <AddUser onRef={this.onRef} status={this.state.status} RefreshTable={this.RefreshTable}></AddUser>
                {this.state.assignPermissionShow?<AssignPermissions data={this.state.rowData} onCancel={this.onCancel}  onRef={this.onRefs} RefreshTable={this.RefreshTable}></AssignPermissions>:null}
            </div>
        )
    }
}

export default user;
