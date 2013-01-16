define('jobs/blocks', function(require, exports, module) {
	var $ = require('$'),
    backbone = require('backbone'),
    model = require('class/hercules-model'),
    dialog = require('dialog');
    
    var blocks = new dialog({
        classPrefix:'blocks',
        content:'<div class="btn-group">\
                    <button action-type="text" class="btn btn-large" type="button"><i class="icon-font"></i> TEXT</button>\
                    <button action-type="image" class="btn btn-large" type="button"><i class="icon-picture"></i> IMAGE</button>\
                </div>'
    });
    //先渲染出浮出层
    blocks.render();
    //给其内部增加view处理
    var blockView = backbone.View.extend({
        el:'.blocks',
        events:{
            'click [action-type=text]':'addText', 
            'click [action-type=image]':'addImage'
        },
        addText:function(){
            this.model.add({children:[new model.text()]});
            this.hide();
        },
        addImage:function(){
            this.model.add({children:[new model.image()]});
            this.hide();
        },
        show:function(){
            blocks.show();
        },
        hide:function(){
            blocks.hide();
        }
    });
    //返回一个视图对象
    module.exports = blockView;
    
});

