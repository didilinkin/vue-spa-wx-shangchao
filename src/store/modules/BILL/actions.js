import * as billAPI         from './api'
import * as types               from './types'

export default {
    [types.REQUIRE_RENT_FEE]: ({ commit }, obj ) => {
        const asyncRentInfo = async function( ) {
            try {
                let result = await billAPI.apiRentInfo( obj )
                commit( types.SET_RENT_FEE, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncRentInfo()
    },
    [types.REQUIRE_RENT_FEE_H]: ({ commit }, obj ) => {
        const asyncRentInfoH = async function( ) {
            try {
                let result = await billAPI.apiRentInfoH( obj )
                commit( types.SET_RENT_FEE_H, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncRentInfoH()
    },
    [types.REQUIRE_BILL_LIST]: ({ commit }, obj ) => {
        const asyncFeeInfo = async function() {
            try {
                let result = await billAPI.apiFeeInfo( obj )
                commit( types.SET_BILL_LIST, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncFeeInfo()
    },
    [types.REQUIRE_PM_FEE]: ({ commit }, obj ) => {
        const asyncPmInfo = async function() {
            try {
                let result = await billAPI.apipmInfo( obj )
                commit( types.SET_PM_FEE, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncPmInfo()
    },
    [types.REQUIRE_PM_FEE_H]: ({ commit }, obj ) => {
        const asyncPmInfoH = async function() {
            try {
                let result = await billAPI.apipmInfoH( obj )
                commit( types.SET_PM_FEE_H, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncPmInfoH()
    },
    [types.REQUIRE_ELE_FEE]: ({ commit }, obj ) => {
        const asyncPmInfo = async function() {
            try {
                let result = await billAPI.apiEleInfo( obj )
                commit( types.SET_ELE_FEE, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncPmInfo()
    },
    [types.REQUIRE_ELE_FEE_H]: ({ commit }, obj ) => {
        const asyncPmInfoH = async function() {
            try {
                let result = await billAPI.apiEleInfoH( obj )
                commit( types.SET_ELE_FEE_H, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncPmInfoH()
    },
    [types.REQUIRE_WATER_FEE]: ({ commit }, obj ) => {
        const asyncPmInfo = async function() {
            try {
                let result = await billAPI.apiWaterInfo( obj )
                commit( types.SET_WATER_FEE, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncPmInfo()
    },
    [types.REQUIRE_WATER_FEE_H]: ({ commit }, obj ) => {
        const asyncPmInfoH = async function() {
            try {
                let result = await billAPI.apiWaterInfoH( obj )
                commit( types.SET_WATER_FEE_H, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncPmInfoH()
    }
}
