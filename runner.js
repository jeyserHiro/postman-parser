import newman from 'newman'
import fs from 'fs'

import { SocksProxyAgent } from 'socks-proxy-agent';
import HttpProxyAgent from 'http-proxy-agent'

// const info = {
// 	hostname: 'br41.nordvpn.com',
// 	userId: 'your-name@gmail.com',
// 	password: 'abcdef12345124'
// };
// const agent = new SocksProxyAgent(info);


// let requestAgent = new SocksProxyAgent({ hostname: 'localhost', port: '4003' });
// let httpsAgent = new SocksProxyAgent('socks5://localhost:4003');


let proxyPort = 4003
let proxyUrl = `http://localhost:${proxyPort}`
let requestAgent = new HttpProxyAgent(proxyUrl)

let filename = 'sample-test.collection.json'
filename = 'Hypertest-Application.postman_collection.json'
filename = 'v2.1.json'
filename = 'testv2.1.json' //google
filename = 'postman-parser.json'

console.log('started runner')

//refer readmen https://github.com/postmanlabs/newman
newman.run({
  collection: filename, //object or string
  // environment:'',//export env path or object
  // globals:{},
  // envVar:{} //arr or object override or pass enviroment variables
  // timeoutRequest:5000,
  timeoutScript:4000, //between req
  reporters: 'cli', //['htmlextra', 'csv','cli'],
  iterationCount: 10,
  color: true,
  requestAgents: {
    http: requestAgent, // agent used for HTTP requests
    https: requestAgent, // agent used for HTTPS requests
  }
}, (err) => {
  if (err) { throw err; }
  console.log('collection run complete!')
})
console.log('end')

