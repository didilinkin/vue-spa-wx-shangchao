import * as bindingAPI      from './api'
import * as types           from './types'

export default {
    [types.REQUEST_BUILDING_LIST]: ({ commit }) => {
        const asyncBuildingList = async function() {
            try {
                let result = await bindingAPI.apiBuildingList()
                commit( types.SET_BUILDING_LIST, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncBuildingList()
    }
}