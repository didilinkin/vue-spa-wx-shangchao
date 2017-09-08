// 绑定信息 - 验证Picker Value 值是否可用
/* global require module: true */
const faker = require( 'faker' )
faker.locale = 'zh_CN'

module.exports = {
    api: '/mock/bindingRequire',
    response: function( _req, res ) {
        res.json({
            rlt: 'true',
            msg: 'ok',
            data: {
                state: faker.random.boolean(),
                arrLift: [
                    '长江中心A',
                    '长江中心B',
                    '长江中心C'
                ]
            }
        })
    }
}

