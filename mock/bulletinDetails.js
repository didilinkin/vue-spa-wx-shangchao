// '公告' - 详细消息
/* global require module: ture */ 
const Mock = require( 'mockjs' )
const Random = Mock.Random

// 生成数据
const mockData = {
    title: Random.ctitle( 10, 15 ),                     // 标题
    dataTime: Random.datetime(),                        // 日期 + 时间
    content: Mock.mock({
        'contentInfo|1-4': [                            // 随机 数组( 1 - 8个 )
            {                                           // 段落 ( >0 )
                type: 'paragraph',
                paragraph: Random.cparagraph()              
            }, {                                        // 图片 ( ~0 )
                type: 'img',
                imgUrl: Random.image()
            }
        ]
    })
}

module.exports = {
    api: '/mock/bulletinDetails',
    response: function( _req, res ) {
        res.json({
            rlt: 'true',
            msg: 'success',
            data: mockData
        })
    }
}