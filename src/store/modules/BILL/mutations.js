import * as types from './types'

export default {
    [types.SET_RENT_FEE]( state, res ) {
        let list = res
        // console.log( '11111111111111111' )
        // console.log( list )                                 // 声明一个返回值数组
        const resArr = list
        let sumRent = 0
        for( let i = 0; i < list.length; i++ ) {
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
    },
    [types.SET_BILL_LIST]( state, res ) {
        let Fee = res
        state.feeInfo = Fee
    },
    [types.SET_PM_FEE]( state, res ) {
        const pm = res
        let list = res
        let sumPm = 0
        for( let i = 0; i < list.length; i++ ) {
            let pmOne = list[i]
            pm[i]['title'] = '物业管理费'
            pm[i]['money'] = pmOne.actualPaidMoney
            pm[i]['tollStartDate'] = pmOne.startDate
            pm[i]['tollDeadline'] = pmOne.endDate
            pm[i]['payDate'] = pmOne.payDeadline
            pm[i]['showDetailInfo'] = false
            pm[i]['detailsInfo'] = pmOne.detailsInfo
            pm[i]['detailList'] = pmOne.detailList
            sumPm = sumPm + pmOne.actualPaidMoney
        }
        state.pmInfo = pm
        state.sumPm = sumPm
    },
    [types.SET_ELE_FEE]( state, res ) {
        const ele = res
        let list = res
        let sumEle = 0
        for( let i = 0; i < list.length; i++ ) {
            let eleOne = list[i]
            ele[i]['title'] = '电费'
            ele[i]['money'] = eleOne.actualReceivable
            ele[i]['tollStartDate'] = eleOne.preWattDate
            ele[i]['tollDeadline'] = eleOne.wattDate
            ele[i]['payDate'] = eleOne.overdueDate
            ele[i]['showDetailInfo'] = false
            ele[i]['detailsInfo'] = eleOne.detailsInfo
            ele[i]['detailList'] = eleOne.detailList
            sumEle = sumEle + eleOne.actualReceivable
        }
        state.eleInfo = ele
        state.sumEle = sumEle.toFixed( 1 )
        console.log( '11111111111111111' )
        console.log( state.eleInfo )
        console.log( state.sumEle )
    }
}
