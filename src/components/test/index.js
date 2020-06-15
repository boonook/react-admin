/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';

class test extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
    };
    render() {
        return (
            <div className="gutter-example button-demo" key={'test'}>
                <p>测试界面--------</p>
            </div>
        )
    }
}

export default test;
