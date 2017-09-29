import Vue                      from 'vue'
import Router                   from 'vue-router'

import BottomTitle              from '@/components/common/BottomTitle'
import Home                     from '@/view/Home'

import Bulletin                 from '@/view/Bulletin'
import Bill                     from '@/view/Bill'
import Fault                    from '@/view/Fault'
import Weixin                   from '@/view/Weixin'
import Billnotext               from '@/view/Billnotext'
import Notext                   from '@/view/Notext'
import Proposal                 from '@/view/Proposal'
import Binding                  from '@/view/Binding'

import BulletinDetails          from '@/pages/Bulletin/BulletinDetails'

import BuildingFee              from '@/pages/Bill/BuildingFee'
import PropertyFee              from '@/pages/Bill/PropertyFee'
import ElectricityBill          from '@/pages/Bill/ElectricityBill'
import WaterFee                 from '@/pages/Bill/WaterFee'
import LeaseDeposit             from '@/pages/Bill/LeaseDeposit'
import EnergyDeposit            from '@/pages/Bill/EnergyDeposit'
import DecorationDeposit        from '@/pages/Bill/DecorationDeposit'

import FaultDetail              from '@/pages/Fault/FaultDetail'
import ProposalDetail           from '@/pages/Proposal/ProposalDetail'


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
            // ,beforeEnter: ( _to, _from, next ) => {
            //     // ...
            //     console.log( this )
            //     next()
            // },
            // beforeRouteLeave: ( _to, _from, next ) => {
            //     console.log( 'this is page beforeRouteLeave' )
            //     console.log( this )
            //     next()
            // }
        }, {
            path: '/proposal',
            name: 'Proposal',
            meta: { title: '投诉建议' },
            components: {
                AppContent: Proposal,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/weixin',
            name: 'Weixin',
            meta: { title: '微信' },
            components: {
                AppContent: Weixin
            }
        }, {
            path: '/Billnotext',
            name: 'Billnotext',
            meta: { title: '微信' },
            components: {
                AppContent: Billnotext
            }
        }, {
            path: '/Notext',
            name: 'Notext',
            meta: { title: '物业公告' },
            components: {
                AppContent: Notext
            }
        }, {
            path: '/binding',
            name: 'Binding',
            meta: { title: '绑定房间' },
            components: {
                AppContent: Binding,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/bulletin/:id',
            name: 'BulletinDetails',
            meta: { title: '公告详情' },
            components: {
                AppContent: BulletinDetails,
                AppBottomTitle: BottomTitle
            }
        }, {                                                // 费用账单 - 二级类目
            path: '/bill/buildingFee',
            name: 'BuildingFee',
            meta: { title: '房屋租赁费' },
            components: {
                AppContent: BuildingFee,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/bill/propertyFee',
            name: 'PropertyFee',
            meta: { title: '物业管理费' },
            components: {
                AppContent: PropertyFee,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/bill/electricityBill',
            name: 'ElectricityBill',
            meta: { title: '电费' },
            components: {
                AppContent: ElectricityBill,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/bill/waterFee',
            name: 'WaterFee',
            meta: { title: '水费' },
            components: {
                AppContent: WaterFee,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/bill/leaseDeposit',
            name: 'LeaseDeposit',
            meta: { title: '租赁保证金' },
            components: {
                AppContent: LeaseDeposit,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/bill/energyDeposit',
            name: 'EnergyDeposit',
            meta: { title: '能源管理押金' },
            components: {
                AppContent: EnergyDeposit,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/bill/decorationDeposit',
            name: 'DecorationDeposit',
            meta: { title: '装修保证金' },
            components: {
                AppContent: DecorationDeposit,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/fault/:id',
            name: 'FaultDetail',
            meta: { title: '报修详情' },
            components: {
                AppContent: FaultDetail,
                AppBottomTitle: BottomTitle
            }
        }, {
            path: '/proposal/:id',
            name: 'ProposalDetail',
            meta: { title: '投诉详情' },
            components: {
                AppContent: ProposalDetail,
                AppBottomTitle: BottomTitle
            }
        }
    ]
})
