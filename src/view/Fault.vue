// 故障报修
<template lang="pug">
#Fault
    // 切换标签
    .Fault__navBar
        .Fault--title#wantToRepair--link( 
            onClick="window.toFaultDetail( 'wantToRepair' )"
            class="Fault--title active"
        )
            h2.auto--textStyle 我要保修

        .Fault--title#myRepair--link(
            onClick="window.toFaultDetail( 'myRepair' )"
        )
            h2.auto--textStyle 我的保修
    
    // 根据路由参数 匹配渲染子组件
    WantToRepair
    MyRepair( style="{ display: 'none' }" )
</template>

<script>
import WantToRepair     from '../pages/Fault/WantToRepair'
import MyRepair         from '../pages/Fault/MyRepair'
const components = { WantToRepair, MyRepair }

export default {
    name: 'Fault',
    data() {
        return {}
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
        +borderBottom( $C-W )
    .active 
        +borderBottom( $C-theme )
        >h2
            color: $C-theme
</style>
