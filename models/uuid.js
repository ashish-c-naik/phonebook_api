// Export the function that generates uuid
module.exports = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
}