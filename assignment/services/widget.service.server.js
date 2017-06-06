var app = require('../../express');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.get('/api/assignment/page/:pageId/widget',findAllWidgetsForPage);
app.post('/api/assignment/page/:pageId/widget',createWidget);
app.get('/api/assignment/widget/:widgetId',findWidgetById);
app.put('/api/assignment/widget/:widgetId',updateWidget);
app.delete('/api/assignment/widget/:widgetId',deleteWidget);
app.post ('/api/assignment/upload', upload.single('myFile'), uploadImage);
app.put('/api/assignment/page/:pageId/widget', sortWidget);

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function findAllWidgetsForPage(req,res) {
    var pageId = req.params['pageId'];
    var results = [];
    for(w in widgets){
        if(widgets[w].pageId === pageId) {
            results.push(widgets[w]);
        }
    }
    res.json(results);
    return;
}

function createWidget(req,res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    widget._id = (new Date().getTime()) + "";
    widget.pageId = pageId;
    widgets.push(widget);
    res.send(widget._id);
    return;
}

function findWidgetById(req,res){
    var widgetId = req.params['widgetId'];
    for (w in widgets){
        if(widgets[w]._id === widgetId){
            res.send(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);

}

function updateWidget(req,res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    for (w in widgets){
        if(widgets[w]._id === widgetId){
            if (widgets[w].widgetType === 'HEADING') {

                widgets[w].size = parseInt(widget.size);
            }
            else if (widget.widgetType === 'IMAGE' || widget.widgetType === 'YOUTUBE') {

                widgets[w].width = widget.width;
                widgets[w].url = widget.url;
            }
            widgets[w].text = widget.text;
            widgets[w].name = widget.name;
            widgets[w].description = widget.description;

            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(400);
}


function deleteWidget(req,res) {
    var widgetId = req.params['widgetId'];

    for (w in widgets){
        if(widgets[w]._id === widgetId){
            widgets.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
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

        widget = getWidgetById(widgetId);
        widget.url = '/assignment/uploads/' + filename;

        var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

        res.redirect(callbackUrl);
    }
    else{
        res.sendStatus(404);
    }
}


function getWidgetById(widgetId) {
    for (w in widgets){
        if(widgets[w]._id === widgetId){
            return widgets[w];
        }
    }
    return null;
}

function sortWidget(req,res) {
    var initial = req.query['initial'];
    var final = req.query['final'];
    if(initial && final){
        var widget = widgets[initial];
        var arrayClone = widgets.slice();
        arrayClone.splice(initial,1);
        arrayClone.splice(final,0,widget);

        widgets = arrayClone;
        res.sendStatus(200);
        return;
    }
    res.sendStatus(404);
}