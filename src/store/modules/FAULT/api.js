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
