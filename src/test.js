import React from 'react'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import wrapIf, {ifThenWrap} from './'

Enzyme.configure({adapter: new Adapter()})

const Wrapper = (props) => <div className='wrapper' {...props}>{props.children}</div>
const Child = () => <div className='child' />

describe('ifThenWrap(predicate)', () => {
  it('should return a function', () => {
    expect(typeof ifThenWrap()).toBe('function')
  })
})

describe('ifThenWrap(predicate)(Wrapper)', () => {
  it('should return a function', () => {
    expect(typeof ifThenWrap()()).toBe('function')
  })
})

describe('ifThenWrap(predicate)(Wrapper)(elemOrFunction)', () => {
  it('should return a function', () => {
    expect(typeof ifThenWrap()()()).toBe('function')
  })

  it('should wrap the child if predicate is true', () => {
    const Elem = ifThenWrap(true)(Wrapper)(<Child />)
    const rendered = mount(<Elem />)
    expect(rendered.find('.wrapper')).toHaveLength(1)
    expect(rendered.find('.child')).toHaveLength(1)
  })

  it('should wrap the child if predicate is truthy', () => {
    const Elem = ifThenWrap('a string')(Wrapper)(<Child />)
    const rendered = mount(<Elem />)
    expect(rendered.find('.wrapper')).toHaveLength(1)
    expect(rendered.find('.child')).toHaveLength(1)
  })

  it('should NOT wrap the child if predicate is false', () => {
    const Elem = ifThenWrap(false)(Wrapper)(<Child />)
    const rendered = mount(<Elem />)
    expect(rendered.find('.wrapper')).toHaveLength(0)
    expect(rendered.find('.child')).toHaveLength(1)
  })

  it('should NOT wrap the child if predicate is falsy', () => {
    const Elem = ifThenWrap(false)(Wrapper)(<Child />)
    const rendered = mount(<Elem />)
    expect(rendered.find('.wrapper')).toHaveLength(0)
    expect(rendered.find('.child')).toHaveLength(1)
  })

  it('should allow elem to be a function', () => {
    const Elem = ifThenWrap(true)(Wrapper)(() => <Child />)
    const rendered = mount(<Elem />)
    expect(rendered.find('.child')).toHaveLength(1)
  })

  it('should allow elem to be React component reference', () => {
    const Elem = ifThenWrap(true)(Wrapper)(Child)
    const rendered = mount(<Elem />)
    expect(rendered.find('.child')).toHaveLength(1)
  })

  it('should pass down props to Wrapper', () => {
    const Elem = ifThenWrap(true)(Wrapper)(<Child />)
    const rendered = mount(<Elem foo='bar' />)
    expect(rendered.find('.wrapper').props().foo).toBe('bar')
  })
})

describe('wrapIf(predicate)', () => {
  it('should return a function', () => {
    expect(typeof wrapIf()).toBe('function')
  })
})

describe('wrapIf(predicate)(Wrapper)', () => {
  it('should return a function', () => {
    expect(typeof wrapIf()()).toBe('function')
  })
})

describe('wrapIf(predicate)(Wrapper)(elemOrFunction)', () => {
  it('should return a function', () => {
    expect(typeof wrapIf()()()).toBe('function')
  })

  it('should wrap the child if predicate is true', () => {
    const Elem = wrapIf(Wrapper)(<Child />)(true)
    const rendered = mount(<Elem />)
    expect(rendered.find('.wrapper')).toHaveLength(1)
    expect(rendered.find('.child')).toHaveLength(1)
  })

  it('should wrap the child if predicate is truthy', () => {
    const Elem = wrapIf(Wrapper)(<Child />)('a string')
    const rendered = mount(<Elem />)
    expect(rendered.find('.wrapper')).toHaveLength(1)
    expect(rendered.find('.child')).toHaveLength(1)
  })

  it('should NOT wrap the child if predicate is false', () => {
    const Elem = wrapIf(Wrapper)(<Child />)(false)
    const rendered = mount(<Elem />)
    expect(rendered.find('.wrapper')).toHaveLength(0)
    expect(rendered.find('.child')).toHaveLength(1)
  })

  it('should NOT wrap the child if predicate is falsy', () => {
    const Elem = wrapIf(Wrapper)(<Child />)(false)
    const rendered = mount(<Elem />)
    expect(rendered.find('.wrapper')).toHaveLength(0)
    expect(rendered.find('.child')).toHaveLength(1)
  })

  it('should allow elem to be a function', () => {
    const Elem = wrapIf(Wrapper)(() => <Child />)(true)
    const rendered = mount(<Elem />)
    expect(rendered.find('.child')).toHaveLength(1)
  })

  it('should allow elem to be React component reference', () => {
    const Elem = wrapIf(Wrapper)(Child)(true)
    const rendered = mount(<Elem />)
    expect(rendered.find('.child')).toHaveLength(1)
  })

  it('should pass down props to Wrapper', () => {
    const Elem = wrapIf(Wrapper)(Child)(true)
    const rendered = mount(<Elem foo='bar' />)
    expect(rendered.find('.wrapper').props().foo).toBe('bar')
  })
})
