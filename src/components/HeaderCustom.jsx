/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import screenfull from 'screenfull';
import {observer,inject} from 'mobx-react';
import SiderCustom from './SiderCustom';
import { Menu, Icon, Layout, Badge, Popover,notification } from 'antd';
import { withRouter } from 'react-router-dom';
import { PwaInstaller } from './widget';
import { connectAlita } from 'redux-alita';
import {getFilePath} from "../libs/tools";
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

@inject('appState') @observer
class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
        avater:null
    };
    componentDidMount() {
        let userInfo = this.props.appState.userInfo;
        this.setState({
            // avater:getFilePath(userInfo?userInfo.filePath:''),
            avater:(userInfo?userInfo.filePath:''),
        })
        if (window.WebSocket)
        {
            console.log("支持");
        }else
        {
            console.log("不支持");
        }
        let ws = new WebSocket("ws://boonook.top:9000");
        ws.onopen = function() {
          console.log("client：打开连接");
          let msg = {type:'test',id:userInfo?userInfo.id:''}
          ws.send(JSON.stringify(msg));
        //   ws.send("client：hello，服务端");
        };
        ws.onmessage = function(e) {
          console.log("client：接收到服务端的消息 " + e.data);
          notification.open({
            message: '消息通知',
            description:
            e.data,
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        //   setTimeout(() => {
        //     ws.close();
        //   }, 5000);
        };
        // ws.onclose = function(params) {
        //   console.log("client：关闭连接");
        // };
    };
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }

    };
    menuClick = e => {
        console.log(e);
        e.key === 'logout' &&  this.props.appState.loginOut();
    };
    logout = () => {
        this.props.appState.loginOut();
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };
    ///个人信息
    selfInfo=()=>{
        this.props.history.push('/app/SelfCenter/SelfInfo')
    };
    ///消息通知
    onViewMessage=()=>{

    };
    render() {
        const { responsive = { data: {} }, path } = this.props;
        return (
            <Header className="custom-theme header" >
                {
                    responsive.data.isMobile ? (
                        <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide} />} trigger="click" placement="bottomLeft" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="header__trigger custom-trigger" />
                        </Popover>
                    ) : (
                        <Icon
                            className="header__trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )
                }
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="pwa">
                        <PwaInstaller />
                    </Menu.Item>
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    <Menu.Item key="1" onClick={this.onViewMessage}>
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>
                    <SubMenu title={<span className="avatar"><img src={this.state.avater||''} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.props.appState.userInfo?this.props.appState.userInfo.userName?this.props.appState.userInfo.userName:'':''}</Menu.Item>
                            <Menu.Item key="setting:2" onClick={this.selfInfo}>个人信息</Menu.Item>
                            <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}

export default withRouter(connectAlita(['responsive'])(HeaderCustom));
