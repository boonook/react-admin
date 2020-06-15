/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {Button, Popconfirm, Table} from "antd";
import {getRolelist,delRolelist} from '../../../api/role'
import AddRole from "./commont/AddRole";

class role extends React.Component {
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
                    title: '角色名',
                    dataIndex: 'roleName',
                    key: 'roleName',
                    align:'center',
                    render: (row) => (
                        <div style={{textAlign:'left'}}>
                            {row}
                        </div>
                    )
                },
                {
                    title: '操作',
                    dataIndex: '',
                    key: 'x',
                    width:160,
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
                            <span style={{marginLeft:'5px',cursor:'pointer'}} onClick={()=>this.onAssignPermissions(record)}>分配菜单</span>
                        </div>
                },
            ],
        };
    }

    componentDidMount() {
        this.getRoleData();
    }

    getRoleData(){
        getRolelist().then(res=>{
            if(res && res.code+''==='200'){
                if(res.rel){
                    let data = res.data||{};
                    this.setState({
                        dataSource:data
                    });
                }
            }
        })
    }

    handleDelete=(data)=>{
        delRolelist(data.Id||'').then(res=>{
            if(res && res.code+''==='200'){
                this.getRoleData();
            }
        })
    };

    onAddRole=(data)=>{
        this.child.myName('add',null)
    };

    onEditor=(data)=>{
        this.child.myName('edit',data)
    };


    onRef = (ref) => {//react新版本处理方式
        this.child = ref
    };

    RefreshTable=()=>{
        this.getRoleData();
    };

    render() {
        return (
            <div className="gutter-example button-demo" key={'role'}>
                <p style={{backgroundColor:'orange',padding:'15px',color:'#fff'}}>角色管理</p>
                <div style={{textAlign:'right',marginBottom:'10px'}}>
                    <Button onClick={this.onAddRole} type="primary">新增</Button>
                </div>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                <div>
                    <AddRole  onRef={this.onRef} status={this.state.status} RefreshTable={this.RefreshTable}></AddRole>
                </div>
            </div>
        )
    }
}

export default role;
