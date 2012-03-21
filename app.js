/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , ItemProvider = require('./modules/ItemProvider').ItemProvider;

var app = module.exports = express.createServer();
var itemProvider = new ItemProvider('localhost', 27017);

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

app.post('/items', function (req, res) {
    console.log(req.body.title);

//    var base64Data = req.body.imgData.replace(/^data:image\/png;base64,/, "");
//    var binaryData = new Buffer(base64Data, 'base64').toString('binary');
//
//    require('fs').writeFile('out.png', binaryData, 'binary', function (err) {
//        if (err) {
//            console.log(err);
//        }
//    });

    itemProvider.save(req.body,function(item){
       console.log('save to mongodb:'+item._id);
    });

    res.send('saved.');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
