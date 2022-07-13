import React from 'react';
import {Table,Divider} from 'antd';

class menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

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
              age: 60,
              menuParentId:0,
              address: 'New York No. 1 Lake Park',
              children: [
                {
                  key: 11,
                  name: '学习统计',
                  age: 42,
                  address: 'New York No. 2 Lake Park',
                },
                {
                  key: 12,
                  name: '党员统计',
                  age: 30,
                  address: 'New York No. 3 Lake Park',
                }, 
              ],
            },
            {
              key: 2,
              name: '学习管理',
              age: 32,
              menuParentId:0,
              address: 'Sidney No. 1 Lake Park',
              children: [
                {
                  key: 21,
                  name: '在线考试',
                  age: 42,
                  address: 'New York No. 2 Lake Park',
                },
              ],
            },
            {
                key: 3,
                name: '新闻管理',
                age: 32,
                menuParentId:0,
                address: 'Sidney No. 1 Lake Park',
                children: [
                  {
                    key: 31,
                    name: '新闻通知',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                  },
                  {
                    key: 32,
                    name: '新闻中心',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                  },
                ],
            },
            {
                key: 4,
                name: '系统管理',
                age: 32,
                menuParentId:0,
                address: 'Sidney No. 1 Lake Park',
                children: [
                  {
                    key: 41,
                    name: '用户管理',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                  },
                  {
                    key: 42,
                    name: '角色管理',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                  },
                  {
                    key: 42,
                    name: '菜单管理',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                  },
                ],
            },
        ];

        return (
            <div key={'menu'}>
                <p style={{backgroundColor:'orange',padding:'15px',color:'#fff'}}>菜单管理</p>
                <div>
                <Table columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}

export default menu;
