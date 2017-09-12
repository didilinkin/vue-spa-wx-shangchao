// 故障报修
<template lang="pug">
#Fault
    // 切换标签
    .Fault__navBar
        .Fault--title#wantToRepair--link(
            @click="toggleShow( 'wantToRepair' )"
            v-bind:class="{ active: !showMyRepair }"
        )
            h2.auto--textStyle 我要报修

        .Fault--title#myRepair--link(
            @click="toggleShow( 'myRepair' )"
            v-bind:class="{ active: showMyRepair }"
        )
            h2.auto--textStyle 我的报修

    // 根据路由参数 匹配渲染子组件
    WantToRepair( v-show="!showMyRepair" )
    MyRepair( v-show="showMyRepair" )

</template>

<script>
import WantToRepair     from '../pages/Fault/WantToRepair'
import MyRepair         from '../pages/Fault/MyRepair'
const components = { WantToRepair, MyRepair }

export default {
    name: 'Fault',
    methods: {
        // 目的: 切换详情组件
        toggleShow( detailName ) {
            if( detailName === 'wantToRepair' ) {
                this.$data.showMyRepair = false
            } else {
                this.$data.showMyRepair = true
            }
        }
        // 目的: 请求 '故障报修' 列表信息( 用户参数由内部获取, 不已外部传入 )
//        requireFaultList() {
//            // console.log( '请求信息' )
//            // console.log( this.$store.state.globalState.userInfo.userId )
//            this.$store.dispatch({
//                type: 'fault/REQUIRE_FAULT_LIST',
//                userId: 1 // this.$store.state.globalState.userInfo.userId
//            })
//        }
    },
    data() {
        return {
            showMyRepair: false
        }
    },
    mounted: function() {
        // this.requireFaultList()
    },
    components: components
}

</script>

<style lang="sass">
@import "../sass/main"

#Fault

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
