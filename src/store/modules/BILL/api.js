 /* global Promise: true */
import axios            from 'axios'
import * as mockAPI     from '../../../services/mockAPI'
// 转换字符


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const apiRentInfo = () => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.RentUrl )
             .then( response => {
                 let resulData = response.data.data
                 resolve( resulData )
             })
             .catch( error => {
                 reject( error )
             })
    })
}

export const apiFeeInfo = () => {
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

export const apipmInfo = () => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.pmUrl )
             .then( response => {
                 let resulData = response.data.data
                 resolve( resulData )
             })
             .catch( error => {
                 reject( error )
             })
    })
}

export const apiEleInfo = () => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.eleUrl )
             .then( response => {
                 let resulData = response.data.data
                 resolve( resulData )
             })
             .catch( error => {
                 reject( error )
             })
    })
}

export const apiWaterInfo = () => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.waterUrl )
             .then( response => {
                 let resulData = response.data.data
                 resolve( resulData )
             })
             .catch( error => {
                 reject( error )
             })
    })
}

