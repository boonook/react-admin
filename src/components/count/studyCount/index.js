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
                <AuthComponent key={'studyadd'} {...this.props} auth={"add"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'新增'}/>
                <AuthComponent key={'studyedit'} {...this.props} auth={"edit"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'修改'}/>
                <AuthComponent key={'studyview'} {...this.props} auth={"view"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'查看'}/>
                <AuthComponent key={'studydel'} {...this.props} auth={"delete"} onBtnClick={(e)=>{this.onCeshi(e)}} title={'删除'}/>
                <p>学习统计</p>
            </div>
        )
    }
}

export default studyCount;
