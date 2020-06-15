/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';

class AuthComponent extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
    };
    render() {
        return (
            <div className="gutter-example button-demo" key={'AuthComponent'}>
                <p>学习统计</p>
            </div>
        )
    }
}

export default AuthComponent;
