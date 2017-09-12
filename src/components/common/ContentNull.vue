// 通用组件 - '内容为空' 组件
<template lang="pug">
.ContentNull
    img(
        v-bind:srcset="setContentNullObj.contentImg.normal + ' 1x,' + setContentNullObj.contentImg.retina + ' 2x'"
    )
    h2.auto--textStyle {{ setContentNullObj.contentTitle }}
</template>

<script>
export default {
    name: 'ContentNull',
    props: {
        // 设置 '内容为空' 对象
        setContentNullObj: {
            type: Object,
            default: function() {
                return {
                    contentImg: {
                        normal: {},         // 清晰度: 默认图片
                        retina: {}          // 清晰度: retina图片
                    },
                    contentTitle: '内容为空'
                }
            }
        }
    }
}
</script>

<style lang="sass">
@import "../../sass/main"

.ContentNull
    +REL
    +textCenter
    +pT( 10% )
    >img
        +imgCover( 30% )
</style>
