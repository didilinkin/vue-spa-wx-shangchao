/* global Promise require: true */
import axios            from 'axios'
import * as mockAPI     from '../../../services/mockAPI'
const qs = require( 'qs' )

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const apiBuildingList = () => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.BUILDING_LIST )
        .then( response => {
            let resulData = response.data.data
            resolve( resulData )
        })
        .catch( error => {
            reject( error )
        })
    })
}

export const apiRoomList = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.get( mockAPI.ROOM_LIST + '?clientNum=' + obj.clientNum
          //   mockAPI.ROOM_LIST, qs.stringify({
          //   'clientNum': '12222'
          // })
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

export const apiRoomDelete = ( obj ) => {
    return new Promise( function( resolve, reject ) {
        axios.post( mockAPI.ROOM_LIST + '?id=' + obj.id
            //   mockAPI.ROOM_LIST, qs.stringify({
            //   'clientNum': '12222'
            // })
        )
            .then( response => {
                let resulData = response.data.success
                resolve( resulData )
            })
            .catch( error => {
                reject( error )
            })
    })
}

/*
    |   clientName  |String| 微信昵称 |
    |   phone  |String|  电话 |
    |   buildId  |Long|  楼宇id |
    |   buildName  |String|  楼盘名称 |
    |   roomId  |Long|  房间id |
    |   roomName  |String|  房间名称 |
    |   companyNum  |String|  公司编码 |
    |   clientNum  |String|  微信客户编号 |
 */
export const apiRequireBinding = ( bindingValObj ) => {
    return new Promise( function( resolve, reject ) {
        axios.post( mockAPI.BUILDING_REQUIRE, qs.stringify({
            // 'phone': '15275263276',
            'clientName': bindingValObj.nickName,
            'clientNum': bindingValObj.clientNum,
            'buildId': bindingValObj.buildingValue,
            'floorValue': bindingValObj.floorValue,
            'roomId': bindingValObj.roomValue,
            'companyNum': bindingValObj.companyNo
        }) )
        .then( response => {
            let resulData = response.data.success
            resolve( resulData )
        })
        .catch( error => {
            reject( error )
        })
    })
}
