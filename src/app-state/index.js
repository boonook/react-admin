import {observable,computed,action} from 'mobx';
import {getUserInfo,getIsLogin,getToken,setIsLogin,setToken,setUserInfo,getUserMenu,setUserMenu} from './storage';
import routesConfig from '../routes/config';
import {construct} from "@aximario/json-tree";
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
        /*** 动态菜单 start***/
        debugger
        let menuArrss=[];
        let userMenu = data;
        let spread = function (menus) {
            for (let i=0; i < menus.length; i++ ) {
                let menu = menus[i];
                if (menu.subs) {
                    spread(menu.subs)
                    delete menu.subs
                }
                menuArrss.push(menu)
            }
        }
        spread(routesConfig.menus);
        let menus =[];
        let uniqueArray =function(array, key){
            if(array.length>0){
                let result = [array[0]];
                for(let i = 1; i < array.length; i++){
                    let item = array[i];
                    let repeat = false;
                    for (let j = 0; j < result.length; j++) {
                        if (item[key] === result[j][key]) {
                            repeat = true;
                            break;
                        }
                    }
                    if (!repeat) {
                        result.push(item);
                    }
                }
                return result || [];
            }else{
                return [];
            }
        };
        let menuArrs = uniqueArray(menuArrss,'key')||[];
        for (let i = 0;i<menuArrs.length;i++) {
            for(let j =0;j<userMenu.length;j++){
                if(menuArrs[i].key === userMenu[j].path){
                    menuArrs[i].id = userMenu[j].Id||'';
                    menuArrs[i].title = userMenu[j].menuName||'';
                    menuArrs[i].menuParentId = userMenu[j].menuParentId||'';
                    menus.push(menuArrs[i]);
                }
            }
        }
        routesConfig.menus=[];
        routesConfig.menus = construct(menus, {
            id: 'id',
            pid: 'menuParentId',
            children: 'subs'
        });
        routesConfig.menus.unshift({key: "/app/dashboard/index", title: "首页", icon: "mobile", component: "Dashboard",id:'0',menuParentId:'0'});
        let menusBox = JSON.stringify(routesConfig);
        this.userMenu = menusBox;
        setUserMenu(routesConfig);
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
    @action loginOut(data){
        this.userInfo ={};
        this.isLogin = false;
        this.token = "";
        this.userMenu =null;
        setIsLogin(false);
        setToken("");
        setUserInfo(null);
        setUserMenu(null);
    }
}

const appState = new AppState();

export default appState
