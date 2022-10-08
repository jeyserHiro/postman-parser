import fs from 'fs';
import Collection from 'postman-collection';


let filename = 'sample-test.collection.json'
let file1 = fs.readFileSync(filename).toString()
let jsonData = JSON.parse(file1)

// console.debug(jsonData)

let collection1 = new Collection.Collection(jsonData);

// log items at root level of the collection
// console.log(collection1)


let collectionName = collection1.name
let requests = []
let {variables} = collection1


console.log(variables)