/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {Button, Table} from "antd";
import {getRolelist} from '../../../api/role'

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
                }
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

    render() {
        return (
            <div className="gutter-example button-demo">
                <p style={{backgroundColor:'orange',padding:'15px',color:'#fff'}}>角色管理</p>
                <div style={{textAlign:'right',marginBottom:'10px'}}>
                    <Button onClick={this.onAddUser} type="primary">新增</Button>
                </div>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />
            </div>
        )
    }
}

export default role;
