// '故障报修' - 报修评价( 评星星 )
<template lang="pug">
#Evaluation.auto--moduleMarginBottom
    .select.auto--modulePaddingTB
        // h1 报修评价
        star-rating(
            v-model="rating"
            active-color="rgb( 255, 190, 76 )"
            v-bind:star-size="34"
            v-bind:show-rating="false"
        )
        h3.auto--modulePaddingTB {{ starType }}
    .remark.auto--modulePaddingTB


</template>

<script>
import StarRating from 'vue-star-rating'
const components = { StarRating }

export default {
    name: 'Evaluation',
    methods: {
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
            starType: '满意' // 很差 / 一般 / 满意 / 非常满意 / 无可挑剔
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
            +REM-fontStyle( $F-title, $C-title )
</style>
