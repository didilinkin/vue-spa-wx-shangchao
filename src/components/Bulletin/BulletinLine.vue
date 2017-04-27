// '物业公告' - 公告轴
<template lang="pug">
#BulletinLine
    ul(
        v-if="this.$data.canRender"
        v-infinite-scroll="countBulletin"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="51"
    )
        li.BulletinLine--item(
            v-for="item in renderArr"
            v-bind:key="item.title"
        )
            h2.auto--titleStyle(
                @click="toBulletinDetails( item.id )"
            ) {{ item.title }}
            span.auto--assistStyle {{ item.date }}
            span.auto--assistStyle {{ item.time }}
            .BulletinLine--labelCircle
    .BulletinLine--null(
        v-else
        class="auto--modulePaddingTB"
    )
        img(
            v-bind:srcset="bulletinNullObj.normalImg + ' 1x,' + bulletinNullObj.retinaImg + ' 2x'"
        )
        h2.auto--titleStyle {{ bulletinNullObj.title }}
</template>

<script>
/* global Promise require:true */
export default {
    name: 'BulletinLine',
    props: {
        bulletinLineArr: {
            type: Array,
            default: function() {
                return [
                    {
                        id: 100,
                        title: '测试标题',
                        text: `测试文字测试文字测试文字测试文字测试文字
                                测试文字测试文字测试文字测试文字
                                测试文字测试文字`,
                        date: '2017-04-20',
                        time: '08:13'
                    }
                ]
            }
        }
    },
    methods: {
        // 目的: 计算'公告' - 负责计算当前环境量
        countBulletin() {
            let awaitNum = this.$data.bulletinNum - 10 * this.$data.loadNum
            let multipleNum = parseInt( awaitNum / 10 )
            if( typeof awaitNum === 'number' && awaitNum > 0 ) {
                multipleNum === 0 ? this.countLoad( awaitNum ) : this.countLoad( 10 )
            }
        },
        // 目的: 加载更多 - 根据 环境量的参数, 进行逻辑判断( 是否调用计时器 )
        countLoad( num ) {
            if( this.$data.loadNum === 0 ) {                                                                    // 初次加载
                this.countRender( num )
            } else {
                if( num === 10 ) {                                                                              // > 10
                    this.asyncTime( 10 )
                } else {                                                                                        // < 10
                    this.asyncTime( num )
                }
            }
        },
        // 目的: async计时器函数
        asyncTime( asyncNum ) {
            this.$data.loading = true
            let that = this
            let countLoadTime = function() {
                return new Promise( ( resolve ) => {
                    setTimeout( resolve, 2000 )
                })
            }
            let asyncSetTimeOut = async function( asyncNum ) {
                await countLoadTime()
                that.$data.loading = false
                that.countRender( asyncNum )
            }
            asyncSetTimeOut( asyncNum )
        },
        // 目的: 计算 $data 渲染数组 + 修改 $data.loadNum 加载次数
        countRender( num ) {
            for( let i = 0; i < num; i++ ) {
                let addBulletinObj = this.$props.bulletinLineArr[i + 10 * this.$data.loadNum]
                this.$data.renderArr.push( addBulletinObj )
            }
            let timeNum = this.$data.loadNum
            this.$data.loadNum = timeNum + 1
        },
        // 目的: 点击标题 触发 '前往公告详情页' 事件
        toBulletinDetails( idUrl ) {
            // console.log( idUrl )
            location.href = '#/bulletin/' + idUrl
        }
    },
    data() {
        return {
            loading: false,
            canRender: true,
            renderArr: [],
            bulletinNum: 0,                                                                                     // $props中 '公告'数量
            loadNum: 0,                                                                                         // 加载次数
            bulletinNullObj: {
                normalImg: require( '../../assets/images/picNotice@2x.png' ),
                retinaImg: require( '../../assets/images/picNotice@3x.png' ),
                title: '抱歉！当前没有公告~'
            }
        }
    },
    watch: {
        bulletinLineArr: function() {
            let bulletinLength = this.$props.bulletinLineArr.length
            if( typeof bulletinLength === 'number' && bulletinLength > 0 ) {
                this.$data.canRender = true                                                                     // 可渲染
                this.$data.bulletinNum = bulletinLength
                this.countBulletin()
            } else {
                this.$data.canRender = false                                                                    // 不可 -> 显示'无消息'图片
            }
        }
    }
}
</script>

<style lang="sass">
@import "../../sass/main"

#BulletinLine
    +bC( $C-W )
    .BulletinLine--item
        +REL
        +REM-padding-TB( $D-autoPadding )
        +mL( .5rem )
        +pL( .5rem )
        +pR( .5rem )
        border-left: 1px solid $C-line
        >h2
            +REM( margin-bottom, $D-autoMargin/2 )
            +ell-line( $F-title*1.5, 3 )
            cursor: pointer
            +pseudoClassColor( hover, color, darken, $C-theme, 2% )
            +pseudoClassColor( active, color, darken, $C-theme, 2% )
        >span:first-of-type
            +REM( margin-right, $D-autoMargin )
        .BulletinLine--labelCircle
            +ABS
            left: -.25rem
            top: .5rem
            +REM-W-H( $F-title )
            +bC( $C-theme )
            border: 1px solid $C-L-theme
            +radius( 50% )
            +boxShadow( 0, 0, $F-title/2, darken( $C-theme, 2% ) )
    ul
        +mB( 2rem )
    // '空数据'
    .BulletinLine--null
        +mT( 20% )
        +textCenter
        >img
            +mB( $D-autoMargin )
            +imgCover( 25% )
</style>
