/* global Promise require: true */ //
import axios from 'axios'
import * as mockAPI from '../../../services/mockAPI'

const qs = require( 'qs' )

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 进度条接口
export const apiProposalDetail = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.get(
            // http://192.168.5.250:18081/repair/getDetails?id=2
            // mockAPI.FAULT_DETAIL + '?id=' + obj.detailId
            mockAPI.PROPOSAL_DETAIL + '?id=' + obj.detailId
        )
            .then( response => {
                let resulData = response.data
                resolve( resulData )
            })
            .catch( error => {
                reject( error )
            })
    })
}
// 我的报修列表接口
export const apirepairState = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.get(
            // http://192.168.5.250:18081/repair/getDetails?id=2
            // mockAPI.FAULT_DETAIL + '?id=' + obj.detailId
            mockAPI.FAULT + '?clientNum=' + obj.clientNum
        )
            .then( response => {
                let resulData = response.data.data
                resolve( resulData )
            })
            .catch( error => {
                reject( error )
            })
    })
}
// 我要投诉
export const apiToProposal = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.post( mockAPI.TO_PROPOSAL, qs.stringify({
            'phone': obj.phone,
            'clientNum': obj.clientNum,
            'complaintMan': obj.repairMan,
            'complaintContent': obj.repairContent,
            'file': obj.file
        }) )
            .then( response => {
                let resulData = response.data
                resolve( resulData )
            })
            .catch( error => {
                reject( error )
            })
    })
}
export const apiFaultList = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.get(
            mockAPI.PROPOSAL + '?clientNum=' + obj.clientNum
        )
            .then( response => {
                let resulData = response.data
                resolve( resulData )
            })
            .catch( error => {
                reject( error )
            })
    })
}
// 我要投诉评价
export const apiUpdateProposal = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.post( mockAPI.PROPOSAL_UPDATE, qs.stringify({
            'star': obj.star,
            'ratedContent': obj.ratedContent,
            'ratedStatus': '1',
            'id': obj.id
        }) )
            .then( response => {
                let resulData = response.data
                resolve( resulData )
            })
            .catch( error => {
                reject( error )
            })
    })
}
