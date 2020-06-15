/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';

class onlineTest extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
    };
    render() {
        return (
            <div className="gutter-example button-demo" key={'onlineTest'}>
                <p>在线学习</p>
            </div>
        )
    }
}

export default onlineTest;
