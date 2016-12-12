const assert = require('assert')
const createFluentObject = require('./')

describe('Create fluent object', () => {
  it('should return an object', () => {
    const fluentObject = createFluentObject()
    assert.equal(typeof fluentObject, 'object')
  })

  it('should auto extend properties', () => {
    const fluentObject = createFluentObject()
    fluentObject.a.b.c.d.e = true
    assert.equal(fluentObject.a.b.c.d.e, true)

    fluentObject.a.b.foo.bar = 'test'
    assert.equal(fluentObject.a.b.foo.bar, 'test')

    fluentObject.a.b.foo.method = () => 'test'
    assert.equal(fluentObject.a.b.foo.method(), 'test')
  })

  it('should base on source object', () => {
    const fluentObject = createFluentObject({
      foo: 'bar',
      test: {
        inner: true
      }
    })
    assert.equal(fluentObject.foo, 'bar')
    assert.equal(fluentObject.test.inner, true)

    fluentObject.dynamic.extended.attr = true
    assert.equal(fluentObject.dynamic.extended.attr, true)
  })

  it('can be manipulated like a normal object', () => {
    const fluentObject = createFluentObject()
    fluentObject.foo.bar = 100
    fluentObject.foo.bar++
    assert.equal(fluentObject.foo.bar, 101)

    fluentObject.foo2.bar = 10 
    fluentObject.foo2.bar2 = 2 
    fluentObject.foo2.bar3 = fluentObject.foo2.bar * fluentObject.foo2.bar2
    assert.equal(fluentObject.foo2.bar3, 10 * 2)

    fluentObject.foo3.bar = 1
    fluentObject.foo3.bar = 'a'
    assert.equal(fluentObject.foo3.bar, 'a')
  })

  it('can be stringified to JSON', () => {
    const fluentObject = createFluentObject()
    fluentObject.a.b.c.d = 'foo'
    assert.equal(
      JSON.stringify(fluentObject),
      '{"a":{"b":{"c":{"d":"foo"}}}}'
    )
  })

  describe('Custom creator', () => {
    it('works ', () => {
      const fluentObject = createFluentObject({}, () => ({
        foo: 'bar'
      }))
      fluentObject.a.b.c.d = 'hello'
      assert.equal(fluentObject.a.foo, 'bar')
      assert.equal(fluentObject.a.b.foo, 'bar')
      assert.equal(fluentObject.a.b.c.foo, 'bar')
      assert.equal(fluentObject.a.b.c.d, 'hello')
    })

    it('can attach methods on extended object', () => {
      const fluentObject = createFluentObject({}, () => ({
        sayHi () {
          return 'hi'
        }
      }))
      fluentObject.a.b.c.d = 'hello'
      assert.equal(typeof fluentObject.a.sayHi, 'function')
      assert.equal(fluentObject.a.sayHi(), 'hi')
      assert.equal(typeof fluentObject.a.b.sayHi, 'function')
      assert.equal(fluentObject.a.b.sayHi(), 'hi')
      assert.equal(typeof fluentObject.a.b.c.sayHi, 'function')
      assert.equal(fluentObject.a.b.c.sayHi(), 'hi')
      assert.equal(fluentObject.a.b.c.d, 'hello')
    })
  })
})
