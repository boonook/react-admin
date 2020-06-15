/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {Button, Pagination, Popconfirm, Table} from "antd";
import AddNews from "./commont/AddNews";
import {getNewslist,getNewsDetail} from '../../../api/newsManage'
import moment from "moment";

class newsCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[],
            columns:[
                {
                    title:'序号',
                    key: 'index',
                    width:70,
                    render:(text,record,index)=>{
                        return(
                            <span>{index+1}</span>
                        )
                    },
                },
                {
                    title: '标题',
                    dataIndex: 'title',
                    key: 'title',
                    align:'center',
                    width:100,
                    render: (row) => (
                        <div style={{textAlign:'left',overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                            {row}
                        </div>
                    )
                },
                {
                    title: '创建人',
                    dataIndex: 'userName',
                    key: 'userName',
                    align:'center',
                    width:100,
                },
                {
                    title: '创建时间',
                    dataIndex: 'createDate',
                    key: 'createDate',
                    align:'center',
                    width:120,
                    render: (row) => (
                        <div style={{textAlign:'center'}}>
                            {moment(row).format('YYYY-MM-DD')}
                        </div>
                    )
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    align:'center',
                    width:100,
                    render: (row) => (
                        <div style={{textAlign:'center',overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                            {row+''==='0'?'保存':'发布'}
                        </div>
                    )
                },
                {
                    title: '操作',
                    dataIndex: '',
                    key: 'x',
                    align:'center',
                    width:180,
                    render: (text, record) =>
                        <div>
                            {record.status+''==='0'?<div>
                                <Popconfirm
                                    title="你确定要删除吗?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => this.handleDelete(record)}>
                                    <span  style={{cursor:'pointer'}}>删除</span>
                                </Popconfirm>
                                <span style={{marginLeft:'5px',cursor:'pointer'}} onClick={()=>this.onEditor(record)}>编辑</span>
                                <Popconfirm
                                    title="你确定要发布吗?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => this.handleDelete(record)}>
                                    <span  style={{cursor:'pointer',marginLeft:'5px'}}>发布</span>
                                </Popconfirm>
                            </div>:<div>
                                <span style={{marginLeft:'5px',cursor:'pointer'}} onClick={()=>this.onView(record)}>查看</span>
                            </div>}

                        </div>
                },
            ],
            page:1,
            pageSize:10
        };
    }


    ///添加新闻
    onAddNews=()=>{
        this.child.myName('add',null)
    };

    onRef = (ref) => {//react新版本处理方式
        this.child = ref
    };

    onChange=(data)=>{
        this.setState({
            page:data
        },()=>{
            this.getDada()
        })
    };

    getDada=()=>{
        let params={
            page:this.state.page,
            pageSize:this.state.pageSize
        };
        getNewslist(params).then(res=>{
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

    onView=(data)=>{
        getNewsDetail(data.id).then(res=>{

        })
    };

    componentDidMount(){
        this.getDada();
    }

    onEditor=(data)=>{
        this.child.myName('edit',data)
        // getNewsDetail(data.id).then(res=>{
        // })
    }

    render() {
        return (
            <div className="gutter-example button-demo" key={'newsCenter'}>
                <p style={{backgroundColor:'orange',padding:'15px',color:'#fff'}}>新闻中心</p>
                <div style={{textAlign:'right',marginBottom:'10px'}}>
                    <Button onClick={this.onAddNews} type="primary">新增</Button>
                </div>
                <Table pagination={false} dataSource={this.state.dataSource} columns={this.state.columns} />
                <div style={{marginTop:'20px',textAlign:'right'}}>
                    <Pagination onChange={this.onChange} defaultCurrent={1} total={2} />
                </div>
                <AddNews onRef={this.onRef} RefreshTable={this.RefreshTable}></AddNews>
            </div>
        )
    }
}

export default newsCenter;
