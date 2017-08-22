import * as billAPI         from './api'
import * as types               from './types'

export default {
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
    },
    [types.REQUIRE_BILL_LIST]: ({ commit }) => {
        const asyncFeeInfo = async function() {
            try {
                let result = await billAPI.apiFeeInfo()
                commit( types.SET_BILL_LIST, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncFeeInfo()
    },
    [types.REQUIRE_PM_FEE]: ({ commit }) => {
        const asyncPmInfo = async function() {
            try {
                let result = await billAPI.apipmInfo()
                commit( types.SET_PM_FEE, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncPmInfo()
    },
    [types.REQUIRE_ELE_FEE]: ({ commit }) => {
        const asyncPmInfo = async function() {
            try {
                let result = await billAPI.apiEleInfo()
                commit( types.SET_ELE_FEE, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncPmInfo()
    },
    [types.REQUIRE_WATER_FEE]: ({ commit }) => {
        const asyncPmInfo = async function() {
            try {
                let result = await billAPI.apiEleInfo()
                commit( types.SET_WATER_FEE, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncPmInfo()
    }
}
