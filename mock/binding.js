// 绑定信息
/* global require module: true */
const Mock = require( 'mockjs' )
const Random = Mock.Random

// 生成数据
const mockData = {
    // 办公楼
    building: Mock.mock({                       
        buildingArr: [                                          
            {
                buildingName: Random.ctitle( 3, 5 ),             // 3个办公楼
                'floorArr|2-6': [                                   // 楼层号( 2 - 6 )
                    {
                        'floorNum|+1': 2,                           // 生成数字( 递增+1, 起始值为2, 数值类型 )
                        'roomArr|2-6': [
                            {
                                'roomNum|1-15': 1                   // 房间号( 1 - 15 ) 
                            }
                        ]
                    }
                ]
            }, {
                buildingName: Random.ctitle( 3, 5 ),             // 3个办公楼
                'floorArr|2-6': [                                   // 楼层号( 2 - 6 )
                    {
                        'floorNum|+1': 2,                           // 生成数字( 递增+1, 起始值为2, 数值类型 )
                        'roomArr|2-6': [
                            {
                                'roomNum|1-15': 1                   // 房间号( 1 - 15 ) 
                            }
                        ]
                    }
                ]
            }, {
                buildingName: Random.ctitle( 3, 5 ),             // 3个办公楼
                'floorArr|2-6': [                                   // 楼层号( 2 - 6 )
                    {
                        'floorNum|+1': 2,                           // 生成数字( 递增+1, 起始值为2, 数值类型 )
                        'roomArr|2-6': [
                            {
                                'roomNum|1-15': 1                   // 房间号( 1 - 15 ) 
                            }
                        ]
                    }
                ]
            }
        ]
    })
}

module.exports = {
    api: '/mock/binding',
    response: function( _req, res ) {
        res.json({
            rlt: 'true',
            msg: 'success',
            data: mockData.building.buildingArr
        })
    }
}