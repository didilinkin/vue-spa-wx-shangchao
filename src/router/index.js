import Vue          from 'vue'
import Router       from 'vue-router'

import BottomTitle  from '@/components/common/BottomTitle'
import Home         from '@/view/Home'

import Bulletin     from '@/view/Bulletin'
import Bill         from '@/view/Bill'
import Fault        from '@/view/Fault'
import Proposal     from '@/view/Proposal'
import Binding      from '@/view/Binding'

Vue.use( Router )

export default new Router({
    routes: [
        {
            path: '/',                                      // 默认 -> '物业公告'
            name: 'index',
            meta: { title: '首页' },
            components: {
                AppContent: Home,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/bulletin',                                      
            name: 'Bulletin',
            meta: { title: '物业公告' },
            components: {
                AppContent: Bulletin,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/bill',                                      
            name: 'Bill',
            meta: { title: '费用账单' },
            components: {
                AppContent: Bill,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/fault',                                      
            name: 'Fault',
            meta: { title: '故障报修' },
            components: {
                AppContent: Fault,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/proposal',                                      
            name: 'Proposal',
            meta: { title: '投诉建议' },
            components: {
                AppContent: Proposal,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/binding',                                      
            name: 'Binding',
            meta: { title: '绑定房间' },
            components: {
                AppContent: Binding,
                AppBottomTitle: BottomTitle
            }
        }
    ]
})
