import Vue              from 'vue'
import Vuex             from 'vuex'

import globalState      from './modules/GLOBAL/globalState'     
import bulletin         from './modules/BULLETIN/bulletin'      
import bill             from './modules/BILL/bill'              
import fault            from './modules/FAULT/fault'            
import proposal         from './modules/PROPOSAL/proposal'      
import binding          from './modules/BINDING/binding'        

Vue.use( Vuex )

const store = new Vuex.Store({
    modules: {
        globalState,
        bulletin,
        bill,
        fault,
        proposal,
        binding
    }
})

export default store