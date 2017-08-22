// 接口配置

// const LocalUrl = '/mock'                                                 // for local mock test

const BaseUrl = '/mock'                                                 // for local mock test

const url = 'http://127.0.0.1:18081'                                    // 后台链接

export const RentUrl = url + '/wx/listCollectRent?clientNum=1'          // 租赁费用链接

export const FeeUrl = url + '/wx/listFee?clientNum=1'                   // 费用列表链接

export const pmUrl = url + '/wx/listPropertyFee?clientNum=1'            // 物业费用列表链接

export const eleUrl = url + '/wx/listWattHour?clientNum=1'           // 电费用列表链接

export const waterUrl = url + '/wx/listWaterRecord?clientNum=1'         // 水费用列表链接

export const BULLETIN = BaseUrl + '/bulletin'                           // 公告

export const BULLETIN_DETAILS = BaseUrl + '/bulletinDetails'            // 公告详情

export const BUILDING_LIST = BaseUrl + '/binding'                       // 绑定

export const BUILDING_REQUIRE = BaseUrl + '/bindingRequire'             // 绑定 - 请求绑定

