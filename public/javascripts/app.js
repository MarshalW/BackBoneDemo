$(document).ready(function () {
    var app = {};
    _.extend(app, Backbone.Events);

    var ToolBarItem = Backbone.Model.extend({
        initialize:function (title) {
            this.title = title;
        }
    });

    var ToolBarItemView = Backbone.View.extend({
        className:'toolBarItem',
        tagName:'button',
        render:function () {
            $(this.el).appendTo('#toolBar');
            $(this.el).html(this.model.title);
            return this;
        },
        events:{
            'click':'action'
        },
        action:function (view) {
            console.log(this.model.title);
            app.trigger('toolBarItem', this.model.title);

        },
        initialize:function (model) {
            this.model = model;
            this.render();
        }
    });

    var ToolBar = Backbone.Collection.extend({
        model:ToolBarItem,
        initialize:function () {
            this.on('add', function (item) {
                var itemView = new ToolBarItemView(item);
            });
        }
    });

    var EditArea = Backbone.Collection.extend({
        initialize:function () {
            console.log('edit area');
            app.on('toolBarItem', function () {
                console.log('toolBar item');
            });
        }
    });

    var EditAreaView = Backbone.View.extend({
        el:$('#editArea'),
        initialize:function (model) {
            this.model = model;
            console.log('create edit area view');
        }
    });


    var toolBar = new ToolBar();

    toolBar.add(new ToolBarItem('文字'));
    toolBar.add(new ToolBarItem('图片'));
    toolBar.add(new ToolBarItem('保存'));

    var editArea = new EditArea();
    var editAreaView = new EditAreaView(editArea);
});