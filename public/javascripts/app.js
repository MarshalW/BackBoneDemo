$(document).ready(function () {
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
        },
        initialize:function (model) {
            this.model = model;
            this.render();
        }
    });

    var ToolBar = Backbone.Collection.extend({
        model:ToolBarItem,
        initialize:function () {
            this.on('add',function(item){
                new ToolBarItemView(item);
            });
        }
    });


    var toolBar = new ToolBar();

    toolBar.add(new ToolBarItem('文字'));
    toolBar.add(new ToolBarItem('图片'));
    toolBar.add(new ToolBarItem('保存'));
});