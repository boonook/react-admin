/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import AuthComponent from '@/components/btnPromiss/AuthComponent'
class studyCount extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
    };

    onCeshi=(params)=>{
        console.log(params);
    }

    render() {
        return (
            <div className="gutter-example button-demo" key={'AuthComponent'}>
                <AuthComponent {...this.props} auth={"user:add"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'新增'}/>
                <AuthComponent {...this.props} auth={"user:add"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'修改'}/>
                <AuthComponent {...this.props} auth={"user:add"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'查看'}/>
                <AuthComponent {...this.props} auth={"user:add"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'删除'}/>
                <p>学习统计</p>
            </div>
        )
    }
}

export default studyCount;
