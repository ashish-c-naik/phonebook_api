const elasticsearch = require('elasticsearch');
var contact_model = require('./models/contact')


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

// client.index({
//     index: 'eai_api',
//     type: 'contact',
//     body: {
//         name:"Raj",
//         "telephone": 1231234,
//         "email": "raj@gmail.com"
//     }
// }, function(err, resp, status) {
//     console.log(resp);
// });
  
// app.post('/delete', async function(req, res) {
//     console.log(req.query['q'])
//     var body = {
//         query: {
//             match: {
//                 "name": req.query['q']
//             }
//           }
//     }
//     await client.deleteByQuery({
//         index: 'eai_api',
//         type:'contact',
//         body: body
//     })
//     .then(results => {
//         res.send(results.hits.hits);
//      })
//       .catch(err=>{
//         console.log(err)
//         res.send([]);
//     });
// })
var client_search = function(name) {
    let body = {
        size: 200,
        from: 0, 
        query: {
          match: {
              "name": name
          }
        }
      }
    return client.search({
        index:'eai_api',
        body:body,
        type:'contact'
    })
}

var client_index = function (name) {
    var body = contact_model(name)
    if(body) {
        return client.index({
            index: 'eai_api',
            type: 'contact',
            body: body
        })
    } else {
        return false
    }
    
}

var client_update = function (name){
    var body = {
        query: {
            match: {
                "name": name
            }
          }
    }
    client.updateByQuery({
        index: 'eai_api',
        type:'contact',
        body: body
    })
}

var client_delete = async function (name) {
    var body = {
        query: {
            match: {
                "name": name
            }
          }
    }
    await client.deleteByQuery({
        index: 'eai_api',
        type:'contact',
        body: body
    })
}
module.exports = {client_search, client_index, client_update, client_delete}
