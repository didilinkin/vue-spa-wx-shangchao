// '故障报修' - 报修评价( 评星星 )
<template lang="pug">
    #EvaluationPro.auto--moduleMarginBottom
        #input4.select.auto--moduleMarginTop
            // h1 报修评价
            star-rating(
            v-model="rating"
            active-color="rgb( 255, 190, 76 )"
            v-bind:star-size="34"
            v-bind:show-rating="false"
            )
            h3.auto--modulePaddingTB {{ starType }}
        #input5.remark.auto--moduleMarginBottom
            mt-field.auto--modulePadding(
            placeholder="处理结果还满意吗？来叨叨几句吧~"
            type="textarea"
            rows="4"
            v-model="introduction"
            ref="input1"
            )
        #input6.event(
        v-on:click="InputVall()"
        ) 评价
</template>

<script>
    import StarRating from 'vue-star-rating'
    import { mapGetters }   from 'vuex'
    import swal         from 'sweetalert2'
    const components = { StarRating }

    export default {
        name: 'EvaluationPro',
        methods: {
            updatePropoal( star, ratedContent ) {
                this.$store.dispatch({
                    type: 'proposal/UPDATE_PROPOSAL',
                    star: star,
                    id: this.$route.params.id,
                    ratedContent: ratedContent
                })
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
            },
            InputVall() {
                let star = this.$data.rating
                let ratedContent = this.$refs.input1.value
                this.updatePropoal( star, ratedContent )
            }
        },
        data() {
            return {
                rating: 3,
                starType: '满意', // 很差 / 一般 / 满意 / 非常满意 / 无可挑剔
                introduction: '',
                proposalId: '0',
                result: false
            }
        },
        computed: mapGetters({
            getterUpdateResult: 'getterUpdateResult'
        }),
        watch: {
            // 监听: 评分 '星星'数值 => 提示评价词
            rating: function() {
                let starNum = this.$data.rating
                this.setStarType( starNum ) // 设置评分星星 提示词
            },
            getterUpdateResult: function() {
                this.$data.result = this.getterUpdateResult.success
                if( this.getterUpdateResult.success === true ) {
                    swal({
                        title: '成功!',
                        text: '您的问题已提交',
                        type: 'success',
                        confirmButtonText: '确认'
                    })
                    let a = document.getElementById( 'input4' )
                    let b = document.getElementById( 'input5' )
                    let c = document.getElementById( 'input6' )
                    a.style.display = 'none'
                    b.style.display = 'none'
                    c.style.display = 'none'
                    this.$emit( 'watchRequireFaultDetail' )
                }else {
                    swal({
                        title: '失败!',
                        text: '提交失败，请电话联系',
                        type: 'error',
                        confirmButtonText: '确认'
                    })
                }
            }
        },
        components: components
    }
</script>

<style lang="sass">
    @import "../../sass/main.sass"

    #EvaluationPro
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
    .mint-cell:last-child
        background-image: none
</style>
