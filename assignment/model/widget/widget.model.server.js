var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server')

var widgetModel = mongoose.model('WidgetModel',widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;


function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.find({_page:pageId})
        .then(function (widgets) {
            widget.index =  widgets.length;
            return widgetModel.create(widget)
                .then(function (widget) {
                    return pageModel.addWidget(pageId,widget)
                        .then(function () {
                            return widget._id;
                        });
                });
        });

}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page:pageId}).sort( { index: 1 } );
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id:widgetId},{$set :widget});
}

function deleteWidget(pageId,widgetId) {
    return widgetModel.remove({_id:widgetId})
        .then(function () {
            return pageModel.deleteWidget(pageId,widgetId);
        })
}

function reorderWidget(pageId, start, end) {
    return widgetModel.find({_page:pageId})
                .then(function (widgets) {
                    for (var w=0; w < widgets.length; w++){
                        if (widgets[w].index == start) {
                            widgets[w].index = end;
                            widgets[w].save();
                        }
                        else
                             if(end > start){
                                if(widgets[w].index <= end && widgets[w].index > start){
                                    widgets[w].index = widgets[w].index -1;
                                    widgets[w].save();
                                }
                        }
                        else
                            if(end< start){
                                if(widgets[w].index >= end && widgets[w].index <start ){
                                    widgets[w].index = widgets[w].index + 1;
                                    widgets[w].save();
                                }
                            }
                        }
                });
}