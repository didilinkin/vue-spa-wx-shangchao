// 绑定房间
<template lang="pug">
#Building.auto--modulePadding
    PickerView(
        v-on:watchPickerIndex="setPickerIndex"
        v-on:watchPickerVal="setPickerValue"
        v-bind:styleObj="pickerStyleObj"
        v-bind:buildingArr="pickerDataObj.buildingArr"
        v-bind:floorArr="pickerDataObj.floorArr"
        v-bind:roomArr="pickerDataObj.roomArr"
    )
    span 若您已租赁多个房间，选择任一房间即可
    //.binding-ele
    //    span 您已绑定
    //    span.style 2
    //    span 个房间
    //.box-info
    //    span.company 长江中心A座-2408
    //    a.unbind 解绑
</template>

<script>
/* global Promise: true */
import swal             from 'sweetalert2'
import { mapGetters }   from 'vuex'

import PickerView       from '../components/common/PickerView'
const components = { PickerView }

export default {
    name: 'Binding',
    methods: {
        // 目的: 请求 - 建筑列表
        requireBuildingList() {
            this.$store.dispatch({
                type: 'binding/REQUEST_BUILDING_LIST'
            })
        },
        // 目的: 处理Picker 需要的三个data值; 只要级别值改变 就触发此函数; Picker组件初始化时也会触发一次
        setPickerData() {
            let buildingList = this.$data.buildingList,
                argumentObj = this.$data.selectedIndex,
                buildingResult = [],
                floorResult = [],
                roomResult = [],
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
                this.$data.pickerDataObj.buildingArr = buildingResult
            }

            // 设置保存 楼层 结果
            const setFloorData = () => {
                for( let i = 0; i < floorData.length; i++ ) {
                    let floorObj = new BuildingObj( floorData[i].text, floorData[i].value )
                    floorResult.push( floorObj )
                }
                this.$data.pickerDataObj.floorArr = floorResult
            }

            // 设置保存 房间号 结果
            const setRoomData = () => {
                for( let i = 0; i < roomData.length; i++ ) {
                    let roomObj = new BuildingObj( roomData[i].text, roomData[i].value )
                    roomResult.push( roomObj )
                }
                this.$data.pickerDataObj.roomArr = roomResult
            }
            setBuildingData()
            setFloorData()
            setRoomData()
        },
        // 目的: 监听 Picker筛选器更改的 index结果 => 保存结果到 $data 然后执行 setPickerData() 处理数据
        setPickerIndex( pickerIndexArr ) {
            const asyncSelectedIndex = ( indexArr ) => {
                return new Promise( ( resolve ) => {
                    for( let i = 0; i < indexArr.length; i++ ) {
                        this.$data.selectedIndex[indexArr[i].indexName] = indexArr[i].index
                        this.setPickerData()
                    }
                    resolve()
                })
            }
            const asyncSetPickerData = async () => {
                try {
                    await asyncSelectedIndex( pickerIndexArr )
                } catch( err ) {
                    console.log( err )
                }
            }
            asyncSetPickerData()
        },
        // 目的: 监听 Picker筛选器更改的value结果 => 去后台验证 3个value是否可用
        setPickerValue( pickerValueArr ) {
            this.$data.selectedVal = pickerValueArr
            this.setCompanyNO()
        },
        // 目的: 设置'公司编号' ( 调用 sweetalert2弹框事件 )
        setCompanyNO() {
            const that = this

            swal({
                confirmButtonColor: '#23d296',
                title: '请输入公司编号',
                text: '请联系客服管家查询公司编号',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: '确认',
                showLoaderOnConfirm: true,
                // 输入前确认 是否是 数值类型
                preConfirm: function( number ) {
                    // 使用 async()
                    return new Promise( function( resolve, reject ) {
                        // console.log( 'promise测试:' + number )
                        const asyncRequireBuilding = async () => {
                            try {
                                // console.log( '请求异步前确认:' + number )
                                await that.requireBinding( number )
                                // 判断返回值
                                let bindingResult = that.$store.state.binding.bindingResult
                                if( bindingResult ) {
                                    that.setPickerStyle( 'rgb( 35, 210, 150 )' )
                                    resolve()
                                } else {
                                    swal({
                                        type: 'error',
                                        title: '失败绑定'
                                    })
                                    that.setPickerStyle( 'rgb( 255, 61, 61 )' )
                                    reject()
                                    // console.log( '失败了' )
                                }
                            } catch( err ) {
                                return reject( err )
                            }
                        }
                        asyncRequireBuilding()
                    })
                },
                allowOutsideClick: false
            }).then( () => {
                swal({
                    type: 'success',
                    title: '成功绑定!'
                })
            })
        },
        // 请求绑定 房间编号 + 公司编号
        requireBinding( CompanyNO ) {
            return new Promise( ( resolve, _reject ) => {
                let [ buildingVal, floorVal, roomVal ] = this.$data.selectedVal
                this.$store.dispatch({
                    type: 'binding/REQUIRE_BINDING',
                    buildingValue: buildingVal,
                    floorValue: floorVal,
                    roomValue: roomVal,
                    companyNo: CompanyNO
                })

                // 监听 '请求绑定' 返回值是否返回
                this.$watch( 'getterBindingResult', () => {
                    setTimeout( () => resolve(), 2000 )
                })
            })
        },
        // 目的: 根据'请求绑定'返回值 修改'Picker'的状态样式
        setPickerStyle( color ) {
            this.$data.pickerStyleObj.boxShadowColor = color
        }
    },
    data() {
        return {
            buildingList: [],
            pickerStyleObj: {
                boxShadowColor: 'rgba(0, 0, 0, 0.29)'
            },
            // Picker 用于展示的数据( 经过处理的data筛选值 )
            pickerDataObj: {
                buildingArr: [],
                floorArr: [],
                roomArr: []
            },
            // Picker 选择结果( 3列 筛选器的位值; 不是结果的value值 )
            selectedIndex: {
                buildingIndex: 0,
                floorIndex: 0,
                roomIndex: 0
            },
            // Picker 选择结果( 3列 筛选器的value值 )
            selectedVal: [],
            clientNum: '1'
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
            this.setPickerData()
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
    +textCenter
    >span
        +REM-fontStyle( $F-assist, $C-copy )
    .binding-ele
        text-align: left
        font-size: 16px
        color: rgb( 102, 102, 102 )
        .style
            color: rgb( 35,210,150 )
    .box-info
        height: 60px
        line-height: 60px
        width: 100%
        .company
            font-size: 16px
            margin-left: -12px
            color: rgb( 102,102,102 )
        .unbind
            width: 54px
            height: 26px
            display: inline-block
            color: #fff
            background-color: rgb( 16,142,233 )
            border-radius: 13px
            text-align: center
            line-height: 26px
            font-size: 14px
            margin-left: 145px


</style>
