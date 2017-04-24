// '物业公告' - 公告轴
<template lang="pug">
#BulletinLine
    ul( 
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="51"
    )
        li.BulletinLine--item(
            v-for="item in renderArr"
            v-bind:key="item.title"
        )
            h2 {{ item.title }}
            span {{ item.date }}
            span {{ item.time }}
</template>

<script>
export default {
    name: 'BulletinLine',
    props: {
        bulletinLineArr: {
            type: Array,
            default: function() {
                return [
                    {
                        id: 100,
                        title: '测试标题',
                        text: `测试文字测试文字测试文字测试文字测试文字
                                测试文字测试文字测试文字测试文字
                                测试文字测试文字`,
                        date: '2017-04-20',
                        time: '08:13'
                    }
                ]
            }
        }
    },
    methods: {
        // 目的: 当 $props 传入, 计算公告数量: 如果 >10, 执行下拉加载效果; 如果 <= 10 无事件
        countBulletinLength() {
            let bulletinArr = this.$props.bulletinLineArr
            if( bulletinArr.length > 10 ) {                            
                for( let i = 0; i < 10; i++ ) {                        // 存入 10个公告
                    this.$data.renderArr.push( bulletinArr[i])
                }  
            }
        },
        // 目的: 下拉自动加载
        loadMore() {
            this.loading = true                             // 改变状态
            let num = this.$data.loadNum                    // 加载次数

            // let residueNum = this.$data.lengthNum 


            setTimeout( () => {
                for( let i = 0; i < 10; i++ ) {
                    let newBulletinObj = this.$props.bulletinLineArr[ 10 * num + i ]
                    this.$data.renderArr.push( newBulletinObj )
                }
            }, 3000 )
            this.$data.loadNum = this.$data.loadNum + 1     // 加载一次事件, '加载次数' + 1
        }
    },
    data() {
        return {
            loading: false,
            renderArr: [],                  // 用于渲染的数组( 需要将 $props的数据赋值 )
            lengthNum: 0,                   // 记录 $props中 '公告'数量 
            loadNum: 1                      // 加载次数
        }
    },
    watch: {
        bulletinLineArr: function() {
            this.countBulletinLength()      // 计算 '公告' 数量
            this.$data.lengthNum = this.$props.bulletinLineArr.length       // 将 '公告' 数量 保存到 $data 中
        }
    }
}
</script>
