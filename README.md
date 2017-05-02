# shangchao-pms-wx

> 上朝科技-物业管理系统-微信公众号网站

> 本页面需要在服务器环境下访问( 可使用 `yarn run dev` 预览 ), 勿直接浏览静态页面

## 使用技术:
| 技术名称                                                      | 作用                |  版本  |
| --------                                                      | -----:             | :----:  |
| [Vuejs](http://cn.vuejs.org/)                                 | 框架                |   2.2.6     |
| [Vuex](https://vuex.vuejs.org/zh-cn/)                         | 状态管理            |   2.3.1   |
| [Vue-router](http://router.vuejs.org/zh-cn/)                  | 路由管理            |  2.4.0  |
| [Axios](https://github.com/mzabriskie/axios)                  | 交互处理            |  0.16.1  |
| [Sass](https://www.sass.hk/)                                  | 样式预处理器        |  4.5.2  |
| [Webpack](http://webpack.github.io/)                          | 模块打包            |  2.2.1  |
| [Gulp](http://www.gulpjs.com.cn/docs/getting-started/)        | 自动构建工具        |  3.9.1  |
| [Babel](http://babeljs.cn/)                                   | ES6转译ES5          |  6.22.1  |
| [Yarn](https://yarnpkg.com/zh-Hans/)                          | 模块依赖安装         |  0.20.3  |
| [Faker.js](http://marak.github.io/faker.js/)                  | 本地调试模拟接口      |  4.1.0  |
| [Mint-ui](https://museui.github.io/#/index)                   | UI框架              |  2.2.3  |
| [Pug](https://pugjs.org/zh-cn/api/getting-started.html)       | Node模版语言         |  2.0.0-beta.12  |

## 使用插件:
| 插件名称                                                           | 作用                           |  版本  |
| --------                                                          | -----:                        | :----:  |
| [Layzr.js](https://github.com/callmecavs/layzr.js)                | 图片懒加载 + 自适应分辨率       |   2.2.2     |
| [vue-scrollto](https://github.com/rigor789/vue-scrollto)          | Vue卷轴插件                    |   2.6.7     |
| [vue-star-rating](https://github.com/craigh411/vue-star-rating)   | Vue星星点评插件                 |   1.3.2     |
| [vue-wechat-title](https://github.com/deboyblog/vue-wechat-title) | Vue动态修改微信网页标题插件      |   2.0.4     |

## Build Setup / 开发流程
#### **请尽量确保 本地Nodejs版本 >= 7**

``` bash
# install dependencies/拉取项目,在项目路径下执行
# 国内环境建议使用cnpm install
npm install
cnpm install

# *推荐Yarn
yarn install

# serve with hot reload at localhost:8080
# npm安装依赖后,运行node服务器,打开 localhost:80 预览 (已运行热更新功能)
yarn run dev
npm run dev

# build for production with minification
# 当修改代码后,需要手动打包发布时,运行npm run build命令进行打包
yarn run build
npm run build

# 打包生产模式,缩小压缩包 -- 查看包分析报告
npm run build --report
```
## API docs / 接口文档

## **ToDoList**
- [x]  `Faker.js` 模拟数据
- [x]  `Mock.js` 模拟数据( 中文模拟数据 )
- [x]  `SPA` 动态修改 页面 `title`信息方案
- [ ]  微信公众号开发 用户信息获取
- [x]  性能优化: 将 `MintUI`的*全部引入* 改为 *按需引入组件*
- [x]  处理模拟数据的 日期 + 时间
- [ ]  加入手势操作

### **Binding.vue**
1. 组件触发一个事件: 去接口获取数据( 数组 - 建筑列表 )
2. 将数据原封不动的保存到 $store 中
3. 组件使用 mapGetter 获取到最新的 $store中 建筑列表 数据， 通过监听事件 将 $store中的结果 保存到 $data当中
4. 在监听事件中, 通过默认参数 触发一个设置 3个 $data值 的事件( 1. 保存1级 建筑物名称数据; 2. 保存 1级建筑物中1号建筑物的2级楼层数据; 3. 保存 第一个建筑物第一个层级中的房间号 )
5. 保存的事件 将值都保存到 $data 中; 考虑将picker中的data绑定到 $data上; 这样 数据就可以实时更新
6. 第一个事件( 保存 全部1级建筑物 ) 不需要参数, 只需要 $watch 触发更新一次即可
7. 第二个事件( 保存 2级楼层列表 - 需要根据1级建筑物 value, 来进行筛选; 然后将筛选后的值保存到 $data中 ) - 每次改变 1级类型, 都会触发这个事件 => 而页面筛选器的2级内容绑定在 $data上, 实时更新
8. 第三个事件( 保存 3级房间号 ) - 需要根据1级建筑物 value + 2级楼层值 进行筛选


> 将1. 2. 3个级别value设置在 $data中, 这样检索的事件就可以 通过3个参数进行筛选. 不负责判断了
