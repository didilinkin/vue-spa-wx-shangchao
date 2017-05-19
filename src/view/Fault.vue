// 故障报修
<template lang="pug">
#Fault
    // 切换标签
    .Fault__navBar
        .Fault--title( 
            @click="active()"
            v-bind:class="{ active: showActive }"
        )
            h2.auto--textStyle 我要保修

        .Fault--title(
            @click="active()"
            v-bind:class="{ active: !showActive }"
        )
            h2.auto--textStyle 我的保修
    
    // 切换标签 内容 - '我要保修'
    WantToRepair( v-show="showActive" )
    
    // 切换标签 内容 - '我的保修'
    MyRepair( v-show="!showActive" )
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
            this.$data.showActive = !this.$data.showActive
        }
    },
    data() {
        return {
            showActive: true                                    // true: '我要保修'; false: '我的保修'
        }
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
