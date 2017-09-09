import * as types from './types'

export default {
    [types.SET_BUILDING_LIST]( state, res ) {
        state.buildingList = res
    },
    [types.SET_ROOM_LIST]( state, res ) {
        console.log( '1111111111111' )
        console.log( res )
        state.roomList = res
    },
    [types.SET_BINDING]( state, res ) {
        state.bindingResult = res
    }
}
