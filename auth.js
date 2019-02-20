// Authorization is done here
// JWT tokens can be used to authorize the query before POST request
var express = require('express')
var router = express.Router()
var contact_model = require('./models/contact')
var elastic = require('./data')


router.post('/contact', async function (req, res) {
    var name = req.query["name"];
    var telephone = req.query['telephone']
    var email = req.query['email']
    console.log(typeof name, typeof telephone, typeof email)
    var result = elastic.client_index(name, telephone, email)
    if (result) {
        result
            .then(results => {
                res.send("Created Successfully!");
            })
            .catch(err => {
                console.log(err)
                res.send([]);
            });
    } else {
        res.send([{"error": "Error in the values passed"}])
    }
})

router.delete('/contact/:param', async function (req, res) {
    elastic.client_delete(req.params.param)
        .then(results => {
            res.send(results.hits.hits);
        })
        .catch(err => {
            console.log(err)
            res.send([{"error": "Unable to delete."}]);
        });
})


// router.put('/contact/:param', (req, res) => {
//     elastic.client_update(req.params.param)
//         .then(results => {
//             res.send(results.hits.hits);
//         })
//         .catch(err => {
//             console.log(err)
//             res.send([{"error": "Unable to update."}]);
//         });
// })

// Usually contains the authentication flag along with router information
var auth = { router, checkAuthenticated: true }
module.exports = auth