# eai_api
Nodejs, Express, ElasticSearch

## How to run

Install node and use command `node index.js` then you could use postman to test the API. 

## Note

The uuid is automatically generated and is manually checked for uniqueness.


## How to use

Request | Usage | Description
--------|-------|-----------
GET | [hostname]/contact?pageSize=[integerValue]&page=[integerValue]&query=[queryString] | optional parameters = {pageSize, page, query}
GET | [hostname]/contact/[uuid] | required parameters = {uuid}
PUT | [hostname]/contact/[uuid]?name=[nameString]&telephone=[telephoneString]&email=[emailString] | required parameters = {uuid, name, telephone, email}
DELETE | [hostname]/contact/[uuid] | required parameters = {uuid}
POST | [hostname]/contact/ | -

