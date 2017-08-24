import * as faultAPI            from './api'
import * as types               from './types'

export default {
    [types.SAVE_REPAIR_DETAIL]: ({ commit }, obj ) => {
        commit( types.SET_REPAIR_DETAIL, obj.detailObj )
    },
    [types.REQUIRE_FAULT_LIST]: ({ commit }, obj ) => {
        const asyncFaultList = async function() {
            try {
                let result = await faultAPI.apiFaultList( obj )
                console.log( 'actions' )
                console.dir( result )
                commit( types.SET_FAULT_LIST, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncFaultList()
    }
}
