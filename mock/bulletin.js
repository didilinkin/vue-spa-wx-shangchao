// '公告' - 文本信息
/* global require module: true */
const faker = require( 'faker' )
faker.locale = 'zh_CN'

let bulletinInfoArr = []

for( let i = 0; i < 20; i++ ) {
    bulletinInfoArr.push(
        {
            id: faker.random.number( 5000 ),
            title: faker.name.firstName() + faker.name.lastName(),
            time: faker.date.recent(),
            text: faker.lorem.paragraphs()
        }
    )
}


module.exports = {
    api: '/mock/bulletin',
    response: function( _req, res ) {
        res.json({
            rlt: 'true',
            msg: 'ok',
            data: bulletinInfoArr
        })
    }
}
