# vision
> 可视化网页编辑器引擎

vision 是基于 React 的可视化网页编辑器开发框架，你可以在此基础上，快速、可靠地开发出自己的网页编辑器。

![](screen.gif)

## 特性

- 简单易用
- 高可扩展
- 高性能
- 无侵入
- 尺寸小（10 KB gziped）

## 安装

```sh
npm install @visionjs/core --save
```

## 使用

```javascript
import React, { useState } from 'react'
import { Editor, View, Data } from '@visionjs/core'
import Text from 'renderers/Text'

const defaultProps = (params) => (renderer) => ({ readonly, requestUpdateProps, props }) =>
    renderer({ readonly, requestUpdateProps, props: { ...params, ...props } })

//...
//my editor
() => {
  const [data, setData] = useState(new Data())

  return (
    <Editor data={data} onChange={setData}>
      <h1>
        <View id="title" render={defaultProps({ content: 'title' })(Text)} />
      </h1>
      <View
        id="description"
        render={defaultProps({ content: 'description' })(Text)}
      />
    </Editor>
  )
}
```

## 文档

文档参考：https://visionjs.netlify.com/

## 相关信息

qq 群: 730672328  

demo: https://build-wwevmcerlw.now.sh/

## License

Licensed under the MIT License, Copyright © 2018-present 陈雨童.