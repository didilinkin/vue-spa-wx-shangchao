import * as types from './types'

export default {
    [types.SET_BUILDING_LIST]( state, res ) {
        state.buildingList = res
    },
    [types.SET_ROOM_LIST]( state, res ) {
        state.roomList = res
    },
    [types.SET_ROOM_DELETE]( state, res ) {
        state.deleteUserWx = res
    },
    [types.SET_BINDING]( state, res ) {
        state.bindingResult = res
    }
}
