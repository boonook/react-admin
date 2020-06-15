import Cookie from 'js-cookie';

export const getToken = () => {
    return Cookie.get('token')
};

export const setToken = (token) => {
    Cookie.set('token', token)
}

/// 将首页的登陆信息存在缓存中去
export const setUserInfo = (data) => {
    Cookie.set('userInfo',data)
};
/// 从换缓存中拿到数据信息
export const getUserInfo = () => {
    let userInfo = Cookie.get('userInfo');
    if(userInfo===''||userInfo===undefined){
        userInfo={};
        return userInfo
    }else{
        return JSON.parse(userInfo)
    }
}

export const setIsLogin = (data) => {
    Cookie.set('isLogin',data)
}
export const getIsLogin = () => {
    return Cookie.get('isLogin')
}

export const setUserMenu = (data) => {
    Cookie.set('userMenu',JSON.stringify(data))
}
export const getUserMenu = () => {
    return Cookie.get('userMenu');
}
