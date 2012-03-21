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

    var ItemView = Backbone.View.extend({
        el:$('#itemContent'),
        template:$('#item-modify-tmpl').template(),

        events:{
            'change .itemTitle':'changeTitle',
            'click .submit':'save'
        },

        changeTitle:function () {
            this.model.set('title', ($(this.el).find('.itemTitle').first().val()));
        },

        save:function(){
          this.model.save();
        },

        render:function () {
            console.log('render');
            $.tmpl(this.template, this.model).appendTo(this.el);
            return this;
        }
    });

    var itemView = new ItemView;
    itemView.model = item;
    itemView.render();
});