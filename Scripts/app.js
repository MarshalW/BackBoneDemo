$(document).ready(function () {
    var Item = Backbone.Model.extend({
    });

    var item=new Item;
    item.title='stabilo彩色铅笔';
    item.price=24.50;

    var ItemView=Backbone.Model.extend({
        el:$('#itemContent'),
        template:$('#item-tmpl').template(),

        render:function(){
            console.log('render');
            $.tmpl(this.template,this.model).appendTo(this.el);
            return this;
        }
    });

    var itemView=new ItemView;
    itemView.model=item;
    itemView.render();
});