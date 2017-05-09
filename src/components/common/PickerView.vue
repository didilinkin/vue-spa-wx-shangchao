// 通用组件 - 筛选器组件( 只负责展示结果数组, 向上传递选择的参数; 筛选的逻辑在父级操作 通过$props向下传递 )
<template lang="pug">
.PickerView.auto--modulePaddingTB
    .Picker__btn(
        @click="pickerClick()"
        v-bind:style="{ boxShadow: `1px 1px 1px ${styleObj.boxShadowColor}, inset 1px 1px 1px rgba(255, 255, 255, 0.44)` }"
    )
        // styleObj.boxShadowColor
        img( v-bind:src="pickerIconImg" )
        span {{ pickerTitle }}
</template>

<script>
/* global require Promise: true */
import Picker       from 'better-picker'

export default {
    name: 'PickerView',
    props: {
        styleObj: {
            type: Object,
            default: function() {
                return {
                    boxShadowColor: 'rgba(0, 0, 0, 0.29)'
                }
            }
        },
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
                selectedIndex: [0, 0, 0]
                // title: '选择'
            })

            // 保存 Picker筛选器结果 => 改变标题为 结果
            picker.on( 'picker.select', ( _selectedVal, _selectedIndex ) => {
                // 暂时弃用
                // this.$data.pickerTitle = `${ buildingArr[selectedIndex[0]].text } ${ floorArr[selectedIndex[1]].text } ${ roomArr[selectedIndex[2]].text }`
                this.$data.pickerTitle = '继续绑定'
            })

            // 当一列滚动停止的时候，派发 picker.change 事件 => 传递: 列序号 index 及滚动停止的位置 selectedIndex
            picker.on( 'picker.change', ( index, selectedIndex ) => {
                let selectArr = []      // 数组容器( 保存改变的列值; 已数组的形式传给 emitSelectedIndex(); 1列改变需要初始化3列 )

                // 异步使用 $emit 将参数传给父级组件
                const emitSelectedIndex = ( selectIndexArr ) => {
                    return new Promise( ( resolve ) => {
                        this.$emit( 'watchPickerIndex', selectIndexArr )
                        this.$watch( 'roomArr', () => {
                            resolve()                                       // $props - 只监听第三列的数据 roomArr ( 因为改变1列值时, 2列更新， 3列要根据2列联动更新 )
                        })
                    })
                }

                class PickerIndexObj {
                    constructor( indexName, index ) {
                        this.indexName = indexName
                        this.index = index
                    }
                }

                switch( index ) {
                    case 0:
                        picker.scrollColumn( 1, 0 )                         // 复位 第2列 起始值返回0( 避免 第2列选择后, 返回 再修改1列值, 2列未复位的问题 )
                        picker.scrollColumn( 2, 0 )                         // 复位 第3列 起始值返回0( 避免情况 同上, 只是防止第3列未复位的问题 )

                        let selectedObjA = new PickerIndexObj( 'buildingIndex', selectedIndex ),
                            defaultSelectedObjC = new PickerIndexObj( 'floorIndex', 0 )            // 将2列设置为0, 这样3列就会变成初始值

                        selectArr = [ selectedObjA, defaultSelectedObjC ]

                        const asyncSetBuildingIndex = async () => {
                            try {
                                await emitSelectedIndex( selectArr )          // 传入 将2列改为默认值的对象;

                                let asyncFloorArr = this.$props.floorArr    // 保存 父组件处理完的数据 ( $props ) - 第二列
                                let asyncRoomArr = this.$props.roomArr      // 保存 父组件处理完的数据 ( $props ) - 第三列

                                picker.refillColumn( 1, asyncFloorArr )     // 更新第二列
                                picker.refillColumn( 2, asyncRoomArr )      // 更新第二列
                            } catch( err ) {
                                console.log( err )
                            }
                        }
                        asyncSetBuildingIndex()
                        break
                    case 1:
                        let selectedObjB = new PickerIndexObj( 'floorIndex', selectedIndex )

                        selectArr = [ selectedObjB ]

                        const asyncSetFloorIndex = async () => {
                            try {
                                await emitSelectedIndex( selectArr )

                                let asyncRoomArr = this.$props.roomArr  // 保存 父组件处理完的数据 ( $props )

                                picker.refillColumn( 2, asyncRoomArr )
                            } catch( err ) {
                                console.log( err )
                            }
                        }
                        asyncSetFloorIndex()

                        break
                    case 2:
                        let selectedObjC = new PickerIndexObj( 'roomIndex', selectedIndex )

                        const asyncSetRoomIndex = async () => {
                            try {
                                await emitSelectedIndex( selectedObjC )
                                // 第三个 不需要更新; 只负责将数据传给 父级 保存参数即可
                            } catch( err ) {
                                console.log( err )
                            }
                        }
                        asyncSetRoomIndex()

                        break
                    default:
                        // 无行为
                }
            })

            // 当用户点击确定的时候，如果本次选择的数据和上一次不一致，会派发 picker.valuechange 事件 => 传递: 每列选择的值数组 selectedVal 和每列选择的序号数组 selectedIndex
            picker.on( 'picker.valuechange', ( selectedVal, _selectedIndex ) => {
                // console.log( '选完后, 3个值的value 组成的数组:' + selectedVal )            // 只有它需要用 => 返给服务器

                // 异步使用 $emit 将参数传给父级组件
                const emitSelectedVal = ( selectValArr ) => {
                    return new Promise( ( resolve ) => {
                        this.$emit( 'watchPickerVal', selectValArr )
                        resolve()               // 改变 PickerView 组件不需要异步返回值
                    })
                }

                // 异步设置 '绑定' 值
                const asyncSetBindingVal = async () => {
                    try {
                        await emitSelectedVal( selectedVal )
                    } catch( err ) {
                        console.log( err )
                    }
                }
                asyncSetBindingVal()
            })

            picker.show()
        }
    },
    data() {
        return {
            pickerTitle: '请选择房间编号',
            pickerIconImg: require( '../../assets/images/iconBuilding@2x.png' )
        }
    }
}
</script>

<style lang="sass">
@import "../../sass/main"

.PickerView
    .Picker__btn
        +bC( $C-base )
        +ellipseBtn
        img
            +REM-W-H( $F-title*1.5 )
            +imgAlignBottom
            +REM( margin-right, $D-autoMargin )
        span
            +REM-fontStyle( $F-title, $C-text )
</style>
