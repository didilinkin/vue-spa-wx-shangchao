// 费用账单
<template lang="pug">
#Bill
    h1 费用账单
</template>

<script>


export default {
    name: 'Bill',
    methods: {
        // 目的: 请求 - 费用账单列表
        requireBillList() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_BILL_LIST'
            })
        }
    }    
}
</script>