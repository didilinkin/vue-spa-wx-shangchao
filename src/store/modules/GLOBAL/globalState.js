import actions      from './actions'
import mutations    from './mutations'
import * as types   from './types'

const state = {
    // 设备信息
    deviceInfo: {},        
    // 用户信息  
    userInfo: {
        userId: 100,
        userName: '用户姓名',
        userWeChatId: 'wechat',
        companyName: '信和汇金信息咨询(北京)有限公司青岛分公司'
    }
}

export default {
    state,
    types,
    actions,
    mutations
}