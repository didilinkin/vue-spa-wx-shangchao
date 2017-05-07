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
    },
    [types.VERIFY_VALUE]: ({ commit }, pickerValObj ) => {
        // console.log( commit )
        // console.log( pickerValObj )
        const asyncBuildingVerifyValue = async function() {
            try {
                let result = await bindingAPI.apiBuildingVerifyValue( pickerValObj )
                console.log( result )
                commit( types.SET_VERIFY_VALUE, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncBuildingVerifyValue()
    }
}
