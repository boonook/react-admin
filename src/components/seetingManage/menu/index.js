import React from 'react';
import {Table,Divider} from 'antd';
import {getMenu} from '@/api/menu'

class menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[]
        };
    }

    getInit=()=>{
        getMenu().then(res=>{
            let data = res.data||[];
            data.forEach(item=>{
                item.key=item.id;
                item.name=item.menuName;
            })
            ////
            function buildTree(list){
              let dataArray = [];
              list.forEach(item=>{
                if(item.menuParentId ==='0'){
                  dataArray.push(item);
                }
              });
              return data2treeDG(list, dataArray);
            }
            function data2treeDG(datas, dataArray){
              dataArray.forEach(item=>{
                let childrenArray = [];
                let CATL_CODEP = item.id;
                datas.forEach(items=>{
                  let data = items;
                  let CATL_PARENT = data.menuParentId;
                  if(CATL_CODEP==CATL_PARENT){
                    childrenArray.push(items);
                  }
                });
                if(childrenArray.length > 0) {//有儿子节点则递归
                  item.children = childrenArray;
                  data2treeDG(datas, childrenArray);
                }
              });
              return dataArray;
            }
            let datalist = buildTree(data);
            this.setState({
                list:datalist
            },()=>{
                console.log('this.state.list',this.state.list);
            })
        })
    }

    componentDidMount() {
        this.getInit();
    }

    onShow=()=>{

    };

    onCheck=(data)=>{

    }

    render() {
        const columns = [
          {
            title: '菜单名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
              title: '操作',
              key: 'action',
              align:'right',
              render: (text, record) => {
                  console.log('record',record);
                  console.log('text',text);
                  if(record.menuParentId==0){
                      return (
                          <span>
                              <a>新增</a>
                              <Divider type="vertical" />
                              <a>修改</a>
                              <Divider type="vertical" />
                              <a>删除</a>
                          </span>
                      )
                  }else{
                      return (
                          <span>
                              <a>修改</a>
                              <Divider type="vertical" />
                              <a>删除</a>
                          </span>
                      )
                  }
              },
          },
        ];

        return (
            <div key={'menu'}>
                <p style={{backgroundColor:'orange',padding:'15px',color:'#fff'}}>菜单管理</p>
                <div>
                <Table pagination={false} columns={columns} dataSource={this.state.list} />
                </div>
            </div>
        )
    }
}

export default menu;
