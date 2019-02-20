// Variables and imports
var contact_model = require('./models/contact.js')
var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var auth = require('./auth')
var elastic = require('./data')

app.use(cors())
app.use(bodyParser.json())


// API endpoint to get the records based on the paramters
// of pageSize, page and query
app.get('/contact', function(req, res) {
    var pageSize = req.query['pageSize'] == null ? 200 : req.query['pageSize']
    var page = req.query['page'] == null ? 0 : req.query['page']
    var query = req.query['query'] ? '' : req.query['query']
    elastic.client_search_all(pageSize, page, query)
        .then(results => {
            res.send({"results":results.hits.hits});
        })
        .catch(err => {
            res.send([{"error":"No results"}]);
        });
})

// Get records according to uuid 
app.get('/contact/:param', function (req, res) {
    elastic.client_search(req.params.param)
        .then(results => {
            res.send({"results":results.hits.hits});
        })
        .catch(err => {
            res.send([{"error":"No such contact found"}]);
        });
})

// Setting up the express router and listening to port
app.use(auth.router)
app.listen(process.env.PORT || 3000)