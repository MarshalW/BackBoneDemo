var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

ItemProvider = function (host, port) {
    this.db = new Db('backbone-demo', new Server(host, port, {auto_reconnect:true}, {}));
    this.db.open(function () {
    });
};

ItemProvider.prototype.getCollection = function (callback) {
    this.db.collection('items', function (error, collection) {
        if (error) callback(error);
        else callback(null, collection);
    });
};

ItemProvider.prototype.save = function (item, callback) {
    this.getCollection(function (error, collection) {
        if (error) callback(error)
        else {
            collection.insert(item, function () {
                callback(null,item);
            });
        }
    });
};

exports.ItemProvider = ItemProvider;