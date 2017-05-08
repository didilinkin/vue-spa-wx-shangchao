import * as types from './types'

export default {
    [types.SET_BUILDING_LIST]( state, res ) {
        state.buildingList = res
    },
    [types.SET_BINDING]( state, res ) {
        state.bindingResult = res
    }
}
