var contact_model = require('./models/contact.js')
//data.js
//require the Elasticsearch librray
const elasticsearch = require('elasticsearch');
// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});

// Elastic search index
// client.indices.create({
//     index: 'eai_api'
// }, function(error, response, status) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("created a new index", response);
//     }
// });

// var model1 = contact_model("Ashish", "123123", "ashish@gmail.com")