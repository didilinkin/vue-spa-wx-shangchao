import * as types from './types'

export default {
    [types.SET_BUILDING_LIST]( state, res ) {
        state.buildingList = res
    }
}