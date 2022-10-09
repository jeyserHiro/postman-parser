import newman from 'newman'
import fs from 'fs'

import { SocksProxyAgent } from 'socks-proxy-agent';

const info = {
	hostname: 'br41.nordvpn.com',
	userId: 'your-name@gmail.com',
	password: 'abcdef12345124'
};
const agent = new SocksProxyAgent(info);

const requestAgent = new SocksProxyAgent({ hostname: 'localhost', port: '4003'});

let filename = 'sample-test.collection.json'
filename = 'Hypertest-Application.postman_collection.json'

let file1 = fs.readFileSync(filename)

console.debug("going to run.....")
newman.run({
  collection: file1,
  reporters: 'cli', //['htmlextra', 'csv','cli'],
  iterationCount:10,
  color:true,
  requestAgents: {
        http: requestAgent, // agent used for HTTP requests
        https: requestAgent, // agent used for HTTPS requests
  }
}, (err) => {
  if (err) { throw err; }
  console.log('collection run complete!');
})