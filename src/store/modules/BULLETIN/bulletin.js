import actions          from './actions'
import mutations        from './mutations'
import * as getters     from './getters'
import * as types       from './types'

const state = {
    bulletinInfo: {},
    bulletinDetailsInfo: {
        content: ''
    }
}

export default {
    state,
    types,
    actions,
    mutations,
    getters
}
