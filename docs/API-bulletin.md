# **公告 - 接口**
> **URL:**  [BaseUrl/bulletin](*/bulletin)
>
> 无参数

| 属性名称     | 类型       | 描述                         |  可否动态数据  |     静态值           |
| --------    | -----:     | -----:                       | :----:        |     :----:          |
| id          | number     | 公告 - 独有ID                 |   true        |                     |
| title       | string     | 公告 - 标题                   |   true        |                     |
| date        | date       | 公告 - 日期                   |  true        |                      |
| time        | date       | 公告 - 时间                   |  true        |                      |

模拟数据格式
```json
{
    "rlt": "true",
    "msg": "ok",
    "data": [
        {
            "id": 2423,
            "title": "title",
            "date": "2017-05-07",
            "time": "11:46"
        }
    ]
}
```

***

# **公告详情 - 接口**
> **URL:** [BaseUrl/bulletinDetails](BaseUrl/bulletinDetails)

| 参数名称  | 类型       | 描述          |  可否为空  |
| -------- | -----:     | -----:        | :----:    |
| id       | number     | 详情内容id     |   false   |

| 属性名称     | 类型       | 描述                         |  可否动态数据  |     静态值           |
| --------    | -----:     | -----:                       | :----:        |     :----:          |
| title       | string     | 公告详情 - 标题               |   true        |                     |
| dateTime    | date       | 公告详情 - 发布时间            |  true        |                      |
| content     | array      | 公告详情 - 内容( 图片/文字 )   |  true        |                      |
| type        | string     | 公告详情 - 内容类型            |  false       |    paragraph /  img  |
| paragraph   | string     | 公告详情 - 文字内容            |  true        |                      |
| imgUrl      | string     | 公告详情 - 图片地址            |  true        |                      |

模拟数据格式
```json
{
    "rlt": "true", 
    "msg": "ok", 
    "data": {
        "title": "title", 
        "dateTime": "1970-02-07 03:57:58", 
        "content": [
            {
                "type": "paragraph", 
                "paragraph": "头步格京直今领派价放温心照现。而接算油么争级做间人标思。"
            }, 
            {
                "type": "img", 
                "imgUrl": "http://dummyimage.com/125x125"
            }
        ]
    }
}
```

### 说明:

* `dateTime` 为具体时间
* `content` 类型为数组: `文本` 与 `图片`以对象的形式保存在数组中, 表现时将使用`v-for`循环 + `v-if`判断 来渲染内容 
