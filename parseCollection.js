import fs from 'fs'
import Collection from 'postman-collection'

/**
 * @typedef {parseCollection}
 * @property {Function} [done]
 * @property {Function} [error]
 * @property {Function} [success]
 */

/**
 * @constructor
 *
 * @param {Object|String|Buffer} [file] -
 * @returns {Object}
 */
export default function parseCollection(file) {
  let data = fs.readFileSync(file)

  let jsonData = JSON.parse(data)

  const myCollection = new Collection.Collection(jsonData)
  return myCollection
}

// log items at root level of the collection
// console.log(collection1)

function main() {
  let filename = 'postman-parser.json'
  const myCollection = parseCollection(filename)
  console.log(myCollection)
}

// main()
