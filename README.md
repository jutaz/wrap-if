# wrap-if

> Conditional Element wrapping

[![NPM](https://img.shields.io/npm/v/wrap-if.svg)](https://www.npmjs.com/package/wrap-if) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save wrap-if
```

## Usage

There are 2 exported functions:

- `wrapIf(Wrapper)(elemOrFn)(predicate)`
- `ifThenWrap(predicate)(Wrapper)(elemOrFn)`

### `WrapIf`

This curried HoF allows for simpler and more declarative element wrapping. Instead of doing something like:
```jsx
import React, { Component } from 'react'
import {wrapIf} from 'wrap-if'

const Wrapper = (props) => <div className="wrapper">I wrap: {props.children}</div>
const Child = () => <div>I sometimes get wrapped</div>

class Example extends Component {
  render () {
    const shouldWrap = true;
    return (
      {shouldWrap ? (<Wrapper><Child /></Wrapper>) : (<Child />)}
    )
  }
}
```

One now can declare those components beforehand and then render later on without any of the inline code needed.

```jsx
import React, { Component } from 'react'
import {wrapIf} from 'wrap-if'

const Wrapper = (props) => <div className="wrapper">I wrap: {props.children}</div>
const maybeWrapped = wrapIf(Wrapper)(<div>I sometimes get wrapped</div>)

class Example extends Component {
  render () {
    const Wrapped = maybeWrapped(true);
    const NonWrapped = maybeWrapped(false);
    return (
      <Wrapped />
      <NonWrapped />
    )
  }
}
```

### `ifThenWrap`

This function is useful in cases where one would want to create their own Wrappers, but only conditionally.


## License

MIT © [jutaz](https://github.com/jutaz)
