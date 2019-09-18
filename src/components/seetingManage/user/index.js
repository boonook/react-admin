/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {Table, Button,Popconfirm} from 'antd';
import moment from "moment";
import {getUserlist} from '../../../api/user';
import AddUser from './commont/AddUser'

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
                    title: '用户角色',
                    dataIndex: 'roleName',
                    key: 'roleName',
                    align:'center',
                    render:(row)=>(
                        <div style={{textAlign:'center'}}>
                            {row||'---'}
                        </div>
                    )
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
                            <Popconfirm title="你确定要删除吗?" onConfirm={() => this.handleDelete(record)}>
                                <span>删除</span>
                            </Popconfirm>
                            <span style={{marginLeft:'5px',cursor:'pointer'}} onClick={this.demo}>分配权限</span>
                        </div>
                },
            ],
            status:false
        };
    }

    componentDidMount(){
        this.getUserData();
    }

    ///获取用户列表
    getUserData=()=>{
        getUserlist().then(res=>{
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
        this.child.myName()
    };

    RefreshTable=(data)=>{
        alert(data);
    };

    onRef = (ref) => {//react新版本处理方式
        this.child = ref
    };

    handleDelete=(data)=>{
        debugger
    }

    demo=()=>{
        debugger
    }

    render() {
        return (
            <div className="gutter-example button-demo">
                <p style={{backgroundColor:'orange',padding:'15px',color:'#fff'}}>用户管理</p>
                <div style={{textAlign:'right',marginBottom:'10px'}}>
                    <Button onClick={this.onAddUser} type="primary">新增</Button>
                </div>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                <AddUser onRef={this.onRef} status={this.state.status} RefreshTable={this.RefreshTable}></AddUser>
            </div>
        )
    }
}

export default user;
