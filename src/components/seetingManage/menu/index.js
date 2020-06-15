import React from 'react';
import {Tree, Button,Popconfirm,Pagination} from 'antd';
const { TreeNode, DirectoryTree } = Tree;

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
        return (
            <div key={'menu'}>
                <p style={{backgroundColor:'orange',padding:'15px',color:'#fff'}}>菜单管理</p>
                <div style={{textAlign:'right',marginBottom:'10px'}}>
                    <Button onClick={this.onAddUser} type="primary">新增</Button>
                    <Button onClick={this.onAddUser} type="primary">删除</Button>
                    <Button onClick={this.onAddUser} type="primary">修改</Button>
                </div>
                <div>
                    <DirectoryTree checkable checkStrictly  onCheck={this.onCheck} defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
                        <TreeNode onClick={this.onShow} title="parent 0" key="0-0">
                            <TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
                            <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
                        </TreeNode>
                        <TreeNode title="parent 1" key="0-1">
                            <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
                            <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
                        </TreeNode>
                    </DirectoryTree>
                </div>
            </div>
        )
    }
}

export default menu;
