# fluent-object

You should know what will happen:

```js
const obj = {}
obj.a.b.c.d = 'hi'
```

## Uncaught TypeError: Cannot read property 'b' of undefined

This simple script can help you to create a `fluent object`

`npm install fluent-object`

```js
import createFluentObject from 'fluent-object'

const obj = createFluentObject()
obj.a.b.c.d = 'hi'
```

now you have an object like this:

```js
obj = {
  a: {
    b: {
      c: {
        d: 'hi'
      }
    }
  }
}
```

in fact, the `obj` is a [Proxy](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy), and all of its object children (a, b, c) are Proxies.

## API

**`createFluentObject([object[, customCreator])`**

```js
import createFluentObject from 'fluent-object'

const obj1 = createFluentObject({ foo: 'bar' })
obj1.auto.extend.att = 'hello'
obj1.another.att = 100

// now obj1 = 
{
  foo: 'bar',
  auto: {
    extend: {
      att: 'hello'
    }
  },
  another: {
    att: 100
  }
}
```

note: the original object attributes of your target object will not be convert to proxies.

```js
const obj2 = createFluentObject({
  foo: {
    bar: 'hihihi'
  }
})

obj2.foo.a.b // Cannot read property 'b' of undefined

```

`customCreator` is a function that will be used to create a new extended objects
**`customCreator(): object`**

```js
const obj3 = createFluentObject({}, () => {
  return { foo: 'bar' }
})

obj3.a.b.c = true

// now obj3 =
{
  a: {
    foo: 'bar',
    b: {
      foo: 'bar',
      c: true
    }
  }
}

// auto attach method
const obj4 = createFluentObject({}, () => {
  return {
    sayHi () {
      console.log('hi')
    }
  }
})

obj4.a.b.sayHi()
// => hi

```

### Browser Support

https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy#Browser_compatibility

proxy polyfill for older browsers: https://github.com/GoogleChrome/proxy-polyfill
