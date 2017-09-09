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
    [types.REQUEST_ROOM_LIST]: ({ commit }, obj ) => {
        const asyncBuildingList = async function() {
            try {
                let result = await bindingAPI.apiRoomList( obj )
                commit( types.SET_ROOM_LIST, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncBuildingList()
    },
    [types.REQUEST_ROOM_DELETE]: ({ commit }, obj ) => {
        const asyncRoomDelete = async function() {
            try {
                let result = await bindingAPI.apiRoomDelete( obj )
                commit( types.SET_ROOM_DELETE, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncRoomDelete()
    },
    [types.REQUIRE_BINDING]: ({ commit }, bindingValObj ) => {
        const asyncRequireBinding = async function() {
            try {
                let result = await bindingAPI.apiRequireBinding( bindingValObj )
                commit( types.SET_BINDING, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncRequireBinding()
    }
}
