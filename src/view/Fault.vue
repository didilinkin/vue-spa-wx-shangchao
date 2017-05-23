// 故障报修
<template lang="pug">
#Fault
    // 切换标签
    .Fault__navBar
        .Fault--title#wantToRepair( 
            onClick="window.sayHi( 'wantToRepair' )"
        )
            h2.auto--textStyle 我要保修

        .Fault--title#myRepair(
            onClick="window.sayHi( 'myRepair' )"
        )
            h2.auto--textStyle 我的保修
    
    // 嵌套路由
</template>

<script>
import WantToRepair     from '../pages/Fault/WantToRepair'
import MyRepair         from '../pages/Fault/MyRepair'
const components = { WantToRepair, MyRepair }

export default {
    name: 'Fault',
    methods: {
        // 目的: 点击标签时, 状态取反.
        active() {
            console.log( 1 )
            this.$data.showActive = !this.$data.showActive
        }
    },
    data() {
        return {
            showActive: true                                    // true: '我要保修'; false: '我的保修'
        }
    },
    mounted: function() {
        console.log( this.$route.params.id )
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
