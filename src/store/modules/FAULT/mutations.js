import * as types from './types'

export default {
    [types.SET_REPAIR_DETAIL]( state, res ) {
        state.repairDetail = {}     // 清空 状态
        state.repairDetail = res
    }
}