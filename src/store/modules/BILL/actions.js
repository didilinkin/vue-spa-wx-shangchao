import * as billAPI         from './api'
import * as types               from './types'

export default {
    // [types.REQUEST_BULLETIN_INFO]: ({ commit }) => {
    //     const asyncBulletinInfo = async function() {
    //         try {
    //             let result = await bulletinAPI.apiBulletinInfo()
    //             commit( types.SET_BULLETIN_INFO, result )
    //         } catch( err ) {
    //             console.log( err )
    //         }
    //     }
    //     asyncBulletinInfo()
    // },
    // [types.REQUEST_BULLETIN_DETAILS_INFO]: ({ commit }, bulletinDetailsIdObj ) => {
    //     const asyncBulletinDetailsInfo = async function() {
    //         try {
    //             let result = await bulletinAPI.apiBulletinDetailsInfo( bulletinDetailsIdObj )
    //             commit( types.SET_BULLETIN_DETAILS_INFO, result )
    //         } catch( err ) {
    //             console.log( err )
    //         }
    //     }
    //     asyncBulletinDetailsInfo()
    // },
    [types.REQUIRE_RENT_FEE]: ({ commit }) => {
        const asyncRentInfo = async function() {
            try {
                let result = await billAPI.apiRentInfo()
                commit( types.SET_RENT_FEE, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncRentInfo()
    }
}
