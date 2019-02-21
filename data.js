const elasticsearch = require('elasticsearch');
var contact_model = require('./models/contact')
var uuid = require('./models/uuid')
var request = require('request')

// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
    hosts: ['http://localhost:9200']
});

// Create eai_api index to add documents to
client.indices.create({
    index: 'eai_api'
}, function(error, response, status) {
    if (error) {
        console.log("The index already exists");
    } else {
        console.log("created a new index", response);
    }
});

// Searches all the documents with the input parameters
var client_search_all = function (pageSize, page, query) {
    query = query === '' ? {} : query
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

// Searches the index eai_api for the documents
// with the given uuid
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

// Creates a document in the index eai_api 
// With name, telephone and email information
// Makes a recurrsive call back to itself if 
// the uuid is already taken by some other document
var client_insert = function (name, telephone, email, uuid = null) {
    if (uuid === null)
        var body = contact_model(name, telephone, email)
    else
        var body = {
            uuid: uuid,
            name: name,
            telephone: telephone,
            email: email
        }

    if (body) {
        client_search(body.uuid)
            .then(results => {
                if (results.hits.total !== 0) {
                    return client_insert(name, telephone, email)
                } else {
                    return client.index({
                        index: 'eai_api',
                        type: 'contact',
                        body: body
                    })
                }
            })
            .catch(err => {
                res.send([{ "error": "Connection problem" }]);
            });
    } else {
        return false
    }
}

// Used curl operation
var client_update = async function (uuid, name, telephone, email) {
    var _id = ''
    await client_search(uuid)
        .then(result => {
            _id = result.hits.hits[0]._id
        })
    if (telephone === '' || email === '' || name === '' || _id === '') {
        return false
    }
    // Used the http-request to perform a curl operation
    request({
        uri: "http://localhost:9200/eai_api/contact/" + _id + "/_update",
        method: "POST",
        json: {
            "doc": {
                name: name,
                telephone: telephone,
                email: email
            }
        }
    });
    return true
}

// Deletes the contact with the provided uuid
var client_delete = async function (uuid) {
    var body = {
        query: {
            match: {
                "uuid": uuid
            }
        }
    }
    var result = await client.deleteByQuery({
        index: 'eai_api',
        type: 'contact',
        body: body
    })
    result
        .then(results => {
            return true
        })
        .catch(err => {
            return false
        });
}

// export the functions 
module.exports = { client_search, client_insert, client_update, client_delete, client_search_all }
