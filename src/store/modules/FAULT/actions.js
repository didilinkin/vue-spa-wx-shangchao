import * as faultAPI            from './api'
import * as types               from './types'

export default {
    [types.SAVE_REPAIR_DETAIL]: ({ commit }, obj ) => {
        commit( types.SET_REPAIR_DETAIL, obj.detailObj )
    },
    [types.REQUIRE_FAULT_LIST]: ({ commit }, obj ) => {
        const asyncFaultList = async function() {
            try {
                let result = await faultAPI.apiFaultList( obj )
                commit( types.SET_FAULT_LIST, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncFaultList()
    },
    [types.SET_FAULT_DETAILL]: ({ commit }, obj ) => {
        const asyncFaultDetail = async function() {
            try {
                let result = await faultAPI.apirepairState( obj )
                commit( types.SET_FAULT_DETAILL, result )
            } catch ( err ) {
                console.log( err )
            }
        }
        asyncFaultDetail()
    },
    [types.REQUIRE_FAULT_DETAIL]: ({ commit }, obj ) => {
        const asyncFaultDetail = async function() {
            try {
                let result = await faultAPI.apiFaultDetail( obj )
                commit( types.SET_FAULT_DETAIL, result )
            } catch ( err ) {
                console.log( err )
            }
        }
        asyncFaultDetail()
    },
    [types.REQUIRE_TO_FAULT]: ({ commit }, obj ) => {
        const asyncFaultDetail = async function() {
            try {
                let result = await faultAPI.apiToRepair( obj )
                commit( types.SET_TO_FAULT, result )
            } catch ( err ) {
                console.log( err )
            }
        }
        asyncFaultDetail()
    }
}
