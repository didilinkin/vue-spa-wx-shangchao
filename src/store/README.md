## 状态管理 `$store` 说明

#### 根状态的 模块
```js
// 导入各个模块状态
import globalState      from './modules/GLOBAL/globalState'     // 全局
import bulletin         from './modules/BULLETIN/bulletin'      // 物业公告
import bill             from './modules/BILL/bill'              // 费用账单
import fault            from './modules/FAULT/fault'            // 故障报修
import proposal         from './modules/PROPOSAL/proposal'      // 投诉建议
import binding          from './modules/BINDING/binding'        // 绑定房间
```