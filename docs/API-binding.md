# **绑定 - 接口**
> **URL:** [BaseUrl/binding](BaseUrl/binding)
>
> 无参数

| 属性名称     | 类型       | 描述                                                          |  可否动态数据  |     静态值           |
| --------    | -----:     | -----:                                                       | :----:        |     :----:          |
| text        | string     | 绑定 - 筛选器展示文字( 建筑物名称 / 楼层名称 / 房间名称 )        |   true        |                     |
| value       | number     | 绑定 - 该对象唯一值( 用于检查是否可用 )                         |   true        |                     |
| floorArr    | array      | 绑定 - 楼层数组( 建筑物内 )                                    |   true        |                      |
| floorNum    | number     | 绑定 - 楼层值                                                 |   true        |                      |
| roomArr     | array      | 绑定 - 房间数组( 楼层内 )                                      |   true        |                      |
| roomNum     | number     | 绑定 - 房间值                                                 |   true        |                      |


模拟数据格式
```json
{
    "rlt": "true",
    "msg": "ok",
    "data": [
        {
            "text": "建筑物名称",
            "value": 1,
            "floorArr": [
                {
                    "floorNum": 24,
                    "text": "24楼",
                    "value": 10,
                    "roomArr": [
                        {
                            "roomNum": 8,
                            "text": "2408室",
                            "value": 12
                        }
                    ]
                }
            ]
        }
    ]
}
```

### 说明:

* `data`数组中的对象为 **建筑物**对象( 有几个建筑物, 输出多少对象 )
* `floorArr`数组中的对象为 **楼层**对象
* `roomArr`数组中的对象为 **房间**对象 

***

# **绑定请求 - 接口**
> **URL:** [BaseUrl/bindingRequire](BaseUrl/bindingRequire)

| 参数名称          | 类型        | 描述               |  可否为空  |
| --------          | -----:     | -----:             | :----:    |
| buildingValue     | number     | 建筑物value        |   false   |
| floorValue        | number     | 楼层value          |   false   |
| roomValue         | number     | 房间value          |   false   |
| companyNo         | number     | 公司编号唯一value   |   false   |

| 属性名称     | 类型       | 描述                  |  可否动态数据 |   静态值        |
| --------    | -----:     | -----:                | :----:       |   :----:       |
| data        | boolean    | 绑定请求 - 返回结果    |   true       |   true / false  |

模拟数据格式
```json
{
    "rlt": "true",
    "msg": "ok",
    "data": true
}
```