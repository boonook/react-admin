import {observable,computed,action} from 'mobx';
import history from '../utils/history';
import {getUserInfo,getIsLogin,getToken,setIsLogin,setToken,setUserInfo,getUserMenu,setUserMenu,getUserMenuBtn,setUserMenuBtn} from './storage';
import routesConfig from '../routes/config';
import {construct} from "@aximario/json-tree";
class AppState {
    @observable count = 0;
    @observable name = 'Jokcy';
    @observable userInfo =getUserInfo();
    @observable isLogin =getIsLogin();
    @observable token =getToken();
    @observable userMenu =getUserMenu();
    @observable userMenuBtn =getUserMenuBtn();
    @computed get msg(){
        return `${this.name} say  count is ${this.count}`
    }
    @action add(){
        this.count +=1
    }
    @action changeUserMenu(data){
        setUserMenuBtn(data);
        console.log('routesConfig',routesConfig);
        let routesConfigs=JSON.parse(JSON.stringify(routesConfig));
        /*** 动态菜单 start***/
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
        spread(routesConfigs.menus);
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
                delete userMenu[j].id;
                if(menuArrs[i].key === userMenu[j].path){
                    menuArrs[i].id = userMenu[j].menuId||'';
                    menuArrs[i].title = userMenu[j].menuName||'';
                    menuArrs[i].menuParentId = userMenu[j].menuParentId||'';
                    menus.push(menuArrs[i]);
                }
            }
        }
        routesConfigs.menus=[];
        routesConfigs.menus = construct(menus, {
            id: 'id',
            pid: 'menuParentId',
            children: 'subs'
        });
        routesConfigs.menus.unshift({key: "/app/dashboard/index", title: "首页", icon: "mobile", component: "Dashboard",id:'0',menuParentId:'0'});
        let menusBox = JSON.stringify(routesConfigs);
        this.userMenu = menusBox;
        this.userMenuBtn = JSON.stringify(data);
        setUserMenu(routesConfigs);
        this.isLogin = true;
        setIsLogin(true);
    }
    @action changeName(name){
        this.name =name
    }
    @action login(data,e){
        let info = data||{};
        this.userInfo =info.userInfo[0]||{};
        this.token = info.token||"";
        setToken(info.token||"");
        setUserInfo(info.userInfo[0]||{})
    }
    @action loginOut(){
        setIsLogin(false);
        setToken("");
        setUserInfo(null);
        setUserMenu(null);
        this.userInfo ={};
        this.isLogin = false;
        this.token = "";
        this.userMenu ={};
        history.replace('/login')
    }
}

const appState = new AppState();

export default appState
