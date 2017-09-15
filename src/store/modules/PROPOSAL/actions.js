import * as proposalAPI            from './api'
import * as types               from './types'

export default {
    [types.SAVE_PROPOSAL_DETAIL]: ({ commit }, obj ) => {
        commit( types.SET_PROPOSAL_DETAIL, obj.detailObj )
    },
    [types.SET_FAULT_DETAILL]: ({ commit }, obj ) => {
        const asyncFaultDetail = async function() {
            try {
                let result = await proposalAPI.apiProposalDetail( obj )
                commit( types.SET_FAULT_DETAILL, result )
            } catch ( err ) {
                console.log( err )
            }
        }
        asyncFaultDetail()
    },
    [types.REQUIRE_PROPOSAL_DETAIL]: ({ commit }, obj ) => {
        const asyncFaultDetail = async function() {
            try {
                let result = await proposalAPI.apiProposalDetail( obj )
                commit( types.SET_PROPOSAL_DETAIL, result )
            } catch ( err ) {
                console.log( err )
            }
        }
        asyncFaultDetail()
    },
    [types.SAVE_PROPOSAL]: ({ commit }, obj ) => {
        const asyncFaultDetail = async function() {
            try {
                let result = await proposalAPI.apiToProposal( obj )
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
                let result = await proposalAPI.apiFaultList( obj )
                // console.log( 'actions' )
                // console.dir( result )
                commit( types.SET_PROPOSAL_LIST, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncFaultList()
    },
    [types.UPDATE_PROPOSAL]: ({ commit }, obj ) => {
        const asyncFaultList = async function() {
            try {
                let result = await proposalAPI.apiUpdateProposal( obj )
                // console.log( 'actions' )
                // console.dir( result )
                commit( types.SET_UPDATE_PROPOSAL, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncFaultList()
    }
}
