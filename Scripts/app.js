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

    var ItemView = Backbone.Model.extend({
        el:$('#itemContent'),
        template:$('#item-tmpl').template(),

        render:function () {
            console.log('render');
            $.tmpl(this.template, this.model).appendTo(this.el);
            return this;
        }
    });

    item.save();

    var itemView = new ItemView;
    itemView.model = item;
    itemView.render();
});