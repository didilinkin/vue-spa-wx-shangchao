// 绑定房间
<template lang="pug">
#Building.auto--modulePadding
    PickerView(
        v-on:watchPickerIndex="setPickerIndex"
        v-on:watchPickerVal="setPickerValue"
        v-bind:buildingArr="pickerDataObj.buildingArr"
        v-bind:floorArr="pickerDataObj.floorArr"
        v-bind:roomArr="pickerDataObj.roomArr"
    )

    span 若您已租赁多个房间，选择任一房间即可

    StateButton(
        v-on:buttonClickEvent="setBinding()"
        v-bind:buttonStyleObj="stateButtonObj.styleObj"
        v-bind:buttonPlainBoolean="stateButtonObj.buttonPlainBoolean"
        v-bind:buttonContentStr="stateButtonObj.title"
    )
</template>

<script>
/* global Promise: true */
import swal             from 'sweetalert2'
import { mapGetters }   from 'vuex'

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
            console.log( '子组件反馈触发事件' )                                                      // 用于'绑定'键
        },
        // 目的: 处理Picker 需要的三个data值; 只要级别值改变 就触发此函数; Picker组件初始化时也会触发一次
        setPickerData() {
            let buildingList = this.$data.buildingList,                                             // 筛选器结果( 3列 )
                argumentObj = this.$data.selectedIndex,                                             // 交互返回结果
                buildingResult = [],                                                                // 储存 建筑物 结果
                floorResult = [],                                                                   // 储存 楼层 结果
                roomResult = [],                                                                    // 储存 房间 结果
                floorData = buildingList[argumentObj.buildingIndex].floorArr,
                roomData = floorData[argumentObj.floorIndex].roomArr

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
        // 目的: 监听 Picker筛选器更改的 index结果 => 保存结果到 $data 然后执行 setPickerData() 处理数据
        setPickerIndex( pickerIndexArr ) {
            // 异步操作 $data中的 筛选器值
            const asyncSelectedIndex = ( indexArr ) => {
                return new Promise( ( resolve ) => {
                    for( let i = 0; i < indexArr.length; i++ ) {
                        this.$data.selectedIndex[indexArr[i].indexName] = indexArr[i].index         // 如果是第一列改变 => 循环第二次目的是: 根据第二列的数据更新 第3列的数据
                        this.setPickerData()                                                        // 根据最新 筛选器结果 => 更新 筛选器 展示数据
                    }
                    resolve()
                })
            }

            const asyncSetPickerData = async () => {
                try {
                    await asyncSelectedIndex( pickerIndexArr )                                      // 异步更改 $data中的 筛选器值
                } catch( err ) {
                    console.log( err )
                }
            }

            asyncSetPickerData()
        },
        // 目的: 监听 Picker筛选器更改的value结果 => 去后台验证 3个value是否可用
        setPickerValue( pickerValueArr ) {
            this.$data.selectedVal = pickerValueArr                                                 // 将Picker value值保存到 $data中

            this.setCompanyNO()
        },
        // 目的: 设置'公司编号' ( 调用 sweetalert2弹框事件 )
        setCompanyNO() {
            const that = this

            swal({
                confirmButtonColor: '#23d296',
                title: '请输入公司编号',
                text: '请联系客服管家查询公司编号',
                input: 'number',
                showCancelButton: true,                                         // 展示 '取消'按钮
                confirmButtonText: '确认',
                showLoaderOnConfirm: true,
                // 输入前确认 是否是 邮箱类型
                preConfirm: function( number ) {
                    // 将Promise 改为 async()
                    return new Promise( function( resolve, reject ) {
                        // 当请求绑定 => '成功'的返回框 ( 由 asyncRequireBuilding()调用 )
                        const requireBindingSuccess = () => {
                            swal({
                                type: 'success',
                                title: '绑定成功'
                            })
                        }
                        // 当请求绑定 => '失败'的返回框 ( 由 asyncRequireBuilding()调用 )
                        const requireBindingError = () => {
                            swal({
                                type: 'error',
                                title: '绑定失败'
                            })
                        }

                        // 异步请求绑定
                        const asyncRequireBuilding = async () => {
                            try {
                                await that.requireBinding( number )                 // 请求绑定( 公司编号 )

                                // 判断返回值
                                let bindingResult = that.getterBindingResult
                                console.log( bindingResult )


                                if( bindingResult ) {
                                    console.log( '返回成功!' )
                                    requireBindingSuccess()                          // 请求 - 绑定 => '成功'弹框
                                    resolve()
                                } else {
                                    console.log( '返回失败!' )
                                    requireBindingError()                           // 请求 - 绑定 => '失败'弹框
                                }
                            } catch( err ) {
                                return reject( err )                                // 失败
                            }
                        }

                        asyncRequireBuilding()  // 异步请求绑定
                    })
                },
                allowOutsideClick: false                                            // 是否允许外边点击
            }).then( function( _number ) {
                swal({
                    type: 'success',
                    title: '绑定成功!'
                })
            }).catch( () => {
                swal({
                    type: 'error',
                    title: '绑定失败'
                })
            })
        },
        // 请求绑定 房间编号 + 公司编号
        requireBinding( CompanyNO ) {
            return new Promise( ( resolve, _reject ) => {
                // 此处编写 交互 请求绑定的逻辑
                let [ buildingVal, floorVal, roomVal ] = this.$data.selectedVal                     // 进行解构

                // 验证 Picker 3个value 是否可用 + 公司编号 => 请求绑定
                this.$store.dispatch({
                    type: 'binding/REQUIRE_BINDING',
                    buildingValue: buildingVal,
                    floorValue: floorVal,
                    roomValue: roomVal,
                    companyNo: CompanyNO
                })

                // 监听 '请求绑定' 返回值是否返回
                this.$watch( 'getterBindingResult', () => {
                    // console.log( '返回值已返回' )
                    resolve()
                })
            })
        }
    },
    data() {
        return {
            // 状态按钮 - props集合对象
            stateButtonObj: {
                styleObj: {
                    className: 'auto--titleStyle',                                                  // 默认标题样式 / 完成后 传入主题色class( 禁用class: is-disabled )
                    size: 'large'                                                                   // 默认尺寸: 大
                },
                buttonPlainBoolean: true,                                                           // 默认幽灵状态
                title: '绑定',
                icon: {
                    iconState: 'null'
                }
            },
            inputState: 'null',                                                                     // 输入状态
            buildingList: [],                                                                       // 建筑列表
            // Picker 用于展示的数据( 经过处理的data筛选值 )
            pickerDataObj: {
                buildingArr: [],                                                                    // 建筑物 数组
                floorArr: [],                                                                       // 楼层 数组
                roomArr: []                                                                         // 房间号 数组
            },
            // Picker 选择结果( 3列 筛选器的位值; 不是结果的value值 )
            selectedIndex: {                                                                        // 筛选器结果 保存值
                buildingIndex: 0,                                                                   // 建筑物 选择值
                floorIndex: 0,                                                                      // 楼层 选择值
                roomIndex: 0                                                                        // 房间 选择值
            },
            // Picker 选择结果( 3列 筛选器的value值 )
            selectedVal: []                         
        }
    },
    computed: mapGetters({
        getterBuildingList: 'getterBuildingList',
        getterBindingResult: 'getterBindingResult'
    }),
    watch: {
        // 监听: '绑定' 建筑物列表
        getterBuildingList: function() {
            this.$data.buildingList = this.getterBuildingList
            this.setPickerData()                                                                    //  ( 初始化 )处理picker需要的 data数据
        }
        // , 在 swal() 作用域中监听
        // getterBindingResult: function() {
        //     console.log( this.getterBindingResult )
        //     console.log( 'getterBindingResult发生改变:' + this.getterBindingResult )             // 验证 value 返回结果
        // }
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
