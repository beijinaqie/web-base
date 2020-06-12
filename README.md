<!-- TOC -->

- [1.项目描述](#1项目描述)
  - [启动](#启动)
  - [打包](#打包)
  - [测试](#测试)
  - [lint校验](#lint校验)
- [2.项目简介](#2项目简介)
- [3.项目规范](#3项目规范)
- [4.项目公共可复用组件](#4项目公共可复用组件)
  - [4.1 富文本编辑器的使用](#41-富文本编辑器的使用)
- [5.项目公共方法](#5项目公共方法)
    - [validateInput](#validateinput)
    - [phoneReg](#phonereg)
    - [emailReg](#emailreg)
    - [passwordReg](#passwordreg)
    - [oneOf](#oneof)
    - [camelcaseToHyphen](#camelcasetohyphen)
    - [firstUpperCase](#firstuppercase)
    - [typeOf](#typeof)
    - [deepCopy](#deepcopy)
    - [scrollTop](#scrolltop)
- [6.项目备注](#6项目备注)

<!-- /TOC -->

# 1.项目描述

## 启动

```js
yarn start || yarn run serve
```

## 打包

```js
yarn build || yarn run build
```

## 测试

```js
yarn test:unit || yarn run test:unit
```

## lint校验

```js
yarn lint || yarn run lint
```

# 2.项目简介

node：8.9+  
脚手架：vue4  
vue版本：2.6+  
vue-router：3.1+  
vuex：3.1+  
moment：2.25+  
axios：0.19+  
ant-design-vue：1.5+

# 3.项目规范
1. 代码采用 `standard` 规范，更多详细规则请 [参考这里](https://standardjs.com/rules-zhcn.html)
<br />

2. 配置方法请[参考这里](https://blog.csdn.net/qq_36616301/article/details/103382129)
<br />

3. **请务必遵循以下开发规范**

   + 项目中所有文件夹( `UserInfo` )以及文件( `UserInfo.vue` )命名方式一律采取首字母大写的帕斯卡命名
   + 变量命名禁止使用拼音，尤其式拼音缩写，尽量做到见名知意
   + 当页面比较多时，请使用文件夹进行管理
# 4.项目公共可复用组件

公共组件都已经全局注册。
[公共组件请点击这里](./src/components/Common/README.md)

## 4.1 富文本编辑器的使用

```html
 <quill-editor
      style="min-height: 300px"
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />
    <a-button @click="upload" type="primary">保存
</a-button>
```

```js
export default {
  name: '',
  data () {
    return {
      content: '<h2>I am Example</h2>',
      editorOption: {
        // Some Quill options...
      }
    };
  },
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill);
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill);
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text);
      this.content = html;
    },
    upload() {
      this.$http
        .post('/v1.0.0/appstore/api/html', {
          html: this.content
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
```



# 5.项目公共方法

<hr style="background: #00b478"/>

### validateInput

1. 方法描述
    + 对输入框进行限制，如不能输入字母、特殊字符串，限制正数位和小数位等功能

2. 文件位置
    + 复制以下路径进行引用  
    `import { validateInput } from '@/utils/assits/assits';`
```
|-- src
|   |-- utils
|       |-- assits
|           |-- asstis.js
```
3. 使用方法

事件名|参数|返回|备注
:--|:-:|:-:|--:
validateInput|{ objData: string, int?: number = 30, float?: number = 8 }| 无 | objData data中数据

```js
<a-input 
  @change="validateInput({ 
    objData: 'input', 
    int: 2, 
    float: 0 
  })"></a-input>

import { validateInput } from '@/utils/assits/assits';
data () {
  return {
    input: ''
  }
}

methods: {
  validateInput
}
```

<hr style="background: #00b478"/>

### phoneReg 

1. 属性描述
    + 手机号正则

2. 文件位置
    + 复制以下路径进行引用  
    `import { phoneReg } from '@/utils/assits/assits';`
```
|-- src
|   |-- utils
|       |-- assits
|           |-- asstis.js
```
3. 使用方法   
    + 导入按需求使用即可

<hr style="background: #00b478"/>

### emailReg

1. 属性描述
    + 邮箱正则 通用性邮箱验证(着重校验@后面的，@前面则无限制)

2. 文件位置
    + 复制以下路径进行引用  
    `import { emailReg } from '@/utils/assits/assits';`
```
|-- src
|   |-- utils
|       |-- assits
|           |-- asstis.js
```
3. 使用方法   
    + 导入按需求使用即可

<hr style="background: #00b478"/>

### passwordReg

1. 方法描述
    + 密码正则 8-32位，并包含数字和大小写字母

2. 文件位置
    + 复制以下路径进行引用  
    `import { passwordReg } from '@/utils/assits/assits';`
```
|-- src
|   |-- utils
|       |-- assits
|           |-- asstis.js
```
3. 使用方法   

事件名|参数|返回|备注
:--|:-:|:-:|--:
passwordReg|min?: number = 8, max?: number = 32, options?: string = ''| 生成后的正则 | options 可选 i(会让大写失效)，g

```js
import { passwordReg } from '@/utils/assits/assits';

created () {
  passwordReg(6, 24, 'ig')  // /^(?=.*\\d.*)(?=.*[a-z].*)(?=.*[A-Z].*).{6,24}$/ig
}
```

<hr style="background: #00b478"/>

### oneOf

1. 方法描述
    + 判断源数组是否包含目标项

2. 文件位置
    + 复制以下路径进行引用  
    `import { oneOf } from '@/utils/assits/assits';`
```
|-- src
|   |-- utils
|       |-- assits
|           |-- asstis.js
```
3. 使用方法   

事件名|参数|返回|备注
:--|:-:|:-:|--:
oneOf|value: any, validList: any[]| true \| false | value 目标项 validList 源数组

```js
import { oneOf } from '@/utils/assits/assits';

created () {
  
  oneOf(1, [1, 2, 3])  // true
  oneOf(1, [2, 3]) // false
}
```
<hr style="background: #00b478"/>

### camelcaseToHyphen

1. 方法描述
    + 驼峰命名转段横线命名

2. 文件位置
    + 复制以下路径进行引用  
    `import { camelcaseToHyphen } from '@/utils/assits/assits';`
```
|-- src
|   |-- utils
|       |-- assits
|           |-- asstis.js
```
3. 使用方法   

事件名|参数|返回|备注
:--|:-:|:-:|--:
camelcaseToHyphen|str: string| 短横线命名字符串 | str为驼峰命名

```js
import { camelcaseToHyphen } from '@/utils/assits/assits';

created () {
  camelcaseToHyphen('cameCase') //came-case
}
```
<hr style="background: #00b478"/>

### firstUpperCase

1. 方法描述
    + 字符串首字母大写

2. 文件位置
    + 复制以下路径进行引用  
    `import { firstUpperCase } from '@/utils/assits/assits';`
```
|-- src
|   |-- utils
|       |-- assits
|           |-- asstis.js
```
3. 使用方法   

事件名|参数|返回|备注
:--|:-:|:-:|--:
firstUpperCase|str: string| 首字母大写的字符串 | 无

```js
import { camelcaseToHyphen } from '@/utils/assits/assits';

created () {
  camelcaseToHyphen('cameCase') // CameCase
}
```

<hr style="background: #00b478"/>

### typeOf

1. 方法描述
    + 判断类型

2. 文件位置
    + 复制以下路径进行引用  
    `import { typeOf } from '@/utils/assits/assits';`
```
|-- src
|   |-- utils
|       |-- assits
|           |-- asstis.js
```
3. 使用方法   

事件名|参数|返回|备注
:--|:-:|:-:|--:
typeOf|target: any| boolean \| number \| string \| function \| array \| date \| regExp \| undefined \| null \| object | 无

```js
import { typeOf } from '@/utils/assits/assits';

created () {
  typeOf('cameCase') // string
  typeOf(1) // number
  typeOf({}) // object
}
```
<hr style="background: #00b478"/>

### deepCopy

1. 方法描述
    + 递归方式的深拷贝

2. 文件位置
    + 复制以下路径进行引用  
    `import { deepCopy } from '@/utils/assits/assits';`
```
|-- src
|   |-- utils
|       |-- assits
|           |-- asstis.js
```
3. 使用方法   

事件名|参数|返回|备注
:--|:-:|:-:|--:
deepCopy|target: any| 深拷贝后的数据 | 无

```js
import { deepCopy } from '@/utils/assits/assits';

created () {
  const obj = {}
  const obj1 = deepCopy(obj)

  obj === obj1 // false
}
```
<hr style="background: #00b478"/>

### scrollTop

1. 方法描述
    + 元素滚动

2. 文件位置
    + 复制以下路径进行引用  
    `import { scrollTop } from '@/utils/assits/assits';`
```
|-- src
|   |-- utils
|       |-- assits
|           |-- asstis.js
```
3. 使用方法   

事件名|参数|返回|备注
:--|:-:|:-:|--:
scrollTop|el: any, from: number = 0, to: number, duration: number = 500, endCallback: function | 无 | el 为目标元素 from 起点 to 终点 duration 持续时间 endCallback 滚动完成的回调

```js
import { scrollTop } from '@/utils/assits/assits';

created () {
  
}
```
<hr style="background: #00b478"/>

# 6.项目备注

1. 默认使用yarn包管理，可切换使用npm，若遇到问题，则使用yarn进行包管理
2. 建议使用淘宝镜像源进行安装依赖等，若遇到安装出错，切回npm源
