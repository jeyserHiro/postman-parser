import fs from 'fs'
import parseCollection from './parseCollection.js'

let file_ = 'sample-test.collection.json'
const myCollection = parseCollection(file_)

export default myCollection
