import newman from 'newman'
import fs from 'fs'

import SocksProxyAgent from 'socks-proxy-agent');

const requestAgent = new SocksProxyAgent({ host: 'localhost', port: '4003'});

let filename = 'sample-test.collection.json'
let file1 = fs.readFileSync(filename).toString()

newman.run({
  collection: file1,
  reporters: 'cli',
  color:true,
  requestAgents: {
        http: requestAgent, // agent used for HTTP requests
        https: requestAgent, // agent used for HTTPS requests
    }
}, (err) => {
  if (err) { throw err; }
  console.log('collection run complete!');
})