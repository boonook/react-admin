import {Button} from "antd";
import React from "react";
import {observer,inject} from 'mobx-react';

@inject('appState') @observer
class AuthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            title:'按钮',
        };
    }

    componentDidMount() {
        let userMenuBtn=[];
        if(this.props.appState.userMenuBtn && this.props.appState.userMenuBtn!='null'){
            userMenuBtn = JSON.parse(this.props.appState.userMenuBtn);
        }else{
            return {}
        }
        console.log('123123123');
        // console.log('userMenuBtn',userMenuBtn);
        // console.log('query',this.props.history.location.pathname);
        let key = this.props.history.location.pathname;
        let btnQuanxian = {
            key 
        }
        userMenuBtn.forEach(item=>{
            if(key==item.path){
                btnQuanxian.quanxian = item.quanxian;
            }
        })
        console.log('userMenuBtn',btnQuanxian.quanxian);
        const btnPromiss = btnQuanxian.quanxian.split(',');
        ///判断我们是否可以查看到这个按钮
        let isbtn = false;
        btnPromiss.map(item=>{
            if(item==this.props.auth){
                isbtn=true;
                return;
            }
        })
        if(isbtn){
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
            <span key={this.props.key} {...this.props}>{this.state.show?<Button onClick={(e)=>{this.onBtn(e)}}>{this.state.title}</Button>:null}</span>
        )
    }
}

export default AuthComponent;
