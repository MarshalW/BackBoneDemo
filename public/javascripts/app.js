$(document).ready(function () {
    var Item = Backbone.Model.extend({
        url:'/items'
    });

    var item = new Item();
    item.set(
        {
            'title':'stabilo彩色铅笔',
            price:12.4
        });

    $.ajax({
        url:'data.txt',
        success:function (data) {
            item.set('imgData', data);
        }
    });

    var ItemView = Backbone.View.extend({
        el:$('#itemContent'),
        template:$('#item-modify-tmpl').template(),

        initialize:function (model) {
            console.log('init item view.');
            this.model=model;
            var el=this.el;
            this.model.on('change:imgData',function(){
                $(el).find('#image')[0].src=model.get('imgData');
            });
        },

        events:{
            'change .itemTitle':'changeTitle',
            'click .submit':'save'
        },

        changeTitle:function () {
            this.model.set('title', ($(this.el).find('.itemTitle').first().val()));
        },

        save:function () {
            this.model.save();
        },

        render:function () {
            console.log('render');
            $.tmpl(this.template, this.model).appendTo(this.el);
            return this;
        }
    });

    var itemView = new ItemView(item);
    itemView.render();
});