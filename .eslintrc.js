// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
      sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        /*
         *  Standard 规范建议( 摘选 )
         */
        // 缩进风格
        "indent": ["error", 4, { "SwitchCase": 1 }],
        // 字串用使用单引号( 警告级别, 尽量使用单引号 )
        "quotes": ["warn", "single"],
        // 禁止出现未使用过的变量
        "no-unused-vars": [
            // 如果不需要检查的变量( 全局引入变量 ), 使用注明方法说明
            // 注释:  foo is considered used here // 'foo'变量不需要
            "error", {
                // 全部 变量检查
                "vars": "all",
                // 全部 参数检查
                "args": "all",
                // 下划线开头的参数 不需要检查
                "argsIgnorePattern": "^_"
            }],
        // 要求或禁止函数圆括号之前有一个空格
        "space-before-function-paren": ["error", {
            // 匿名函数
            "anonymous": "never",
            // 命名的函数表达式
            "named": "never",
            // 针对异步的箭头函数表达式( 需要带空格 )
            "asyncArrow": "always"
        }],
        // 语句块之前必须加空格
        "space-before-blocks": "error",
        // 只允许使用 === 和 !==
        "eqeqeq": ["error", "always"],
        // 禁止使用 Tab符 进行缩进( 将Tab设置为4格空格 )
        "no-tabs": "error",
        // 不允许多个空行
        "no-multiple-empty-lines": ["error", {
            // 最大为2行
            "max": 2,
            // 文件开头最多1行空行
            "maxBOF": 1,
            // 文件末尾最多1行空行
            "maxEOF": 1,
        }],
        // 禁止使用 空格 和 tab 混合缩进; 当 tab 是为了对齐，允许混合使用空格和 tab
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        // 中缀操作符周围有空格 ( 运算符两侧要有空格 )
        "space-infix-ops": "error",
        // 强制在逗号周围使用空格
        "comma-spacing": ["error", {
            // 逗号前 禁止使用空格
            "before": false,
            // 逗号后 需要添加空格
            "after": true
        }],
        // 大括号风格要求: 大括号开括号禁止独自一行, 但是允许开括号与闭括号在同一行( 应用于一行表达式 )
        "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
        // 大括号约定: 除非一行语句, 否则必须添加大括号
        "curly": "error",
        // 禁止使用var( ES6规则 )
        "no-var": "error",
        // 强制在单行代码块中使用一致的空格
        "block-spacing": "error",
        // 定义和赋值变量时, 只允许使用驼峰命名
        "camelcase": ["error", {
            properties: "always"
        }],
        // 禁止使用拖尾逗号: 最后一个 元素/属性 后面禁止使用逗号
        "comma-dangle": ["error", "never"],
        // 调用函数时, 括号前禁止使用空格
        "func-call-spacing": ["error", "never"],
        // 对象字面量的键和值之间使用一致的空格
        "key-spacing": ["error", {
            // 冒号前 禁止出现空格
            "beforeColon": false,
            // 冒号后 至少有一个空格
            "afterColon": true,
            // 对象字面量中的冒号和值都水平对齐
            // "align": "colon"
        }],
        // 构造函数 命名首字母必须是大写
        "new-cap": ["error", { "newIsCap": true }],
        // 调用无参构造函数时带括号
        "new-parens": "error",
        // 禁止使用 Array 构造函数
        "no-array-constructor": "error",
        // 不允许修改类声明的变量
        "no-class-assign": "error",
        // 禁止修改const 定义的常量
        "no-const-assign": "error",
        // 禁止function中出现相同的参数
        "no-dupe-args": "error",
        // 不允许类成员中有重复的名称
        "no-dupe-class-members": "error",
        // 禁止在对象字面量中出现重复的键( 属性 )
        "no-dupe-keys": "error",
        // 每个模組的引入只用一行
        "no-duplicate-imports": "error",
        // 禁止出现不必要的括号
        "no-extra-parens": "error",
        // 禁止出现多余空格
        "no-multi-spaces": ["error", {
            // 特殊情况
            exceptions: {
                // 1. 声明的变量名称后, 允许使用多个空格对齐格式
                "VariableDeclarator": true,
                // 2. 属性名称后, 允许使用多个空格对齐格式
                "Property": true,
                // 3. 引入的模块名称后, 允许使用多个空格对齐格式
                "ImportDeclaration": true
            }
        }],
        // 禁止使用alert等突兀内容
        // "no-alert": "error",
        // 禁止多次声明同一变量
        "no-redeclare": "error",
        // 禁止自身比较
        "no-self-compare": "error",
        // 禁止自身赋值
        "no-self-assign": "error",
        // 变量声明必须在作用域顶部
        "vars-on-top": "error",
        // 避免在 import、export 和 destructured 時，不必要的重新命名
        "no-useless-rename": "error",
        // 禁止属性前有空白
        "no-whitespace-before-property": "error",
        // 强制对象属性在不同行上
        "object-property-newline": ["error", {
            // 除非属性很少, 允许在一行当中
            "allowMultiplePropertiesPerLine": true
        }],
        // 禁止块语句开始或末尾有空行
        "padded-blocks": ["error", "never"],
        // 展开运算符前面禁止添加空格
        "rest-spread-spacing": ["error", "never"],
        // 强制分号空格约束
        "semi-spacing": ["error", {
            // 分号之前 禁止空格
            "before": false,
            // 分号之后 强制空格
            "after": true
        }],
        // 禁止删除变量
        "no-delete-var": "error",
        // 强制圆括号内有一个空格
        "space-in-parens": ["error", "always", {
            // 当圆括号内包含花括号时, 不需要空格
            "exceptions": ["{}", "[]"]
        }],
        // 要求或禁止在注释前有空白
        "spaced-comment": ["error", "always"],
        // 强制模板字符串中空格的使用( 花括号内有一个或多个空格 )
        "template-curly-spacing": ["error", "always"],
        // 需要把立即执行的函数包裹起来: 强制总是包裹，但允许其它风格
        "wrap-iife": ["error", "any"],
        // 强制在 yield * 表达式中两侧空格
        "yield-star-spacing": ["error", "both"],
        // 禁止使用分号( 除非是 用来消除以[、(、/、+ 或 -开头的语句的歧义 ) - 需要配合 no-unexpected-multiline 规则
        "semi": ["error", "never"],
        // 禁止使用令人困惑的多行表达式 - 配合 semi 禁用分号规则
        "no-unexpected-multiline": "error",
        // 禁止空块语句
        "no-empty": ["error", {
            // 允许出现空的 catch 子句
            "allowEmptyCatch": true
        }],
        // 禁用不必要的分号
        "no-extra-semi": "error",
        // 禁用稀疏数组
        "no-sparse-arrays": "error",
        // 要求 Switch 语句中有 Default 分支
        "default-case": "error",
        // 禁止出现空函数
        "no-empty-function": "error",
        // 禁用未使用过的标签
        "no-unused-labels": "error",
        // 禁用未声明的变量
        // 除非显式地在 /*global ...*/ 注释中指定
        //      例子: /* global someFunction b:true */
        //      someFunction 与 b 为 提前声明好的变量, 所以允许使用
        "no-undef": ["error", {
            "typeof": true
        }],
        /*
            为了方便，ESlint 提供了预定义流行类库和运行时环境暴露的全局变量的快捷方式
            添加  env: { browser: true } // 运行环境说明 -> 可使用全局环境下的快捷方式
        */
        // 强制注释周围有空行
        "lines-around-comment": ["error", {
            // 块级注释之前 有一空行
            "beforeBlockComment": true,
            // 块级注释之后 禁止使用空行
            "afterBlockComment": false
        }],
        /*
         *  部署规则( 开发时, 将其关闭 )
         */
        // 禁用 console
        "no-console": "off"
    }
}


