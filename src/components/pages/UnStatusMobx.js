import React from 'react'
import {inject,observer} from 'mobx-react'
let  UnStatusMobx = inject("appState")(observer((props =>{
    return(
        <div key={'UnStatusMobx'}>
            mobx在react-hook的情况下使用，也就是在无状态组件中的使用
        </div>
    )
})))

export default UnStatusMobx
