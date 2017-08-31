import * as types from './types'

export default {
    [types.SET_BULLETIN_INFO]( state, res ) {
        let resArr = res                                            // 声明一个返回值数组
        // for( let i = 0; i < resArr.length; i++ ) {
        //     let resTimeArr = resArr[i].time.split( 'T' )
        //     let dateObj = resTimeArr[0]                             // 日期
        //     let timeArr = resTimeArr[1].split( ':' )                // 拆分时间
        //     let timeObj = `${ timeArr[0] }:${ timeArr[1] } `        // 拼接需要的格式
        //     resArr[i]['date'] = dateObj                             // 存入日期( 处理完成 )
        //     resArr[i]['time'] = timeObj                             // 存入时间( 处理完成 )
        // }
        state.bulletinInfo = resArr                                 // 将resArr 数据存入 state
        // state.bulletinInfo = []                                  // 空数组 - 用于测试空数据
    },
    [types.SET_BULLETIN_DETAILS_INFO]( state, res ) {
        let resObj = res
        console.dir( res )
        resObj['content'] = res.content
        state.bulletinDetailsInfo = resObj
    }
}
