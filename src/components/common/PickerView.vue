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
/* global require: true */ 
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
        // 目的: 初始化 Picker筛选结果
        // initPicker() {
        //     // console.log( this.pickerTitle )
        //     this.$emit( 'watchPicker' )       // 触发 父级监听 Picker事件, 参数: 筛选器结果
        // },
        // 目的: Picker被点击
        pickerClick() {
            console.log( '被点击' )
        }
    },
    data() {
        return {
            // $data 中暂时不保存 $props返回值; 
            pickerTitle: '请选择房间编号',
            pickerIconImg: require( '../../assets/images/iconBuilding@2x.png' )
        }
    }
    ,
    mounted: function() {
        // this.initPicker()   
        console.log( this.$props )                
    }
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