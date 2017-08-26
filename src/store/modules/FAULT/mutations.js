import * as types from './types'

export default {
    [types.SET_REPAIR_DETAIL]( state, res ) {
        state.repairDetail = {}     // 清空 状态
        state.repairDetail = res
    },
    [types.SET_FAULT_LIST]( state, res ) {
        state.list = res
    },
    [types.SET_FAULT_DETAIL]( state, res ) {
        console.dir( res )

        let detailObj = {
            // 已评价
            evaluation: {
                time: res.pieDate,
                starNum: res.star
            },
            // 已处理完毕
            finished: {
                time: res.ratedDate,
                repair: res.repairedMan,
                maintenanceFees: res.amountMoney
            },
            // 已开始处理
            doing: {
                time: res.repairDate,
                repair: res.repairedMan
            },
            // 已派单
            send: {
                time: res.createDate,
                acceptor: res.withMan
            },
            // 客户已提交保修
            submitted: {
                time: res.repairedDate
            }
        }

        state.detail = Object.assign( detailObj, {})
    }
}
