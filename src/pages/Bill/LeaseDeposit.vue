// '费用账单' - 租赁保证金
<template lang="pug">
#LeaseDeposit.bill--backgroundColor
    BillHeader( v-bind:contentObj="BillHeaderObj" )

    // 账单押金组件
    DepositList( v-bind:depositListArr="DepositList")
</template> 

<script>
import BillHeader       from '../../components/Bill/BillHeader'
import DepositList      from '../../components/Bill/DepositList'
const components = { BillHeader, DepositList }

export default {
    name: 'LeaseDeposit',
    methods: {
        // 目的: 请求 - 租赁保证金
        requireLeaseDeposit() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_BUILDING_FEE'
            })
        }
    },
    data() {
        return {
            BillHeaderObj: {
                title: '租赁保证金',
                money: '123,456.00',
                companyName: this.$store.state.globalState.userInfo.companyName
            }
            ,
            // 账单 押金数据 => '账单押金组件'组件
            DepositList: [
                {
                    classType: 'charge',
                    title: '扣',
                    date: '2017-04-10',
                    money: '-1024.02',
                    description: `此处是说明此处是说明此处是说明此处是说明此处是说明
                                    此处是说明`
                }, {
                    classType: 'refunds',
                    title: '退',
                    date: '2017-04-10',
                    money: '+1024.02',
                    description: `此处是说明此处是说明此处是说明此处是说明此处是说明
                                    此处是说明`
                }, {
                    classType: 'pay',
                    title: '支',
                    date: '2017-04-10',
                    money: '-1024.02',
                    description: `此处是说明此处是说明此处是说明此处是说明此处是说明
                                    此处是说明`
                }
            ]
        }
    },
    mounted: function() {
        this.requireLeaseDeposit()       // 请求 - 租赁保证金
    },
    components: components
}
</script>