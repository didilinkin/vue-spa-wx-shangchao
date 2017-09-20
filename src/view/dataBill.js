/* global require: true */
// 'Bill.vue' 组件 $data 数据
const dataBillObj = {
    listArr: [
        {
            id: 'buildingFee',
            iconImg: require( '../assets/images/iconHousing@2x.png' ),
            title: '房屋租赁费',
            text: '交费期限',
            data: ''
        }, {
            id: 'propertyFee',
            iconImg: require( '../assets/images/iconProperty@2x.png' ),
            title: '物业管理费',
            text: '交费期限',
            data: ''
        }, {
            id: 'electricityBill',
            iconImg: require( '../assets/images/iconElectricity@2x.png' ),
            title: '电费',
            text: '交费期限',
            data: ''
        }, {
            id: 'waterFee',
            iconImg: require( '../assets/images/iconWater@2x.png' ),
            title: '水费',
            text: '交费期限',
            data: ''
        }
        // {
        //     id: 'leaseDeposit',
        //     iconImg: require( '../assets/images/iconMargin@2x.png' ),
        //     title: '租赁保证金',
        //     text: '交费期限',
        //     data: '2017-02-21'
        // }, {
        //     id: 'energyDeposit',
        //     iconImg: require( '../assets/images/iconEnergy@2x.png' ),
        //     title: '能源管理押金',
        //     text: '当前结余',
        //     value: '123,456.00'
        // }, {
        //     id: 'decorationDeposit',
        //     iconImg: require( '../assets/images/iconDecorate@2x.png' ),
        //     title: '装修保证金',
        //     text: '当前结余',
        //     value: '123,456.00'
        // }
    ],
    listArrowImg: require( '../assets/images/iconListArrow@2x.png' )    // 单箭头图标图片
}

export { dataBillObj }
