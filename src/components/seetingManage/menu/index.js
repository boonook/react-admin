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
            data.push({
                id:0,
                path:'',
            })
            /**
             * 将一维的扁平数组转换为多层级对象
             * @param  {[type]} list 一维数组，数组中每一个元素需包含id和parent_id两个属性 
             * @return {[type]} tree 多层级树状结构
             */
            function buildTree(list){
                let temp = {};
                let tree = {};
                for(let i in list){
                    temp[list[i].id] = list[i];
                }
                for(let i in temp){
                    if(temp[i].menuParentId) {
                        if(!temp[temp[i].menuParentId].children) {
                            temp[temp[i].menuParentId].children = new Object();
                        }
                        temp[temp[i].menuParentId].children[temp[i].id] = temp[i];
                    } else {
                        tree[temp[i].id] =  temp[i];
                    }
                }
                return tree;
            }
            let result = buildTree(data);
            let datalist = result[0].children;
            debugger
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
          
          const data = [
            {
              key: 1,
              name: '统计分析',
              menuParentId:0,
              children: [
                {
                  key: 11,
                  name: '学习统计',
                },
                {
                  key: 12,
                  name: '党员统计',
                }, 
              ],
            },
            {
              key: 2,
              name: '学习管理',
              menuParentId:0,
              children: [
                {
                  key: 21,
                  name: '在线考试',
                },
              ],
            },
            {
                key: 3,
                name: '新闻管理',
                menuParentId:0,
                children: [
                  {
                    key: 31,
                    name: '新闻通知',
                  },
                  {
                    key: 32,
                    name: '新闻中心',
                  },
                ],
            },
            {
                key: 4,
                name: '系统管理',
                menuParentId:0,
                children: [
                  {
                    key: 41,
                    name: '用户管理',
                  },
                  {
                    key: 42,
                    name: '角色管理',
                  },
                  {
                    key: 42,
                    name: '菜单管理',
                  },
                ],
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
