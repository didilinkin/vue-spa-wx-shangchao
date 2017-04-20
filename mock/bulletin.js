// '公告' - 文本信息
/* global require module: true */
const faker = require( 'faker' )
faker.locale = 'zh_CN'

module.exports = {
    api: '/mock/bulletin',
    response: function( _req, res ) {
        res.json({
            rlt: 'true',
            msg: 'ok',
            data: faker.random.words()
        })
    }
}