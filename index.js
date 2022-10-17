import express from 'express'
import morgan from 'morgan'
import fs from 'fs'

import httpProxy from 'http-proxy'

export const  proxyPort = 4003
let url = `http://localhost:80`
// httpProxy.createProxyServer({target:url}).listen(proxyPort)
// https://web.archive.org/web/20120509175116/http://blog.nodejitsu.com/http-proxy-middleware
const logger = function() {    
  // This will only run once
  var logFile = fs.createWriteStream('./requests.log');

  return function (request, response, next) { 
    // This will run on each request.
    logFile.write(JSON.stringify(request.headers, true, 2));
    next();
    logFile.write(JSON.stringify(response))
  }
}

httpProxy.createServer(
  logger(), // <-- Here is all the magic
  {
    hostnameOnly: true,
    router: {
     'postman-parser.jeyserhiro.repl.co' : `http://localhost:80`, 
    },
   target:url
  }
).listen(proxyPort);

console.debug('proxy created @ ',proxyPort)

const app = express();

app.use(
  morgan(
    "[:date[iso]] Started :method :url for :remote-addr",
    {
      immediate: true
    }
  )
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => {
  res.json({ "message": "server is running" })
})

app.listen(80, () => console.log("server has started on " + 80))

export default app
