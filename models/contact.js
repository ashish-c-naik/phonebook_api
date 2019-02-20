module.exports = function (name) {
    // if (name === "" || name === null || typeof telephone !== 'number' || 0 > telephone.toString.length ||telephone.toString.length > 15){
    //     return false;
    // }
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (typeof email !== "string" || !re.test(email.toLowerCase())) {
    //     return false;
    // }
    if (name === "" || name === null){
        return false;
    }
    return {
        "name": name,
        "telephone": telephone,
        "email": email
    }
}