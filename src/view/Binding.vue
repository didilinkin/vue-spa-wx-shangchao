// 绑定房间
<template lang="pug">
#Building.auto--modulePadding
    StateButton(
        v-bind:buttonStyleObj="stateButtonObj.styleObj"     
        v-bind:buttonPlainBoolean="stateButtonObj.buttonPlainBoolean"
        v-bind:buttonContentStr="stateButtonObj.title"
        v-bind:buttonImgIconObj="stateButtonObj.imgIcon"
    )
</template>

<script>
/* global require:true */ 
import { mapGetters }   from 'vuex'

import StateButton      from '../components/common/StateButton'
const components = { StateButton }

export default {
    name: 'Binding',
    methods: {
        // 目的: 请求 - 建筑列表( 有哪些楼: 动态数据 )
        requireBuildingList() {
            console.log( '请求 - 建筑列表' )
        } 
    },
    data() {
        return {
            // 状态按钮 - props集合对象
            stateButtonObj: {                       
                styleObj: {
                    className: 'auto--titleStyle is-disabled',      // 默认标题样式 / 完成后 传入主题色class
                    size: 'large'                                   // 默认尺寸: 大
                },
                buttonPlainBoolean: true,                           // 默认幽灵状态
                title: '绑定',                
                icon: {
                    iconState: 'null'
                },
                imgIcon: {
                    iconState: 'img',
                    width: '20',
                    height: '20',
                    iconImgUrl: require( '../assets/images/defaultBtn.png' )            // 自定义图标图片
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