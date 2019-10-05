/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import './SelfInfo.less';

class SelfInfo extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
    };
    render() {
        return (
            <div className="selfInfo_box">
                <div className={'selfInfo_box_div_box'}>
                    <div className={'selfInfo_box_div'}>
                        {/*用户头像*/}
                        <div className={'auther'}>

                        </div>
                        {/*用户姓名*/}
                        <div className={'selfInfo_username'}>
                            <p>大地瓜</p>
                        </div>
                        <div>
                            <div className={'userInfo_card'} style={{ width: 500 }}>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                       姓名
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        大地瓜
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        邮箱
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        boonook@163.com
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        性别
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        男
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        手机号
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        177******71
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        家庭住址
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        湖北省武汉市
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        单位
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        武汉大海
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        部门
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        研发部
                                    </div>
                                </div>
                                <div  className={'userInfo_card_item'}>
                                    <div className={'userInfo_card_item_left'}>
                                        职位
                                    </div>
                                    <div className={'userInfo_card_item_right'}>
                                        web前端开发工程师
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SelfInfo;
