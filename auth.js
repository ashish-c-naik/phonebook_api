// Authorization is done here
// JWT tokens can be used to authorize the query before POST request
var express = require('express')
var router = express.Router()
var contact_model = require('./models/contact')
var elastic = require('./data')


router.post('/contact/:param', async function(req, res) {
    var name = req.params.param
    elastic.client_search(name)
    .then(results => {
        if(results.hits.total === 0){
            elastic.client_index(name)
            .then(results => {
                res.send("Created Successfully!");
                })
            .catch(err=>{
                console.log(err)
                res.send([]);
            });
        } else{
            console.log("Duplicate name found. Abort!")
            res.send([])
        }
    })
    
})

router.delete('/contact/:param', async function(req, res) {
    elastic.client_delete(req.params.param)
    .then(results => {
        res.send(results.hits.hits);
     })
      .catch(err=>{
        console.log(err)
        res.send([]);
    });
})
    

router.put('/contact/:param', (req, res) => {
    elastic.client_update(req.params.param)
    .then(results => {
        res.send(results.hits.hits);
     })
      .catch(err=>{
        console.log(err)
        res.send([]);
    });
})

// Usually contains the authentication flag along with router information
var auth = {router, checkAuthenticated: true}
module.exports = auth