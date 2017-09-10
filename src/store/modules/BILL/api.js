 /* global Promise : true */
import axios            from 'axios'
import * as mockAPI     from '../../../services/mockAPI'
// 转换字符
// const qs = require( 'qs' ) require

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const apiRentInfo = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.RentUrl + '?clientNum=' + obj.clientNum )
             .then( response => {
                 let resulData = response.data.data
                 resolve( resulData )
             })
             .catch( error => {
                 reject( error )
             })
    })
}

export const apiFeeInfo = ( ) => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.FeeUrl )
             .then( response => {
                 let resulData = response.data.data
                 resolve( resulData )
             })
             .catch( error => {
                 reject( error )
             })
    })
}

export const apipmInfo = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.pmUrl + '?clientNum=' + obj.clientNum )
             .then( response => {
                 let resulData = response.data.data
                 resolve( resulData )
             })
             .catch( error => {
                 reject( error )
             })
    })
}

export const apiEleInfo = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.eleUrl + '?clientNum=' + obj.clientNum )
             .then( response => {
                 let resulData = response.data.data
                 resolve( resulData )
             })
             .catch( error => {
                 reject( error )
             })
    })
}

export const apiWaterInfo = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.waterUrl + '?clientNum=' + obj.clientNum )
             .then( response => {
                 let resulData = response.data.data
                 resolve( resulData )
             })
             .catch( error => {
                 reject( error )
             })
    })
}

