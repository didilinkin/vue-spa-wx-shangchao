// 通用组件 - 筛选器组件( 只负责展示结果数组, 向上传递选择的参数; 筛选的逻辑在父级操作 通过$props向下传递 )
<template lang="pug">
.PickerView.auto--modulePaddingTB
    .Picker__btn(
        @click="pickerClick()"
    )
        img( v-bind:src="pickerIconImg" )
        span {{ pickerTitle }}
</template>

<script>
/* global require Promise: true */
import Picker       from 'better-picker'

export default {
    name: 'PickerView',
    props: {
        // Picker第1列值 - 建筑物数组
        buildingArr: {
            type: Array,
            default: function() {
                return [
                    {
                        text: '默认建筑物',
                        value: 1
                    }
                ]
            }
        },
        // Picker第2列值 - 楼层数组
        floorArr: {
            type: Array,
            default: function() {
                return [
                    {
                        text: '默认楼层',
                        value: 1
                    }
                ]
            }
        },
        // Picker第3列值 - 房间号数组
        roomArr: {
            type: Array,
            default: function() {
                return [
                    {
                        text: '默认房间号',
                        value: 1
                    }
                ]
            }
        }
    },
    methods: {
        // 目的: Picker被点击
        pickerClick() {
            // console.log( '被点击' )
            let buildingArr = this.$props.buildingArr,
                floorArr = this.$props.floorArr,
                roomArr = this.$props.roomArr

            let picker = new Picker({
                data: [buildingArr, floorArr, roomArr],
                selectedIndex: [0, 0, 0],
                title: '我们都是小学生'
            })

            // 保存 Picker筛选器结果 => 改变标题为 结果
            picker.on( 'picker.select', ( _selectedVal, selectedIndex ) => {
                this.$data.pickerTitle = buildingArr[selectedIndex[0]].text + ' ' + floorArr[selectedIndex[1]].text + ' ' + roomArr[selectedIndex[2]].text
            })

            // 当一列滚动停止的时候，派发 picker.change 事件 => 传递: 列序号 index 及滚动停止的位置 selectedIndex
            picker.on( 'picker.change', ( index, selectedIndex ) => {
                // 每次滚动滚轴 都会触发此事件 => 根据 列 index的值 判断修改的 $data属性, 将 列值赋值给属性( 使用switch判断 )
                // console.log( '列改变:' + index )
                // console.log( '列值改变:' + selectedIndex )

                // 异步使用 $emit 将参数传给父级组件
                const emitSelectedVal = ( selectValObj ) => {
                    return new Promise( ( resolve ) => {
                        this.$emit( 'watchPicker', selectValObj )

                        console.log( '此时-$props未更新' )
                        console.log( this.$props.floorArr )
                        console.log( '此时-$props未更新 END' )

                        this.$watch( 'floorArr', () => {
                            console.log( '$props改变啦!!!' )

                            console.log( '此时-$props更新' )
                            console.log( this.$props.floorArr )
                            console.log( '此时-$props更新 END' )

                            resolve( console.log( '交给父级事件 完成;' ) )
                        })
                    })
                }
                class PickerValObj {
                    constructor( indexName, val ) {
                        this.indexName = indexName
                        this.val = val
                    }
                }

                switch( index ) {
                    case 0:
                        let selectedObjA = new PickerValObj( 'buildingValue', selectedIndex )

                        const asyncSetBuildingValue = async () => {
                            try {
                                await emitSelectedVal( selectedObjA )

                                let asyncFloorArr = this.$props.floorArr  // 保存 父组件处理完的数据 ( $props )

                                picker.refillColumn( 1, asyncFloorArr )
                            } catch( err ) {
                                console.log( err )
                            }
                        }
                        asyncSetBuildingValue()
                        break
                    case 1:
                        // console.log( '楼层改变' )
                        // console.log( '列值改变:' + selectedIndex )
                        let selectedObjB = new PickerValObj( 'floorValue', selectedIndex )

                        const asyncSetFloorValue = async () => {
                            try {
                                await emitSelectedVal( selectedObjB )

                                let asyncRoomArr = this.$props.roomArr  // 保存 父组件处理完的数据 ( $props )

                                picker.refillColumn( 2, asyncRoomArr )
                            } catch( err ) {
                                console.log( err )
                            }
                        }
                        asyncSetFloorValue() // 执行

                        break
                    case 2:
                        // console.log( '房间号改变' )
                        // console.log( '列值改变:' + selectedIndex )
                        let selectedObjC = new PickerValObj( 'roomValue', selectedIndex )

                        const asyncSetRoomValue = async () => {
                            try {
                                await emitSelectedVal( selectedObjC )

                                // 第三个 不需要更新
                                // let asyncRoomArr = this.$props.roomArr  // 保存 父组件处理完的数据 ( $props )
                                // picker.refillColumn( 3, asyncRoomArr )
                            } catch( err ) {
                                console.log( err )
                            }
                        }
                        asyncSetRoomValue() // 执行

                        break
                    default:
                        // 无行为
                }
            })

            // 当用户点击确定的时候，如果本次选择的数据和上一次不一致，会派发 picker.valuechange 事件 => 传递: 每列选择的值数组 selectedVal 和每列选择的序号数组 selectedIndex
            picker.on( 'picker.valuechange', function( selectedVal, selectedIndex ) {
                console.log( '发生不一致' )
                console.log( '选完后, 3个值的value 组成的数组:' + selectedVal )
                console.log( '选完后, 3个值的index 组成的数组:' + selectedIndex )
            })

            picker.show()
        }
    },
    data() {
        return {
            // $data 中暂时不保存 $props返回值;
            pickerTitle: '请选择房间编号',
            pickerIconImg: require( '../../assets/images/iconBuilding@2x.png' )
        }
    }
    // ,
    // mounted: function() {
    //     // this.initPicker()
    //     // console.log( this.$props )
    // }
}
</script>

<style lang="sass">
@import "../../sass/main"

.PickerView
    .Picker__btn
        +ellipseBtn
        img
            +REM-W-H( $F-title*1.5 )
            +imgAlignBottom
            +REM( margin-right, $D-autoMargin )
        span
            +REM-fontStyle( $F-title, $C-copy )
</style>
