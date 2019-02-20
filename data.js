const elasticsearch = require('elasticsearch');
var contact_model = require('./models/contact')
var uuid = require('./models/uuid')

// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
    hosts: ['http://localhost:9200']
});

var client_search_all = function (pageSize, page, query) {
    let body = {
        size: pageSize,
        from: page,
        query: query
    }
    return client.search({
        index: 'eai_api',
        body: body,
        type: 'contact'
    })
}
var client_search = function (uuid) {
    let body = {
        size: 200,
        from: 0,
        query: {
            match: {
                "uuid": uuid
            }
        }
    }
    return client.search({
        index: 'eai_api',
        body: body,
        type: 'contact'
    })
}

var client_index = function (name, telephone, email) {
    var body = contact_model(name, telephone, email)
    console.log(body)
    if (body) {
        return client.index({
            index: 'eai_api',
            type: 'contact',
            body: body
        })
    } else {
        return false
    }

}

// var client_update = function (name) {
//     var uniqueId = uuid
//     var body = {
//         "script" : "uuid = 'uuid'"
//     }
//     client.update({
//         index: 'eai_api',
//         type: 'contact',
//         body: body
//     })
// }

var client_delete = async function (uuid) {
    var body = {
        query: {
            match: {
                "uuid": uuid
            }
        }
    }
    await client.deleteByQuery({
        index: 'eai_api',
        type: 'contact',
        body: body
    })
}
module.exports = { client_search, client_index, client_update, client_delete, client_search_all }
