import myCollection from './myCollection.js'
import sdk from 'postman-collection'
import pmEncoder from 'postman-url-encoder'

const { Collection, Item, ItemGroup } = sdk

function generateConfigMap(collection, env = {}, customVars = {}) {
  if (!Collection.isCollection(collection)) {
    throw 'not a valid collection'
  }

  let configMap = {}

  collection.variables.members.forEach(({ type, value, key }) => {
    configMap[key] = value
  })

  return { ...configMap, ...env, ...customVars } //priorities env can be global !
}

// docker container - server - proxyInterceptor // sessions -> flows

function extractRequest(item) {
  if (!Item.isItem(item)) {
    throw 'not a valid item'
  }

  const retVal = {}

  const { request } = item

  retVal.headers = request.headers.members.map(header_ => {
    let { key, value } = header_
    const retVal = {}
    retVal[key] = value
    return retVal
  })

  retVal.method = request.method
  retVal.body = request.body

  const urlObj = pmEncoder.toNodeUrl(request.url, false)
  retVal.url = urlObj.href

  return retVal
}

let configMap = generateConfigMap(myCollection)
// console.log(configMap)

myCollection.items.each(item => {
  if (ItemGroup.isItemGroup(item)) {
    return
  }
  let request_ = extractRequest(item)
  console.log(request_)
})
