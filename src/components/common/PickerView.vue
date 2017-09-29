// 通用组件 - 筛选器组件( 只负责展示结果数组, 向上传递选择的参数; 筛选的逻辑在父级操作 通过$props向下传递 )
<template lang="pug">
.PickerView.auto--modulePaddingTB
    img.imgT(
        v-bind:src="pickerIconImgg"
    )
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
            let buildingArr = this.$props.buildingArr,
                floorArr = this.$props.floorArr,
                roomArr = this.$props.roomArr

            let picker = new Picker({
                data: [buildingArr, floorArr, roomArr],
                selectedIndex: [0, 0, 0]
            })

            picker.on( 'picker.select', ( _selectedVal, _selectedIndex ) => {
                this.$data.pickerTitle = '继续绑定'
            })

            picker.on( 'picker.change', ( index, selectedIndex ) => {
                let selectArr = []
                const emitSelectedIndex = ( selectIndexArr ) => {
                    return new Promise( ( resolve ) => {
                        this.$emit( 'watchPickerIndex', selectIndexArr )
                        this.$watch( 'roomArr', () => {
                            resolve()
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
                        picker.scrollColumn( 1, 0 )
                        picker.scrollColumn( 2, 0 )
                        let selectedObjA = new PickerIndexObj( 'buildingIndex', selectedIndex ),
                            defaultSelectedObjC = new PickerIndexObj( 'floorIndex', 0 )
                        selectArr = [ selectedObjA, defaultSelectedObjC ]
                        const asyncSetBuildingIndex = async () => {
                            try {
                                await emitSelectedIndex( selectArr )
                                let asyncFloorArr = this.$props.floorArr
                                let asyncRoomArr = this.$props.roomArr
                                picker.refillColumn( 1, asyncFloorArr )
                                picker.refillColumn( 2, asyncRoomArr )
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
                                let asyncRoomArr = this.$props.roomArr
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
                            } catch( err ) {
                                console.log( err )
                            }
                        }
                        asyncSetRoomIndex()
                        break
                    default:    // null
                }
            })

            picker.on( 'picker.valuechange', ( selectedVal, _selectedIndex ) => {
                const emitSelectedVal = ( selectValArr ) => {
                    return new Promise( ( resolve ) => {
                        this.$emit( 'watchPickerVal', selectValArr )
                        resolve()
                    })
                }
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
            pickerIconImgg: require( '../../assets/images/pixBuilding@2x.png' )
        }
    }
}
</script>

<style lang="sass">
@import "../../sass/main"

.PickerView
    .imgT
        +REM-W-H( 60px )
        +REM( padding-bottom, 24px )
    .Picker__btn
        +bC( $C-WW )
        +ellipseBtn
        img
            +REM-W-H( $F-title*1.5 )
            +imgAlignBottom
            +REM( margin-right, $D-autoMargin )
            display: none
        span
            +REM-fontStyle( $F-titlet, $C-W )
</style>
