import * as types               from './types'

export default {
    [types.SAVE_REPAIR_DETAIL]: ({ commit }, obj ) => {
        commit( types.SET_REPAIR_DETAIL, obj.detailObj )
    }
}