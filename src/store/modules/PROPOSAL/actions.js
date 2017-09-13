import * as faultAPI            from './api'
import * as types               from './types'

export default {
    [types.SAVE_REPAIR_DETAIL]: ({ commit }, obj ) => {
        commit( types.SET_REPAIR_DETAIL, obj.detailObj )
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
    [types.SAVE_PROPOSAL]: ({ commit }, obj ) => {
        const asyncFaultDetail = async function() {
            try {
                let result = await faultAPI.apiToProposal( obj )
                commit( types.SET_PROPOSAL, result )
            } catch ( err ) {
                console.log( err )
            }
        }
        asyncFaultDetail()
    },
    [types.REQUIRE_PROPOSAL_LIST]: ({ commit }, obj ) => {
        const asyncFaultList = async function() {
            try {
                let result = await faultAPI.apiFaultList( obj )
                // console.log( 'actions' )
                // console.dir( result )
                commit( types.SET_PROPOSAL_LIST, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncFaultList()
    }
}
