module.exports = function createFluentObject (obj, customCreator) {
  if (typeof obj === 'undefined') obj = {}

  return new Proxy(obj, {
    get (target, key) {
      if (typeof target[key] === 'undefined') {
        var newObject = typeof customCreator === 'function'
          ? customCreator()
          : {}
        target[key] = createFluentObject(newObject, customCreator)
      } 
      return target[key]
    }
  })
}
