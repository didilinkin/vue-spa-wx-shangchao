// 绑定房间
<template lang="pug">
#Building.auto--modulePadding
    // 初始化数据 通过 $props 传给 PickerView 组件
    PickerView(
        v-on:watchPicker="setPickerVal"
        v-bind:buildingArr="pickerDataObj.buildingArr"
        v-bind:floorArr="pickerDataObj.floorArr"
        v-bind:roomArr="pickerDataObj.roomArr"
    )

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

import PickerView       from '../components/common/PickerView'
import StateButton      from '../components/common/StateButton'
const components = { StateButton, PickerView }

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
            console.log( '子组件反馈触发事件' )  // 用于'绑定'键
            this.pickerClick()
        },
        // 目的: 处理Picker 需要的三个data值; 只要级别值改变 就触发此函数; Picker组件初始化时也会触发一次
        setPickerData() {
            let buildingList = this.$data.buildingList,                                             // 筛选器结果( 3列 )
                argumentObj = this.$data.selectedValue,                                             // 交互返回结果
                buildingResult = [],                                                                // 储存 建筑物 结果
                floorResult = [],                                                                   // 储存 楼层 结果
                roomResult = [],                                                                    // 储存 房间 结果
                floorData = buildingList[argumentObj.buildingValue].floorArr,
                roomData = floorData[argumentObj.floorValue].roomArr

            class BuildingObj {
                constructor( text, value ) {
                    this.text = text
                    this.value = value
                }
            }

            // 设置保存 建筑物 结果
            const setBuildingData = () => {
                for( let i = 0; i < buildingList.length; i++ ) {
                    let buildingObj = new BuildingObj( buildingList[i].text, buildingList[i].value )
                    buildingResult.push( buildingObj )
                }
                this.$data.pickerDataObj.buildingArr = buildingResult                               // 将结果保存到 $data的结果中( 格式化后的所有建筑物 数组 )
            }

            // 设置保存 楼层 结果
            const setFloorData = () => {
                for( let i = 0; i < floorData.length; i++ ) {
                    let floorObj = new BuildingObj( floorData[i].text, floorData[i].value )
                    floorResult.push( floorObj )
                }
                this.$data.pickerDataObj.floorArr = floorResult                                     // 将结果保存到 $data的结果中( 格式化后的所有建筑物 数组 )
            }

            // 设置保存 房间号 结果
            const setRoomData = () => {
                for( let i = 0; i < roomData.length; i++ ) {
                    let roomObj = new BuildingObj( roomData[i].text, roomData[i].value )
                    roomResult.push( roomObj )
                }
                this.$data.pickerDataObj.roomArr = roomResult
            }

            setBuildingData()                                                                       // 最后运行 全部
            setFloorData()
            setRoomData()
        },
        // 目的: 监听 Picker组件 筛选器更改结果 => 保存结果到 $data 然后执行 setPickerData() 处理数据
        setPickerVal( pickerValObj ) {
            // console.log( pickerValObj )

            // 异步操作 $data中的 筛选器值
            const asyncSelectedValue = ( valObj ) => {
                return new Promise( ( resolve ) => {
                    this.$data.selectedValue[valObj.indexName] = valObj.val
                    resolve()
                })
            }

            const asyncSetPickerData = async () => {
                try {
                    await asyncSelectedValue( pickerValObj )    // 异步更改 $data中的 筛选器值

                    await this.setPickerData()                        // 根据最新 筛选器结果 => 更新 筛选器 展示数据

                    console.log( '展示最新数据' )
                    console.log( this.$data.pickerDataObj )
                } catch( err ) {
                    console.log( err )
                }
            }
            asyncSetPickerData()                                // 执行
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
                let buildingObj = new BuildingObj( setBuildingList[i].text, setBuildingList[i].value )     // 创建对象( 标题, value值=i+1 )
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
            // Picker 用于展示的数据( 经过处理的data筛选值 )
            pickerDataObj: {
                buildingArr: [],                                                                // 建筑物 数组
                floorArr: [],                                                                   // 楼层 数组
                roomArr: []                                                                     // 房间号 数组
            },
            // Picker 选择结果( 3列 结果值 )
            selectedValue: {                                                                    // 筛选器结果 保存值
                buildingValue: 0,                                                               // 建筑物 选择值
                floorValue: 0,                                                                  // 楼层 选择值
                roomValue: 0                                                                    // 房间 选择值
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
            this.setPickerData()                                                                  //  ( 初始化 )处理picker需要的 data数据
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
