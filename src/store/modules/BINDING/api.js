/* global Promise require: true */
import axios            from 'axios'
import * as mockAPI     from '../../../services/mockAPI'
const qs = require( 'qs' )

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const apiBuildingList = () => {
    return new Promise( function( resolve, reject ) {
        axios.post( mockAPI.BUILDING_LIST )
        .then( response => {
            let resulData = response.data.data
            resolve( resulData )
        })
        .catch( error => {
            reject( error )
        })
    })
}

export const apiRequireBinding = ( bindingValObj ) => {
    return new Promise( function( resolve, reject ) {
        axios.post( mockAPI.BUILDING_REQUIRE, qs.stringify({
            'buildingValue': bindingValObj.buildingValue,
            'floorValue': bindingValObj.floorValue,
            'roomValue': bindingValObj.roomValue,
            'companyNo': bindingValObj.CompanyNO
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
