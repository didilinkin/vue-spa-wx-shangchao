/* global Promise: true */
import axios            from 'axios'
import * as mockAPI     from '../../../services/mockAPI'
// const qs = require( 'qs' )

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const apiBulletinInfo = () => {
    return new Promise( function( resolve, reject ) {
        axios.post( mockAPI.BULLETIN )
        .then( response => {
            let resulData = response.data.data
            resolve( resulData )
        })
        .catch( error => {
            reject( error )
        })
    })
}