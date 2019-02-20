var contact_model = require('./models/contact.js')
var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var auth = require('./auth')
var elastic = require('./data')

app.use(cors())
app.use(bodyParser.json())



app.get('/contact/:param', function (req, res){
elastic.client_search(req.params.param)
.then(results => {
    res.send(results.hits.hits);
    })
    .catch(err=>{
    console.log(err)
    res.send([]);
    });
})


app.use(auth.router)
app.listen(process.env.PORT || 3000)