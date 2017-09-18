// 故障报修
<template lang="pug">
    #proposal
        // 切换标签
        .Fault__navBar
            .Fault--title#wantToRepair--link(
            @click="toggleShow( 'wantToRepair' )"
            v-bind:class="{ active: !showMyRepair }"
            )
                h2.auto--textStyle 我要投诉

            .Fault--title#myRepair--link(
            @click="toggleShow( 'myRepair' )"
            v-bind:class="{ active: showMyRepair }"
            )
                h2.auto--textStyle 我的投诉

        // 根据路由参数 匹配渲染子组件
        WantToProposal( v-show="!showMyRepair" )
        MyProposal( v-show="showMyRepair" )
</template>

<script>
    import WantToProposal     from '../pages/proposal/WantToProposal'
    import MyProposal         from '../pages/proposal/MyProposal'
    const components = { WantToProposal, MyProposal }

    export default {
        name: 'proposal',
        methods: {
            // 目的: 切换详情组件
            toggleShow( detailName ) {
                if( detailName === 'wantToRepair' ) {
                    this.$data.showMyRepair = false
                } else {
                    this.$data.showMyRepair = true
                }
            }
        },
        data() {
            return {
                showMyRepair: false
            }
        },
        mounted: function() {
//            this.requireFaultList()
        },
        components: components
    }

</script>

<style lang="sass">
    @import "../sass/main"

    #proposal

    // 切换标签
    .Fault__navBar
        +flexCenter
        >.Fault--title
            flex: 1
            +bC( $C-W )
            +textCenter
            +borderBottom( $C-line )
        .active
            +borderBottom( $C-theme )
            >h2
                color: $C-theme
</style>
