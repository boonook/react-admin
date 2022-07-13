/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {observer,inject} from 'mobx-react';
import AuthComponent from '@/components/btnPromiss/AuthComponent'
import {getFlowChart} from '../../../api/partyCount'

@inject('appState') @observer
class partyCount extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
    };
    componentDidMount() {
        this.getList();
    }
    getList=()=>{
        getFlowChart().then(res=>{
            if(res && res.code+''==='200'){

            }
        })
    };

    render() {
        return (
            <div className="gutter-example button-demo" key={'partyCount'}>
                <p>党员统计</p>
                <AuthComponent key={'partyadd'} {...this.props} auth={"add"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'新增'}/>
                <AuthComponent key={'partyedit'} {...this.props} auth={"edit"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'修改'}/>
                <AuthComponent key={'partyview'} {...this.props} auth={"view"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'查看'}/>
                <AuthComponent key={'partydel'} {...this.props} auth={"delete"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'删除'}/>
                <div id="myholder"></div>
            </div>
        )
    }
}

export default partyCount;

