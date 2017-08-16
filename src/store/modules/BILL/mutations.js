import * as types from './types'

export default {
    [types.SET_RENT_FEE]( state, res ) {
        let list = res
        // console.log( '11111111111111111' )
        // console.log( list )                                 // 声明一个返回值数组
        const resArr = list
        let sumRent = 0
        for( let i = 0; i < list.length; i++ ) {
            // let resTimeArr = resArr[i]
            // let dateObj = resTimeArr[0]
            // let timeArr = resTimeArr[1].split( ':' )
            // let timeObj = `${ timeArr[0] }:${ timeArr[1] } `
            // resArr[i]['date'] = dateObj
            // resArr[i]['time'] = timeObj
            let rent = list[i]
            resArr[i]['title'] = '房屋租赁费'
            resArr[i]['money'] = rent.actualPaidMoney
            resArr[i]['tollStartDate'] = rent.startDate
            resArr[i]['tollDeadline'] = rent.endDate
            resArr[i]['payDate'] = rent.payDeadline
            resArr[i]['showDetailInfo'] = false
            resArr[i]['detailsInfo'] = rent.detailsInfo
            sumRent = sumRent + rent.actualPaidMoney
        }

        state.rentInfo = resArr
        state.sumRent = sumRent                                 // 将resArr 数据存入 state

        // state.bulletinInfo = []                                  // 空数组 - 用于测试空数据
    }
}
