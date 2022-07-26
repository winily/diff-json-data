# <center>diff-json-data</center>

这是一个你可能需要的小工具～

它用于对比两个 json 之间的差异，然后最终输出一个 json 描述差异。这在你需要在两次接口返回的大量数据中找茬儿，寻找出中间的差异的时候还是挺好用的。

我最近做的一项工作就是，接口底层链路变更了，导致返回的数据与原本的数据存在着差异，我需要对比新旧接口返回数据的差异去做转换以及兼容。每次拿到两个非常庞大的对象的时候真的非常要命，看似没什么不同实际上，在对象深层的地方藏着非常细微的差别，导致了下游程序的崩溃。最终为了稳妥，我还是写了一个小工具来辅助我的工作，就是这个 diff-json-data。


[GitHub](https://github.com/winily/diff-json-data) 欢迎 star

## 如何安装

全局安装然后使用 cli

```shell
npm install -g diff-json-data
# or
yarn add -global diff-json-data
```

当然你也可以集成到你的项目里面去做一些奇怪的事情

```shell
npm install diff-json-data
# or
yarn add diff-json-data
```

## 如何使用

### 1. cli 的使用就非常的简单

```shell
diffjs -c path ./data1.json ./data2.json key new_interface old_interface
```

-c 表示你要进行两个 json 文件的对比

path 指令后面指定两个能寻找的到 json 文件的路径，使用空格隔开

key 指令后面指定两个 key 最终它会在 result.json 中体现，你也可以不指定，默认 key1 key2

你还可以使用 out 指令置顶结果 json 输出路径例如

```shell
diffjs -c path ./data1.json ./data2.json out ./interface_result.json
```

### 2. 集成到项目

这个项目就只导出了一个 diff function, 所以就直接拿到就用就行了

输入：
(value1: object, value2: object, key1 = 'value1', key2 = 'value2', strict = false)

输出差异结构对象

E.g:

```js
import diff from 'diff-json-data'

const result = diff({ hello: 'hhahah' }, { hello: 'hhahah', a: 1 })

console.log(result)
```


## E.g

data1

```json
{
  "IsPrint": false,
  "data": {
    "log_id": "5636805825537214258",
    "action_rule": {
      "pos_1": [],
      "pos_2": [],
      "pos_3": []
    }
  },
  "action_rule": {
    "pos_1": [],
    "pos_2": [],
    "pos_3": []
  },
  "pos_1": [],
  "pos_2": [],
  "pos_3": [],
  "log_id": "5636805825537214258",
  "errmsg": "ok",
  "errno": 0
}
```

data2

```json
{
  "IsPrint": false,
  "data": {
    "log_id": "5636805825537214255",
    "action_rule": {
      "pos_1": [],
      "pos_2": [],
      "pos_3": []
    }
  },
  "action_rule": {
    "pos_1": [],
    "pos_2": [],
    "pos_3": []
  },
  "pos_1": [],
  "pos_2": [],
  "pos_3": [],
  "log_id": "5636805825537214256",
  "errmsg": "ok",
  "errno": 0
}
```

```shell
diffjs -c path ./data1.json ./data2.json key value1 value2
```

output ./result.json

```json
{
  "data": {
    "log_id": {
      "diff": "inconsistent value!",
      "value1": "5636805825537214258",
      "value2": "5636805825537214255"
    }
  },
  "log_id": {
    "diff": "inconsistent value!",
    "value1": "5636805825537214258",
    "value2": "5636805825537214256"
  }
}
```
