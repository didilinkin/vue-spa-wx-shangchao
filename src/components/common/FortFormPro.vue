// 通用组件 - Fort.js文本表单( 包含状态按钮 )
<template lang="pug">
    #FortFormPro.form-wrapper

        // 通用组件 - 多行文本输入框
        .MtextBoxPro
            textarea(
            v-model="message"
            ref="input1"
            v-bind:maxLength="setMtextBoxObj.maxLength"
            v-bind:placeholder="setMtextBoxObj.placeholder"
            )
            p.font-num {{ message.length }} / {{ setMtextBoxObj.maxLength }}

            // 图片上传(  )
        #upload.upload
        div.ftp
            span 您最多可上传
            span.dll 5
            span 张图片，单张照片最大2M

        // 暂停使用表单方式 - form( name="form" action="#" )
        .form
            // 输入框
            .form-item(
            v-for="( item, index ) in inputArr"
            v-bind:key="index"
            )
                span.formFont {{ item.title }}
                input.formFont(
                v-bind:value="item.itemMsg"
                v-on:input="item.itemMsg = $event.target.value"
                v-bind:type="item.inputType"
                v-bind:name="item.inputName"
                v-bind:maxlength="item.maxlength"
                v-bind:placeholder="item.placeholder"
                required="required"
                autocomplete="off"
                )

            // '提交' 按钮
            StateButtonPro.auto--moduleMarginTop.tijiao(
            v-on:buttonClickEvent="checkInputVal()"
            v-bind:buttonStyleObj="stateButtonStyle"
            v-bind:buttonContentStr="stateButtonContent"
            )
</template>

<script>
    // import  VueRouter   from    'vue-router'

    import swal         from 'sweetalert2'
    import StateButtonPro  from './StateButtonPro'
    import tinyImgUpload from '../../../static/js/tinyImgUpload'
    import { mapGetters }   from 'vuex'
    const components = { StateButtonPro }

    export default {
        name: 'FortFormPro',
        props: {
            // Fort文本框内容
            FortInputArr: {
                type: Array,
                default: function() {
                    return [
                        {
                            inputName: 'userName',
                            inputType: 'text',
                            maxlength: '20',
                            title: '文本框标题',
                            placeholder: '输入框提示内容'
                        }
                    ]
                }
            },
            setMtextBoxObj: {
                type: Object,
                default: function() {
                    return {
                        maxLength: 500,
                        placeholder: '请输入问题详情, 以便我们更好地处理'

                    }
                }
            }
        },
        methods: {
            // 目的: 请求 - 我要投诉
            requireToProposal( arr, imgs ) {
                this.$store.dispatch({
                    type: 'proposal/SAVE_PROPOSAL',
                    clientNum: '1',
                    phone: arr[1].itemMsg,
                    repairMan: arr[0].itemMsg,
                    repairContent: this.$refs.input1.value,
                    file: imgs
                })
            },
            checkInputVal() {
                let boolean = this.$data.inputValueNull
                let arr     = this.$data.inputArr
                let imgs = document.getElementsByTagName( 'img' )
                this.$refs.input1.value = '' // 清空多行文本
//                setTimeout( 'location.reload()', 3000 )
                let imgURLs = new Array( imgs.length )
                for( let i = 0; i < imgs.length; i++ ) {
                    imgURLs[ i ] = imgs[ i ].src
                }

                // 遍历判断 value值是否为空
                for( let i = arr.length; i--; ) {
                    if( arr[i].itemMsg === '' ) {
                        boolean = false
                        break
                    }
                }

                if( !boolean ) {
                    swal({
                        title: '禁止提交!',
                        text: '输入框未填写',
                        type: 'warning',
                        confirmButtonText: '确认'
                    })
                } else {
                    //  提交投诉请求
                    console.log( '11111111111111111111111' )
                    console.log( imgs )
                    console.log( '11111111111111111111111' )
                    console.log( imgURLs )
                    console.log( '11111111111111111111111' )
                    this.requireToProposal( arr, imgURLs )
                }
            }
        },
        data() {
            return {
                // 传入 StateButton - 状态按钮的样式( 需要根据 '状态按钮'的 $props 来配置; 也可以不用 专用按钮, 自己写一个按钮 )
                // 注: 使用状态按钮 是想使用 Fort.js的状态回调来操作 改变按钮样式( 未测试 )
                stateButtonStyle: {
                    className: 'auto--themeBackgroundColor'          // 当未全部填入时, 更改状态成禁用状态( .is-disabled )
                },
                stateButtonContent: '提交',
                inputArr: [],
                inputValueNull: true,
                message: ''
            }
        },
        computed: mapGetters({
            getterrToProposal: 'getterrToProposal'
        }),
        watch: {
            // 监听: '绑定' 建筑物列表
            getterrToProposal: function() {
                if( this.getterrToProposal.success === true ) {
                    swal({
                        title: '成功!',
                        text: '您的问题已提交',
                        type: 'success',
                        confirmButtonText: '确认'
                    })
                    this.$refs.input1.value = '' // 清空多行文本
                    let address = document.getElementsByClassName( 'img-thumb' ) // 清空图片
                    for( let i = 0; i < address.length; i++ ) {
                        address[i].style.display = 'none'
                    }
                    let inputNum = document.getElementsByClassName( 'formFont' ) // 清空input框
                    for( let i = 0; i < inputNum.length; i++ ) {
                        inputNum[i].value = ''
                    }
                }else {
                    swal({
                        title: '失败!',
                        text: '提交失败，请电话联系',
                        type: 'error',
                        confirmButtonText: '确认'
                    })
                }
            }
        },
        mounted: function() {
            this.$data.inputArr = this.$props.FortInputArr

            for( let i = this.$data.inputArr.length; i--; ) {
                this.$data.inputArr[i]['itemMsg'] = ''
            }
            // 在这配置一下 options => 基本参数 图片上传在组件刷新一次
            let options = {
                path: '/',
                // 成功时
                onSuccess: function( res ) {
                    console.log( res )
                    console.log( '成功' )
                },
                onFailure: function( res ) {
                    console.log( res )
                    console.log( '失败' )
                }
            }

            tinyImgUpload( '#upload', options ) // 执行 上传事件
        },
        components: components
        ,
        beforeRouteLeave( _to, _from, next ) {
            if( this ) {
                console.log( 'beforeRouteLeave ' + this )
                // console.log( next )
            } else {
                console.log( 'beforeRouteLeave undefined' )
            }
            next()
        }
    }
</script>

<style lang="sass">
    @import "../../sass/main"
    // 多行文本
    .MtextBoxPro
        +REL
        textarea
            padding: 5%
            width: 90%
            +REM( height, $F-text*11 )
            border: none
            +REM-fontStyle( $F-text, $C-assist,2 )
        >p
            +ABS
            bottom: $D-autoPadding
            right: $D-autoPadding
            +REM-fontStyle( $F-assist, $C-assist )
    #FortFormPro

    .form
        .form-item
            +flexCenter
            +REM( padding, $D-autoPadding )
            +bC( $C-W )
            input
                flex: 3
                border: none

    .formFont
        flex: 1
        +REM-fontStyle( $F-assist, $C-title, 2 )

    .StateButtonPro
        +flexCenter
        >button
            width: 40%
            color: $C-W
            +radius( 20px )
            +boxShadow( 0, 5px, 20px, $C-theme )
    //图片上传
    .ftp
        color: rgb( 178,178,178 )
        font-size: 14px
        margin-left: 15.5px
        padding-bottom: 15.5px
        padding-top: 15.5px
        .dll
            color: rgb( 35,210,150 )
    .upload
        padding-top: 10px
</style>
