/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {Button, Table, Pagination, Popconfirm} from 'antd';
import {getFilelist,delFilelist} from '../../../api/file'
import AddFile from "./commont/AddFile";
import moment from 'moment'
import {baseUrl} from '../../../axios/axios_request'

class notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            file:null,
            files:[],
            dataSource:[],
            total:0,
            page:1,
            pageSize:10,
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
                    title: '文件名',
                    dataIndex: 'fileName',
                    key: 'fileName',
                    align:'center',
                    width: 150,
                    onCell: () => {
                        return {
                            style: {
                                maxWidth: 200,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer'
                            }
                        }},
                    render: (row) => (
                        <div style={{textAlign:'left',overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                            {row}
                        </div>
                    )
                },
                {
                    title: '文件路径',
                    dataIndex: 'filePath',
                    key: 'filePath',
                    align:'center',
                    width: 150,
                    onCell: () => {
                        return {
                            style: {
                                maxWidth: 300,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer'
                            }
                        }},
                    render: (row) => (
                        <div style={{textAlign:'left',overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                            {row}
                        </div>
                    )
                },
                {
                    title: '创建时间',
                    dataIndex: 'createDate',
                    key: 'createDate',
                    align:'center',
                    render: (row) => (
                        <div style={{textAlign:'left',overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                            {moment(row).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                    )
                },
                {
                    title: '操作',
                    dataIndex: '',
                    key: 'x',
                    align:'center',
                    onCell: () => {
                        return {
                            style: {
                                width: 200,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer'
                            }
                        }},
                    render: (text, record) =>
                        <div>
                            <div>
                                <Popconfirm
                                    title="你确定要删除吗?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => this.handleDelete(record)}>
                                    <span  style={{cursor:'pointer'}}>删除</span>
                                </Popconfirm>
                                <span style={{marginLeft:'5px',cursor:'pointer'}} onClick={()=>this.onEditor(record)}>编辑</span>
                                <span style={{marginLeft:'5px',cursor:'pointer'}} onClick={()=>this.onView(record)}>查看</span>
                                <span style={{marginLeft:'5px',cursor:'pointer'}} onClick={()=>this.onDownload(record)}>瞎子啊</span>
                            </div>
                        </div>
                }
            ]
        };
    }

    componentDidMount(){
        this.getList();
    }

    getList=()=>{
        let params={
            page:this.state.page,
            pageSize:this.state.pageSize
        };
        getFilelist(params).then(res=>{
            if(res && res.code+''==='200'){
               let data = res.data||{};
               this.setState({
                   dataSource:data.data,
                   total:data.total||0
               })
            }
        })
    }

    handleChange = info => {
        this.setState({
            file:info.file
        })
    };

    onAddUser=()=>{
        this.imgCorpUpload.myName()
    };

    onRef = (ref) => {//react新版本处理方式
        this.imgCorpUpload = ref
    };

    onAddNews=()=>{
        this.imgCorpUpload.myName('add',null)
    }

    getFile=(data)=>{
        this.setState({
            files:data
        })
    };

    onChange=(data)=>{
        this.setState({
            page:data
        },()=>{
            this.getList()
        })
    };

    handleDelete=(data)=>{
        delFilelist(data.id).then(res=>{
            if(res && res.code+''==='200'){
                this.setState({
                    page:1
                },()=>{
                    this.getList();
                })
            }
        })
    };

    onDownload=(data)=>{
        console.log(baseUrl)
        //window.open(baseUrl+'/api/ilab/downFile/download?filePath=PC_Supermarket.exe','_blank');
    }

    render() {
        return (
            <div className="gutter-example button-demo">
                <p style={{backgroundColor:'orange',padding:'15px',color:'#fff'}}>文件管理</p>
                <div style={{textAlign:'right',marginBottom:'10px'}}>
                    <Button onClick={this.onAddNews} type="primary">新增</Button>
                </div>
                <Table pagination={false} dataSource={this.state.dataSource} columns={this.state.columns} />
                <div style={{marginTop:'20px',textAlign:'right'}}>
                    <Pagination onChange={this.onChange} defaultCurrent={1} total={this.state.total} />
                </div>
                <div>
                    <AddFile onRef={this.onRef}></AddFile>
                </div>
            </div>
        )
    }
}

export default notice;
