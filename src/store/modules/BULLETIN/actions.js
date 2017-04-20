import * as bulletinAPI         from './api'
import * as types               from './types'

export default {
    [types.REQUEST_BULLETIN_INFO]: ({ commit }) => {
        const asyncBulletinInfo = async function() {
            try {
                let result = await bulletinAPI.apiBulletinInfo()
                commit( types.SET_BULLETIN_INFO, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncBulletinInfo()
    }   
}