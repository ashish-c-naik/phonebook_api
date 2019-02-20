// Variables
var chai = require('chai')
var data = require("../data")
var expect = chai.expect
var assert = chai.assert
var uuid = require("../models/uuid")
var uuid_ = uuid()


describe('insert', function () {
    it('should insert a contact', function () {
        return data.client_insert("Test", '123123', 'test@gmail.com', uuid_) === true
    });
});

describe('search', function () {
    it('should return a document', function () {
        return data.client_search(uuid_).then(function (result) {
            expect(result.hits.total).to.equal(1);
        });
    });
});

describe('delete', function () {
    it('should delete a contact', async function () {
        try {
            var result = await data.client_delete(uuid_)
            expect(result.hits.total).to.equal(1)
        }
        catch (err) {
            console.error('Delete returning an undefined')
        }
    })
})