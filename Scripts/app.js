$(document).ready(function () {
    var Item = Backbone.Model.extend({
        url:'http://www.witmob.com'
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
            'change .itemTitle':'changeTitle'
        },

        changeTitle:function () {
            console.log('title before change:' + this.model.get('title'));
            this.model.set('title', ($(this.el).find('.itemTitle').first().val()));
            console.log('title after change:' + this.model.get('title'));
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

    var ItemShowView = Backbone.View.extend({
        el:$('#itemShowContent'),
        template:$('#item-show-tmpl').template(),

        render:function () {
            $(this.el).empty();
            $.tmpl(this.template, this.model).appendTo(this.el);
            return this;
        }
    });

    var itemShowView=new ItemShowView;
    itemShowView.model=item;
    itemShowView.render();

    item.on('change',function(){
        itemShowView.render();
    });
});