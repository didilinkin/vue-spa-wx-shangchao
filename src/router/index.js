import Vue          from 'vue'
import Router       from 'vue-router'

import BottomTitle  from '@/components/common/BottomTitle'

import Bulletin     from '@/view/Bulletin.vue'
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
            components: {
                AppContent: Bulletin,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/bulletin',                                      
            name: 'Bulletin',
            components: {
                AppContent: Bulletin,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/bill',                                      
            name: 'Bill',
            components: {
                AppContent: Bill,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/fault',                                      
            name: 'Fault',
            components: {
                AppContent: Fault,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/proposal',                                      
            name: 'Proposal',
            components: {
                AppContent: Proposal,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/binding',                                      
            name: 'Binding',
            components: {
                AppContent: Binding,
                AppBottomTitle: BottomTitle
            }
        }
    ]
})
