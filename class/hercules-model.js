define('class/hercules-model', function(require, exports, module) {
	//定义hercules的各种model类型
	var backbone = require('backbone');
    //文本类型
	var textModel = backbone.Model.extend({
        defaults:{
            type:'text',
            html:'a test text!',
            col:12
        }
	});
    //图片类型
	var imageModel = backbone.Model.extend({
        defaults:{
            type:'image',
            src:'http://twitter.github.com/bootstrap/assets/img/bs-docs-responsive-illustrations.png',
            col:12
        },
        initialize:function(){
            if(!this.has('html')){
                this.set('html','<img src="'+this.get('src')+'" alt="">');
            }
        }
	});
    //混合类型
	var mixedModel = backbone.Model.extend({
        defaults:{
            type:'mixed',
            col:12,
            children:[]
        },
        initialize:function(){

        }
    });
    //行类型
    var rowModel = backbone.Model.extend({
        defaults:{
            col:12,
            children:[]
        },
        initialize:function(){
           //console.log(this); 
        }
    });

	exports.text = textModel;
	exports.image = imageModel;
	exports.mixed = mixedModel;
	exports.row = rowModel;
});

