/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';

class notice extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
    };
    render() {
        return (
            <div className="gutter-example button-demo">
                <p>通知公告</p>
            </div>
        )
    }
}

export default notice;
