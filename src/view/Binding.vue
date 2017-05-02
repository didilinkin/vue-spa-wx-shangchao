// 绑定房间
<template lang="pug">
#Building.auto--modulePadding
    StateButton(
        v-bind:buttonStyleObj="stateButtonObj.styleObj"
        v-bind:buttonPlainBoolean="stateButtonObj.buttonPlainBoolean"
        v-bind:buttonContentStr="stateButtonObj.title"
        v-on:buttonClickEvent="setBinding()"
    )
    #name 点我选择
</template>

<script>
import { mapGetters }   from 'vuex'
import Picker           from 'better-picker'

import StateButton      from '../components/common/StateButton'
const components = { StateButton }

export default {
    name: 'Binding',
    methods: {
        // 目的: 请求 - 建筑列表( 有哪些楼: 动态数据 )
        requireBuildingList() {
            this.$store.dispatch({
                type: 'binding/REQUEST_BUILDING_LIST'
            })
        },
        // 目的: 触发'绑定' 按钮
        setBinding() {
            console.log( '子组件反馈触发事件' )
            this.pickerClick()
        },
        // 目的: picker 事件( 由 'setBinding'事件触发 )
        pickerClick() {
            const that = this
            // 获取元素
            let nameEl = document.getElementById( 'name' )

            let pickerDataA = this.$data.buildingArr                        // 建筑物列表( 保存成功 )
            let pickerDataB = this.$data.floorArr                           // 楼层数组
            let pickerDataC = this.$data.roomArr                            // 房间号数组

            let picker = new Picker({
                data: [ pickerDataA, pickerDataB, pickerDataC ],
                selectedIndex: [0, 1, 2],
                title: '我们都是小学生'
            })

            picker.on( 'picker.select', function( _selectedVal, selectedIndex ) {
                nameEl.innerText = pickerDataA[selectedIndex[0]].text + ' ' + pickerDataB[selectedIndex[1]].text + ' ' + pickerDataC[selectedIndex[2]].text
                that.$data.stateButtonObj.title = '修改绑定'
            })

            picker.on( 'picker.change', function( index, selectedIndex ) {
                console.log( index )
                console.log( selectedIndex )
            })

            picker.on( 'picker.valuechange', function( selectedVal, selectedIndex ) {
                console.log( selectedVal )
                console.log( selectedIndex )
            })
            picker.show()
        },
        // 目的: 处理建筑物 名称数组( watch触发 )
        setBuildingArr() {
            let setBuildingList = this.$data.buildingList                                       // 临时存储 交互获取的建筑物数据
            let setBuildingName = []                                                            // 临时存储 一个空数组， 用于处理 建筑名数组

            // 创建class( picker需求的对象类型 )
            class BuildingObj {
                constructor( text, value ) {
                    this.text = text
                    this.value = value 
                }
            }

            for( let i = 0; i < setBuildingList.length; i++ ) {                                 // 遍历 交互返回的建筑物数组
                let buildingObj = new BuildingObj( setBuildingList[i].buildingName, i + 1 )     // 创建对象( 标题, value值=i+1 )
                setBuildingName.push( buildingObj )                                             // push保存到数组中
            }

            this.$data.buildingArr = setBuildingName
        },
        // 目的: 处理楼层 名称数组( watch触发 )
        setFloorArr() {
            let setBuildingList = this.$data.buildingList                                       // 临时存储 交互获取的建筑物数据
            let setFloorName = []                                                               // 临时存储 一个空数组， 用于处理 建筑名数组

            for( let i = 0; i < setBuildingList.length; i++ ) {
                let floorObj = setBuildingList[i].floorArr
                setFloorName.push( floorObj )
            }

            this.$data.floorArr = setFloorName
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
            buildingList: [],                                       // 建筑列表
            // Picker 筛选器组件 模拟数据
            buildingArr: [],                                        // 建筑物 数组
            floorArr: [],                                           // 楼层 数组
            roomArr: []                                             // 房间号 数组
        }
    },
    computed: mapGetters({
        getterBuildingList: 'getterBuildingList'
    }),
    watch: {
        // 监听: '绑定' 建筑物列表
        getterBuildingList: function() {
            this.$data.buildingList = this.getterBuildingList
            this.setBuildingArr()                                       // 处理数组 事件 - 建筑物数组
            this.setFloorArr()                                          // 处理数组 事件 - 楼层数组
        }
    },
    mounted: function() {
        // this.pickerInit()
        this.requireBuildingList()
    },
    components: components
}
</script>

<style lang="sass">
@import "../sass/main"

#Building
    +bC( $C-W )
</style>
