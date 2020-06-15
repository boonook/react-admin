/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {observer,inject} from 'mobx-react';
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
                <div id="myholder"></div>
            </div>
        )
    }
}

export default partyCount;

