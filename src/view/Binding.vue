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
/* global Promise: true */ 
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
            // let nameEl = document.getElementById( 'name' )

            let picker = new Picker({
                data: [ this.$data.pickerDataObj.buildingArr, this.$data.pickerDataObj.floorArr, this.$data.pickerDataObj.roomArr ],
                selectedIndex: [0, 0, 0],
                title: '我们都是小学生'
            })

            that.$data.dataPicker = picker  // 保存 Picker方法

            picker.on( 'picker.select', function( _selectedVal, selectedIndex ) {
                that.$data.stateButtonObj.title = that.$data.pickerDataObj.buildingArr[selectedIndex[0]].text + ' ' + that.$data.pickerDataObj.floorArr[selectedIndex[1]].text + ' ' + that.$data.pickerDataObj.roomArr[selectedIndex[2]].text
            })

            // 当一列滚动停止的时候，会派发 picker.change 事件 => 传递: 列序号 index 及滚动停止的位置 selectedIndex
            picker.on( 'picker.change', function( index, selectedIndex ) {
                // 每次滚动滚轴 都会触发此事件 => 根据 列 index的值 判断修改的 $data属性, 将 列值赋值给属性( 使用switch判断 )
                // console.log( '列改变:' + index )
                // console.log( '列值改变:' + selectedIndex )

                // Promise 异步函数, 负责修改 $data中参数值对象( 接受参数: 属性名称 )
                const setBuildingArgument = function( argName, argValue ) {
                    return new Promise( function( resolve ) {
                        that.$data.pickerArgumentObj[argName] = argValue
                        resolve()
                    })
                } 

                switch( index ) {
                    case 0:
                        // console.log( '建筑物列改变' )
                        // console.log( '列值改变:' + selectedIndex )
                        const asyncSetBuildingValue = async function() {
                            try {   
                                await setBuildingArgument( 'buildingValue', selectedIndex )         // 异步修改 $data 参数
                                await that.setPickerData()                                          // 刷新 $data 中 data数据

                                // 测试 检查 $data是否改变( success )
                                // console.log( that.$data.pickerDataObj.floorArr )

                                let asyncFloorArr = that.$data.pickerDataObj.floorArr
                                picker.refillColumn( 1, asyncFloorArr )
                            } catch( err ) {
                                console.log( err )
                            }
                        }
                        asyncSetBuildingValue() // 执行
                        break
                    case 1: 
                        // console.log( '楼层改变' )
                        // console.log( '列值改变:' + selectedIndex )
                        const asyncSetFloorValue = async function() {
                            try {   
                                await setBuildingArgument( 'floorValue', selectedIndex )
                                await that.setPickerData()                                          // 刷新 $data 中 data数据
                                
                                let asyncRoomArr = that.$data.pickerDataObj.roomArr
                                picker.refillColumn( 2, asyncRoomArr )
                            } catch( err ) {
                                console.log( err )
                            }
                        }
                        asyncSetFloorValue() // 执行
                        break
                    case 2: 
                        // console.log( '房间号改变' )
                        // console.log( '房间号列值改变:' + selectedIndex )
                        const asyncSetRoomValue = async function() {
                            try {   
                                await setBuildingArgument( 'roomValue', selectedIndex )
                                console.log( '完成修改: 房间值' + that.$data.pickerArgumentObj.roomValue )
                                // 刷新 $data 中 data数据
                            } catch( err ) {
                                console.log( err )
                            }
                        }
                        asyncSetRoomValue() // 执行
                        break
                    default:
                        // null 无行为
                }
            })

            // 当用户点击确定的时候，如果本次选择的数据和上一次不一致，会派发 picker.valuechange 事件 => 传递: 每列选择的值数组 selectedVal 和每列选择的序号数组 selectedIndex
            picker.on( 'picker.valuechange', function( selectedVal, selectedIndex ) {
                console.log( '发生不一致' )
                console.log( '选完后, 3个值的value 组成的数组:' + selectedVal )
                console.log( '选完后, 3个值的index 组成的数组:' + selectedIndex )
            })
            picker.show()
        },
        // 目的: 处理Picker 需要的三个 data值; 只要级别值改变 就触发此函数; 初始化时也会触发一次[ TODO: 使用async回调数据 ]
        setPickerData() {
            // console.log( '执行' )
            let argumentObj = this.$data.pickerArgumentObj
            // console.log( argumentObj )   // success

            // 通用class( 楼层 + 房间号 ) 
            class BuildingObj {
                constructor( text, value ) {
                    this.text = text
                    this.value = value
                }
            }

            // 设置2级 楼层数据
            let floorData = this.$data.buildingList[argumentObj.buildingValue].floorArr         // 建筑物中 建筑值的建筑物 => 获取它的 楼层数据( 正确 )
            // console.log( floorData )    // 检查检索后的 数据( success )
            let setFloorArr = []                                                                // 空数组 - 存放格式化之后的数组
            for( let i = 0; i < floorData.length; i++ ) {
                let floorObj = new BuildingObj( floorData[i].text, floorData[i].value )
                setFloorArr.push( floorObj )
                // console.log( floorObj ) // 检索结果值对象 success
            }
            this.$data.pickerDataObj.floorArr = setFloorArr
            // console.log( this.$data.pickerDataObj.floorArr ) // success => bug: $data改变 但是数据没有实时改变
            // console.log( this.$data.dataPicker )             // success  调用到 Picker方法
            // let Picker = this.$data.dataPicker               // 改变修改思路

            // 设置3级 房间号数据
            let roomData = floorData[argumentObj.floorValue].roomArr                            // 建筑物楼层中 楼层值 => 获取它的 楼层所有房间号数据( 正确 )
            let setRoomArr = []
            for( let i = 0; i < roomData.length; i++ ) {
                let roomObj = new BuildingObj( roomData[i].text, roomData[i].value )
                setRoomArr.push( roomObj )
            }
            this.$data.pickerDataObj.roomArr = setRoomArr
        },
        // 目的: 处理建筑物 名称数组( this.setPickerData() 触发 )
        setBuildingData() {
            let setBuildingList = this.$data.buildingList                                       // 临时存储 交互获取的建筑物数据
            let setBuildingName = []                                                            // 临时存储 一个空数组， 用于处理 建筑名数组
            // class => 建筑物对象
            class BuildingObj {
                constructor( text, value ) {
                    this.text = text
                    this.value = value 
                }
            }
            for( let i = 0; i < setBuildingList.length; i++ ) {                                 // 遍历 交互返回的建筑物数组
                let buildingObj = new BuildingObj( setBuildingList[i].buildingName, setBuildingList[i].value )     // 创建对象( 标题, value值=i+1 )
                setBuildingName.push( buildingObj )                                             // push保存到数组中
            }
            this.$data.pickerDataObj.buildingArr = setBuildingName
        }
    },
    data() {
        return {
            // 状态按钮 - props集合对象
            stateButtonObj: {
                styleObj: {
                    className: 'auto--titleStyle',                                              // 默认标题样式 / 完成后 传入主题色class( 禁用class: is-disabled )
                    size: 'large'                                                               // 默认尺寸: 大
                },
                buttonPlainBoolean: true,                                                       // 默认幽灵状态
                title: '绑定',
                icon: {
                    iconState: 'null'
                }
            },
            inputState: 'null',                                                                 // 输入状态
            buildingList: [],                                                                   // 建筑列表
            dataPicker: {},                                                                     // Picker方法( 保存下, 其他作用域可以使用 )
            // Picker 用于展示的数据( 经过处理的data筛选值 )
            pickerDataObj: {
                buildingArr: [],                                                                // 建筑物 数组
                floorArr: [],                                                                   // 楼层 数组
                roomArr: []                                                                     // 房间号 数组
            },
            // Picker 参数对象
            pickerArgumentObj: {
                buildingValue: 0,
                floorValue: 0,
                roomValue: 0
            }
        }
    },
    computed: mapGetters({
        getterBuildingList: 'getterBuildingList'
    }),
    watch: {
        // 监听: '绑定' 建筑物列表
        getterBuildingList: function() {
            this.$data.buildingList = this.getterBuildingList
            this.setPickerData()                                                                    // ( 初始化 )处理picker需要的 data数据
            this.setBuildingData()                                                                  // 处理 建筑物名称 数组( 不需要参数 ) 
        }
    },
    mounted: function() {
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
