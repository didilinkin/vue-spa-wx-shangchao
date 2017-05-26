// '故障报修' - 我的报修
<template lang="pug">
#myRepair.Fault--module
    // 说明: 因为渲染组件需要复用, 所以需要在一个渲染组件内进行渲染
    RepairState( v-bind:repairStateArr="repairState" )
</template>

<script>    
import RepairState      from    '../../components/Fault/RepairState'
const components = { RepairState }

export default {
    name: 'myRepair',
    data() {
        return {
            repairState: [
                {
                    stateType: 'submitted',
                    stateTitle: '已提交',
                    dateTime: '2016-05-25 11:46',
                    text: `此处是已提交文本此处是已提交文本
                            此处是已提交文本此处是已提交文本
                            此处是已提交文本此处是已提交文本`
                }, {
                    stateType: 'send',
                    stateTitle: '已派单',
                    dateTime: '2016-11-12 11:51',
                    text: `此处是已派单文本此处是已派单文本
                            此处是已派单文本此处是已派单文本`
                }, {
                    stateType: 'finished',
                    stateTitle: '已完工',
                    dateTime: '2016-07-11 12:12',
                    text: `此处是已完工文本此处是已完工文本
                            此处是已完工文本`
                }, {
                    stateType: 'evaluation',
                    stateTitle: '已评价',
                    dateTime: '2016-01-22 15:34',
                    text: `此处是已评价文本此处是已评价文本
                            此处是已评价文本此处是已评价文本
                            此处是已评价文本`
                }
            ]
        }
    },
    components: components
}
</script>

<style lang="sass">
import "../../sass/main"

#myRepair
</style>