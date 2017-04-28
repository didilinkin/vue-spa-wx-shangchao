// 绑定房间
<template lang="pug">
#Building.auto--modulePadding
    StateButton(
        v-bind:buttonStyleObj="stateButtonObj.styleObj"     
        v-bind:buttonPlainBoolean="stateButtonObj.buttonPlainBoolean"
        v-bind:buttonContentStr="stateButtonObj.title"
        v-on:buttonClickEvent="setBinding()"
    )
</template>

<script>
import { mapGetters }   from 'vuex'

import StateButton      from '../components/common/StateButton'
const components = { StateButton }

export default {
    name: 'Binding',
    methods: {
        // 目的: 请求 - 建筑列表( 有哪些楼: 动态数据 )
        requireBuildingList() {
            console.log( '请求 - 建筑列表' )
        },
        // 目的: 触发'绑定' 按钮
        setBinding() {
            console.log( '子组件反馈触发事件' )
        }
    },
    data() {
        return {
            // 状态按钮 - props集合对象
            stateButtonObj: {                       
                styleObj: {
                    className: 'auto--titleStyle',                  // 默认标题样式 / 完成后 传入主题色class( 禁用class: is-disabled )
                    size: 'large'                                   // 默认尺寸: 大
                },
                buttonPlainBoolean: true,                           // 默认幽灵状态
                title: '绑定',                
                icon: {
                    iconState: 'null'
                }
            },
            inputState: 'null',                                     // 输入状态
            buildingList: []                                        // 建筑列表
        }
    },
    computed: mapGetters({

    }),
    components: components
}
</script>

<style lang="sass">
@import "../sass/main"

#Building
    +bC( $C-W )
</style>

// mt-button( type="primary" ) primary
// mt-button( type="danger" ) danger