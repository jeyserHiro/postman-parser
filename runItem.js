import Channel from '@nodeguy/channel'
import newman from 'newman'
import sdk from 'postman-collection'
import myCollection from './myCollection.js'

const {Item, Collection} = sdk

export async function getRequest(runningInstance) {
    const channel = Channel()

    let response = {}

    runningInstance().on('request', function (error, data) {
        if (error) {
            response.error = error
            console.error(error)
        } else {
            let content = data.response.stream.toString()
            console.log(content)
            response.body = JSON.parse(content)
        }
        // channel.push('done') // both works
        channel.close()
    })

    await channel.shift()
    return response
}

export async function runItem(item) {
    let collection = new Collection(item)
    return () =>
        newman.run(
            {
                collection, //object or string
                // environment:'',//export env path or object
                // globals:{},
                // envVar:{} //arr or object override or pass enviroment variables
                // timeoutRequest:5000,
                timeoutScript: 4000, //between req
                reporters: 'cli', //['htmlextra', 'csv','cli'],
                iterationCount: 10,
                color: true,
            },
            err => {
                if (err) {
                    throw err
                }
                console.log('collection run complete!')
            },
        )
}

const item = myCollection.items.members[0]
const runInst = await runItem(item)
getRequest(runInst)
