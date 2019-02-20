// Variables and imports
var uuid = require('./uuid')

// exports the function of creating a contact JSON object 
// to be used while making a call to elasticsearch
module.exports = function (name, telephone, email) {
    if (name === "" || name === null || typeof telephone !== 'string' || 4 > telephone.length || telephone.length > 20) {
        return false;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (typeof email !== "string" || !re.test(email.toLowerCase())) {
        return false;
    }
    return {
        "uuid": uuid(),
        "name": name,
        "telephone": telephone,
        "email": email
    }
}
