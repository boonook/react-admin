/**
 * Created by hao.cheng on 2017/4/23.
 */
import { Input } from 'antd';
import React from 'react';
import './index.less';
const { TextArea } = Input;
class test extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
    };
    render() {
        return (
            <div className="messagebox" key={'test'}>
                <div className="messagelist">
                    qweqweqwe
                </div>
                <div className='inputbox'>
                    <TextArea rows={4} bordered={false} placeholder="maxLength is 6" maxLength={6} />
                    <div>
                        <button>发送</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default test;
