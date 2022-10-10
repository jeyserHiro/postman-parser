import express from 'express'
import morgan from 'morgan'

import httpProxy from 'http-proxy'

export const  proxyPort = 4003
let url = `http://localhost:80`
httpProxy.createProxyServer({target:url}).listen(proxyPort)

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
