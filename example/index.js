import React from 'react'
import ReactDOM from 'react-dom'
import ContentEditable from 'react-contenteditable-pattern'

const reg = new RegExp(/\{([^ ]*?)\}/gi)

ReactDOM.render(
  <ContentEditable
    onSubmit={(value) => {}}
    onChange={(value) => {}}
    value={'I want to buy {product} from {store}'}
    placeholder='Enter your text here'
    formatValue={(value) => {
      return value.replace(reg, (match, text) => {
        return `<span>{${text}}</span>`
      })
    }}
  />
, document.getElementById('root'))