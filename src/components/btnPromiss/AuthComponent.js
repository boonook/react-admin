import {Button} from "antd";
import React from "react";
class AuthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            title:'按钮',
        };
    }

    componentDidMount() {
        let btnStatus = (this.props.auth).split(":")||'';
        const btnPromiss = [{user:'add,delete,edit,view'},{menu:'view'}]
        let menuKey = [];
        btnPromiss.forEach(item=>{
            for (let key in item){
                menuKey.push(key)
            }
        })
        console.log(menuKey);
        let isMenu = false;
        menuKey.map(item=>{
            if(item+'' ===(btnStatus[0]+'')){
                isMenu = true;////说明我们的可以查看到这个菜单
                return
            }
        })
        ///判断我们是否可以查看到这个按钮
        let isbtn = false;
        btnPromiss.map(item=>{
            let btnStatusMenu = btnStatus[0]
            let btn = item[btnStatusMenu];
            if(btn===undefined){
                return
            }
            let btnArr = btn.split(',');
            btnArr.map(i=>{
                if(i===btnStatus[1]){
                    isbtn=true
                    return
                }
            })
        })
        if(isMenu && isbtn){
            this.setState({
                show:true,
                title:this.props.title?this.props.title:this.state.title
            })
        }else{
            this.setState({
                show:false,
                title:this.props.title?this.props.title:this.state.title
            })
        }
    }

    onBtn=(e)=>{
        this.props.onBtnClick(e);
    }

    render() {
        return (
            <span>{this.state.show?<Button onClick={(e)=>{this.onBtn(e)}}>{this.state.title}</Button>:null}</span>
        )
    }
}

export default AuthComponent;
