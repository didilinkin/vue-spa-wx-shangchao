# `PickerView.vue` 组件说明:

## 思路:
1. 本组件是跟业务逻辑脱离, 触发的事件都将返给父级( 业务组件 )
2. 父级组件( 业务组件 ) 监听到`PickerView`筛选器改变事件, 将利用接收的参数对象来处理 监听响应的事件( 也就是父级处理相应的业务逻辑 )
3. 父级组件业务逻辑完成后, 将需要展示的 `筛选器` 数据 保存到 父级的`this.$data` 对象中( 3个筛选列数组 )
4. 父级组件挂载的`PickerView.vue` 组件 通过 `this.$props` 接口接收 父级 `this.$data` 中处理好的展示数据, 数据绑定输出到`PickerView.vue`组件中
5. `PickerView.vue`组件 需要监听到 `$props`数据的改动( 在`picker.change`函数中实时反馈 ) 使用了 `vm.$watch( 'roomArr', () => { resolve() }) ` 方法 => Promise回调( `Promise`会等待 监听`$props.roomArr` 数据改变之后 才返回成功 )
6. 当`Promise`对象返回成功之后, `$props.roomArr`等数据都已经是更新过的. 这时将 `$props`中的对应的 数据更新到 `Picker`筛选器 对应的列值当中即可( 数组对象 )

7. `PickerView.vue`筛选器 点击**确认**后, 再次触发一个 父级监听的 `this.$emit` 事件, 将最终选好的`value`对象( 3列的value ) 发给 => 父级组件( 业务组件 ),  父级用`value`异步再跟 服务器接口做一次确认. 检查value是否是可用.

8. 服务器返回值, 保存在 `$store`中, 父级通过 `$store.getters`方法监听数据 是否返回改变; 改变后进行判断处理 => 保存到 `this.$data`中

9. `PickerView.vue` 有个`$props`对象 专门接收, 服务器返回结果的样式( 成功: 变成主题色边框, 失败: 变成红色边框 )

## `$props`
| 对象名称                                   | 类型      |  作用                            |
| --------                                  | -----:    | :----:                           |
| `buildingArr`                             |  `Array`  | Picker第1列值 - 建筑物数组        |
| `floorArr`                                |  `Array`  | Picker第2列值 - 楼层数组          |
| `roomArr`                                 |  `Array`  | Picker第3列值 - 房间号数组        |
| `classObj`                                |  `Object` | 服务器返回筛选结果( 是否可用 )     |

