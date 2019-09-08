import {observable,computed,action} from 'mobx';
import {getUserInfo,getIsLogin,getToken,setIsLogin,setToken,setUserInfo,getUserMenu,setUserMenu} from './storage'
class AppState {
    @observable count = 0;
    @observable name = 'Jokcy';
    @observable userInfo =getUserInfo();
    @observable isLogin =getIsLogin();
    @observable token =getToken();
    @observable userMenu =getUserMenu();
    @computed get msg(){
        return `${this.name} say  count is ${this.count}`
    }
    @action add(){
        this.count +=1
    }
    @action changeUserMenu(data){
        this.userMenu =JSON.stringify(data);
        setUserMenu(data);
    }
    @action changeName(name){
        this.name =name
    }
    @action login(data){
        let info = data||{};
        this.userInfo =info.userInfo[0]||{};
        this.isLogin = true;
        this.token = info.token||"";
        setIsLogin(true);
        setToken(info.token||"");
        setUserInfo(info.userInfo[0]||{})
    }
}

const appState = new AppState();

export default appState
