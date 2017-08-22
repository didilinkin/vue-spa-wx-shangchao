// 临时首页 - 添加跳转按钮
<template lang="pug">
#Home
    mt-button(
        v-for="item in HomeBtnArr"
        v-bind:key="item.url"
        v-bind:style="{ display: 'block', marginBottom: '1rem' }"
        @click="toUrl( item.url )"
        type="primary"
    ) {{ item.title }}
</template>

<script>
export default {
    name: 'Home',
    methods: {
        // 目的: 执行跳转
        toUrl( url ) {
            location.href = '#/' + url
        }
    },
    data() {
        return {
            HomeBtnArr: [
                {
                    url: 'bulletin',
                    title: '物业公告'
                }, {
                    url: 'bill',
                    title: '费用账单'
                }, {
                    url: 'fault',
                    title: '故障报修'
                },
                // {   // 暂时不需要此类目
                //     url: 'proposal',
                //     title: '投诉建议'
                // },
                {
                    url: 'binding',
                    title: '绑定房间'
                }
            ]
        }
    }
}
</script>
