/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , ItemProvider = require('./modules/ItemProvider').ItemProvider
    , ImageFileProvider = require('./modules/ImageFileProvider.js').ImageFileProvider;

var app = module.exports = express.createServer();
var itemProvider = new ItemProvider('localhost', 27017);
var fileProvider = new ImageFileProvider('localhost', 27017);

// Configuration

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/image', function (req, res) {
    console.log('get image');
    res.contentType('image/png');
    var fileId = req.param('fileId');
    fileProvider.read(fileId, function (data) {
        console.log('read data');
        res.send(data);
    });
});

app.post('/items', function (req, res) {
    console.log(req.body.title);

    var item = req.body;

    if (item.imgData.indexOf('data:image\/png;base64,') != -1) {
        console.log('base64 img');

        var base64Data = item.imgData.replace(/^data:image\/png;base64,/, "");
        var binaryData = new Buffer(base64Data, 'base64').toString('binary');

        console.log('>>>>data.length:' + binaryData.length);
        process.nextTick(function () {
            fileProvider.insert(binaryData, function (result) {
                console.log('file id:' + result._id);
                item.imgData = result._id;

                itemProvider.save(item, function (err, item) {
                    console.log('save to mongodb:' + item._id);
                });
            });
        });
    }
    res.send('saved.');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
