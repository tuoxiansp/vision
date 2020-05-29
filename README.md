# vision

> A framework to create the WYSIWYG Web Page Editor of yours.

Vision is a web builder framework based on React. You can develop your own productive-ready web builder quickly. Unlike most web builder framework, you can expand vision with pure react. It's crazy simple, all you need to do is writing react component.

![](screen.gif)

## Features

- crazy simple
- fully customizable
- high performance
- non invasive
- undo/redo were ready
- only 10 KB gziped

## Install

```sh
npm install @visionjs/core --save
```

## Usage

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

## Documentation

https://visionjs.netlify.com/

## Demo

https://example-landing-vision.netlify.com/

## Contact to author

*QQ-Group: 730672328*  

*email: b1ncer@foxmail.com*

## License

Licensed under the MIT License, Copyright © 2018-present tuoxiansp.
