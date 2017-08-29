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
    },
    [types.SET_FAULT_DETAILL]( state, res ) {
        console.log( res )
        let json = []
        res.forEach( r => {
            json.push({
                id: 35648,
                stateType: 'evaluation',
                stateTitle: '已评价',
                dateTime: r.createDate,
                text: `此处是已评价文本此处是已评价文本
                            此处是已评价文本此处是已评价文本
                            此处是已评价文本`,
                showSchedule: 'evaluation',                                 // 进度状态: '已评价'
                // '进度' - 具体信息
                submittedInfo: {
                    dateTime: '2016-05-25 11:46'
                },
                sendInfo: {
                    handlePeople: '张先生( 处理人 )',
                    dateTime: '2016-11-12 11:51'
                },
                beingProcessedInfo: {
                    repairMan: '王先生( 维修人 ) 刘先生( 维修人 )',
                    dateTime: '2016-11-13 12:55'
                },
                finishedInfo: {
                    repairMan: '王先生( 维修人 ) 刘先生( 维修人 )',
                    maintenanceFees: 30,                                    // 维修费
                    dateTime: '2016-07-11 12:12'
                },
                evaluationInfo: {                                           // 评价信息
                    dateTime: '2016-01-22 15:34',
                    score: 4                                                // 评分星星数
                }
            })
        })
        state.repairState = json
    }
}
