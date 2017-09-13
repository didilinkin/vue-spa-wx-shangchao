import * as types from './types'
import { cloneDeep } from 'lodash' // 深拷贝

export default {
    [types.SET_REPAIR_DETAIL]( state, res ) {
        state.repairDetail = {}     // 清空 状态
        state.repairDetail = res
    },
    [types.SET_FAULT_LIST]( state, res ) {
        state.list = res
    },
    // 进度条数据
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
    // 我的报修列表接口数据
    [types.SET_FAULT_DETAILL]( state, res ) {
        // console.log( res )
        let arr = res.repairList
        console.dir( arr )

        // 初始化状态
        let initTypeObj = {
            id: '',
            stateType: 'submitted',
            stateTitle: '已提交',
            dateTime: '2016-05-25 11:46',
            text: `此处是已提交文本此处是已提交文本
                                此处是已提交文本此处是已提交文本
                                此处是已提交文本此处是已提交文本`,
            showSchedule: 'submitted',                      // 进度状态:'已提交'(用于显示'进度'因'已处理'无法判断,所以添加此属性)
            // '进度' - 具体信息
            submittedInfo: {                                // '已提交'的信息
                dateTime: '2016-05-25 11:46'
            }
        }
        let json = []

        let setTypeObj = ( typeState, obj ) => {
            let typeObj = cloneDeep( initTypeObj )

            if ( typeState === 'submitted' ) { // 配置 '已提交' 对象
                typeObj.id = obj.id
                typeObj.stateType = 'submitted'
                typeObj.stateTitle = '已提交',
                typeObj.dateTime = obj.createDate // 数据时间
                typeObj.text = obj.repairedContent // 文本内容
            }

            json.push( typeObj )
        }

        arr.map( ( item ) => {
            if( item.pieStatus === 1 ) { // 是否派单
                if( item.repairStatus === 1 ) { // 维修状态
                    console.log( '维修过' )
                } else {
                    console.log( '未维修' )
                }
            } else {
                console.log( '未派单' )
                setTypeObj( 'submitted', item )
            }
        })

        console.log( '最后检查json' )
        console.dir( json ) // 成功
        state.repairState = json
    },
    [types.SET_TO_FAULT]( state, res ) {
        state.toRepair = res
    }
}
