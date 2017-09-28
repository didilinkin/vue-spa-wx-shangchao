// '物业公告' - '详情'页
<template lang="pug">
#BulletinDetails.auto--modulePadding
    h2.auto--titleStyle {{ bulletinDetailsInfo.title }}
    span.auto--assistStyle {{ bulletinDetailsInfo.createDate }}
    p.auto--textStyle.auto--textIndent {{ this.$data.content }}
    ul
        <!--li(-->
            <!--v-for="( item, index ) in bulletinDetailsInfo.content"-->
            <!--v-bind:key="index"-->
        <!--)-->
            <!--// 段落-->
            <!--p.auto&#45;&#45;textStyle.auto&#45;&#45;textIndent( v-if="item.type === 'paragraph'" ) {{ item.content }}-->
            <!--// 图片-->
            <!--// v-bind:srcset="item.imgUrl"-->
            <!--img(-->
                <!--v-else-->
                <!--v-lazy="item.imgUrl"-->
            <!--)-->
    ScrollTo(
        v-bind:ScrollToCanShowBoolean="this.$data.scrollStatus"
    )
</template>

<script>
import { mapGetters }   from 'vuex'

import ScrollTo         from '../../components/common/ScrollTo'
const components = { ScrollTo }

export default {
    name: 'BulletinDetails',
    methods: {
        // 目的: 请求 - 公告详细信息
        requireBulletinDetailsInfo() {
            this.$store.dispatch({
                type: 'bulletin/REQUEST_BULLETIN_DETAILS_INFO',
                id: this.$route.params.id
            })
        },
        // 目的: 监听滚轴
        watchScroll() {
            window.onscroll = () => {
                let yValue = window.scrollY                             // 滚轴状态
                if( typeof yValue === 'number' && yValue <= 100 ) {
                    this.$data.scrollStatus = false                     // 归零
                } else {
                    this.$data.scrollStatus = true                      // 改变
                }
            }
        }
    },
    data() {
        return {
            bulletinDetailsInfo: {},
            content: '',                                    // '公告详情' 内容
            scrollStatus: false                                         // 滚轴状态 => 是否显示'返回顶部'
        }
    },
    computed: mapGetters({
        getterBulletinDetailsInfo: 'getterBulletinDetailsInfo'
    }),
    watch: {
        // 监听: 公告详细内容
        getterBulletinDetailsInfo: function() {
            this.$data.bulletinDetailsInfo = this.getterBulletinDetailsInfo
            this.$data.content = this.getterBulletinDetailsInfo.content.replace( /&lt;/g, '<' ).replace( /&gt;/g, '>' ).replace( /&amp;nbsp;/g, '&nbsp;' ).replace( /&quot;/g, '"' )
        }
    },
    mounted: function() {
        this.requireBulletinDetailsInfo()
        this.watchScroll()
    },
    components: components
}
</script>

<style lang="sass" scoped>
@import "../../sass/main"

#BulletinDetails
    +bC( $C-W )
    ul li
        >img
            +imgCover( 100% )
</style>
