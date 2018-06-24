import React from 'react'

const unwrapFn = (elemOrFn) => typeof elemOrFn === 'function' ? elemOrFn() : elemOrFn

const wrap = Wrapper => elem => props => <Wrapper {...props} children={elem} />

const conditionalWrap = (p, wrapper, elemOrFn) => p ? wrap(wrapper)(unwrapFn(elemOrFn)) : () => unwrapFn(elemOrFn)

const ifThenWrap = (predicate) => (wrapper) => (elemOrFn) => conditionalWrap(predicate, wrapper, elemOrFn)

const wrapIf = (wrapper) => (elemOrFn) => (predicate) => conditionalWrap(predicate, wrapper, elemOrFn)

export default wrapIf

export {
  ifThenWrap,
  wrapIf
}
