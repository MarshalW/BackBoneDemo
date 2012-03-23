$(document).ready(function () {
    var ToolBarItem = Backbone.Model.extend({
        initialize:function (title) {
            this.title = title;
        }
    });

    var ToolBarItemView = Backbone.View.extend({
        render:function () {
            $('<button class="toolBarItem">' + this.model.title + '</button>').appendTo($('#toolBar'));
            return this;
        },
        events:{
            "click":"action"
        },
        action:function () {
            console.log(model.title);
        },
        initialize:function (model) {
            this.model = model;
            this.render();
        }
    });

    var ToolBar = Backbone.Collection.extend({
        model:ToolBarItem
    });

    var ToolBarView = Backbone.View.extend({
        el:$('#workSpace'),
        render:function () {
            $(this.el).empty();
            $('<div class="toolBar" id="toolBar"></div>').appendTo($(this.el));
        },
        initialize:function (model) {
            this.model = model;
            this.render();

            this.model.on('add', function (item) {
                new ToolBarItemView(item);
            });
        }
    });

    var toolBar = new ToolBar();
    var toolBarView = new ToolBarView(toolBar);

    toolBar.add(new ToolBarItem('文字'));
    toolBar.add(new ToolBarItem('图片'));
    toolBar.add(new ToolBarItem('保存'));
});