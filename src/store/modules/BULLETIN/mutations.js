import * as types from './types'

export default {
    [types.SET_BULLETIN_INFO]( state, res ) {
        state.bulletinInfo = res
    }
}