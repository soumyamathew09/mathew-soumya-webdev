var app = require('../../express');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
var widgetModel = require('../model/widget/widget.model.server');

app.get('/api/assignment/page/:pageId/widget',findAllWidgetsForPage);
app.post('/api/assignment/page/:pageId/widget',createWidget);
app.get('/api/assignment/widget/:widgetId',findWidgetById);
app.put('/api/assignment/widget/:widgetId',updateWidget);
app.delete('/api/assignment/page/:pageId/widget/:widgetId',deleteWidget);
app.post ('/api/assignment/upload', upload.single('myFile'), uploadImage);
app.put('/api/assignment/page/:pageId/widget', sortWidget);


function findAllWidgetsForPage(req,res) {
    var pageId = req.params['pageId'];
    return widgetModel.findAllWidgetsForPage(pageId)
        .then(function (results) {
            res.json(results);
            return;
        });
}

function createWidget(req,res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    return widgetModel.createWidget(pageId,widget)
        .then(function (w) {
            res.send(w);
            return;
        });
}

function findWidgetById(req,res){
    var widgetId = req.params['widgetId'];
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.send(widget);
            return;
        });
}

function updateWidget(req,res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    return widgetModel.updateWidget(widgetId,widget)
        .then(function () {
            res.sendStatus(200);
            return;
        });
}


function deleteWidget(req,res) {
    var widgetId = req.params['widgetId'];
    var pageId = req.params['pageId'];

    return widgetModel.deleteWidget(pageId,widgetId)
        .then(function () {
            res.sendStatus(200);
            return;
        });

}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;


    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    if(myFile !== undefined) {
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var callbackUrl = "/assignment/#!/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
        var url = '/assignment/uploads/' + filename;
        return updateWidgetById(widgetId,url)
            .then(function () {
                res.redirect(callbackUrl);
            });
    }
    else{
        res.sendStatus(404);
    }
}


function updateWidgetById(widgetId,url) {
    return widgetModel.findWidgetById(widgetId)
        .then(
            function (widget) {
                widget.url = url;
                return widget.save();
            }
        );
}

function sortWidget(req,res) {
    var initial = req.query['initial'];
    var final = req.query['final'];
    var pageId = req.params['pageId'];
    return widgetModel.reorderWidget(pageId,initial,final)
        .then(function () {
            res.sendStatus(200);
            return;
        });


}