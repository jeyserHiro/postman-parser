import myCollection from './myCollection.js'
import sdk from 'postman-collection'
import pmEncoder from 'postman-url-encoder'

const {Collection, Item} = sdk

function generateConfigMap(collection, env = {}, customVars = {}) {

    if (!Collection.isCollection(collection)) {
        throw 'not a valid collection'
    }

    let configMap = {}

    collection.variables.members.forEach(({type, value, key}) => {
        configMap[key] = value
    })

    return {...configMap, ...env, ...customVars} //priorities env can be global !
}

function extractRequest(item) {
    if (!Item.isItem(item)) {
        throw 'not a valid item'
    }

    const retVal = {}

    const {request} = item

    retVal.headers = request.headers.members
    retVal.method = request.method
    retVal.body = request.body

    const urlObj = pmEncoder.toNodeUrl(request.url)
    retVal.url = urlObj.href

    return retVal
}
