g// '费用账单' - 能源管理押金
<template lang="pug">
#EnergyDeposit.bill--backgroundColor
    BillHeader( v-bind:contentObj="BillHeaderObj" )

    // 账单押金组件
    DepositList( v-bind:depositListArr="DepositList")
</template>

<script>
import BillHeader       from '../../components/Bill/BillHeader'
import DepositList      from '../../components/Bill/DepositList'
const components = { BillHeader, DepositList }

export default {
    name: 'EnergyDeposit',
    methods: {
        // 目的: 请求 - 能源管理押金
        requireEnergyDeposit() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_ENERGY_DEPOSIT'
            })
        }
    },
    data() {
        return {
            BillHeaderObj: {
                title: '能源管理押金',
                money: '',
                companyName: this.$store.state.globalState.userInfo.companyName
            },
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
        this.requireEnergyDeposit()       // 请求 - 能源管理押金
    },
    components: components
}
</script>
