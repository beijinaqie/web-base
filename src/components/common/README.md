<!-- TOC -->

- [Upload](#upload)
  - [简介](#简介)
  - [API](#api)
  - [使用方法](#使用方法)
  - [备注](#备注)
- [QuilEditor](#quileditor)
  - [简介](#简介-1)
  - [API](#api-1)
  - [事件](#事件)
  - [使用方法](#使用方法-1)
- [Preview](#preview)
  - [简介](#简介-2)
  - [API](#api-2)
  - [事件](#事件-1)
  - [使用方法](#使用方法-2)
- [Ani](#ani)
  - [简介](#简介-3)
  - [API](#api-3)
  - [使用方法](#使用方法-3)
  - [备注](#备注-1)

<!-- /TOC -->

# Upload

## 简介

对`<a-upload>`的简单封装，对上传类型，和大小进行了限制以及回填时的file-list进行了处理

## API

参数|说明|类型|默认值
:--|:-:|:-:|--:
format|限制上传类型，可配合accept使用，在before-upload中起作用，第一个参数是筛选数组如(<span style="color: #1890ff">[ '.docx' ]</span>)，第二个参数是提示信息|`[ string[], string ]`|[]
limit-size|限制传文件大小，第一个参数是配置项，接受一个单位(<span style="color: #1890ff">b,k,m,g,t</span>)和阈值|`[ [ string, number ], sring ]`|[]
file-list|已上传文件列表，当传入数组时，表现和原控件一致，当传入字符串时，会转化为对应的数组|(string \| object[]) | []


## 使用方法

```js
<Upload
  :format="[['.docx'], '上传文件格式错误']"
  :limit-size="[['m', 2], '不能超过2M']"
  :file-list="[]" // 字符串时 'url,url2,url3'
  ></Upload>
```

## 备注
其它方法属性方法同`<a-upload>`
新增对名称英文`,`进行判断

# QuilEditor

## 简介

对百度的vue-quill-editor进行封装，对图片上传进行先上传服务器，在放到本地，并且支持对图片进行缩放调整

## API

参数|说明|类型|默认值
:--|:-:|:-:|--:
value(v-model)|绑定值,获取富文本的内容|string|空
accept|上传图片类型|string|image/*(所有类型)
action|图片上传地址|string|https://www.mocky.io/v2/5cc8019d300000980a055e76
header|上传时的header,可添加token等信息|string|{ Authorization: 'authorization-text' }
placeholder|富文本默认提示内容|string|请输入...
min-height|富文本的最小高度|string|400px
max-length|富文本限制长度|number|-1(默认不限制)

## 事件
事件同vue-quill-editor 事件

## 使用方法
```js
<QuilEditor v-model="content">

</QuilEditor>
```

# Preview 

## 简介

图片预览功能

## API

参数|说明|类型|默认值
:--|:--:|:--:|--:
imgList|传入以`,`分割的字符串或数组图片路径|(string, array)|[]
size|预览图片的大小|string|default(small, default, larger)
styleName|style样式|object|{}

## 事件

## 使用方法

```js
<Preview 
  :imgList="imgList"
  :styleName="{width: '200px',height: '200px'}"
></Preview>
// imgLsit 为string
imgLsit = 'url1, url2'
// imgList 为Array
imgList = ['url1', 'url2'] 或者 [{ url: 'url1' }, { url: 'url2' }]
```

# Ani

## 简介

列表动画

## API

参数|说明|类型|默认值
:--|:--:|:--:|--:
mode|动画模式(可选`right-left`、`left-right`、`bottom-top`、`top-bottom`、`rotateX`、`rotateY`、`rotateZ`、`scale`)|string|right-left

## 使用方法  

```js
// 使用前请仔细查看备注
<Ani mode="right-top">
  <item v-for="(item, index) in list" :key="index" :data-index="index"></item>
</Ani>
```

## 备注

+ 请务必保证渲染的列表包含`key`
+ 请保证列表中拥有`:data-index="index"`，其中`index`为索引
+ `mode`选项为动画模式，传入两种模式时，则表现为`[偶数，奇数]`对应所传入的动画效果`mode="right-left bottom-top"`