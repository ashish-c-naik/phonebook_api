var uuid = require('./uuid')
module.exports = function (name, telephone, email) {
    if (name === "" || name === null || typeof telephone !== 'string' || 0 > telephone.length || telephone.length > 15) {
        return false;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (typeof email !== "string" || !re.test(email.toLowerCase())) {
        return false;
    }
    return {
        "uuid": uuid,
        "name": name,
        "telephone": telephone,
        "email": email
    }
}