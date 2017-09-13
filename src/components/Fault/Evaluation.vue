// '故障报修' - 报修评价( 评星星 )
<template lang="pug">
#Evaluation.auto--moduleMarginBottom
    .select.auto--moduleMarginTop
        // h1 报修评价
        star-rating(
            v-model="rating"
            active-color="rgb( 255, 190, 76 )"
            v-bind:star-size="34"
            v-bind:show-rating="false"

        )
        h3.auto--modulePaddingTB {{ starType }}
    .remark.auto--moduleMarginBottom
        mt-field.auto--modulePadding(
            placeholder="感觉维修师傅怎么样，还满意吗？来叨叨几句吧~"
            type="textarea"
            rows="4"
            v-model="introduction"
            ref="input1"
        )
    .event(
        v-on:click="InputVal()"
    ) 评价

</template>

<script>
import StarRating from 'vue-star-rating'
const components = { StarRating }

export default {
    name: 'Evaluation',
    methods: {
        InputVal() {
            console.log( this.$refs.input1.value )
            console.log( this.$data.starType )
        },
        // 目的: 设置评分星星 提示词
        setStarType( starNum ) {
            switch ( starNum ) {
                case 1:
                    return this.$data.starType = '很差'
                case 2:
                    return this.$data.starType = '一般'
                case 3:
                    return this.$data.starType = '满意'
                case 4:
                    return this.$data.starType = '非常满意'
                case 5:
                    return this.$data.starType = '无可挑剔'
                default:
                    return this.$data.starType = '满意'
            }
        }
    },
    data() {
        return {
            rating: 3,
            starType: '满意', // 很差 / 一般 / 满意 / 非常满意 / 无可挑剔
            introduction: ''
        }
    },
    watch: {
        // 监听: 评分 '星星'数值 => 提示评价词
        rating: function() {
            let starNum = this.$data.rating
            this.setStarType( starNum ) // 设置评分星星 提示词
        }
    },
    components: components
}
</script>

<style lang="sass">
@import "../../sass/main.sass"

#Evaluation
    +bC( $C-W )
    +textCenter
    .select
        +dib
        >h3
            +REM-fontStyle( $F-text, $C-text )
        a:hover
            text-decoration: none

.mint-field-core
    +REM-fontStyle( $F-text, $C-text )
    background-color: #f2f2f2
.mint-cell:last-child
    background-image: none
.event
    width: 110px
    height: 40px
    display: inline-block
    background-color: #108ee9
    color: #fff
    border-radius: 5px
    line-height: 40px
    font-size: 14px
    margin-bottom: 20px
</style>
