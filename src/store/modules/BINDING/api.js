/* global Promise: true */
import axios            from 'axios'
import * as mockAPI     from '../../../services/mockAPI'
// const qs = require( 'qs' ) 

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const apiBuildingList  = () => {
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