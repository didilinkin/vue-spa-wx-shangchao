 /* global Promise require: true */
import axios            from 'axios'
import * as mockAPI     from '../../../services/mockAPI'
// 转换字符
const qs = require( 'qs' )

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const apiRentInfo = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.RentUrl, qs.stringify({
            'clientNum': obj.buildingValue
        }) )
             .then( response => {
                 let resulData = response.data.data
                 resolve( resulData )
             })
             .catch( error => {
                 reject( error )
             })
    })
}

export const apiFeeInfo = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.FeeUrl, qs.stringify({
            'clientNum': obj.buildingValue
        }) )
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
        axios.get( mockAPI.pmUrl, qs.stringify({
            'clientNum': obj.buildingValue
        }) )
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
        axios.get( mockAPI.eleUrl, qs.stringify({
            'clientNum': obj.buildingValue
        }) )
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
        axios.get( mockAPI.waterUrl, qs.stringify({
            'clientNum': obj.buildingValue
        }) )
             .then( response => {
                 let resulData = response.data.data
                 resolve( resulData )
             })
             .catch( error => {
                 reject( error )
             })
    })
}

