# React Content Editable

Markup patterns in a contenteditable field

![Screenshot](screenshot.jpg?raw=true "Screenshot")

## Install

````
npm install react-contenteditable-pattern

or

yarn add react-contenteditable-pattern
````

## Usage

The below code will replace all occurrences of `{text}` to `<span>{text}</span>`

````
import ContentEditable from 'react-contenteditable-pattern'

const reg = new RegExp(/\{([^ ]*?)\}/gi)

ReactDOM.render(
  <ContentEditable
    onSubmit={(value) => {}}
    onChange={(value) => {}}
    formatValue={(value) => {
      return value.replace(reg, (match, text) => {
        return `<span>{${text}}</span>`
      })
    }}
  />
, document.getElementById('root'))
````

### Add css to customize behavior

````
/**
 * Content Editable
 */
.ContentEditableWrapper {
  position: relative;
  width: 100%;
  border: 1px #ccc solid;
}
.ContentEditable-Fake {
  z-index: -1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: transparent;
  background: transparent;
}
.ContentEditableWrapper span {
  background-color: yellow;
}

.ContentEditable-Input:empty:before {
  content: attr(placeholder);
  cursor: text;
  display: block;
  color: rgba(0,0,0,.25);
}
````

Works with `redux-form`


````
import ContentEditable from 'react-contenteditable-pattern'

export const renderContentEdit = ({ input, label, meta: { touched, error }, ...custom }) => {
  return (
    <ContentEditable {...input} {...custom} />
  )
}

# And somewhere in redux form
<Field
  name='sentence'
  component={renderContentEdit}
  spellCheck={false}
/>
````