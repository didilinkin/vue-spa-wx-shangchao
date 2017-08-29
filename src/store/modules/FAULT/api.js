/* global Promise: true */ // require
import axios from 'axios'
import * as mockAPI from '../../../services/mockAPI'

// const qs = require( 'qs' )

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const apiFaultList = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.get(
            mockAPI.FAULT + '?clientNum=' + obj.userId + '&pageFirst=0'
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

export const apiFaultDetail = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.get(
            // http://192.168.5.250:18081/repair/getDetails?id=2
            // mockAPI.FAULT_DETAIL + '?id=' + obj.detailId
            `http://192.168.5.21:18081/wx/getDetails?id=${ obj.detailId }`
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

export const apirepairState = () => {
    return new Promise( function( resolve, reject ) {
        axios.get(
            // http://192.168.5.250:18081/repair/getDetails?id=2
            // mockAPI.FAULT_DETAIL + '?id=' + obj.detailId
            'http://192.168.5.250:18081/wx/listRepair?clientNum=1&pageFirst=0'
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
